(function () {
  "use strict";

  const MAX_RETRIES = 5;
  const BASE_DELAY_MS = 500;

  function abortError() {
    return new DOMException("Download cancelled", "AbortError");
  }

  function sleep(ms, signal) {
    return new Promise((resolve, reject) => {
      if (signal.aborted) return reject(abortError());
      const t = setTimeout(() => {
        signal.removeEventListener("abort", onAbort);
        resolve();
      }, ms);
      const onAbort = () => {
        clearTimeout(t);
        reject(abortError());
      };
      signal.addEventListener("abort", onAbort, { once: true });
    });
  }

  window.installUnityChunkLoader = async function () {
    const nativeFetch = window.fetch.bind(window);

    const manifestResponse = await nativeFetch("build-parts.json", {
      cache: "no-store",
    });
    if (!manifestResponse.ok) {
      throw new Error(
        "Could not load build-parts.json (HTTP " +
          manifestResponse.status +
          ").",
      );
    }
    const manifest = await manifestResponse.json();
    if (manifest.version !== 1)
      throw new Error("Unsupported split-build manifest.");

    const files = new Map(
      Object.entries(manifest.files).map(([path, file]) => {
        const url = new URL(path, document.baseURI);
        return [url.origin + url.pathname, file];
      }),
    );

    async function openPart(part, offset, attempt, signal) {
      const candidates = [part.path].concat(part.mirrors || []);
      const target = new URL(
        candidates[attempt % candidates.length],
        document.baseURI,
      );

      const response = await nativeFetch(target, {
        signal,
        credentials: "omit",
        cache: attempt > 0 ? "reload" : "default",
        headers: offset > 0 ? { Range: "bytes=" + offset + "-" } : undefined,
      });
      if (!response.ok || !response.body) {
        throw new Error(
          "Could not download " +
            part.path +
            " (HTTP " +
            response.status +
            ").",
        );
      }

      const ranged = response.status === 206;
      const skip = offset > 0 && !ranged ? offset : 0;

      const len = response.headers.get("Content-Length");
      if (len !== null && !response.headers.get("Content-Encoding")) {
        const expected = ranged ? part.size - offset : part.size;
        if (Number(len) !== expected) {
          response.body.cancel().catch(() => {});
          throw new Error(
            "Size mismatch for " +
              part.path +
              " (server " +
              len +
              ", expected " +
              expected +
              ").",
          );
        }
      }
      return { reader: response.body.getReader(), skip };
    }

    window.fetch = function (input, init) {
      const url = new URL(
        input instanceof Request ? input.url : input,
        document.baseURI,
      );
      const file = files.get(url.origin + url.pathname);
      if (!file) return nativeFetch(input, init);

      const request = new Request(input, init);
      if (request.method !== "GET") return nativeFetch(input, init);

      const abort = new AbortController();
      const onAbort = () => abort.abort(request.signal.reason);
      request.signal.addEventListener("abort", onAbort, { once: true });
      if (request.signal.aborted) onAbort();
      const cleanup = () =>
        request.signal.removeEventListener("abort", onAbort);

      let reader = null;
      let skip = 0;
      let index = 0;
      let attempt = 0;
      let partBytes = 0;
      let totalBytes = 0;

      const body = new ReadableStream({
        async pull(controller) {
          try {
            while (true) {
              if (abort.signal.aborted) throw abortError();

              if (index === file.parts.length) {
                if (totalBytes !== file.size)
                  throw new Error("Incorrect total size for " + url.pathname);
                cleanup();
                controller.close();
                return;
              }

              const part = file.parts[index];
              try {
                if (!reader) {
                  const opened = await openPart(
                    part,
                    partBytes,
                    attempt,
                    abort.signal,
                  );
                  reader = opened.reader;
                  skip = opened.skip;
                }

                const result = await reader.read();

                if (result.done) {
                  reader = null;
                  if (partBytes < part.size) {
                    throw new Error("Incomplete build part: " + part.path);
                  }
                  index++;
                  partBytes = 0;
                  attempt = 0;
                  continue;
                }

                let chunk = result.value;
                if (skip > 0) {
                  if (chunk.byteLength <= skip) {
                    skip -= chunk.byteLength;
                    continue;
                  }
                  chunk = chunk.subarray(skip);
                  skip = 0;
                }

                if (partBytes + chunk.byteLength > part.size) {
                  const e = new Error("Oversized build part: " + part.path);
                  e.fatal = true;
                  throw e;
                }
                partBytes += chunk.byteLength;
                totalBytes += chunk.byteLength;
                controller.enqueue(chunk);
                return;
              } catch (err) {
                if (reader) {
                  reader.cancel().catch(() => {});
                  reader = null;
                }
                if (abort.signal.aborted || err.fatal || attempt >= MAX_RETRIES)
                  throw err;
                attempt++;
                const delay = BASE_DELAY_MS * Math.pow(2, attempt - 1);
                console.warn(
                  "[chunk-loader] retry " +
                    attempt +
                    "/" +
                    MAX_RETRIES +
                    " for " +
                    part.path +
                    " at byte " +
                    partBytes +
                    " in " +
                    delay +
                    "ms:",
                  err.message || err,
                );
                await sleep(delay, abort.signal);
              }
            }
          } catch (error) {
            console.error(
              "[chunk-loader] failed",
              url.pathname,
              "part",
              index,
              file.parts[index] && file.parts[index].path,
              error,
            );
            abort.abort();
            cleanup();
            if (reader) reader.cancel().catch(() => {});
            controller.error(error);
          }
        },
        cancel(reason) {
          abort.abort(reason);
          cleanup();
          if (reader) return reader.cancel(reason);
        },
      });

      const headers = {
        "Content-Type": file.type,
        "Content-Length": String(file.size),
      };
      if (file.encoding) headers["Content-Encoding"] = file.encoding;

      return Promise.resolve(new Response(body, { headers }));
    };
  };
})();
