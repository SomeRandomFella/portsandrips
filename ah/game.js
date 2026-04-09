const loading = document.getElementById("loading");
const canvas = document.getElementById("canvas");
const musicChoice = document.getElementById("music-choice");

async function idbGet(key) {
  return new Promise((resolve) => {
    const req = indexedDB.open("game-cache", 1);
    req.onupgradeneeded = (e) => e.target.result.createObjectStore("files");
    req.onsuccess = (e) => {
      const tx = e.target.result.transaction("files", "readonly");
      const r = tx.objectStore("files").get(key);
      r.onsuccess = () => resolve(r.result ?? null);
      r.onerror = () => resolve(null);
    };
    req.onerror = () => resolve(null);
  });
}

async function idbSet(key, value) {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open("game-cache", 1);
    req.onupgradeneeded = (e) => e.target.result.createObjectStore("files");
    req.onsuccess = (e) => {
      const tx = e.target.result.transaction("files", "readwrite");
      tx.objectStore("files").put(value, key);
      tx.oncomplete = resolve;
      tx.onerror = reject;
    };
    req.onerror = reject;
  });
}

const wantMusic = await new Promise(async (resolve) => {
  const hasAudio = (await idbGet("ContentAudio.tar")) !== null;

  if (hasAudio) {
    document.getElementById("btn-no-music").innerHTML =
      'Play without music <span class="hint">(~64 MB)</span>';
    document.getElementById("btn-with-music").innerHTML =
      'Play with music <span class="hint">(cached)</span>';
  }

  musicChoice.style.display = "";
  document.getElementById("btn-no-music").onclick = () => {
    musicChoice.style.display = "none";
    resolve(false);
  };
  document.getElementById("btn-with-music").onclick = () => {
    musicChoice.style.display = "none";
    resolve(true);
  };
});
musicChoice.style.display = "none";

