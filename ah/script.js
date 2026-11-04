/*
 * script.js - page logic for the Henry Stickmin Collection web port.
 *
 * The page is only the game: a 16:9 canvas on black, with a progress bar while
 * the game data downloads. Loading starts immediately. If the browser still
 * blocks sound when loading finishes, a "Click to start" prompt appears, since
 * the game's intro is synced to audio and can't run until sound is allowed.
 *
 * URL parameters (all optional):
 *   ?game=Henry.swf        which file to start (default: first entry in games.json)
 *   ?renderer=canvas       force a Ruffle backend: webgpu | wgpu-webgl | webgl | canvas
 *   ?log=info              Ruffle log level in the browser console: error (default) |
 *                          warn | info | debug | trace ("info" includes the game's trace())
 *
 * Saves: progress saves automatically in this browser. From the browser console,
 *   AIR.saves.snapshot()  returns everything (copy it to back up),
 *   AIR.saves.restore(o)  restores such a snapshot, AIR.saves.clear() wipes it.
 *
 * Must be served over http(s) (python serve.py) - file:// pages can't read Game Files/.
 */

(function () {
  const params = new URLSearchParams(location.search);
  const GAME_PARAM = params.get("game");
  const RENDERER = ["webgpu", "wgpu-webgl", "webgl", "canvas"].includes(params.get("renderer")) ? params.get("renderer") : null;
  const LOG_LEVEL = ["error", "warn", "info", "debug", "trace"].includes(params.get("log")) ? params.get("log") : "error";
  const GAME_FILES_DIR = "Game Files/";

  const $ = (id) => document.getElementById(id);
  const playerMount = $("playerMount");
  const overlay = $("overlay");
  const progress = $("progress");
  const progressBar = $("progressBar");
  const message = $("message");

  const AIR = (window.AIR = window.AIR || {});

  function log(text, level) {
    const line = "[Henry web] " + text;
    if (level === "error") console.error(line);
    else if (level === "warn") console.warn(line);
    else console.log(line);
  }
  AIR.log = log;

  // ---------------------------------------------------------------------------
  // Overlay: progress bar while loading, a short message when something's wrong
  // ---------------------------------------------------------------------------
  function showProgress(fraction) {
    overlay.hidden = false;
    overlay.classList.remove("is-fading", "is-clickable");
    overlay.onclick = null;
    message.hidden = true;
    progress.hidden = false;
    const indeterminate = fraction == null;
    progress.classList.toggle("is-indeterminate", indeterminate);
    if (!indeterminate) {
      const pct = Math.max(0, Math.min(100, fraction * 100));
      progressBar.style.width = pct.toFixed(1) + "%";
      progress.setAttribute("aria-valuenow", pct.toFixed(0));
    } else {
      progress.removeAttribute("aria-valuenow");
    }
  }

  function showMessage(text, onClick) {
    overlay.hidden = false;
    overlay.classList.remove("is-fading");
    progress.hidden = true;
    message.hidden = false;
    message.textContent = text;
    overlay.classList.toggle("is-clickable", !!onClick);
    overlay.onclick = onClick || null;
  }

  function hideOverlay() {
    overlay.classList.add("is-fading");
    setTimeout(() => { if (overlay.classList.contains("is-fading")) overlay.hidden = true; }, 400);
  }

  const MB = (n) => (n / 1048576).toFixed(0);

  // ---------------------------------------------------------------------------
  // Game detection
  // ---------------------------------------------------------------------------
  // games.json entries: { name, file, loads?: [files the movie loads itself] }
  async function findGames() {
    try {
      const res = await fetch(GAME_FILES_DIR + "games.json", { cache: "no-cache" });
      if (res.ok) {
        const list = (await res.json())
          .map((g) => (typeof g === "string" ? { file: g } : g))
          .filter((g) => g && g.file);
        if (list.length) return list;
      }
    } catch (e) { /* no manifest */ }
    try {
      const res = await fetch(GAME_FILES_DIR);
      if (res.ok) {
        const doc = new DOMParser().parseFromString(await res.text(), "text/html");
        const files = Array.from(doc.querySelectorAll("a"))
          .map((a) => decodeURIComponent(a.getAttribute("href") || ""))
          .filter((h) => /\.swf$/i.test(h));
        // The collection's hub movie loads the others itself, so start there.
        files.sort((a, b) => (/^henry\.swf$/i.test(b) ? 1 : 0) - (/^henry\.swf$/i.test(a) ? 1 : 0));
        return files.map((file) => ({ file }));
      }
    } catch (e) { /* no listing */ }
    return [];
  }

  async function fileSize(file) {
    try {
      const res = await fetch(GAME_FILES_DIR + file, { method: "HEAD", cache: "no-cache" });
      if (!res.ok) return null;
      return Number(res.headers.get("content-length")) || 0;
    } catch (e) {
      return null;
    }
  }

  // ---------------------------------------------------------------------------
  // Loading
  // ---------------------------------------------------------------------------
  let game = null;
  let running = false;
  let crashed = false;

  async function startGame() {
    crashed = false;
    running = false;
    setCredit(false);
    showProgress(null);

    const files = [game.file].concat(game.loads || []);
    const sizes = await Promise.all(files.map(fileSize));
    const missing = files.filter((f, i) => sizes[i] === null);
    if (missing.length) {
      log("Missing from Game Files/: " + missing.join(", "), "error");
      showMessage("Game files missing: " + missing.join(", ") + ". Put them in the Game Files folder and reload.");
      return;
    }
    const expectedBytes = sizes.reduce((a, b) => a + b, 0);
    log("Loading " + files.join(", ") + " (" + MB(expectedBytes) + " MB).");

    let finished = false;
    const onProgress = ({ loaded, active, files: started }) => {
      if (finished) return;
      showProgress(loaded / Math.max(expectedBytes, loaded, 1));
      if (active === 0 && started >= files.length && loaded >= expectedBytes) {
        finished = true;
        // The chapters still need a moment to initialise after downloading.
        showProgress(null);
        setTimeout(() => {
          if (crashed) return;
          log("All game data loaded.");
          revealGame();
        }, 1500);
      }
    };

    try {
      await window.AIRRuntime.loadSwf(playerMount, GAME_FILES_DIR + game.file, {
        base: GAME_FILES_DIR,
        renderer: RENDERER,
        logLevel: LOG_LEVEL,
        onProgress,
        onTrace,
      });
      running = true;
    } catch (err) {
      log("Could not start the game: " + err.message, "error");
      showMessage("The game couldn't start (" + err.message + "). Click to try again.", startGame);
    }
  }

  // ---------------------------------------------------------------------------
  // "Web port by T4ctica1" credit: title screen and chapter select only
  // ---------------------------------------------------------------------------
  // Detected from the game's own trace() output: the title screen starts
  // "titlesong", the chapter-select menu starts one of its six menu songs (only
  // MainScene ever plays these), and every chapter logs "starting ..." on launch.
  const credit = $("credit");
  const MENU_MUSIC = /^play \[class (titlesong|song_BtBMenu2|song_PrisonTitle|song_DiamondMenu|song_ItAMenu|song_FtCTitle|song_CtM)\]$/;
  function setCredit(visible) {
    credit.classList.toggle("is-visible", visible);
  }
  function onTrace(text) {
    const line = String(text).trim();
    if (MENU_MUSIC.test(line)) setCredit(true);
    else if (line.startsWith("starting ")) setCredit(false);
  }

  // Browsers only allow sound after a click on the page, and the game's intro
  // waits for its audio. If sound is still blocked, ask for one click; the click
  // only unlocks audio and is not passed on to the game.
  function revealGame() {
    if (!window.AIRRuntime.audioBlocked()) {
      hideOverlay();
      return;
    }
    let revealed = false;
    const go = () => {
      if (revealed) return;
      revealed = true;
      hideOverlay();
    };
    window.AIRRuntime.onAudioUnblocked(go);
    showMessage("Click to start", () => window.AIRRuntime.resumeAudio().then(go, go));
  }

  // ---------------------------------------------------------------------------
  // Events from the game (via AIR-Runtime/air-fs.js)
  // ---------------------------------------------------------------------------
  AIR.onAchievement = (name) => log("Achievement: " + name);

  AIR.onExit = () => {
    log("The game asked to quit.");
    setCredit(false);
    window.AIRRuntime.unload(playerMount);
    running = false;
    if (document.fullscreenElement) document.exitFullscreen().catch(() => {});
    showMessage("Thanks for playing! Click to play again.", startGame);
  };

  // ---------------------------------------------------------------------------
  // Crash handling
  // ---------------------------------------------------------------------------
  // A WebAssembly trap inside Ruffle poisons its state; the only cure is a fresh
  // page. Saves are written as they happen, so nothing is lost by reloading.
  function isWasmCrash(err, text) {
    if (typeof WebAssembly !== "undefined" && err instanceof WebAssembly.RuntimeError) return true;
    return /unreachable|memory access out of bounds|Unable to lock Ruffle core/i.test(String(text || (err && err.message) || ""));
  }
  function onCrash(text) {
    if (crashed || !running) return;
    crashed = true;
    running = false;
    log("Ruffle crashed: " + text, "error");
    setCredit(false);
    try { window.AIRRuntime.unload(playerMount); } catch (e) { /* gone already */ }
    showMessage("The game crashed. Your progress is saved. Click to reload.", () => location.reload());
  }
  window.addEventListener("error", (ev) => { if (isWasmCrash(ev.error, ev.message)) onCrash(ev.message); });
  window.addEventListener("unhandledrejection", (ev) => { if (isWasmCrash(ev.reason)) onCrash(String(ev.reason && ev.reason.message)); });

  // ---------------------------------------------------------------------------
  // Boot
  // ---------------------------------------------------------------------------
  // Older versions of this port used a service worker to rewrite SWFs on the
  // fly; a leftover one would slow every load down, so remove it.
  async function removeOldServiceWorkers() {
    if (!("serviceWorker" in navigator)) return;
    try {
      const regs = await navigator.serviceWorker.getRegistrations();
      for (const r of regs) await r.unregister();
      if (regs.length) log("Removed " + regs.length + " leftover service worker(s) from an older version of this port.");
    } catch (e) { /* not allowed here; harmless */ }
  }

  window.addEventListener("DOMContentLoaded", async () => {
    showProgress(null);
    await removeOldServiceWorkers();

    const games = await findGames();
    if (!games.length) {
      log("No .swf found in Game Files/.", "error");
      showMessage("No game found. Put the game's .swf files in the Game Files folder, then reload.");
      return;
    }
    game = games[0];
    if (GAME_PARAM) {
      const m = games.find((g) => g.file.toLowerCase() === GAME_PARAM.toLowerCase());
      if (m) game = m;
      else log("?game=" + GAME_PARAM + " isn't in Game Files/.", "warn");
    }
    startGame();
  });
})();
