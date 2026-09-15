(function () {
  "use strict";

  window.installUnityChunkLoader = async function () {
    const nativeFetch = window.fetch.bind(window);
    const manifestResponse = await nativeFetch("build-parts.json", { cache: "no-store" });
    if (!manifestResponse.ok) throw new Error("Could not load build-parts.json (HTTP " + manifestResponse.status + ").");
    const manifest = await manifestResponse.json();
    if (manifest.version !== 1) throw new Error("Unsupported split-build manifest.");
    const files = new Map(Object.entries(manifest.files).map(([path, file]) => {
      const url = new URL(path, document.baseURI);
      return [url.origin + url.pathname, file];
    }));

    window.fetch = function (input, init) {
      const url = new URL(input instanceof Request ? input.url : input, document.baseURI);
      const file = files.get(url.origin + url.pathname);
      if (!file) return nativeFetch(input, init);
      const request = new Request(input, init);
      if (request.method !== "GET") return nativeFetch(input, init);

      const abort = new AbortController();
      const onAbort = () => abort.abort(request.signal.reason);
      request.signal.addEventListener("abort", onAbort, { once: true });
      if (request.signal.aborted) onAbort();
      let reader;
      let index = 0;
      let partBytes = 0;
      let totalBytes = 0;
      const cleanup = () => request.signal.removeEventListener("abort", onAbort);

      // Backpressure keeps only one network part active, not a full-file Blob.
      const body = new ReadableStream({
        async pull(controller) {
          try {
            while (true) {
              if (abort.signal.aborted) throw new DOMException("Download cancelled", "AbortError");
              if (!reader) {
                if (index === file.parts.length) {
                  if (totalBytes !== file.size) throw new Error("Incorrect total size for " + url.pathname);
                  cleanup();
                  controller.close();
                  return;
                }
                const part = file.parts[index];
                const response = await nativeFetch(new URL(part.path, document.baseURI), {
                  signal: abort.signal,
                  credentials: request.credentials,
                  cache: "default"
                });
                if (!response.ok || !response.body) throw new Error("Could not download " + part.path + " (HTTP " + response.status + ").");
                reader = response.body.getReader();
                partBytes = 0;
              }
              const result = await reader.read();
              if (result.done) {
                if (partBytes !== file.parts[index].size) throw new Error("Incomplete build part: " + file.parts[index].path);
                reader.releaseLock();
                reader = null;
                index++;
              } else {
                partBytes += result.value.byteLength;
                totalBytes += result.value.byteLength;
                if (partBytes > file.parts[index].size) throw new Error("Oversized build part: " + file.parts[index].path);
                controller.enqueue(result.value);
                return;
              }
            }
          } catch (error) {
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
        }
      });
      return Promise.resolve(new Response(body, {
        headers: { "Content-Type": file.type, "Content-Length": String(file.size) }
      }));
    };
  };
})();