async function fetchOne(url, onProgress) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch ${url}: ${res.status}`);
  const reader = res.body.getReader();
  const chunks = [];
  let received = 0;
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    chunks.push(value);
    received += value.length;
    if (onProgress) onProgress(received);
  }
  const out = new Uint8Array(received);
  let offset = 0;
  for (const chunk of chunks) {
    out.set(chunk, offset);
    offset += chunk.length;
  }
  return out;
}

async function getTar(baseName, label, partCount) {
  const cacheKey = baseName; 
  const cached = await idbGet(cacheKey);
  if (cached) {
    loading.textContent = `Reading cached ${label}...`;
    return cached;
  }

  loading.textContent = `Downloading ${label}...`;

  const parts = [];
  let totalReceived = 0;

  for (let i = 0; i < partCount; i++) {
    const partSuffix = String(i).padStart(2, "0"); 
    const url = `${baseName}${partSuffix}`; 
    loading.textContent = `Downloading ${label} (part ${i + 1}/${partCount})... ${(totalReceived / 1048576) | 0} MB`;
    const data = await fetchOne(url, (bytes) => {
      loading.textContent = `Downloading ${label} (part ${i + 1}/${partCount})... ${((totalReceived + bytes) / 1048576) | 0} MB`;
    });
    parts.push(data);
    totalReceived += data.length;
  }

  const tar = new Uint8Array(totalReceived);
  let offset = 0;
  for (const part of parts) {
    tar.set(part, offset);
    offset += part.length;
  }

  loading.textContent = `Caching ${label}...`;
  await idbSet(cacheKey, tar);
  return tar;
}

function toBlobUrl(uint8Array, mime = "application/octet-stream") {
  const blob = new Blob([uint8Array], { type: mime });
  return URL.createObjectURL(blob);
}

let contentTar = await getTar("Content.tar", "game content", 3);
let contentBlobUrl = toBlobUrl(contentTar, "application/wasm");
contentTar = null;

let audioBlobUrl = null;
if (wantMusic) {
  let audioTar = await getTar("ContentAudio.tar", "music", 24);
  audioBlobUrl = toBlobUrl(audioTar, "application/octet-stream");
  audioTar = null;
}

const { dotnet } = await import("./_framework/dotnet.js");

const runtime = await dotnet
  .withModuleConfig({ canvas })
  .withEnvironmentVariable("MONO_SLEEP_ABORT_LIMIT", "99999")
  .withRuntimeOptions([
    `--jiterpreter-minimum-trace-hit-count=${500}`,
    `--jiterpreter-trace-monitoring-period=${100}`,
    `--jiterpreter-trace-monitoring-max-average-penalty=${150}`,
    `--jiterpreter-wasm-bytes-limit=${64 * 1024 * 1024}`,
    `--jiterpreter-table-size=${32 * 1024}`,
    "--jiterpreter-stats-enabled",
  ])
  .withResourceLoader((type, name, defaultUri, _integrity, behavior) => {
    if (name?.endsWith("blazor.boot.json") || type === "dotnetjs") {
      return defaultUri;
    }

    if (type === "dotnetwasm" && behavior === "dotnetwasm") {
      return (async () => {
        let idx = 0;

        const fetchNextReader = async () => {
          const url = `${defaultUri}${idx}`;
          idx++;
          const res = await fetch(url);
          if (!res.ok) return null; 
          return res.body.getReader();
        };

        let currentReader = await fetchNextReader();
        if (!currentReader) throw new Error("Failed to fetch first wasm chunk");

        const stream = new ReadableStream({
          async pull(controller) {
            while (true) {
              const { value, done } = await currentReader.read();
              if (!done && value) {
                controller.enqueue(value);
                return;
              }
              currentReader = await fetchNextReader();
              if (!currentReader) {
                controller.close();
                return;
              }
            }
          },
        });

        return new Response(stream, {
          headers: { "Content-Type": "application/wasm" },
        });
      })();
    }

    return defaultUri;
  })
  .create();

const config = runtime.getConfig();
const exports = await runtime.getAssemblyExports(config.mainAssemblyName);

await runtime.runMain();
await exports.WasmBootstrap.PreInit();

loading.textContent = "Loading game files...";
{
  function extractTar(tar, prefix) {
    let pos = 0;
    let fileCount = 0;
    const writtenPaths = [];

    function readString(buf, off, len) {
      let end = off;
      while (end < off + len && buf[end] !== 0) end++;
      return new TextDecoder().decode(buf.subarray(off, end));
    }
    function readOctal(buf, off, len) {
      const s = readString(buf, off, len).trim();
      return s ? parseInt(s, 8) : 0;
    }

    while (pos + 512 <= tar.length) {
      const header = tar.subarray(pos, pos + 512);
      if (header.every((b) => b === 0)) break;
      const name = readString(header, 0, 100);
      const size = readOctal(header, 124, 12);
      const typeFlag = header[156];
      const pref = readString(header, 345, 155);
      const fullName = pref ? pref + "/" + name : name;
      pos += 512;

      if (typeFlag === 53 || typeFlag === 0x35 || name.endsWith("/")) {
        exports.WasmBootstrap.CreateContentDirectory(prefix + fullName);
      } else if (typeFlag === 48 || typeFlag === 0 || typeFlag === 0x30) {
        const fullPath = prefix + fullName;
        writtenPaths.push(fullPath);
        exports.WasmBootstrap.WriteContentFile(
          fullPath,
          tar.subarray(pos, pos + size),
        );
        fileCount++;
      }

      pos += Math.ceil(size / 512) * 512;
    }

    console.log("Written paths sample:", writtenPaths.slice(0, 20));
    return fileCount;
  }

  let total = extractTar(
    new Uint8Array(await (await fetch(contentBlobUrl)).arrayBuffer()),
    "/libsdl/",
  );
  if (audioBlobUrl) {
    loading.textContent = "Loading music...";
    const audioArray = await (await fetch(audioBlobUrl)).arrayBuffer();
    total += extractTar(new Uint8Array(audioArray), "/libsdl/");
  }
}

loading.classList.add("hidden");

const dpr = window.devicePixelRatio || 1;
let w = Math.round(canvas.clientWidth * dpr);
let h = Math.round(canvas.clientHeight * dpr);
if (w === 0 || h === 0) {
  w = 1280;
  h = 720;
}

await exports.WasmBootstrap.Init(w, h);

new ResizeObserver(() => {
  const dpr = window.devicePixelRatio || 1;
  const nw = Math.round(canvas.clientWidth * dpr);
  const nh = Math.round(canvas.clientHeight * dpr);
  if (nw > 0 && nh > 0) {
    try {
      exports.WasmBootstrap.Resize(nw, nh);
    } catch {}
  }
}).observe(canvas);

try {
  navigator.keyboard?.lock();
} catch {}
document.addEventListener("keydown", (e) => {
  if (
    [
      "Space",
      "ArrowUp",
      "ArrowDown",
      "ArrowLeft",
      "ArrowRight",
      "Tab",
    ].includes(e.code)
  ) {
    e.preventDefault();
  }
});

await exports.WasmBootstrap.MainLoop();
