var h;
h ||= typeof Module != "undefined" ? Module : {};
var aa = !!globalThis.window,
  ba = !!globalThis.WorkerGlobalScope,
  ca =
    globalThis.process?.versions?.node &&
    "renderer" != globalThis.process?.type;
h.expectedDataFileDownloads || (h.expectedDataFileDownloads = 0);
h.expectedDataFileDownloads++;
(() => {
  var a =
    "undefined" != typeof ENVIRONMENT_IS_WASM_WORKER &&
    ENVIRONMENT_IS_WASM_WORKER;
  if (
    !(
      ("undefined" != typeof ENVIRONMENT_IS_PTHREAD &&
        ENVIRONMENT_IS_PTHREAD) ||
      a
    )
  ) {
    var b =
      globalThis.process &&
      globalThis.process.versions &&
      globalThis.process.versions.node &&
      "renderer" != globalThis.process.type;
    (async function (c) {
      async function d(n, r) {
        if (b) {
          var v = require("fs").readFileSync(n);
          return new Uint8Array(v).buffer;
        }
        h.dataFileDownloads || (h.dataFileDownloads = {});
        try {
          var x = await fetch(n);
        } catch (L) {
          throw Error(`Network Error: ${n}`, { e: L });
        }
        if (!x.ok) throw Error(`${x.status}: ${x.url}`);
        v = [];
        r = Number(x.headers.get("Content-Length") || r);
        let D = 0;
        h.setStatus && h.setStatus("Downloading data...");
        for (x = x.body.getReader(); ; ) {
          var { done: G, value: N } = await x.read();
          if (G) break;
          v.push(N);
          D += N.length;
          h.dataFileDownloads[n] = { loaded: D, total: r };
          let L = 0,
            X = 0;
          for (var H of Object.values(h.dataFileDownloads))
            ((L += H.loaded), (X += H.total));
          h.setStatus && h.setStatus(`Downloading data... (${L}/${X})`);
        }
        n = new Uint8Array(v.map((L) => L.length).reduce((L, X) => L + X, 0));
        H = 0;
        for (const L of v) (n.set(L, H), (H += L.length));
        return n.buffer;
      }
      async function e(n) {
        n.FS_createPath("/", "assets", !0, !0);
        n.FS_createPath("/assets", "audio", !0, !0);
        n.FS_createPath("/assets", "shaders", !0, !0);
        n.FS_createPath("/assets", "textures", !0, !0);
        for (var r of c.files) n.addRunDependency(`fp ${r.filename}`);
        n.addRunDependency(
          "datafile_C:/work/game01/platform/emscripten/bin/index.data",
        );
        n.preloadResults || (n.preloadResults = {});
        n.preloadResults["C:/work/game01/platform/emscripten/bin/index.data"] =
          { Ck: !1 };
        p ||= await k;
        (async function (v) {
          if (!v) throw Error("Loading data file failed.");
          if (v.constructor.name !== ArrayBuffer.name)
            throw Error(
              "bad input to processPackageData " + v.constructor.name,
            );
          v = new Uint8Array(v);
          for (var x of c.files) {
            var D = x.filename;
            n.FS_createDataFile(
              D,
              null,
              v.subarray(x.start, x.end),
              !0,
              !0,
              !0,
            );
            n.removeRunDependency(`fp ${D}`);
          }
          n.removeRunDependency(
            "datafile_C:/work/game01/platform/emscripten/bin/index.data",
          );
        })(p);
      }
      "object" === typeof window
        ? window.encodeURIComponent(
            window.location.pathname.substring(
              0,
              window.location.pathname.lastIndexOf("/"),
            ) + "/",
          )
        : "undefined" === typeof process &&
          "undefined" !== typeof location &&
          encodeURIComponent(
            location.pathname.substring(0, location.pathname.lastIndexOf("/")) +
              "/",
          );
      var f = h.locateFile ? h.locateFile("index.data", "") : "index.data",
        g = c.remote_package_size,
        k,
        p = h.getPreloadedPackage && h.getPreloadedPackage(f, g);
      p || (k = d(f, g));
      h.calledRun ? e(h) : (h.preRun || (h.preRun = []), h.preRun.push(e));
    })({
      files: [
        { filename: "/assets/audio/button.ogg", start: 0, end: 6645 },
        { filename: "/assets/audio/button_.ogg", start: 6645, end: 12313 },
        { filename: "/assets/audio/click.ogg", start: 12313, end: 19064 },
        {
          filename: "/assets/audio/click_distant.ogg",
          start: 19064,
          end: 25420,
        },
        { filename: "/assets/audio/error.ogg", start: 25420, end: 34043 },
        { filename: "/assets/audio/explosion.ogg", start: 34043, end: 45064 },
        {
          filename: "/assets/audio/grass_footstep.ogg",
          start: 45064,
          end: 55071,
        },
        {
          filename: "/assets/audio/ground_ambience.ogg",
          start: 55071,
          end: 2131777,
        },
        { filename: "/assets/audio/music01.ogg", start: 2131777, end: 7731371 },
        {
          filename: "/assets/audio/music02.ogg",
          start: 7731371,
          end: 13320305,
        },
        {
          filename: "/assets/audio/night_ambience.ogg",
          start: 13320305,
          end: 13569159,
        },
        {
          filename: "/assets/audio/open_page.ogg",
          start: 13569159,
          end: 13579595,
        },
        { filename: "/assets/audio/rain.ogg", start: 13579595, end: 13919829 },
        {
          filename: "/assets/audio/swoosh.ogg",
          start: 13919829,
          end: 13935978,
        },
        {
          filename: "/assets/audio/tree_falling.ogg",
          start: 13935978,
          end: 13961733,
        },
        { filename: "/assets/audio/wind.ogg", start: 13961733, end: 14234679 },
        { filename: "/assets/credits.txt", start: 14234679, end: 14236063 },
        { filename: "/assets/m6x11.json", start: 14236063, end: 14253588 },
        { filename: "/assets/m6x11plus.json", start: 14253588, end: 14276214 },
        {
          filename: "/assets/shaders/common.h",
          start: 14276214,
          end: 14283647,
        },
        {
          filename: "/assets/shaders/composite.glsl",
          start: 14283647,
          end: 14284363,
        },
        {
          filename: "/assets/shaders/crt.glsl",
          start: 14284363,
          end: 14286899,
        },
        {
          filename: "/assets/shaders/default.fs",
          start: 14286899,
          end: 14287661,
        },
        {
          filename: "/assets/shaders/default.glsl",
          start: 14287661,
          end: 14287739,
        },
        {
          filename: "/assets/shaders/default.vs",
          start: 14287739,
          end: 14288690,
        },
        {
          filename: "/assets/shaders/depth.fs",
          start: 14288690,
          end: 14288730,
        },
        {
          filename: "/assets/shaders/depth.glsl",
          start: 14288730,
          end: 14288804,
        },
        {
          filename: "/assets/shaders/depth.vs",
          start: 14288804,
          end: 14289125,
        },
        {
          filename: "/assets/shaders/error.fs",
          start: 14289125,
          end: 14289235,
        },
        {
          filename: "/assets/shaders/error.vs",
          start: 14289235,
          end: 14289556,
        },
        {
          filename: "/assets/shaders/fog.glsl",
          start: 14289556,
          end: 14294834,
        },
        {
          filename: "/assets/shaders/font.glsl",
          start: 14294834,
          end: 14296080,
        },
        {
          filename: "/assets/shaders/game_buffer.h",
          start: 14296080,
          end: 14296279,
        },
        {
          filename: "/assets/shaders/grass.glsl",
          start: 14296279,
          end: 14297842,
        },
        { filename: "/assets/shaders/grass.h", start: 14297842, end: 14298687 },
        {
          filename: "/assets/shaders/grass_shadows.glsl",
          start: 14298687,
          end: 14299597,
        },
        { filename: "/assets/shaders/grid.fs", start: 14299597, end: 14299832 },
        {
          filename: "/assets/shaders/grid.glsl",
          start: 14299832,
          end: 14299904,
        },
        { filename: "/assets/shaders/grid.vs", start: 14299904, end: 14300256 },
        {
          filename: "/assets/shaders/grid_depth.fs",
          start: 14300256,
          end: 14300512,
        },
        {
          filename: "/assets/shaders/grid_depth.glsl",
          start: 14300512,
          end: 14300590,
        },
        {
          filename: "/assets/shaders/grid_functions.h",
          start: 14300590,
          end: 14302188,
        },
        {
          filename: "/assets/shaders/grid_params.h",
          start: 14302188,
          end: 14302792,
        },
        {
          filename: "/assets/shaders/house.glsl",
          start: 14302792,
          end: 14302883,
        },
        {
          filename: "/assets/shaders/island.glsl",
          start: 14302883,
          end: 14304999,
        },
        { filename: "/assets/shaders/lit.fs", start: 14304999, end: 14305589 },
        { filename: "/assets/shaders/lit.vs", start: 14305589, end: 14306504 },
        {
          filename: "/assets/shaders/lit_main.fs",
          start: 14306504,
          end: 14308498,
        },
        {
          filename: "/assets/shaders/nine_slice_sprite.glsl",
          start: 14308498,
          end: 14310243,
        },
        {
          filename: "/assets/shaders/particle.glsl",
          start: 14310243,
          end: 14311207,
        },
        {
          filename: "/assets/shaders/player_xray.glsl",
          start: 14311207,
          end: 14312252,
        },
        {
          filename: "/assets/shaders/quad.glsl",
          start: 14312252,
          end: 14312620,
        },
        {
          filename: "/assets/shaders/sprite.glsl",
          start: 14312620,
          end: 14313198,
        },
        {
          filename: "/assets/shaders/sprite_batch.glsl",
          start: 14313198,
          end: 14313548,
        },
        {
          filename: "/assets/shaders/sprite_batch.h",
          start: 14313548,
          end: 14313943,
        },
        {
          filename: "/assets/shaders/sprite_batch.vs",
          start: 14313943,
          end: 14315438,
        },
        {
          filename: "/assets/shaders/sprite_batch_shadows.glsl",
          start: 14315438,
          end: 14316077,
        },
        {
          filename: "/assets/shaders/tree.glsl",
          start: 14316077,
          end: 14317509,
        },
        { filename: "/assets/shaders/tree.h", start: 14317509, end: 14318358 },
        {
          filename: "/assets/shaders/tree_shadows.glsl",
          start: 14318358,
          end: 14319638,
        },
        {
          filename: "/assets/shaders/unlit.fs",
          start: 14319638,
          end: 14319888,
        },
        {
          filename: "/assets/shaders/unlit.glsl",
          start: 14319888,
          end: 14319962,
        },
        {
          filename: "/assets/shaders/unlit.vs",
          start: 14319962,
          end: 14320372,
        },
        {
          filename: "/assets/shaders/unlit_shadows.glsl",
          start: 14320372,
          end: 14320785,
        },
        {
          filename: "/assets/textures/character_sheet.ase",
          start: 14320785,
          end: 14325561,
        },
        {
          filename: "/assets/textures/clouds.ase",
          start: 14325561,
          end: 14434770,
        },
        {
          filename: "/assets/textures/cursor.png",
          start: 14434770,
          end: 14435118,
        },
        {
          filename: "/assets/textures/ground.ase",
          start: 14435118,
          end: 14435851,
        },
        {
          filename: "/assets/textures/heavy_clouds.ase",
          start: 14435851,
          end: 14440364,
        },
        {
          filename: "/assets/textures/m6x11.png",
          start: 14440364,
          end: 14450550,
        },
        {
          filename: "/assets/textures/m6x11plus.png",
          start: 14450550,
          end: 14456531,
        },
        {
          filename: "/assets/textures/noise.ase",
          start: 14456531,
          end: 14555118,
        },
        {
          filename: "/assets/textures/sprite_sheet.ase",
          start: 14555118,
          end: 14569774,
        },
        {
          filename: "/assets/textures/ui_sheet.ase",
          start: 14569774,
          end: 14609007,
        },
      ],
      remote_package_size: 14609007,
    });
  }
})();
var da = [],
  ea = "./this.program",
  fa = (a, b) => {
    throw b;
  },
  ha = globalThis.document?.currentScript?.src;
"undefined" != typeof __filename
  ? (ha = __filename)
  : ba && (ha = self.location.href);
var ia = "",
  ja,
  ka;
if (ca) {
  var fs = require("fs");
  ia = __dirname + "/";
  ka = (a) => {
    a = la(a) ? new URL(a) : a;
    return fs.readFileSync(a);
  };
  ja = async (a) => {
    a = la(a) ? new URL(a) : a;
    return fs.readFileSync(a, void 0);
  };
  1 < process.argv.length && (ea = process.argv[1].replace(/\\/g, "/"));
  da = process.argv.slice(2);
  "undefined" != typeof module && (module.exports = h);
  fa = (a, b) => {
    process.exitCode = a;
    throw b;
  };
} else if (aa || ba) {
  try {
    ia = new URL(".", ha).href;
  } catch {}
  ba &&
    (ka = (a) => {
      var b = new XMLHttpRequest();
      b.open("GET", a, !1);
      b.responseType = "arraybuffer";
      b.send(null);
      return new Uint8Array(b.response);
    });
  ja = async (a) => {
    if (la(a))
      return new Promise((c, d) => {
        var e = new XMLHttpRequest();
        e.open("GET", a, !0);
        e.responseType = "arraybuffer";
        e.onload = () => {
          200 == e.status || (0 == e.status && e.response)
            ? c(e.response)
            : d(e.status);
        };
        e.onerror = d;
        e.send(null);
      });
    var b = await fetch(a, { credentials: "same-origin" });
    if (b.ok) return b.arrayBuffer();
    throw Error(b.status + " : " + b.url);
  };
}
var ma = console.log.bind(console),
  l = console.error.bind(console),
  na,
  oa = !1,
  pa,
  la = (a) => a.startsWith("file://"),
  m,
  q,
  t,
  qa,
  u,
  w,
  y,
  z,
  ra,
  sa;
function ta() {
  var a = ua.buffer;
  m = new Int8Array(a);
  t = new Int16Array(a);
  q = new Uint8Array(a);
  qa = new Uint16Array(a);
  u = new Int32Array(a);
  w = new Uint32Array(a);
  y = new Float32Array(a);
  z = new Float64Array(a);
  ra = new BigInt64Array(a);
  sa = new BigUint64Array(a);
}
function A(a) {
  h.onAbort?.(a);
  a = "Aborted(" + a + ")";
  l(a);
  oa = !0;
  throw new WebAssembly.RuntimeError(
    a + ". Build with -sASSERTIONS for more info.",
  );
}
var va;
async function wa(a) {
  if (!na)
    try {
      var b = await ja(a);
      return new Uint8Array(b);
    } catch {}
  if (a == va && na) a = new Uint8Array(na);
  else if (ka) a = ka(a);
  else throw "both async and sync fetching of the wasm failed";
  return a;
}
async function xa(a, b) {
  try {
    var c = await wa(a);
    return await WebAssembly.instantiate(c, b);
  } catch (d) {
    (l(`failed to asynchronously prepare wasm: ${d}`), A(d));
  }
}
async function ya(a) {
  var b = va;
  if (!na && !la(b) && !ca)
    try {
      var c = fetch(b, { credentials: "same-origin" });
      return await WebAssembly.instantiateStreaming(c, a);
    } catch (d) {
      (l(`wasm streaming compile failed: ${d}`),
        l("falling back to ArrayBuffer instantiation"));
    }
  return xa(b, a);
}
class za {
  name = "ExitStatus";
  constructor(a) {
    this.message = `Program terminated with exit(${a})`;
    this.status = a;
  }
}
var Aa = (a) => {
    for (; 0 < a.length; ) a.shift()(h);
  },
  Ba = [],
  Ca = [],
  Da = () => {
    var a = h.preRun.shift();
    Ca.push(a);
  },
  Ea = 0,
  Fa = null,
  Ga = () => {
    Ea--;
    h.monitorRunDependencies?.(Ea);
    if (0 == Ea && Fa) {
      var a = Fa;
      Fa = null;
      a();
    }
  },
  Ha = () => {
    Ea++;
    h.monitorRunDependencies?.(Ea);
  },
  Ia = !0;
function Ja(a, b) {
  var c = "float";
  c.endsWith("*") && (c = "*");
  switch (c) {
    case "i1":
      m[a] = b;
      break;
    case "i8":
      m[a] = b;
      break;
    case "i16":
      t[a >> 1] = b;
      break;
    case "i32":
      u[a >> 2] = b;
      break;
    case "i64":
      ra[a >> 3] = BigInt(b);
      break;
    case "float":
      y[a >> 2] = b;
      break;
    case "double":
      z[a >> 3] = b;
      break;
    case "*":
      w[a >> 2] = b;
      break;
    default:
      A(`invalid type for setValue: ${c}`);
  }
}
var Ka = globalThis.TextDecoder && new TextDecoder(),
  La = (a, b, c, d) => {
    c = b + c;
    if (d) return c;
    for (; a[b] && !(b >= c); ) ++b;
    return b;
  },
  B = (a, b = 0, c, d) => {
    c = La(a, b, c, d);
    if (16 < c - b && a.buffer && Ka) return Ka.decode(a.subarray(b, c));
    for (d = ""; b < c; ) {
      var e = a[b++];
      if (e & 128) {
        var f = a[b++] & 63;
        if (192 == (e & 224)) d += String.fromCharCode(((e & 31) << 6) | f);
        else {
          var g = a[b++] & 63;
          e =
            224 == (e & 240)
              ? ((e & 15) << 12) | (f << 6) | g
              : ((e & 7) << 18) | (f << 12) | (g << 6) | (a[b++] & 63);
          65536 > e
            ? (d += String.fromCharCode(e))
            : ((e -= 65536),
              (d += String.fromCharCode(
                55296 | (e >> 10),
                56320 | (e & 1023),
              )));
        }
      } else d += String.fromCharCode(e);
    }
    return d;
  },
  Ma = (a, b, c) => (a ? B(q, a, b, c) : ""),
  Na = [],
  C = (a) => {
    var b = Na[a];
    b || (Na[a] = b = Oa.get(a));
    return b;
  };
class Pa {
  constructor(a) {
    this.Yh = a - 24;
  }
}
var Qa = 0,
  Ra = 0,
  Ta = () => {
    var a = u[+Sa >> 2];
    Sa += 4;
    return a;
  },
  Ua = (a, b) => {
    for (var c = 0, d = a.length - 1; 0 <= d; d--) {
      var e = a[d];
      "." === e
        ? a.splice(d, 1)
        : ".." === e
          ? (a.splice(d, 1), c++)
          : c && (a.splice(d, 1), c--);
    }
    if (b) for (; c; c--) a.unshift("..");
    return a;
  },
  Va = (a) => {
    var b = "/" === a.charAt(0),
      c = "/" === a.slice(-1);
    (a = Ua(
      a.split("/").filter((d) => !!d),
      !b,
    ).join("/")) ||
      b ||
      (a = ".");
    a && c && (a += "/");
    return (b ? "/" : "") + a;
  },
  Wa = (a) => {
    var b = /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/
      .exec(a)
      .slice(1);
    a = b[0];
    b = b[1];
    if (!a && !b) return ".";
    b &&= b.slice(0, -1);
    return a + b;
  },
  Xa = (a) => a && a.match(/([^\/]+|\/)\/*$/)[1],
  Ya = () => {
    if (ca) {
      var a = require("crypto");
      return (b) => a.randomFillSync(b);
    }
    return (b) => crypto.getRandomValues(b);
  },
  Za = (a) => {
    (Za = Ya())(a);
  },
  $a = (...a) => {
    for (var b = "", c = !1, d = a.length - 1; -1 <= d && !c; d--) {
      c = 0 <= d ? a[d] : "/";
      if ("string" != typeof c)
        throw new TypeError("Arguments to path.resolve must be strings");
      if (!c) return "";
      b = c + "/" + b;
      c = "/" === c.charAt(0);
    }
    b = Ua(
      b.split("/").filter((e) => !!e),
      !c,
    ).join("/");
    return (c ? "/" : "") + b || ".";
  },
  ab = [],
  bb = (a) => {
    for (var b = 0, c = 0; c < a.length; ++c) {
      var d = a.charCodeAt(c);
      127 >= d
        ? b++
        : 2047 >= d
          ? (b += 2)
          : 55296 <= d && 57343 >= d
            ? ((b += 4), ++c)
            : (b += 3);
    }
    return b;
  },
  E = (a, b, c, d) => {
    if (!(0 < d)) return 0;
    var e = c;
    d = c + d - 1;
    for (var f = 0; f < a.length; ++f) {
      var g = a.codePointAt(f);
      if (127 >= g) {
        if (c >= d) break;
        b[c++] = g;
      } else if (2047 >= g) {
        if (c + 1 >= d) break;
        b[c++] = 192 | (g >> 6);
        b[c++] = 128 | (g & 63);
      } else if (65535 >= g) {
        if (c + 2 >= d) break;
        b[c++] = 224 | (g >> 12);
        b[c++] = 128 | ((g >> 6) & 63);
        b[c++] = 128 | (g & 63);
      } else {
        if (c + 3 >= d) break;
        b[c++] = 240 | (g >> 18);
        b[c++] = 128 | ((g >> 12) & 63);
        b[c++] = 128 | ((g >> 6) & 63);
        b[c++] = 128 | (g & 63);
        f++;
      }
    }
    b[c] = 0;
    return c - e;
  },
  cb = (a) => {
    var b = Array(bb(a) + 1);
    a = E(a, b, 0, b.length);
    b.length = a;
    return b;
  },
  db = [];
function eb(a, b) {
  db[a] = { input: [], output: [], Xh: b };
  fb(a, gb);
}
var gb = {
    open(a) {
      var b = db[a.node.rdev];
      if (!b) throw new F(43);
      a.tty = b;
      a.seekable = !1;
    },
    close(a) {
      a.tty.Xh.fsync(a.tty);
    },
    fsync(a) {
      a.tty.Xh.fsync(a.tty);
    },
    read(a, b, c, d) {
      if (!a.tty || !a.tty.Xh.yj) throw new F(60);
      for (var e = 0, f = 0; f < d; f++) {
        try {
          var g = a.tty.Xh.yj(a.tty);
        } catch (k) {
          throw new F(29);
        }
        if (void 0 === g && 0 === e) throw new F(6);
        if (null === g || void 0 === g) break;
        e++;
        b[c + f] = g;
      }
      e && (a.node.atime = Date.now());
      return e;
    },
    write(a, b, c, d) {
      if (!a.tty || !a.tty.Xh.ij) throw new F(60);
      try {
        for (var e = 0; e < d; e++) a.tty.Xh.ij(a.tty, b[c + e]);
      } catch (f) {
        throw new F(29);
      }
      d && (a.node.mtime = a.node.ctime = Date.now());
      return e;
    },
  },
  hb = {
    yj() {
      a: {
        if (!ab.length) {
          var a = null;
          if (ca) {
            var b = Buffer.alloc(256),
              c = 0,
              d = process.stdin.fd;
            try {
              c = fs.readSync(d, b, 0, 256);
            } catch (e) {
              if (e.toString().includes("EOF")) c = 0;
              else throw e;
            }
            0 < c && (a = b.slice(0, c).toString("utf-8"));
          } else
            globalThis.window?.prompt &&
              ((a = window.prompt("Input: ")), null !== a && (a += "\n"));
          if (!a) {
            a = null;
            break a;
          }
          ab = cb(a);
        }
        a = ab.shift();
      }
      return a;
    },
    ij(a, b) {
      null === b || 10 === b
        ? (ma(B(a.output)), (a.output = []))
        : 0 != b && a.output.push(b);
    },
    fsync(a) {
      0 < a.output?.length && (ma(B(a.output)), (a.output = []));
    },
    Xj() {
      return {
        rk: 25856,
        tk: 5,
        qk: 191,
        sk: 35387,
        pk: [
          3, 28, 127, 21, 4, 0, 1, 0, 17, 19, 26, 0, 18, 15, 23, 22, 0, 0, 0, 0,
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        ],
      };
    },
    Yj() {
      return 0;
    },
    Zj() {
      return [24, 80];
    },
  },
  ib = {
    ij(a, b) {
      null === b || 10 === b
        ? (l(B(a.output)), (a.output = []))
        : 0 != b && a.output.push(b);
    },
    fsync(a) {
      0 < a.output?.length && (l(B(a.output)), (a.output = []));
    },
  },
  I = {
    Th: null,
    Wh() {
      return I.createNode(null, "/", 16895, 0);
    },
    createNode(a, b, c, d) {
      if (24576 === (c & 61440) || 4096 === (c & 61440)) throw new F(63);
      I.Th ||
        (I.Th = {
          dir: {
            node: {
              Nh: I.vh.Nh,
              Uh: I.vh.Uh,
              lookup: I.vh.lookup,
              Li: I.vh.Li,
              rename: I.vh.rename,
              unlink: I.vh.unlink,
              rmdir: I.vh.rmdir,
              readdir: I.vh.readdir,
              symlink: I.vh.symlink,
            },
            stream: { Sh: I.wh.Sh },
          },
          file: {
            node: { Nh: I.vh.Nh, Uh: I.vh.Uh },
            stream: {
              Sh: I.wh.Sh,
              read: I.wh.read,
              write: I.wh.write,
              ej: I.wh.ej,
              Bj: I.wh.Bj,
            },
          },
          link: {
            node: { Nh: I.vh.Nh, Uh: I.vh.Uh, readlink: I.vh.readlink },
            stream: {},
          },
          vj: { node: { Nh: I.vh.Nh, Uh: I.vh.Uh }, stream: jb },
        });
      c = kb(a, b, c, d);
      J(c.mode)
        ? ((c.vh = I.Th.dir.node), (c.wh = I.Th.dir.stream), (c.uh = {}))
        : 32768 === (c.mode & 61440)
          ? ((c.vh = I.Th.file.node),
            (c.wh = I.Th.file.stream),
            (c.Ch = 0),
            (c.uh = null))
          : 40960 === (c.mode & 61440)
            ? ((c.vh = I.Th.link.node), (c.wh = I.Th.link.stream))
            : 8192 === (c.mode & 61440) &&
              ((c.vh = I.Th.vj.node), (c.wh = I.Th.vj.stream));
      c.atime = c.mtime = c.ctime = Date.now();
      a && ((a.uh[b] = c), (a.atime = a.mtime = a.ctime = c.atime));
      return c;
    },
    Ek(a) {
      return a.uh
        ? a.uh.subarray
          ? a.uh.subarray(0, a.Ch)
          : new Uint8Array(a.uh)
        : new Uint8Array(0);
    },
    vh: {
      Nh(a) {
        var b = {};
        b.dev = 8192 === (a.mode & 61440) ? a.id : 1;
        b.ino = a.id;
        b.mode = a.mode;
        b.nlink = 1;
        b.uid = 0;
        b.gid = 0;
        b.rdev = a.rdev;
        J(a.mode)
          ? (b.size = 4096)
          : 32768 === (a.mode & 61440)
            ? (b.size = a.Ch)
            : 40960 === (a.mode & 61440)
              ? (b.size = a.link.length)
              : (b.size = 0);
        b.atime = new Date(a.atime);
        b.mtime = new Date(a.mtime);
        b.ctime = new Date(a.ctime);
        b.blksize = 4096;
        b.blocks = Math.ceil(b.size / b.blksize);
        return b;
      },
      Uh(a, b) {
        for (var c of ["mode", "atime", "mtime", "ctime"])
          null != b[c] && (a[c] = b[c]);
        void 0 !== b.size &&
          ((b = b.size),
          a.Ch != b &&
            (0 == b
              ? ((a.uh = null), (a.Ch = 0))
              : ((c = a.uh),
                (a.uh = new Uint8Array(b)),
                c && a.uh.set(c.subarray(0, Math.min(b, a.Ch))),
                (a.Ch = b))));
      },
      lookup() {
        I.Si ||
          ((I.Si = new F(44)), (I.Si.stack = "<generic error, no stack>"));
        throw I.Si;
      },
      Li(a, b, c, d) {
        return I.createNode(a, b, c, d);
      },
      rename(a, b, c) {
        try {
          var d = lb(b, c);
        } catch (f) {}
        if (d) {
          if (J(a.mode)) for (var e in d.uh) throw new F(55);
          mb(d);
        }
        delete a.parent.uh[a.name];
        b.uh[c] = a;
        a.name = c;
        b.ctime = b.mtime = a.parent.ctime = a.parent.mtime = Date.now();
      },
      unlink(a, b) {
        delete a.uh[b];
        a.ctime = a.mtime = Date.now();
      },
      rmdir(a, b) {
        var c = lb(a, b),
          d;
        for (d in c.uh) throw new F(55);
        delete a.uh[b];
        a.ctime = a.mtime = Date.now();
      },
      readdir(a) {
        return [".", "..", ...Object.keys(a.uh)];
      },
      symlink(a, b, c) {
        a = I.createNode(a, b, 41471, 0);
        a.link = c;
        return a;
      },
      readlink(a) {
        if (40960 !== (a.mode & 61440)) throw new F(28);
        return a.link;
      },
    },
    wh: {
      read(a, b, c, d, e) {
        var f = a.node.uh;
        if (e >= a.node.Ch) return 0;
        a = Math.min(a.node.Ch - e, d);
        if (8 < a && f.subarray) b.set(f.subarray(e, e + a), c);
        else for (d = 0; d < a; d++) b[c + d] = f[e + d];
        return a;
      },
      write(a, b, c, d, e, f) {
        b.buffer === m.buffer && (f = !1);
        if (!d) return 0;
        a = a.node;
        a.mtime = a.ctime = Date.now();
        if (b.subarray && (!a.uh || a.uh.subarray)) {
          if (f) return ((a.uh = b.subarray(c, c + d)), (a.Ch = d));
          if (0 === a.Ch && 0 === e)
            return ((a.uh = b.slice(c, c + d)), (a.Ch = d));
          if (e + d <= a.Ch) return (a.uh.set(b.subarray(c, c + d), e), d);
        }
        f = e + d;
        var g = a.uh ? a.uh.length : 0;
        g >= f ||
          ((f = Math.max(f, (g * (1048576 > g ? 2 : 1.125)) >>> 0)),
          0 != g && (f = Math.max(f, 256)),
          (g = a.uh),
          (a.uh = new Uint8Array(f)),
          0 < a.Ch && a.uh.set(g.subarray(0, a.Ch), 0));
        if (a.uh.subarray && b.subarray) a.uh.set(b.subarray(c, c + d), e);
        else for (f = 0; f < d; f++) a.uh[e + f] = b[c + f];
        a.Ch = Math.max(a.Ch, e + d);
        return d;
      },
      Sh(a, b, c) {
        1 === c
          ? (b += a.position)
          : 2 === c && 32768 === (a.node.mode & 61440) && (b += a.node.Ch);
        if (0 > b) throw new F(28);
        return b;
      },
      ej(a, b, c, d, e) {
        if (32768 !== (a.node.mode & 61440)) throw new F(43);
        a = a.node.uh;
        if (e & 2 || !a || a.buffer !== m.buffer) {
          d = !0;
          A();
          e = void 0;
          if (!e) throw new F(48);
          if (a) {
            if (0 < c || c + b < a.length)
              a.subarray
                ? (a = a.subarray(c, c + b))
                : (a = Array.prototype.slice.call(a, c, c + b));
            m.set(a, e);
          }
        } else ((d = !1), (e = a.byteOffset));
        return { Yh: e, lk: d };
      },
      Bj(a, b, c, d) {
        I.wh.write(a, b, 0, d, c, !1);
        return 0;
      },
    },
  },
  nb = (a, b) => {
    var c = 0;
    a && (c |= 365);
    b && (c |= 146);
    return c;
  },
  ob = async (a) => {
    a = await ja(a);
    return new Uint8Array(a);
  },
  pb = [],
  sb = async (a, b) => {
    "undefined" != typeof qb && rb();
    for (var c of pb) if (c.canHandle(b)) return c.handle(a, b);
    return a;
  },
  tb = null,
  ub = {},
  vb = [],
  wb = 1,
  xb = null,
  yb = !1,
  zb = !0,
  Ab = {},
  F = class {
    name = "ErrnoError";
    constructor(a) {
      this.Dh = a;
    }
  },
  Bb = class {
    Bh = {};
    node = null;
    get flags() {
      return this.Bh.flags;
    }
    set flags(a) {
      this.Bh.flags = a;
    }
    get position() {
      return this.Bh.position;
    }
    set position(a) {
      this.Bh.position = a;
    }
  },
  Cb = class {
    vh = {};
    wh = {};
    li = null;
    constructor(a, b, c, d) {
      a ||= this;
      this.parent = a;
      this.Wh = a.Wh;
      this.id = wb++;
      this.name = b;
      this.mode = c;
      this.rdev = d;
      this.atime = this.mtime = this.ctime = Date.now();
    }
    get read() {
      return 365 === (this.mode & 365);
    }
    set read(a) {
      a ? (this.mode |= 365) : (this.mode &= -366);
    }
    get write() {
      return 146 === (this.mode & 146);
    }
    set write(a) {
      a ? (this.mode |= 146) : (this.mode &= -147);
    }
    get ak() {
      return J(this.mode);
    }
    get $j() {
      return 8192 === (this.mode & 61440);
    }
  };
function Db(a, b = {}) {
  if (!a) throw new F(44);
  b.Xi ?? (b.Xi = !0);
  "/" === a.charAt(0) || (a = "//" + a);
  var c = 0;
  a: for (; 40 > c; c++) {
    a = a.split("/").filter((k) => !!k);
    for (var d = tb, e = "/", f = 0; f < a.length; f++) {
      var g = f === a.length - 1;
      if (g && b.parent) break;
      if ("." !== a[f])
        if (".." === a[f])
          if (((e = Wa(e)), d === d.parent)) {
            a = e + "/" + a.slice(f + 1).join("/");
            c--;
            continue a;
          } else d = d.parent;
        else {
          e = Va(e + "/" + a[f]);
          try {
            d = lb(d, a[f]);
          } catch (k) {
            if (44 === k?.Dh && g && b.dk) return { path: e };
            throw k;
          }
          !d.li || (g && !b.Xi) || (d = d.li.root);
          if (40960 === (d.mode & 61440) && (!g || b.Gi)) {
            if (!d.vh.readlink) throw new F(52);
            d = d.vh.readlink(d);
            "/" === d.charAt(0) || (d = Wa(e) + "/" + d);
            a = d + "/" + a.slice(f + 1).join("/");
            continue a;
          }
        }
    }
    return { path: e, node: d };
  }
  throw new F(32);
}
function Eb(a) {
  for (var b; ; ) {
    if (a === a.parent)
      return (
        (a = a.Wh.Aj),
        b ? ("/" !== a[a.length - 1] ? `${a}/${b}` : a + b) : a
      );
    b = b ? `${a.name}/${b}` : a.name;
    a = a.parent;
  }
}
function Fb(a, b) {
  for (var c = 0, d = 0; d < b.length; d++)
    c = ((c << 5) - c + b.charCodeAt(d)) | 0;
  return ((a + c) >>> 0) % xb.length;
}
function mb(a) {
  var b = Fb(a.parent.id, a.name);
  if (xb[b] === a) xb[b] = a.mi;
  else
    for (b = xb[b]; b; ) {
      if (b.mi === a) {
        b.mi = a.mi;
        break;
      }
      b = b.mi;
    }
}
function lb(a, b) {
  var c = J(a.mode) ? ((c = Gb(a, "x")) ? c : a.vh.lookup ? 0 : 2) : 54;
  if (c) throw new F(c);
  for (c = xb[Fb(a.id, b)]; c; c = c.mi) {
    var d = c.name;
    if (c.parent.id === a.id && d === b) return c;
  }
  return a.vh.lookup(a, b);
}
function kb(a, b, c, d) {
  a = new Cb(a, b, c, d);
  b = Fb(a.parent.id, a.name);
  a.mi = xb[b];
  return (xb[b] = a);
}
function J(a) {
  return 16384 === (a & 61440);
}
function Hb(a) {
  var b = ["r", "w", "rw"][a & 3];
  a & 512 && (b += "w");
  return b;
}
function Gb(a, b) {
  if (zb) return 0;
  if (!b.includes("r") || a.mode & 292) {
    if (
      (b.includes("w") && !(a.mode & 146)) ||
      (b.includes("x") && !(a.mode & 73))
    )
      return 2;
  } else return 2;
  return 0;
}
function Ib(a, b) {
  if (!J(a.mode)) return 54;
  try {
    return (lb(a, b), 20);
  } catch (c) {}
  return Gb(a, "wx");
}
function Jb(a, b, c) {
  try {
    var d = lb(a, b);
  } catch (e) {
    return e.Dh;
  }
  if ((a = Gb(a, "wx"))) return a;
  if (c) {
    if (!J(d.mode)) return 54;
    if (d === d.parent || "/" === Eb(d)) return 10;
  } else if (J(d.mode)) return 31;
  return 0;
}
function Kb(a) {
  if (!a) throw new F(63);
  return a;
}
function Lb(a) {
  a = vb[a];
  if (!a) throw new F(8);
  return a;
}
function Mb(a, b = -1) {
  a = Object.assign(new Bb(), a);
  if (-1 == b)
    a: {
      for (b = 0; 4096 >= b; b++) if (!vb[b]) break a;
      throw new F(33);
    }
  a.fd = b;
  return (vb[b] = a);
}
function Nb(a, b = -1) {
  a = Mb(a, b);
  a.wh?.zk?.(a);
  return a;
}
function Ob(a, b) {
  var c = null?.wh.Uh,
    d = c ? null : a;
  c ??= a.vh.Uh;
  Kb(c);
  c(d, b);
}
var jb = {
  open(a) {
    a.wh = ub[a.node.rdev].wh;
    a.wh.open?.(a);
  },
  Sh() {
    throw new F(70);
  },
};
function fb(a, b) {
  ub[a] = { wh: b };
}
function Pb(a, b) {
  var c = "/" === b;
  if (c && tb) throw new F(10);
  if (!c && b) {
    var d = Db(b, { Xi: !1 });
    b = d.path;
    d = d.node;
    if (d.li) throw new F(10);
    if (!J(d.mode)) throw new F(54);
  }
  b = { type: a, Kk: {}, Aj: b, ck: [] };
  a = a.Wh(b);
  a.Wh = b;
  b.root = a;
  c ? (tb = a) : d && ((d.li = b), d.Wh && d.Wh.ck.push(b));
}
function Qb(a, b, c) {
  var d = Db(a, { parent: !0 }).node;
  a = Xa(a);
  if (!a) throw new F(28);
  if ("." === a || ".." === a) throw new F(20);
  var e = Ib(d, a);
  if (e) throw new F(e);
  if (!d.vh.Li) throw new F(63);
  return d.vh.Li(d, a, b, c);
}
function Rb(a, b = 438) {
  return Qb(a, (b & 4095) | 32768, 0);
}
function K(a) {
  return Qb(a, 16895, 0);
}
function Sb(a, b, c) {
  "undefined" == typeof c && ((c = b), (b = 438));
  return Qb(a, b | 8192, c);
}
function Tb(a, b) {
  if (!$a(a)) throw new F(44);
  var c = Db(b, { parent: !0 }).node;
  if (!c) throw new F(44);
  b = Xa(b);
  var d = Ib(c, b);
  if (d) throw new F(d);
  if (!c.vh.symlink) throw new F(63);
  c.vh.symlink(c, b, a);
}
function Ub(a) {
  var b = Db(a, { parent: !0 }).node;
  if (!b) throw new F(44);
  a = Xa(a);
  var c = lb(b, a),
    d = Jb(b, a, !1);
  if (d) throw new F(d);
  if (!b.vh.unlink) throw new F(63);
  if (c.li) throw new F(10);
  b.vh.unlink(b, a);
  mb(c);
}
function Vb(a, b) {
  a = Db(a, { Gi: !b }).node;
  return Kb(a.vh.Nh)(a);
}
function Wb(a, b) {
  a = "string" == typeof a ? Db(a, { Gi: !0 }).node : a;
  Ob(a, { mode: (b & 4095) | (a.mode & -4096), ctime: Date.now(), yk: void 0 });
}
function Xb(a, b, c = 438) {
  if ("" === a) throw new F(44);
  if ("string" == typeof b) {
    var d = { r: 0, "r+": 2, w: 577, "w+": 578, a: 1089, "a+": 1090 }[b];
    if ("undefined" == typeof d) throw Error(`Unknown file open mode: ${b}`);
    b = d;
  }
  c = b & 64 ? (c & 4095) | 32768 : 0;
  if ("object" == typeof a) d = a;
  else {
    var e = a.endsWith("/");
    a = Db(a, { Gi: !(b & 131072), dk: !0 });
    d = a.node;
    a = a.path;
  }
  var f = !1;
  if (b & 64)
    if (d) {
      if (b & 128) throw new F(20);
    } else {
      if (e) throw new F(31);
      d = Qb(a, c | 511, 0);
      f = !0;
    }
  if (!d) throw new F(44);
  8192 === (d.mode & 61440) && (b &= -513);
  if (b & 65536 && !J(d.mode)) throw new F(54);
  if (
    !f &&
    (e = d
      ? 40960 === (d.mode & 61440)
        ? 32
        : J(d.mode) && ("r" !== Hb(b) || b & 576)
          ? 31
          : Gb(d, Hb(b))
      : 44)
  )
    throw new F(e);
  if (b & 512 && !f) {
    e = d;
    e = "string" == typeof e ? Db(e, { Gi: !0 }).node : e;
    if (J(e.mode)) throw new F(31);
    if (32768 !== (e.mode & 61440)) throw new F(28);
    var g = Gb(e, "w");
    if (g) throw new F(g);
    Ob(e, { size: 0, timestamp: Date.now() });
  }
  b &= -131713;
  e = Mb({
    node: d,
    path: Eb(d),
    flags: b,
    seekable: !0,
    position: 0,
    wh: d.wh,
    hk: [],
    error: !1,
  });
  e.wh.open && e.wh.open(e);
  f && Wb(d, c & 511);
  !h.logReadFiles || b & 1 || a in Ab || (Ab[a] = 1);
  return e;
}
function Yb(a) {
  if (null === a.fd) throw new F(8);
  a.$i && (a.$i = null);
  try {
    a.wh.close && a.wh.close(a);
  } catch (b) {
    throw b;
  } finally {
    vb[a.fd] = null;
  }
  a.fd = null;
}
function Zb(a, b, c) {
  if (null === a.fd) throw new F(8);
  if (!a.seekable || !a.wh.Sh) throw new F(70);
  if (0 != c && 1 != c && 2 != c) throw new F(28);
  a.position = a.wh.Sh(a, b, c);
  a.hk = [];
}
function $b(a, b, c, d, e, f) {
  if (0 > d || 0 > e) throw new F(28);
  if (null === a.fd) throw new F(8);
  if (0 === (a.flags & 2097155)) throw new F(8);
  if (J(a.node.mode)) throw new F(31);
  if (!a.wh.write) throw new F(28);
  a.seekable && a.flags & 1024 && Zb(a, 0, 2);
  var g = "undefined" != typeof e;
  if (!g) e = a.position;
  else if (!a.seekable) throw new F(70);
  b = a.wh.write(a, b, c, d, e, f);
  g || (a.position += b);
  return b;
}
function ac(a, b) {
  a = "string" == typeof a ? a : Eb(a);
  for (b = b.split("/").reverse(); b.length; ) {
    var c = b.pop();
    if (c) {
      var d = Va(a + "/" + c);
      try {
        K(d);
      } catch (e) {
        if (20 != e.Dh) throw e;
      }
      a = d;
    }
  }
  return d;
}
function bc(a, b, c, d) {
  a = Va(("string" == typeof a ? a : Eb(a)) + "/" + b);
  return Rb(a, nb(c, d));
}
function cc(a, b, c, d, e, f) {
  var g = b;
  a && ((a = "string" == typeof a ? a : Eb(a)), (g = b ? Va(a + "/" + b) : a));
  a = nb(d, e);
  g = Rb(g, a);
  if (c) {
    if ("string" == typeof c) {
      b = Array(c.length);
      d = 0;
      for (e = c.length; d < e; ++d) b[d] = c.charCodeAt(d);
      c = b;
    }
    Wb(g, a | 146);
    b = Xb(g, 577);
    $b(b, c, 0, c.length, 0, f);
    Yb(b);
    Wb(g, a);
  }
}
function dc(a, b, c, d) {
  a = Va(("string" == typeof a ? a : Eb(a)) + "/" + b);
  b = nb(!!c, !!d);
  dc.zj ?? (dc.zj = 64);
  var e = (dc.zj++ << 8) | 0;
  fb(e, {
    open(f) {
      f.seekable = !1;
    },
    close() {
      d?.buffer?.length && d(10);
    },
    read(f, g, k, p) {
      for (var n = 0, r = 0; r < p; r++) {
        try {
          var v = c();
        } catch (x) {
          throw new F(29);
        }
        if (void 0 === v && 0 === n) throw new F(6);
        if (null === v || void 0 === v) break;
        n++;
        g[k + r] = v;
      }
      n && (f.node.atime = Date.now());
      return n;
    },
    write(f, g, k, p) {
      for (var n = 0; n < p; n++)
        try {
          d(g[k + n]);
        } catch (r) {
          throw new F(29);
        }
      p && (f.node.mtime = f.node.ctime = Date.now());
      return n;
    },
  });
  return Sb(a, b, e);
}
function ec(a) {
  if (!(a.$j || a.ak || a.link || a.uh))
    if (globalThis.XMLHttpRequest)
      A(
        "Lazy loading should have been performed (contents set) in createLazyFile, but it was not. Lazy loading only works in web workers. Use --embed-file or --preload-file in emcc on the main thread.",
      );
    else
      try {
        a.uh = ka(a.url);
      } catch (b) {
        throw new F(29);
      }
}
function fc(a, b, c, d, e) {
  class f {
    Zh = !1;
    Bh = [];
    Fh = void 0;
    zi = 0;
    pi = 0;
    get(n) {
      if (!(n > this.length - 1 || 0 > n)) {
        var r = n % this.chunkSize;
        return this.Fh((n / this.chunkSize) | 0)[r];
      }
    }
    Bi(n) {
      this.Fh = n;
    }
    Ai() {
      var n = new XMLHttpRequest();
      n.open("HEAD", c, !1);
      n.send(null);
      (200 <= n.status && 300 > n.status) ||
        304 === n.status ||
        A("Couldn't load " + c + ". Status: " + n.status);
      var r = Number(n.getResponseHeader("Content-length")),
        v,
        x = (v = n.getResponseHeader("Accept-Ranges")) && "bytes" === v;
      n = (v = n.getResponseHeader("Content-Encoding")) && "gzip" === v;
      var D = 1048576;
      x || (D = r);
      var G = this;
      G.Bi((N) => {
        var H = N * D,
          L = (N + 1) * D - 1;
        L = Math.min(L, r - 1);
        if ("undefined" == typeof G.Bh[N]) {
          var X = G.Bh;
          H > L &&
            A("invalid range (" + H + ", " + L + ") or no bytes requested!");
          L > r - 1 && A("only " + r + " bytes available! programmer error!");
          var R = new XMLHttpRequest();
          R.open("GET", c, !1);
          r !== D && R.setRequestHeader("Range", "bytes=" + H + "-" + L);
          R.responseType = "arraybuffer";
          R.overrideMimeType &&
            R.overrideMimeType("text/plain; charset=x-user-defined");
          R.send(null);
          (200 <= R.status && 300 > R.status) ||
            304 === R.status ||
            A("Couldn't load " + c + ". Status: " + R.status);
          H =
            void 0 !== R.response
              ? new Uint8Array(R.response || [])
              : cb(R.responseText || "");
          X[N] = H;
        }
        "undefined" == typeof G.Bh[N] && A("doXHR failed!");
        return G.Bh[N];
      });
      if (n || !r)
        ((D = r = 1),
          (D = r = this.Fh(0).length),
          ma(
            "LazyFiles on gzip forces download of the whole file when length is accessed",
          ));
      this.zi = r;
      this.pi = D;
      this.Zh = !0;
    }
    get length() {
      this.Zh || this.Ai();
      return this.zi;
    }
    get chunkSize() {
      this.Zh || this.Ai();
      return this.pi;
    }
  }
  if (globalThis.XMLHttpRequest) {
    ba ||
      A(
        "Cannot do synchronous binary XHRs outside webworkers in modern browsers. Use --embed-file or --preload-file in emcc",
      );
    var g = new f();
    var k = void 0;
  } else ((k = c), (g = void 0));
  var p = bc(a, b, d, e);
  g ? (p.uh = g) : k && ((p.uh = null), (p.url = k));
  Object.defineProperties(p, {
    Ch: {
      get: function () {
        return this.uh.length;
      },
    },
  });
  a = {};
  for (const [n, r] of Object.entries(p.wh))
    a[n] = (...v) => {
      ec(p);
      return r(...v);
    };
  a.read = (n, r, v, x, D) => {
    ec(p);
    n = n.node.uh;
    if (D >= n.length) r = 0;
    else {
      x = Math.min(n.length - D, x);
      if (n.slice) for (var G = 0; G < x; G++) r[v + G] = n[D + G];
      else for (G = 0; G < x; G++) r[v + G] = n.get(D + G);
      r = x;
    }
    return r;
  };
  a.ej = () => {
    ec(p);
    A();
    throw new F(48);
  };
  p.wh = a;
  return p;
}
var M = {};
function gc(a, b, c) {
  if ("/" === b.charAt(0)) return b;
  a = -100 === a ? "/" : Lb(a).path;
  if (0 == b.length) {
    if (!c) throw new F(44);
    return a;
  }
  return a + "/" + b;
}
function hc(a, b) {
  w[a >> 2] = b.dev;
  w[(a + 4) >> 2] = b.mode;
  w[(a + 8) >> 2] = b.nlink;
  w[(a + 12) >> 2] = b.uid;
  w[(a + 16) >> 2] = b.gid;
  w[(a + 20) >> 2] = b.rdev;
  ra[(a + 24) >> 3] = BigInt(b.size);
  u[(a + 32) >> 2] = 4096;
  u[(a + 36) >> 2] = b.blocks;
  var c = b.atime.getTime(),
    d = b.mtime.getTime(),
    e = b.ctime.getTime();
  ra[(a + 40) >> 3] = BigInt(Math.floor(c / 1e3));
  w[(a + 48) >> 2] = (c % 1e3) * 1e6;
  ra[(a + 56) >> 3] = BigInt(Math.floor(d / 1e3));
  w[(a + 64) >> 2] = (d % 1e3) * 1e6;
  ra[(a + 72) >> 3] = BigInt(Math.floor(e / 1e3));
  w[(a + 80) >> 2] = (e % 1e3) * 1e6;
  ra[(a + 88) >> 3] = BigInt(b.ino);
  return 0;
}
var Sa = void 0,
  ic = (a) => {
    for (var b = ""; ; ) {
      var c = q[a++];
      if (!c) return b;
      b += String.fromCharCode(c);
    }
  },
  jc = {},
  kc = {},
  lc = {},
  mc = class extends Error {
    constructor(a) {
      super(a);
      this.name = "BindingError";
    }
  };
function nc(a, b, c = {}) {
  var d = b.name;
  if (!a)
    throw new mc(`type "${d}" must have a positive integer typeid pointer`);
  if (kc.hasOwnProperty(a)) {
    if (c.Tj) return;
    throw new mc(`Cannot register type '${d}' twice`);
  }
  kc[a] = b;
  delete lc[a];
  jc.hasOwnProperty(a) && ((b = jc[a]), delete jc[a], b.forEach((e) => e()));
}
function oc(a, b, c = {}) {
  return nc(a, b, c);
}
var pc = (a, b, c) => {
    switch (b) {
      case 1:
        return c ? (d) => m[d] : (d) => q[d];
      case 2:
        return c ? (d) => t[d >> 1] : (d) => qa[d >> 1];
      case 4:
        return c ? (d) => u[d >> 2] : (d) => w[d >> 2];
      case 8:
        return c ? (d) => ra[d >> 3] : (d) => sa[d >> 3];
      default:
        throw new TypeError(`invalid integer width (${b}): ${a}`);
    }
  },
  qc = [],
  rc = [0, 1, , 1, null, 1, !0, 1, !1, 1],
  sc = (a) => {
    switch (a) {
      case void 0:
        return 2;
      case null:
        return 4;
      case !0:
        return 6;
      case !1:
        return 8;
      default:
        const b = qc.pop() || rc.length;
        rc[b] = a;
        rc[b + 1] = 1;
        return b;
    }
  };
function tc(a) {
  return this.Jh(w[a >> 2]);
}
var uc = {
    name: "emscripten::val",
    Jh: (a) => {
      if (!a) throw new mc(`Cannot use deleted val. handle = ${a}`);
      var b = rc[a];
      9 < a && 0 === --rc[a + 1] && ((rc[a] = void 0), qc.push(a));
      return b;
    },
    hi: (a, b) => sc(b),
    fi: tc,
    ki: null,
  },
  vc = (a, b) => {
    switch (b) {
      case 4:
        return function (c) {
          return this.Jh(y[c >> 2]);
        };
      case 8:
        return function (c) {
          return this.Jh(z[c >> 3]);
        };
      default:
        throw new TypeError(`invalid float width (${b}): ${a}`);
    }
  },
  wc = globalThis.TextDecoder ? new TextDecoder("utf-16le") : void 0,
  xc = (a, b, c) => {
    a >>= 1;
    b = La(qa, a, b / 2, c);
    if (16 < b - a && wc) return wc.decode(qa.subarray(a, b));
    for (c = ""; a < b; ++a) c += String.fromCharCode(qa[a]);
    return c;
  },
  yc = (a, b, c) => {
    c ??= 2147483647;
    if (2 > c) return 0;
    c -= 2;
    var d = b;
    c = c < 2 * a.length ? c / 2 : a.length;
    for (var e = 0; e < c; ++e) ((t[b >> 1] = a.charCodeAt(e)), (b += 2));
    t[b >> 1] = 0;
    return b - d;
  },
  zc = (a) => 2 * a.length,
  Ac = (a, b, c) => {
    var d = "";
    a >>= 2;
    for (var e = 0; !(e >= b / 4); e++) {
      var f = w[a + e];
      if (!f && !c) break;
      d += String.fromCodePoint(f);
    }
    return d;
  },
  Bc = (a, b, c) => {
    c ??= 2147483647;
    if (4 > c) return 0;
    var d = b;
    c = d + c - 4;
    for (var e = 0; e < a.length; ++e) {
      var f = a.codePointAt(e);
      65535 < f && e++;
      u[b >> 2] = f;
      b += 4;
      if (b + 4 > c) break;
    }
    u[b >> 2] = 0;
    return b - d;
  },
  Cc = (a) => {
    for (var b = 0, c = 0; c < a.length; ++c)
      (65535 < a.codePointAt(c) && c++, (b += 4));
    return b;
  },
  Dc = 0,
  Ec = {},
  Fc = (a) => {
    a instanceof za || "unwind" == a || fa(1, a);
  },
  Gc = (a) => {
    pa = a;
    Ia || 0 < Dc || (h.onExit?.(a), (oa = !0));
    fa(a, new za(a));
  },
  Hc = () => {
    if (!(Ia || 0 < Dc))
      try {
        var a = pa;
        pa = a;
        Gc(a);
      } catch (b) {
        Fc(b);
      }
  },
  Ic = (a) => {
    if (!oa)
      try {
        (a(), Hc());
      } catch (b) {
        Fc(b);
      }
  },
  Jc = [],
  Kc = (a, b) => {
    Jc.length = 0;
    for (var c; (c = q[a++]); ) {
      var d = 105 != c;
      d &= 112 != c;
      b += d && b % 8 ? 4 : 0;
      Jc.push(
        112 == c
          ? w[b >> 2]
          : 106 == c
            ? ra[b >> 3]
            : 105 == c
              ? u[b >> 2]
              : z[b >> 3],
      );
      b += d ? 8 : 4;
    }
    return Jc;
  },
  Mc = (a, b, c) => {
    b = Kc(b, c);
    return Lc[a](...b);
  };
function Nc(a) {
  var b = O.Hh[a];
  b.target.removeEventListener(b.Eh, b.xj, b.Kh);
  O.Hh.splice(a, 1);
}
function Oc(a, b, c) {
  function d(f, g) {
    if (f.length != g.length) return !1;
    for (var k in f) if (f[k] != g[k]) return !1;
    return !0;
  }
  for (var e of O.ai) if (e.kj == a && d(e.tj, c)) return;
  O.ai.push({ kj: a, Cj: b, tj: c });
  O.ai.sort((f, g) => f.Cj < g.Cj);
}
function Pc(a) {
  O.ai = O.ai.filter((b) => b.kj != a);
}
function Qc() {
  return navigator.userActivation
    ? navigator.userActivation.isActive
    : O.aj && O.Jj.sj;
}
function Rc() {
  if (Qc()) {
    var a = O.ai;
    O.ai = [];
    for (var b of a) b.kj(...b.tj);
  }
}
function Sc(a) {
  if (!a.target) return -4;
  if (a.Gh)
    ((a.xj = function (c) {
      ++O.aj;
      O.Jj = a;
      Rc();
      a.Oh(c);
      Rc();
      --O.aj;
    }),
      a.target.addEventListener(a.Eh, a.xj, a.Kh),
      O.Hh.push(a));
  else
    for (var b = 0; b < O.Hh.length; ++b)
      O.Hh[b].target == a.target && O.Hh[b].Eh == a.Eh && Nc(b--);
  return 0;
}
function Tc(a) {
  return a
    ? a == window
      ? "#window"
      : a == screen
        ? "#screen"
        : a?.nodeName || ""
    : "";
}
var O = {
    nk: 0,
    Zi: 0,
    bj: 0,
    Ik: 0,
    qj: 0,
    mj: 0,
    Wi: 0,
    wk: 0,
    gj: 0,
    Ei: 0,
    Yi: 0,
    hj: 0,
    pj: 0,
    Rk: 0,
    Mk() {
      for (; O.Hh.length; ) Nc(O.Hh.length - 1);
      O.ai = [];
    },
    aj: 0,
    ai: [],
    Hh: [],
    fk: (a, b) => {
      for (var c = 0; c < O.Hh.length; ++c)
        O.Hh[c].target != a || (b && b != O.Hh[c].Eh) || Nc(c--);
    },
    Nk(a) {
      let b = !1;
      for (let c = 0; c < O.Hh.length; ++c) {
        const d = O.Hh[c];
        d.target === a.target &&
          d.Ih === a.Ih &&
          d.Gh === a.Gh &&
          d.Lh === a.Lh &&
          (Nc(c--), (b = !0));
      }
      return b ? 0 : -5;
    },
    fullscreenEnabled() {
      return document.fullscreenEnabled || document.webkitFullscreenEnabled;
    },
  },
  Uc = [0, globalThis.document ?? 0, globalThis.window ?? 0],
  P = (a) => {
    a = 2 < a ? (a ? B(q, a) : "") : a;
    return Uc[a] || globalThis.document?.querySelector(a);
  },
  Wc = (a) => {
    var b = bb(a) + 1,
      c = Vc(b);
    E(a, q, c, b);
    return c;
  },
  Zc = (a) => {
    var b = Xc(),
      c = Vc(8),
      d = c + 4;
    a = Wc(a.id);
    if ((a = P(a))) ((u[c >> 2] = a.width), (u[d >> 2] = a.height));
    c = [u[c >> 2], u[d >> 2]];
    Yc(b);
    return c;
  },
  $c = (a, b, c) => {
    a = P(a);
    if (!a) return -4;
    a.width = b;
    a.height = c;
    return 0;
  },
  ad = (a, b, c) => {
    if (a.uk) {
      var d = Xc();
      a = Wc(a.id);
      $c(a, b, c);
      Yc(d);
    } else ((a.width = b), (a.height = c));
  },
  bd = {},
  dd = (a) => {
    function b() {
      cd() ||
        (document.removeEventListener("fullscreenchange", b),
        document.removeEventListener("webkitfullscreenchange", b),
        ad(a, d, e),
        (a.style.width = f),
        (a.style.height = g),
        (a.style.backgroundColor = k),
        p || (document.body.style.backgroundColor = "white"),
        (document.body.style.backgroundColor = p),
        (a.style.paddingLeft = n),
        (a.style.paddingRight = r),
        (a.style.paddingTop = v),
        (a.style.paddingBottom = x),
        (a.style.marginLeft = D),
        (a.style.marginRight = G),
        (a.style.marginTop = N),
        (a.style.marginBottom = H),
        (document.body.style.margin = L),
        (document.documentElement.style.overflow = X),
        (document.body.scroll = R),
        (a.style.bi = ig),
        a.ri && a.ri.$h.viewport(0, 0, d, e),
        bd.Ci && C(bd.Ci)(37, 0, bd.uj));
    }
    var c = Zc(a),
      d = c[0],
      e = c[1],
      f = a.style.width,
      g = a.style.height,
      k = a.style.backgroundColor,
      p = document.body.style.backgroundColor,
      n = a.style.paddingLeft,
      r = a.style.paddingRight,
      v = a.style.paddingTop,
      x = a.style.paddingBottom,
      D = a.style.marginLeft,
      G = a.style.marginRight,
      N = a.style.marginTop,
      H = a.style.marginBottom,
      L = document.body.style.margin,
      X = document.documentElement.style.overflow,
      R = document.body.scroll,
      ig = a.style.bi;
    document.addEventListener("fullscreenchange", b);
    document.addEventListener("webkitfullscreenchange", b);
  },
  ed = (a, b, c) => {
    a.style.paddingLeft = a.style.paddingRight = c + "px";
    a.style.paddingTop = a.style.paddingBottom = b + "px";
  },
  fd = (a) =>
    0 > Uc.indexOf(a) ? a.getBoundingClientRect() : { left: 0, top: 0 },
  gd = (a, b) => {
    if (0 != b.jj || 0 != b.Oi) {
      dd(a);
      var c = b.gk ? innerWidth : screen.width,
        d = b.gk ? innerHeight : screen.height,
        e = fd(a),
        f = e.width;
      e = e.height;
      var g = Zc(a),
        k = g[0];
      g = g[1];
      3 == b.jj
        ? (ed(a, (d - e) / 2, (c - f) / 2), (c = f), (d = e))
        : 2 == b.jj &&
          (c * g < k * d
            ? ((f = (g * c) / k), ed(a, (d - f) / 2, 0), (d = f))
            : ((f = (k * d) / g), ed(a, 0, (c - f) / 2), (c = f)));
      var p;
      (p = a.style).backgroundColor || (p.backgroundColor = "black");
      let n;
      (n = document.body.style).backgroundColor ||
        (n.backgroundColor = "black");
      a.style.width = c + "px";
      a.style.height = d + "px";
      1 == b.Rj &&
        ((a.style.bi = "optimizeSpeed"),
        (a.style.bi = "-moz-crisp-edges"),
        (a.style.bi = "-o-crisp-edges"),
        (a.style.bi = "-webkit-optimize-contrast"),
        (a.style.bi = "optimize-contrast"),
        (a.style.bi = "crisp-edges"),
        (a.style.bi = "pixelated"));
      p = 2 == b.Oi ? devicePixelRatio : 1;
      0 != b.Oi &&
        ((c = (c * p) | 0),
        (d = (d * p) | 0),
        ad(a, c, d),
        a.ri && a.ri.$h.viewport(0, 0, c, d));
    }
    if (a.requestFullscreen) a.requestFullscreen();
    else if (a.webkitRequestFullscreen)
      a.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
    else return O.fullscreenEnabled() ? -3 : -1;
    bd = b;
    b.Ci && C(b.Ci)(37, 0, b.uj);
    return 0;
  },
  hd = (a) => {
    if (a.requestPointerLock) a.requestPointerLock();
    else return document.body.requestPointerLock ? -3 : -1;
    return 0;
  };
function cd() {
  return (
    document.fullscreenElement ||
    document.mozFullScreenElement ||
    document.webkitFullscreenElement ||
    document.webkitCurrentFullScreenElement ||
    document.msFullscreenElement
  );
}
var jd = (a) => {
    var b = cd(),
      c = !!b;
    m[a] = c;
    m[a + 1] = O.fullscreenEnabled();
    var d = c ? b : O.ek,
      e = d?.id || "";
    E(Tc(d), q, a + 2, 128);
    E(e, q, a + 130, 128);
    u[(a + 260) >> 2] = d ? d.clientWidth : 0;
    u[(a + 264) >> 2] = d ? d.clientHeight : 0;
    u[(a + 268) >> 2] = screen.width;
    u[(a + 272) >> 2] = screen.height;
    c && (O.ek = b);
  },
  kd = (a, b) => {
    z[a >> 3] = b.timestamp;
    for (var c = 0; c < b.axes.length; ++c)
      z[(a + 8 * c + 16) >> 3] = b.axes[c];
    for (c = 0; c < b.buttons.length; ++c)
      z[(a + 8 * c + 528) >> 3] =
        "object" == typeof b.buttons[c] ? b.buttons[c].value : b.buttons[c];
    for (c = 0; c < b.buttons.length; ++c)
      m[a + c + 1040] =
        "object" == typeof b.buttons[c]
          ? b.buttons[c].pressed
          : 1 == b.buttons[c];
    m[a + 1104] = b.connected;
    u[(a + 1108) >> 2] = b.index;
    u[(a + 8) >> 2] = b.axes.length;
    u[(a + 12) >> 2] = b.buttons.length;
    E(b.id, q, a + 1112, 64);
    E(b.mapping, q, a + 1176, 64);
  },
  ud = (a, b) => {
    ld = a;
    md = b;
    if (!nd) return 1;
    od ||= !0;
    if (0 == a)
      pd = function () {
        setTimeout(qd, Math.max(0, rd + b - performance.now()) | 0);
      };
    else if (1 == a)
      pd = function () {
        sd(qd);
      };
    else if (2 == a) {
      if (!td)
        if (globalThis.setImmediate) td = setImmediate;
        else {
          var c = [];
          addEventListener(
            "message",
            (d) => {
              if ("setimmediate" === d.data || "setimmediate" === d.data.target)
                (d.stopPropagation(), c.shift()());
            },
            !0,
          );
          td = (d) => {
            c.push(d);
            if (ba) {
              let e;
              (e = h).setImmediates ?? (e.setImmediates = []);
              h.setImmediates.push(d);
              postMessage({ target: "setimmediate" });
            } else postMessage("setimmediate", "*");
          };
        }
      pd = function () {
        td(qd);
      };
    }
    return 0;
  },
  Dd = (a, b, c, d, e) => {
    function f() {
      return g < vd ? (Hc(), !1) : !0;
    }
    nd = a;
    wd = d;
    var g = vd;
    od = !1;
    qd = function () {
      if (!oa)
        if (0 < xd.length) {
          var k = xd.shift();
          k.Dk(k.mk);
          if (yd) {
            var p = yd,
              n = 0 == p % 1 ? p - 1 : Math.floor(p);
            yd = k.vk ? n : (8 * p + (n + 0.5)) / 9;
          }
          h.setStatus &&
            ((k = h.statusMessage || "Please wait..."),
            (p = yd ?? 0),
            (n = zd.Ak ?? 0),
            p
              ? p < n
                ? h.setStatus("{message} ({expected - remaining}/{expected})")
                : h.setStatus(k)
              : h.setStatus(""));
          f() && setTimeout(qd, 0);
        } else if (f())
          if (((Ad = (Ad + 1) | 0), 1 == ld && 1 < md && 0 != Ad % md)) pd();
          else {
            0 == ld && (rd = performance.now());
            a: if (!oa) {
              for (k of Bd) if (!1 === k()) break a;
              Ic(a);
              for (p of Cd) p();
            }
            f() && pd();
          }
    };
    e || (0 < b ? ud(0, 1e3 / b) : ud(1, 1), pd());
    if (c) throw "unwind";
  },
  od = !1,
  pd = null,
  vd = 0,
  nd = null,
  wd = 0,
  ld = 0,
  md = 0,
  Ad = 0,
  xd = [],
  Bd = [],
  Cd = [],
  Ed = 0;
function sd(a) {
  if (globalThis.requestAnimationFrame) requestAnimationFrame(a);
  else {
    var b = Date.now();
    if (0 === Ed) Ed = b + 1e3 / 60;
    else for (; b + 2 >= Ed; ) Ed += 1e3 / 60;
    setTimeout(a, Math.max(Ed - b, 0));
  }
}
var zd = {},
  rd,
  qd,
  td,
  yd,
  Fd = (a) => {
    setTimeout(() => {
      Ic(a);
    }, 1e4);
  },
  Gd = !1,
  Hd = [];
function rb() {
  function a() {
    Gd = document.pointerLockElement === h.canvas;
  }
  if (!Id) {
    Id = !0;
    pb.push({
      canHandle: function (c) {
        return !h.noImageDecoding && /\.(jpg|jpeg|png|bmp|webp)$/i.test(c);
      },
      handle: async function (c, d) {
        var e = new Blob([c], { type: Jd(d) });
        e.size !== c.length &&
          (e = new Blob([new Uint8Array(c).buffer], { type: Jd(d) }));
        var f = URL.createObjectURL(e);
        return new Promise((g, k) => {
          var p = new Image();
          p.onload = () => {
            var n = document.createElement("canvas");
            n.width = p.width;
            n.height = p.height;
            n.getContext("2d").drawImage(p, 0, 0);
            URL.revokeObjectURL(f);
            g(c);
          };
          p.onerror = () => {
            l(`Image ${f} could not be decoded`);
            k();
          };
          p.src = f;
        });
      },
    });
    pb.push({
      canHandle: function (c) {
        return (
          !h.noAudioDecoding &&
          c.slice(-4) in { ".ogg": 1, ".wav": 1, ".mp3": 1 }
        );
      },
      handle: async function (c, d) {
        return new Promise((e) => {
          function f() {
            g || ((g = !0), e(c));
          }
          var g = !1,
            k = new Blob([c], { type: Jd(d) });
          k = URL.createObjectURL(k);
          var p = new Audio();
          p.addEventListener("canplaythrough", () => f(p), !1);
          p.onerror = function () {
            if (!g) {
              l(
                `warning: browser could not fully decode audio ${d}, trying slower base64 approach`,
              );
              for (
                var n = "data:audio/x-" + d.slice(-3) + ";base64,",
                  r = "",
                  v = 0,
                  x = 0,
                  D = 0;
                D < c.length;
                D++
              )
                for (v = (v << 8) | c[D], x += 8; 6 <= x; ) {
                  var G = (v >> (x - 6)) & 63;
                  x -= 6;
                  r +=
                    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"[
                      G
                    ];
                }
              2 == x
                ? ((r +=
                    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"[
                      (v & 3) << 4
                    ]),
                  (r += "=="))
                : 4 == x &&
                  ((r +=
                    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"[
                      (v & 15) << 2
                    ]),
                  (r += "="));
              p.src = n + r;
              f(p);
            }
          };
          p.src = k;
          Fd(() => {
            f(p);
          });
        });
      },
    });
    var b = h.canvas;
    b &&
      (document.addEventListener("pointerlockchange", a, !1),
      h.elementPointerLock &&
        b.addEventListener(
          "click",
          (c) => {
            !Gd &&
              h.canvas.requestPointerLock &&
              (h.canvas.requestPointerLock(), c.preventDefault());
          },
          !1,
        ));
  }
}
function Kd(a) {
  a = a.getContext("2d");
  if (!a) return null;
  h.ctx = a;
  Hd.forEach((b) => b());
  rb();
  return a;
}
function Jd(a) {
  return {
    jpg: "image/jpeg",
    jpeg: "image/jpeg",
    png: "image/png",
    bmp: "image/bmp",
    ogg: "audio/ogg",
    wav: "audio/wav",
    mp3: "audio/mpeg",
  }[a.slice(a.lastIndexOf(".") + 1)];
}
var qb = {},
  Id,
  Q,
  Ld = (a) => {
    var b =
      "EXT_color_buffer_float EXT_conservative_depth EXT_disjoint_timer_query_webgl2 EXT_texture_norm16 NV_shader_noperspective_interpolation WEBGL_clip_cull_distance EXT_clip_control EXT_color_buffer_half_float EXT_depth_clamp EXT_float_blend EXT_polygon_offset_clamp EXT_texture_compression_bptc EXT_texture_compression_rgtc EXT_texture_filter_anisotropic KHR_parallel_shader_compile OES_texture_float_linear WEBGL_blend_func_extended WEBGL_compressed_texture_astc WEBGL_compressed_texture_etc WEBGL_compressed_texture_etc1 WEBGL_compressed_texture_s3tc WEBGL_compressed_texture_s3tc_srgb WEBGL_debug_renderer_info WEBGL_debug_shaders WEBGL_lose_context WEBGL_multi_draw WEBGL_polygon_mode".split(
        " ",
      );
    return (a.getSupportedExtensions() || []).filter((c) => b.includes(c));
  },
  Md = 1,
  Nd = [],
  Od = {},
  S = [],
  Pd = [],
  Qd = [],
  Rd = [],
  T = [],
  Sd = [],
  Td = [],
  U = [],
  Ud = [],
  Vd = [],
  Wd = [],
  Xd = [1, 1, 2, 2, 4, 4, 4, 2, 3, 4, 8],
  Yd = {},
  Zd = {},
  $d = 4,
  ae = 0,
  be = (a) => {
    for (var b = Md++, c = a.length; c < b; c++) a[c] = null;
    for (; a[b]; ) b = Md++;
    return b;
  },
  ce = (a, b, c, d) => {
    for (var e = 0; e < a; e++) {
      var f = Q[c](),
        g = f && be(d);
      f ? ((f.name = g), (d[g] = f)) : (V ||= 1282);
      u[(b + 4 * e) >> 2] = g;
    }
  },
  de = (a) => {
    a = 32 - Math.clz32(0 === a ? 0 : a - 1);
    var b = W.ni[a];
    if (b) return b;
    b = Q.getParameter(34965);
    W.ni[a] = Q.createBuffer();
    Q.bindBuffer(34963, W.ni[a]);
    Q.bufferData(34963, 1 << a, 35048);
    Q.bindBuffer(34963, b);
    return W.ni[a];
  },
  fe = (a) => {
    ee = !1;
    for (var b = 0; b < W.cj; ++b) {
      var c = W.Vh[b];
      if (c.ii && c.enabled) {
        ee = !0;
        var d = c.size;
        var e = c.type,
          f = c.stride;
        d = 0 < f ? a * f : d * Xd[e - 5120] * a;
        e = 32 - Math.clz32(0 === d ? 0 : d - 1);
        f = W.oi[e];
        var g = W.ci[e];
        W.ci[e] = (W.ci[e] + 1) & 63;
        var k = f[g];
        k
          ? (e = k)
          : ((k = Q.getParameter(34964)),
            (f[g] = Q.createBuffer()),
            Q.bindBuffer(34962, f[g]),
            Q.bufferData(34962, 1 << e, 35048),
            Q.bindBuffer(34962, k),
            (e = f[g]));
        Q.bindBuffer(34962, e);
        Q.bufferSubData(34962, 0, q.subarray(c.Yh, c.Yh + d));
        c.oj.call(Q, b, c.size, c.type, c.fj, c.stride, 0);
      }
    }
  },
  he = (a, b) => {
    a.Bi ||
      ((a.Bi = a.getContext),
      (a.getContext = function (d, e) {
        e = a.Bi(d, e);
        return ("webgl" == d) == e instanceof WebGLRenderingContext ? e : null;
      }));
    var c = a.getContext("webgl2", b);
    return c ? ge(c, b) : 0;
  },
  ge = (a, b) => {
    var c = be(Td),
      d = { handle: c, attributes: b, version: b.bk, $h: a };
    a.canvas && (a.canvas.ri = d);
    Td[c] = d;
    if ("undefined" == typeof b.wj || b.wj)
      if (((a = d) || (a = W), !a.Vj)) {
        a.Vj = !0;
        b = a.$h;
        b.Jk = b.getExtension("WEBGL_multi_draw");
        b.Qj = b.getExtension("EXT_polygon_offset_clamp");
        b.Pj = b.getExtension("EXT_clip_control");
        b.ik = b.getExtension("WEBGL_polygon_mode");
        b.xk = b.getExtension("WEBGL_draw_instanced_base_vertex_base_instance");
        b.Gk = b.getExtension(
          "WEBGL_multi_draw_instanced_base_vertex_base_instance",
        );
        2 <= a.version &&
          (b.Mh = b.getExtension("EXT_disjoint_timer_query_webgl2"));
        if (2 > a.version || !b.Mh)
          b.Mh = b.getExtension("EXT_disjoint_timer_query");
        for (var e of Ld(b))
          e.includes("lose_context") ||
            e.includes("debug") ||
            b.getExtension(e);
      }
    d.cj = d.$h.getParameter(34921);
    d.Vh = [];
    for (e = 0; e < d.cj; e++)
      d.Vh[e] = {
        enabled: !1,
        ii: !1,
        size: 0,
        type: 0,
        fj: 0,
        stride: 0,
        Yh: 0,
        oj: null,
      };
    d.ci = [];
    d.Ni = [];
    d.ci.length = d.Ni.length = 22;
    d.oi = [];
    d.xi = [];
    d.oi.length = d.xi.length = 22;
    d.ni = [];
    d.ni.length = 22;
    for (e = 0; 21 >= e; ++e) {
      d.ni[e] = null;
      d.ci[e] = d.Ni[e] = 0;
      d.oi[e] = [];
      d.xi[e] = [];
      a = d.oi[e];
      b = d.xi[e];
      a.length = b.length = 64;
      for (var f = 0; 64 > f; ++f) a[f] = b[f] = null;
    }
    return c;
  },
  V,
  W,
  ee,
  ie = (a) => Q.activeTexture(a),
  je = (a, b) => {
    Q.attachShader(S[a], T[b]);
  },
  ke = (a, b) => {
    if (b && !Nd[b]) {
      var c = Q.createBuffer();
      c.name = b;
      Nd[b] = c;
    }
    34962 == a ? (Q.ji = b) : 34963 == a && (Q.ti = b);
    35051 == a ? (Q.Qi = b) : 35052 == a && (Q.Rh = b);
    Q.bindBuffer(a, Nd[b]);
  },
  le = (a, b, c) => {
    Q.bindBufferBase(a, b, Nd[c]);
  },
  me = (a, b) => {
    Q.bindFramebuffer(a, Pd[b]);
  },
  ne = (a, b) => {
    Q.bindRenderbuffer(a, Qd[b]);
  },
  oe = (a, b) => {
    Q.bindTexture(a, Rd[b]);
  },
  pe = (a) => {
    Q.bindVertexArray(Sd[a]);
    a = Q.getParameter(34965);
    Q.ti = a ? a.name | 0 : 0;
  },
  qe = (a, b) => Q.blendFunc(a, b),
  re = (a, b, c, d) => {
    c && b ? Q.bufferData(a, q, d, c, b) : Q.bufferData(a, b, d);
  },
  se = (a, b, c, d) => {
    c && Q.bufferSubData(a, b, q, d, c);
  },
  te = (a) => Q.clear(a),
  ue = (a, b, c, d) => Q.clearColor(a, b, c, d),
  ve = (a) => {
    Q.compileShader(T[a]);
  },
  we = () => {
    var a = be(S),
      b = Q.createProgram();
    b.name = a;
    b.Ki = b.Ii = b.Ji = 0;
    b.nj = 1;
    S[a] = b;
    return a;
  },
  xe = (a) => {
    var b = be(T);
    T[b] = Q.createShader(a);
    return b;
  },
  ye = (a) => Q.cullFace(a),
  ze = (a, b) => {
    for (var c = 0; c < a; c++) {
      var d = u[(b + 4 * c) >> 2],
        e = Nd[d];
      e &&
        (Q.deleteBuffer(e),
        (e.name = 0),
        (Nd[d] = null),
        d == Q.ji && (Q.ji = 0),
        d == Q.ti && (Q.ti = 0),
        d == Q.Qi && (Q.Qi = 0),
        d == Q.Rh && (Q.Rh = 0));
    }
  },
  Ae = (a, b) => {
    for (var c = 0; c < a; ++c) {
      var d = u[(b + 4 * c) >> 2],
        e = Pd[d];
      e && (Q.deleteFramebuffer(e), (e.name = 0), (Pd[d] = null));
    }
  },
  Be = (a) => {
    if (a) {
      var b = S[a];
      b ? (Q.deleteProgram(b), (b.name = 0), (S[a] = null)) : (V ||= 1281);
    }
  },
  Ce = (a, b) => {
    for (var c = 0; c < a; c++) {
      var d = u[(b + 4 * c) >> 2],
        e = Qd[d];
      e && (Q.deleteRenderbuffer(e), (e.name = 0), (Qd[d] = null));
    }
  },
  De = (a) => {
    if (a) {
      var b = T[a];
      b ? (Q.deleteShader(b), (T[a] = null)) : (V ||= 1281);
    }
  },
  Ee = (a, b) => {
    for (var c = 0; c < a; c++) {
      var d = u[(b + 4 * c) >> 2],
        e = Rd[d];
      e && (Q.deleteTexture(e), (e.name = 0), (Rd[d] = null));
    }
  },
  Fe = (a, b) => {
    for (var c = 0; c < a; c++) {
      var d = u[(b + 4 * c) >> 2];
      Q.deleteVertexArray(Sd[d]);
      Sd[d] = null;
    }
  },
  Ge = (a) => Q.depthFunc(a),
  He = (a) => {
    Q.depthMask(!!a);
  },
  Ie = (a) => Q.disable(a),
  Je = (a, b, c) => {
    fe(b + c);
    Q.drawArrays(a, b, c);
    ee && Q.bindBuffer(34962, Nd[Q.ji]);
  },
  Ke = (a, b, c, d) => {
    Q.drawArraysInstanced(a, b, c, d);
  },
  Le = [],
  Me = (a, b) => {
    for (var c = Le[a], d = 0; d < a; d++) c[d] = u[(b + 4 * d) >> 2];
    Q.drawBuffers(c);
  },
  Ne = (a, b, c, d) => {
    var e = 0;
    if (!Q.ti) {
      var f = 1 * Xd[c - 5120] * b;
      var g = de(f);
      Q.bindBuffer(34963, g);
      Q.bufferSubData(34963, 0, q.subarray(d, d + f));
      if (0 < b)
        for (g = 0; g < W.cj; ++g)
          if (((f = W.Vh[g]), f.ii && f.enabled)) {
            switch (c) {
              case 5121:
                e = Uint8Array;
                break;
              case 5123:
                e = Uint16Array;
                break;
              case 5125:
                e = Uint32Array;
                break;
              default:
                V ||= 1282;
                return;
            }
            e = new e(q.buffer, d, b).reduce((k, p) => Math.max(k, p)) + 1;
            break;
          }
      d = 0;
    }
    fe(e);
    Q.drawElements(a, b, c, d);
    ee && Q.bindBuffer(34962, Nd[Q.ji]);
    Q.ti || Q.bindBuffer(34963, null);
  },
  Oe = (a, b, c, d, e) => {
    Q.drawElementsInstanced(a, b, c, d, e);
  },
  Pe = (a) => Q.enable(a),
  Qe = (a) => {
    W.Vh[a].enabled = !0;
    Q.enableVertexAttribArray(a);
  },
  Re = (a) => {
    switch (a) {
      case 34962:
        a = 34964;
        break;
      case 34963:
        a = 34965;
        break;
      case 35051:
        a = 35053;
        break;
      case 35052:
        a = 35055;
        break;
      case 35982:
        a = 35983;
        break;
      case 36662:
        a = 36662;
        break;
      case 36663:
        a = 36663;
        break;
      case 35345:
        a = 35368;
    }
    return (a = Q.getParameter(a)) ? a.name | 0 : 0;
  },
  Se = (a) => {
    switch (a) {
      case 34962:
      case 34963:
      case 36662:
      case 36663:
      case 35051:
      case 35052:
      case 35882:
      case 35982:
      case 35345:
        return !0;
      default:
        return !1;
    }
  },
  Te = (a, b, c, d) => {
    Q.framebufferRenderbuffer(a, b, c, Qd[d]);
  },
  Ue = (a, b, c, d, e) => {
    Q.framebufferTexture2D(a, b, c, Rd[d], e);
  },
  Ve = (a, b) => {
    ce(a, b, "createBuffer", Nd);
  },
  We = (a, b) => {
    ce(a, b, "createFramebuffer", Pd);
  },
  Xe = (a, b) => {
    ce(a, b, "createRenderbuffer", Qd);
  },
  Ye = (a, b) => {
    ce(a, b, "createTexture", Rd);
  },
  Ze = (a, b) => {
    ce(a, b, "createVertexArray", Sd);
  },
  $e = (a, b, c, d, e, f, g, k) => {
    b = S[b];
    if ((a = Q[a](b, c)))
      ((d = k && E(a.name, q, k, d)),
        e && (u[e >> 2] = d),
        f && (u[f >> 2] = a.size),
        g && (u[g >> 2] = a.type));
  },
  af = (a, b) => {
    w[a >> 2] = b;
    w[(a + 4) >> 2] = (b - w[a >> 2]) / 4294967296;
  },
  bf = () => {
    var a = Ld(Q);
    return (a = a.concat(a.map((b) => "GL_" + b)));
  },
  cf = (a, b, c) => {
    if (b) {
      var d = void 0;
      switch (a) {
        case 36346:
          d = 1;
          break;
        case 36344:
          0 != c && 1 != c && (V ||= 1280);
          return;
        case 34814:
        case 36345:
          d = 0;
          break;
        case 34466:
          var e = Q.getParameter(34467);
          d = e ? e.length : 0;
          break;
        case 33309:
          if (2 > W.version) {
            V ||= 1282;
            return;
          }
          d = bf().length;
          break;
        case 33307:
        case 33308:
          if (2 > W.version) {
            V ||= 1280;
            return;
          }
          d = 33307 == a ? 3 : 0;
      }
      if (void 0 === d)
        switch (((e = Q.getParameter(a)), typeof e)) {
          case "number":
            d = e;
            break;
          case "boolean":
            d = e ? 1 : 0;
            break;
          case "string":
            V ||= 1280;
            return;
          case "object":
            if (null === e)
              switch (a) {
                case 34964:
                case 35725:
                case 34965:
                case 36006:
                case 36007:
                case 32873:
                case 34229:
                case 36662:
                case 36663:
                case 35053:
                case 35055:
                case 36010:
                case 35097:
                case 35869:
                case 32874:
                case 36389:
                case 35983:
                case 35368:
                case 34068:
                  d = 0;
                  break;
                default:
                  V ||= 1280;
                  return;
              }
            else {
              if (
                e instanceof Float32Array ||
                e instanceof Uint32Array ||
                e instanceof Int32Array ||
                e instanceof Array
              ) {
                for (a = 0; a < e.length; ++a)
                  switch (c) {
                    case 0:
                      u[(b + 4 * a) >> 2] = e[a];
                      break;
                    case 2:
                      y[(b + 4 * a) >> 2] = e[a];
                      break;
                    case 4:
                      m[b + a] = e[a] ? 1 : 0;
                  }
                return;
              }
              try {
                d = e.name | 0;
              } catch (f) {
                V ||= 1280;
                l(
                  `GL_INVALID_ENUM in glGet${c}v: Unknown object returned from WebGL getParameter(${a})! (error: ${f})`,
                );
                return;
              }
            }
            break;
          default:
            V ||= 1280;
            l(
              `GL_INVALID_ENUM in glGet${c}v: Native code calling glGet${c}v(${a}) and it returns ${e} of type ${typeof e}!`,
            );
            return;
        }
      switch (c) {
        case 1:
          af(b, d);
          break;
        case 0:
          u[b >> 2] = d;
          break;
        case 2:
          y[b >> 2] = d;
          break;
        case 4:
          m[b] = d ? 1 : 0;
      }
    } else V ||= 1281;
  },
  df = (a, b, c, d) => {
    if (c) {
      b = Q.getIndexedParameter(a, b);
      switch (typeof b) {
        case "boolean":
          a = b ? 1 : 0;
          break;
        case "number":
          a = b;
          break;
        case "object":
          if (null === b)
            switch (a) {
              case 35983:
              case 35368:
                a = 0;
                break;
              default:
                V ||= 1280;
                return;
            }
          else if (b instanceof WebGLBuffer) a = b.name | 0;
          else {
            V ||= 1280;
            return;
          }
          break;
        default:
          V ||= 1280;
          return;
      }
      switch (d) {
        case 1:
          af(c, a);
          break;
        case 0:
          u[c >> 2] = a;
          break;
        case 2:
          y[c >> 2] = a;
          break;
        case 4:
          m[c] = a ? 1 : 0;
          break;
        default:
          A("internal emscriptenWebGLGetIndexed() error, bad type: " + d);
      }
    } else V ||= 1281;
  },
  ef = (a, b, c, d) => {
    a = Q.getProgramInfoLog(S[a]);
    null === a && (a = "(unknown error)");
    b = 0 < b && d ? E(a, q, d, b) : 0;
    c && (u[c >> 2] = b);
  },
  ff = (a, b, c) => {
    if (c)
      if (a >= Md) V ||= 1281;
      else if (((a = S[a]), 35716 == b))
        ((a = Q.getProgramInfoLog(a)),
          null === a && (a = "(unknown error)"),
          (u[c >> 2] = a.length + 1));
      else if (35719 == b) {
        if (!a.Ki) {
          var d = Q.getProgramParameter(a, 35718);
          for (b = 0; b < d; ++b)
            a.Ki = Math.max(a.Ki, Q.getActiveUniform(a, b).name.length + 1);
        }
        u[c >> 2] = a.Ki;
      } else if (35722 == b) {
        if (!a.Ii)
          for (d = Q.getProgramParameter(a, 35721), b = 0; b < d; ++b)
            a.Ii = Math.max(a.Ii, Q.getActiveAttrib(a, b).name.length + 1);
        u[c >> 2] = a.Ii;
      } else if (35381 == b) {
        if (!a.Ji)
          for (d = Q.getProgramParameter(a, 35382), b = 0; b < d; ++b)
            a.Ji = Math.max(a.Ji, Q.getActiveUniformBlockName(a, b).length + 1);
        u[c >> 2] = a.Ji;
      } else u[c >> 2] = Q.getProgramParameter(a, b);
    else V ||= 1281;
  },
  gf = (a, b, c) => {
    if (c) {
      a = U[a];
      b =
        2 > W.version
          ? Q.Mh.getQueryObjectEXT(a, b)
          : Q.getQueryParameter(a, b);
      var d;
      "boolean" == typeof b ? (d = b ? 1 : 0) : (d = b);
      af(c, d);
    } else V ||= 1281;
  },
  hf = (a, b, c) => {
    if (c) {
      a = Q.Mh.getQueryObjectEXT(U[a], b);
      var d;
      "boolean" == typeof a ? (d = a ? 1 : 0) : (d = a);
      u[c >> 2] = d;
    } else V ||= 1281;
  },
  jf = (a, b, c, d) => {
    a = Q.getShaderInfoLog(T[a]);
    null === a && (a = "(unknown error)");
    b = 0 < b && d ? E(a, q, d, b) : 0;
    c && (u[c >> 2] = b);
  },
  kf = (a, b, c) => {
    c
      ? 35716 == b
        ? ((a = Q.getShaderInfoLog(T[a])),
          null === a && (a = "(unknown error)"),
          (u[c >> 2] = a ? a.length + 1 : 0))
        : 35720 == b
          ? ((a = Q.getShaderSource(T[a])), (u[c >> 2] = a ? a.length + 1 : 0))
          : (u[c >> 2] = Q.getShaderParameter(T[a], b))
      : (V ||= 1281);
  },
  lf = (a) => {
    var b = bb(a) + 1,
      c = Y(b);
    c && E(a, q, c, b);
    return c;
  },
  mf = (a) => {
    var b = Yd[a];
    if (!b) {
      switch (a) {
        case 7939:
          b = lf(bf().join(" "));
          break;
        case 7936:
        case 7937:
        case 37445:
        case 37446:
          (b = Q.getParameter(a)) || (V ||= 1280);
          b = b ? lf(b) : 0;
          break;
        case 7938:
          b = lf(`OpenGL ES 3.0 (${Q.getParameter(7938)})`);
          break;
        case 35724:
          b = Q.getParameter(35724);
          var c = b.match(/^WebGL GLSL ES ([0-9]\.[0-9][0-9]?)(?:$| .*)/);
          null !== c &&
            (3 == c[1].length && (c[1] += "0"),
            (b = `OpenGL ES GLSL ES ${c[1]} (${b})`));
          b = lf(b);
          break;
        default:
          V ||= 1280;
      }
      Yd[a] = b;
    }
    return b;
  },
  nf = (a, b) => Q.getUniformBlockIndex(S[a], b ? B(q, b) : ""),
  of = (a) => "]" == a.slice(-1) && a.lastIndexOf("["),
  pf = (a) => {
    var b = a.yi,
      c = a.Ej,
      d;
    if (!b) {
      a.yi = b = {};
      a.Dj = {};
      var e = Q.getProgramParameter(a, 35718);
      for (d = 0; d < e; ++d) {
        var f = Q.getActiveUniform(a, d);
        var g = f.name;
        f = f.size;
        var k = of(g);
        k = 0 < k ? g.slice(0, k) : g;
        var p = a.nj;
        a.nj += f;
        c[k] = [f, p];
        for (g = 0; g < f; ++g) ((b[p] = g), (a.Dj[p++] = k));
      }
    }
  },
  qf = (a, b) => {
    b = b ? B(q, b) : "";
    if ((a = S[a])) {
      pf(a);
      var c = a.yi,
        d = 0,
        e = b,
        f = of(b);
      0 < f && ((d = parseInt(b.slice(f + 1)) >>> 0), (e = b.slice(0, f)));
      if (
        (e = a.Ej[e]) &&
        d < e[0] &&
        ((d += e[1]), (c[d] = c[d] || Q.getUniformLocation(a, b)))
      )
        return d;
    } else V ||= 1281;
    return -1;
  },
  Z = (a) => {
    var b = Q.Kj;
    if (b) {
      var c = b.yi[a];
      "number" == typeof c &&
        (b.yi[a] = c =
          Q.getUniformLocation(b, b.Dj[a] + (0 < c ? `[${c}]` : "")));
      return c;
    }
    V ||= 1282;
  },
  rf = (a, b, c, d) => {
    if (c)
      if (
        ((a = S[a]),
        pf(a),
        (a = Q.getUniform(a, Z(b))),
        "number" == typeof a || "boolean" == typeof a)
      )
        switch (d) {
          case 0:
            u[c >> 2] = a;
            break;
          case 2:
            y[c >> 2] = a;
        }
      else
        for (b = 0; b < a.length; b++)
          switch (d) {
            case 0:
              u[(c + 4 * b) >> 2] = a[b];
              break;
            case 2:
              y[(c + 4 * b) >> 2] = a[b];
          }
    else V ||= 1281;
  },
  sf = (a, b, c, d) => {
    if (c)
      if (
        (W.Vh[a].enabled &&
          l(
            "glGetVertexAttrib*v on client-side array: not supported, bad data returned",
          ),
        (a = Q.getVertexAttrib(a, b)),
        34975 == b)
      )
        u[c >> 2] = a && a.name;
      else if ("number" == typeof a || "boolean" == typeof a)
        switch (d) {
          case 0:
            u[c >> 2] = a;
            break;
          case 2:
            y[c >> 2] = a;
            break;
          case 5:
            u[c >> 2] = Math.fround(a);
        }
      else
        for (b = 0; b < a.length; b++)
          switch (d) {
            case 0:
              u[(c + 4 * b) >> 2] = a[b];
              break;
            case 2:
              y[(c + 4 * b) >> 2] = a[b];
              break;
            case 5:
              u[(c + 4 * b) >> 2] = Math.fround(a[b]);
          }
    else V ||= 1281;
  },
  tf = (a, b, c) => {
    sf(a, b, c, 0);
  },
  uf = (a) => ((a = Sd[a]) ? Q.isVertexArray(a) : 0),
  vf = (a) => {
    a = S[a];
    Q.linkProgram(a);
    a.yi = 0;
    a.Ej = {};
  },
  wf = (a, b, c, d) => {
    if (0 != (d & 33))
      return (
        l(
          "glMapBufferRange access does not support MAP_READ or MAP_UNSYNCHRONIZED",
        ),
        0
      );
    if (0 == (d & 2))
      return (l("glMapBufferRange access must include MAP_WRITE"), 0);
    if (0 == (d & 12))
      return (
        l(
          "glMapBufferRange access must include INVALIDATE_BUFFER or INVALIDATE_RANGE",
        ),
        0
      );
    if (!Se(a))
      return ((V ||= 1280), l("GL_INVALID_ENUM in glMapBufferRange"), 0);
    var e = Y(c);
    a = Re(a);
    if (!e) return 0;
    let f;
    a = Od[(f = a)] ?? (Od[f] = {});
    a.offset = b;
    a.length = c;
    a.ei = e;
    a.rj = d;
    return e;
  },
  xf = (a) => {
    a -= 5120;
    return 0 == a
      ? m
      : 1 == a
        ? q
        : 2 == a
          ? t
          : 4 == a
            ? u
            : 6 == a
              ? y
              : 5 == a || 28922 == a || 28520 == a || 30779 == a || 30782 == a
                ? w
                : qa;
  },
  yf = (a, b, c, d) => Q.renderbufferStorage(a, b, c, d),
  zf = (a, b, c, d) => {
    for (var e = "", f = 0; f < b; ++f)
      e += Ma(w[(c + 4 * f) >> 2], d ? w[(d + 4 * f) >> 2] : void 0);
    Q.shaderSource(T[a], e);
  },
  Af = (a, b, c, d, e) => {
    a = xf(a);
    b =
      d *
      (((ae || c) *
        ({
          5: 3,
          6: 4,
          8: 2,
          29502: 3,
          29504: 4,
          26917: 2,
          26918: 2,
          29846: 3,
          29847: 4,
        }[b - 6402] || 1) *
        a.BYTES_PER_ELEMENT +
        $d -
        1) &
        -$d);
    return a.subarray(
      e >>> (31 - Math.clz32(a.BYTES_PER_ELEMENT)),
      (e + b) >>> (31 - Math.clz32(a.BYTES_PER_ELEMENT)),
    );
  },
  Bf = (a, b, c, d, e, f, g, k, p) => {
    if (Q.Rh) Q.texImage2D(a, b, c, d, e, f, g, k, p);
    else if (p) {
      var n = xf(k);
      p >>>= 31 - Math.clz32(n.BYTES_PER_ELEMENT);
      Q.texImage2D(a, b, c, d, e, f, g, k, n, p);
    } else
      ((n = p ? Af(k, g, d, e, p) : null),
        Q.texImage2D(a, b, c, d, e, f, g, k, n));
  },
  Cf = (a, b, c) => Q.texParameteri(a, b, c),
  Df = (a, b) => {
    Q.uniform1f(Z(a), b);
  },
  Ef = (a, b) => {
    Q.uniform1i(Z(a), b);
  },
  Ff = (a, b, c) => {
    Q.uniform2f(Z(a), b, c);
  },
  Gf = (a, b, c, d, e) => {
    Q.uniform4f(Z(a), b, c, d, e);
  },
  Hf = (a, b, c) => {
    a = S[a];
    Q.uniformBlockBinding(a, b, c);
  },
  If = (a, b, c, d) => {
    b && Q.uniformMatrix4fv(Z(a), !!c, y, d >> 2, 16 * b);
  },
  Kf = (a) => {
    if (!Se(a)) return ((V ||= 1280), l("GL_INVALID_ENUM in glUnmapBuffer"), 0);
    var b = Od[Re(a)];
    if (!b || !b.ei)
      return ((V ||= 1282), l("buffer was never mapped in glUnmapBuffer"), 0);
    b.rj & 16 || Q.bufferSubData(a, b.offset, q, b.ei, b.length);
    Jf(b.ei);
    b.ei = 0;
    return 1;
  },
  Lf = (a) => {
    a = S[a];
    Q.useProgram(a);
    Q.Kj = a;
  },
  Mf = (a, b) => {
    Q.vertexAttribDivisor(a, b);
  },
  Nf = (a, b, c, d, e) => {
    var f = W.Vh[a];
    Q.ji
      ? ((f.ii = !1), Q.vertexAttribIPointer(a, b, c, d, e))
      : ((f.size = b),
        (f.type = c),
        (f.fj = !1),
        (f.stride = d),
        (f.Yh = e),
        (f.ii = !0),
        (f.oj = function (g, k, p, n, r, v) {
          this.vertexAttribIPointer(g, k, p, r, v);
        }));
  },
  Of = (a, b, c, d, e, f) => {
    var g = W.Vh[a];
    Q.ji
      ? ((g.ii = !1), Q.vertexAttribPointer(a, b, c, !!d, e, f))
      : ((g.size = b),
        (g.type = c),
        (g.fj = d),
        (g.stride = e),
        (g.Yh = f),
        (g.ii = !0),
        (g.oj = function (k, p, n, r, v, x) {
          this.vertexAttribPointer(k, p, n, r, v, x);
        }));
  },
  Pf = (a, b, c, d) => Q.viewport(a, b, c, d),
  Qf = (a, b) => {
    if (!O.fullscreenEnabled()) return -1;
    a = P(a);
    return a
      ? a.requestFullscreen || a.webkitRequestFullscreen
        ? Qc()
          ? gd(a, b)
          : b.Nj
            ? (Oc(gd, 1, [a, b]), 1)
            : -2
        : -3
      : -4;
  },
  Rf = () => {
    try {
      if (navigator.getGamepads)
        return (O.Hi = navigator.getGamepads()) ? 0 : -1;
    } catch (a) {
      navigator.getGamepads = null;
    }
    return -1;
  },
  Sf = (a, b) => {
    var c = {
      target: P(2),
      Eh: "beforeunload",
      Ih: 28,
      Lh: a,
      Gh: b,
      Oh: (d) => {
        var e = C(b)(28, 0, a);
        e &&= e ? B(q, e) : "";
        if (e) return (d.preventDefault(), (d.returnValue = e));
      },
      Kh: !0,
    };
    return Sc(c);
  },
  Tf = (a, b, c, d, e, f) => {
    O.Wi || (O.Wi = Y(256));
    a = {
      target: P(a),
      Eh: f,
      Ih: e,
      Lh: b,
      Gh: d,
      Oh: (g) => {
        var k = g.target.id ? g.target.id : "",
          p = O.Wi;
        E(Tc(g.target), q, p + 0, 128);
        E(k, q, p + 128, 128);
        C(d)(e, p, b) && g.preventDefault();
      },
      Kh: c,
    };
    return Sc(a);
  },
  Uf = (a, b, c) => {
    O.Ei || (O.Ei = Y(80));
    b = {
      target: P(2),
      Eh: "devicemotion",
      Ih: 17,
      Lh: a,
      Gh: c,
      Oh: (d) => {
        var e = O.Ei,
          f = d.acceleration,
          g = d.accelerationIncludingGravity,
          k = d.rotationRate;
        var p = 0 | (f && 1) | (g && 2) | (k && 4);
        f = f || {};
        g = g || {};
        k = k || {};
        u[(e + 72) >> 2] = p;
        z[e >> 3] = f.x;
        z[(e + 8) >> 3] = f.y;
        z[(e + 16) >> 3] = f.z;
        z[(e + 24) >> 3] = g.x;
        z[(e + 32) >> 3] = g.y;
        z[(e + 40) >> 3] = g.z;
        z[(e + 48) >> 3] = k.alpha;
        z[(e + 56) >> 3] = k.beta;
        z[(e + 64) >> 3] = k.gamma;
        C(c)(17, O.Ei, a) && d.preventDefault();
      },
      Kh: b,
    };
    return Sc(b);
  },
  Vf = (a, b, c, d, e) => {
    O.Yi || (O.Yi = Y(276));
    return Sc({
      target: a,
      Eh: e,
      Ih: 19,
      Lh: b,
      Gh: d,
      Oh: (f) => {
        var g = O.Yi;
        jd(g);
        C(d)(19, g, b) && f.preventDefault();
      },
      Kh: c,
    });
  },
  Wf = (a, b, c, d, e) => {
    O.Zi || (O.Zi = Y(1240));
    b = {
      target: P(2),
      sj: !0,
      Eh: e,
      Ih: d,
      Lh: a,
      Gh: c,
      Oh: (f) => {
        var g = O.Zi;
        kd(g, f.gamepad);
        C(c)(d, g, a) && f.preventDefault();
      },
      Kh: b,
    };
    return Sc(b);
  },
  Xf = (a, b, c, d, e, f) => {
    O.bj || (O.bj = Y(160));
    a = {
      target: P(a),
      Eh: f,
      Ih: e,
      Lh: b,
      Gh: d,
      Oh: (g) => {
        var k = O.bj;
        z[k >> 3] = g.timeStamp;
        var p = k >> 2;
        u[p + 2] = g.location;
        m[k + 12] = g.ctrlKey;
        m[k + 13] = g.shiftKey;
        m[k + 14] = g.altKey;
        m[k + 15] = g.metaKey;
        m[k + 16] = g.repeat;
        u[p + 5] = g.charCode;
        u[p + 6] = g.keyCode;
        u[p + 7] = g.which;
        E(g.key || "", q, k + 32, 32);
        E(g.code || "", q, k + 64, 32);
        E(g.char || "", q, k + 96, 32);
        E(g.locale || "", q, k + 128, 32);
        C(d)(e, k, b) && g.preventDefault();
      },
      Kh: c,
    };
    return Sc(a);
  },
  Yf = (a, b, c) => {
    var d = screen.orientation;
    O.gj || (O.gj = Y(8));
    return Sc({
      target: d,
      Eh: "change",
      Ih: 18,
      Lh: a,
      Gh: c,
      Oh: (e) => {
        var f = O.gj,
          g = [
            "portrait-primary",
            "portrait-secondary",
            "landscape-primary",
            "landscape-secondary",
          ],
          k = ["portrait", "portrait", "landscape", "landscape"],
          p = 0;
        var n = window.screen
          ? screen.orientation ||
            screen.mozOrientation ||
            screen.webkitOrientation
          : void 0;
        "object" === typeof n
          ? ((p = g.indexOf(n.type)),
            0 > p && (p = k.indexOf(n.type)),
            0 <= p && (p = 1 << p),
            (g = n.angle))
          : (g = window.orientation);
        u[f >> 2] = p;
        u[(f + 4) >> 2] = g;
        C(c)(18, f, a) && e.preventDefault();
      },
      Kh: b,
    });
  },
  Zf = (a, b, c, d) => {
    O.hj || (O.hj = Y(257));
    return Sc({
      target: a,
      Eh: "pointerlockchange",
      Ih: 20,
      Lh: b,
      Gh: d,
      Oh: (e) => {
        var f = O.hj,
          g = document.pointerLockElement;
        m[f] = !!g;
        var k = g?.id || "";
        E(Tc(g), q, f + 1, 128);
        E(k, q, f + 129, 128);
        C(d)(20, f, b) && e.preventDefault();
      },
      Kh: c,
    });
  },
  $f = (a, b, c, d) => {
    O.mj || (O.mj = Y(36));
    a = P(a);
    return Sc({
      target: a,
      Eh: "resize",
      Ih: 10,
      Lh: b,
      Gh: d,
      Oh: (e) => {
        if (e.target == a) {
          var f = document.body;
          if (f) {
            var g = O.mj;
            u[g >> 2] = 0;
            u[(g + 4) >> 2] = f.clientWidth;
            u[(g + 8) >> 2] = f.clientHeight;
            u[(g + 12) >> 2] = innerWidth;
            u[(g + 16) >> 2] = innerHeight;
            u[(g + 20) >> 2] = outerWidth;
            u[(g + 24) >> 2] = outerHeight;
            u[(g + 28) >> 2] = pageXOffset | 0;
            u[(g + 32) >> 2] = pageYOffset | 0;
            C(d)(10, g, b) && e.preventDefault();
          }
        }
      },
      Kh: c,
    });
  },
  ag = (a, b, c) => {
    var d = Uc[1];
    O.pj || (O.pj = Y(8));
    return Sc({
      target: d,
      Eh: "visibilitychange",
      Ih: 21,
      Lh: a,
      Gh: c,
      Oh: (e) => {
        var f = O.pj,
          g = ["hidden", "visible", "prerender", "unloaded"].indexOf(
            document.visibilityState,
          );
        m[f] = document.hidden;
        u[(f + 4) >> 2] = g;
        C(c)(21, f, a) && e.preventDefault();
      },
      Kh: b,
    });
  },
  bg = (a, b, c, d) => {
    O.qj || (O.qj = Y(96));
    return Sc({
      target: a,
      sj: !0,
      Eh: "wheel",
      Ih: 9,
      Lh: b,
      Gh: d,
      Oh: (e) => {
        var f = O.qj;
        z[f >> 3] = e.timeStamp;
        var g = f >> 2;
        u[g + 2] = e.screenX;
        u[g + 3] = e.screenY;
        u[g + 4] = e.clientX;
        u[g + 5] = e.clientY;
        m[f + 24] = e.ctrlKey;
        m[f + 25] = e.shiftKey;
        m[f + 26] = e.altKey;
        m[f + 27] = e.metaKey;
        t[2 * g + 14] = e.button;
        t[2 * g + 15] = e.buttons;
        u[g + 8] = e.movementX;
        u[g + 9] = e.movementY;
        var k = fd(a);
        u[g + 10] = e.clientX - (k.left | 0);
        u[g + 11] = e.clientY - (k.top | 0);
        z[(f + 64) >> 3] = e.deltaX;
        z[(f + 72) >> 3] = e.deltaY;
        z[(f + 80) >> 3] = e.deltaZ;
        u[(f + 88) >> 2] = e.deltaMode;
        C(d)(9, f, b) && e.preventDefault();
      },
      Kh: c,
    });
  },
  cg = ["default", "low-power", "high-performance"],
  dg = {},
  fg = () => {
    if (!eg) {
      var a = {
          USER: "web_user",
          LOGNAME: "web_user",
          PATH: "/",
          PWD: "/",
          HOME: "/home/web_user",
          LANG:
            (globalThis.navigator?.language ?? "C").replace("-", "_") +
            ".UTF-8",
          _: ea || "./this.program",
        },
        b;
      for (b in dg) void 0 === dg[b] ? delete a[b] : (a[b] = dg[b]);
      var c = [];
      for (b in a) c.push(`${b}=${a[b]}`);
      eg = c;
    }
    return eg;
  },
  eg,
  gg = (a) => {
    for (var b of ["keydown", "mousedown", "touchstart"])
      for (var c of [document, document.getElementById("canvas")])
        c?.addEventListener(
          b,
          () => {
            "suspended" === a.state && a.resume();
          },
          { once: !0 },
        );
  },
  hg = (a, b = []) => {
    C(a)(...b);
  };
xb = Array(4096);
Pb(I, "/");
K("/tmp");
K("/home");
K("/home/web_user");
(function () {
  K("/dev");
  fb(259, { read: () => 0, write: (d, e, f, g) => g, Sh: () => 0 });
  Sb("/dev/null", 259);
  eb(1280, hb);
  eb(1536, ib);
  Sb("/dev/tty", 1280);
  Sb("/dev/tty1", 1536);
  var a = new Uint8Array(1024),
    b = 0,
    c = () => {
      0 === b && (Za(a), (b = a.byteLength));
      return a[--b];
    };
  dc("/dev", "random", c);
  dc("/dev", "urandom", c);
  K("/dev/shm");
  K("/dev/shm/tmp");
})();
(function () {
  K("/proc");
  var a = K("/proc/self");
  K("/proc/self/fd");
  Pb(
    {
      Wh() {
        var b = kb(a, "fd", 16895, 73);
        b.wh = { Sh: I.wh.Sh };
        b.vh = {
          lookup(c, d) {
            c = +d;
            var e = Lb(c);
            c = {
              parent: null,
              Wh: { Aj: "fake" },
              vh: { readlink: () => e.path },
              id: c + 1,
            };
            return (c.parent = c);
          },
          readdir() {
            return Array.from(vb.entries())
              .filter(([, c]) => c)
              .map(([c]) => c.toString());
          },
        };
        return b;
      },
    },
    "/proc/self/fd",
  );
})();
h.requestAnimationFrame = sd;
h.pauseMainLoop = function () {
  pd = null;
  vd++;
};
h.resumeMainLoop = function () {
  vd++;
  var a = ld,
    b = md,
    c = nd;
  nd = null;
  Dd(c, 0, !1, wd, !0);
  ud(a, b);
  pd();
};
h.preMainLoop && Bd.push(h.preMainLoop);
h.postMainLoop && Cd.push(h.postMainLoop);
var jg = () => {
  if (W) {
    var a = W.oi;
    W.oi = W.xi;
    W.xi = a;
    a = W.ci;
    W.ci = W.Ni;
    W.Ni = a;
    for (a = 0; 21 >= a; ++a) W.ci[a] = 0;
  }
};
"undefined" != typeof zd && Bd.push(jg);
for (let a = 0; 32 > a; ++a) Le.push(Array(a));
h.noExitRuntime && (Ia = h.noExitRuntime);
h.preloadPlugins && (pb = h.preloadPlugins);
h.print && (ma = h.print);
h.printErr && (l = h.printErr);
h.wasmBinary && (na = h.wasmBinary);
h.arguments && (da = h.arguments);
h.thisProgram && (ea = h.thisProgram);
if (h.preInit)
  for (
    "function" == typeof h.preInit && (h.preInit = [h.preInit]);
    0 < h.preInit.length;
  )
    h.preInit.shift()();
h.addRunDependency = Ha;
h.removeRunDependency = Ga;
h.FS_preloadFile = async (a, b, c, d, e, f, g, k) => {
  var p = b ? $a(Va(a + "/" + b)) : a,
    n = `cp ${p}`;
  Ha(n);
  try {
    var r = c;
    "string" == typeof c && (r = await ob(c));
    r = await sb(r, p);
    k?.();
    f || cc(a, b, r, d, e, g);
  } finally {
    Ga(n);
  }
};
h.FS_unlink = (...a) => Ub(...a);
h.FS_createPath = (...a) => ac(...a);
h.FS_createDevice = (...a) => dc(...a);
h.FS_createDataFile = (...a) => cc(...a);
h.FS_createLazyFile = (...a) => fc(...a);
var Lc = {
    511660: (a) => {
      a = (a ? B(q, a) : "") + "\n\nAbort/Retry/Ignore/AlwaysIgnore? [ariA] :";
      a = window.prompt(a, "i");
      null === a && (a = "i");
      return 1 === a.length ? a.charCodeAt(0) : -1;
    },
    511875: () => {
      "undefined" === typeof h.SDL3 && (h.SDL3 = {});
      h.SDL3.ui = {};
      h.SDL3.ui.di = [];
      h.SDL3.ui.di[0] = void 0;
      h.SDL3.ui.di[1] = void 0;
    },
    512121: (a, b, c, d, e) => {
      var f = h.SDL3.ui;
      void 0 !== f.di[a] && clearInterval(f.di[a]);
      f.di[a] = setInterval(
        function () {
          hg(d, [e]);
        },
        (b / c) * 1e3,
      );
    },
    512313: (a) => {
      var b = h.SDL3.ui;
      void 0 !== b.di[a] && clearInterval(b.di[a]);
      b.di[a] = void 0;
    },
    512444: (a) => {
      window.open(a ? B(q, a) : "", "_blank");
    },
    512484: () =>
      "undefined" !== typeof AudioContext ||
      "undefined" !== typeof webkitAudioContext
        ? !0
        : !1,
    512631: () =>
      ("undefined" !== typeof navigator.mediaDevices &&
        "undefined" !== typeof navigator.mediaDevices.getUserMedia) ||
      "undefined" !== typeof navigator.webkitGetUserMedia
        ? !0
        : !1,
    512865: () => {
      "undefined" === typeof h.SDL3 && (h.SDL3 = {});
      var a = h.SDL3;
      a.zh = {};
      a.xh = {};
      a.Ah ||
        ("undefined" !== typeof AudioContext
          ? (a.Ah = new AudioContext())
          : "undefined" !== typeof webkitAudioContext &&
            (a.Ah = new webkitAudioContext()),
        a.Ah && "undefined" === typeof navigator.userActivation && gg(a.Ah));
      return void 0 !== a.Ah;
    },
    513406: () => h.SDL3.Ah.sampleRate,
    513457: (a, b, c, d) => {
      function e() {}
      function f(k) {
        void 0 !== g.xh.Qh &&
          (clearInterval(g.xh.Qh), (g.xh.Qh = void 0), (g.xh.gi = void 0));
        g.xh.dj = g.Ah.createMediaStreamSource(k);
        g.xh.Ph = g.Ah.createScriptProcessor(b, a, 1);
        g.xh.Ph.onaudioprocess = function (p) {
          void 0 !== g &&
            void 0 !== g.xh &&
            (p.outputBuffer.getChannelData(0).fill(0),
            (g.xh.Ri = p.inputBuffer),
            hg(c, [d]));
        };
        g.xh.dj.connect(g.xh.Ph);
        g.xh.Ph.connect(g.Ah.destination);
        g.xh.stream = k;
      }
      var g = h.SDL3;
      g.xh.gi = g.Ah.createBuffer(a, b, g.Ah.sampleRate);
      g.xh.gi.getChannelData(0).fill(0);
      g.xh.Qh = setInterval(
        function () {
          g.xh.Ri = g.xh.gi;
          hg(c, [d]);
        },
        (b / g.Ah.sampleRate) * 1e3,
      );
      void 0 !== navigator.mediaDevices &&
      void 0 !== navigator.mediaDevices.getUserMedia
        ? navigator.mediaDevices
            .getUserMedia({ audio: !0, video: !1 })
            .then(f)
            .catch(e)
        : void 0 !== navigator.webkitGetUserMedia &&
          navigator.webkitGetUserMedia({ audio: !0, video: !1 }, f, e);
    },
    515298: (a, b, c, d) => {
      var e = h.SDL3;
      e.zh.Ph = e.Ah.createScriptProcessor(b, 0, a);
      e.zh.Ph.onaudioprocess = function (f) {
        void 0 !== e &&
          void 0 !== e.zh &&
          (void 0 !== e.zh.Qh &&
            (clearInterval(e.zh.Qh), (e.zh.Qh = void 0), (e.zh.gi = void 0)),
          (e.zh.Di = f.outputBuffer),
          hg(c, [d]));
      };
      e.zh.Ph.connect(e.Ah.destination);
      "suspended" === e.Ah.state &&
        ((e.zh.gi = e.Ah.createBuffer(a, b, e.Ah.sampleRate)),
        e.zh.gi.getChannelData(0).fill(0),
        (e.zh.Qh = setInterval(
          function () {
            "undefined" !== typeof navigator.userActivation &&
              navigator.userActivation.hasBeenActive &&
              e.Ah.resume();
            e.zh.Di = e.zh.gi;
            hg(c, [d]);
            e.zh.Di = void 0;
          },
          (b / e.Ah.sampleRate) * 1e3,
        )));
    },
    516614: (a) => {
      var b = h.SDL3;
      if (a) {
        void 0 !== b.xh.Qh && clearInterval(b.xh.Qh);
        if (void 0 !== b.xh.stream) {
          a = b.xh.stream.getAudioTracks();
          for (var c = 0; c < a.length; c++) b.xh.stream.removeTrack(a[c]);
        }
        void 0 !== b.xh.Ph &&
          ((b.xh.Ph.onaudioprocess = function () {}), b.xh.Ph.disconnect());
        void 0 !== b.xh.dj && b.xh.dj.disconnect();
        b.xh = void 0;
      } else
        (void 0 != b.zh.Ph && b.zh.Ph.disconnect(),
          void 0 !== b.zh.Qh && clearInterval(b.zh.Qh),
          (b.zh = void 0));
      void 0 !== b.Ah &&
        void 0 === b.zh &&
        void 0 === b.xh &&
        (b.Ah.close(), (b.Ah = void 0));
    },
    517770: (a, b) => {
      a >>>= 2;
      for (var c = h.SDL3, d = c.zh.Di.numberOfChannels, e = 0; e < d; ++e) {
        var f = c.zh.Di.getChannelData(e);
        if (f.length != b)
          throw (
            "Web Audio playback buffer length mismatch! Destination size: " +
            f.length +
            " samples vs expected " +
            b +
            " samples!"
          );
        for (var g = 0; g < b; ++g) f[g] = y[a + (g * d + e)];
      }
    },
    518285: (a, b) => {
      for (var c = h.SDL3, d = c.xh.Ri.numberOfChannels, e = 0; e < d; ++e) {
        var f = c.xh.Ri.getChannelData(e);
        if (f.length != b)
          throw (
            "Web Audio recording buffer length mismatch! Destination size: " +
            f.length +
            " samples vs expected " +
            b +
            " samples!"
          );
        if (1 == d) for (var g = 0; g < b; ++g) Ja(a + 4 * g, f[g]);
        else for (g = 0; g < b; ++g) Ja(a + 4 * (g * d + e), f[g]);
      }
    },
    518912: () => {
      "undefined" === typeof h.SDL3 && (h.SDL3 = {});
      h.SDL3.yh = {};
    },
    519013: () => (void 0 === navigator.mediaDevices ? 0 : 1),
    519072: (a, b, c, d, e) => {
      function f() {
        const n = h.SDL3;
        if (
          "undefined" !== typeof n &&
          "undefined" !== typeof n.yh &&
          "undefined" !== typeof n.yh.stream
        ) {
          var r = performance.now();
          if (r >= n.yh.Mi) for (p(g); n.yh.Mi < r; ) n.yh.Mi += n.yh.Sj;
          requestAnimationFrame(f);
        }
      }
      const g = a,
        k = h.jk,
        p = h.kk;
      a = {};
      0 >= b || 0 >= c
        ? (a.video = !0)
        : ((a.video = {}), (a.video.width = b), (a.video.height = c));
      0 < d && 0 < e && (a.video.frameRate = { ideal: d / e });
      navigator.mediaDevices
        .getUserMedia(a)
        .then((n) => {
          var r = n.getVideoTracks()[0].getSettings();
          const v = r.width,
            x = r.height;
          r = r.frameRate;
          console.log(
            "Camera is opened! Actual spec: (" + v + "x" + x + "), fps=" + r,
          );
          if (k(g, 1, v, x, r)) {
            const D = document.createElement("video");
            D.width = v;
            D.height = x;
            D.style.display = "none";
            D.srcObject = n;
            const G = document.createElement("canvas");
            G.width = v;
            G.height = x;
            G.style.display = "none";
            const N = G.getContext("2d"),
              H = h.SDL3;
            H.yh.width = v;
            H.yh.height = x;
            H.yh.Bk = r;
            H.yh.Sj = 1e3 / r;
            H.yh.stream = n;
            H.yh.video = D;
            H.yh.canvas = G;
            H.yh.Pi = N;
            H.yh.Mi = performance.now();
            D.play();
            D.addEventListener("loadedmetadata", () => {
              f();
            });
          }
        })
        .catch((n) => {
          console.error(
            "Tried to open camera but it threw an error! " +
              n.name +
              ": " +
              n.message,
          );
          k(g, 0, 0, 0, 0);
        });
    },
    521378: () => {
      const a = h.SDL3;
      "undefined" !== typeof a &&
        "undefined" !== typeof a.yh &&
        "undefined" !== typeof a.yh.stream &&
        (a.yh.stream.getTracks().forEach((b) => b.stop()), (a.yh = {}));
    },
    521629: (a, b, c) => {
      const d = h.SDL3;
      if (
        "undefined" === typeof d ||
        "undefined" === typeof d.yh ||
        "undefined" === typeof d.yh.Pi
      )
        return 0;
      d.yh.Pi.drawImage(d.yh.video, 0, 0, a, b);
      a = d.yh.Pi.getImageData(0, 0, a, b).data;
      q.set(a, c);
      return 1;
    },
    522007: () => {
      "undefined" !== typeof h.SDL3 && (h.SDL3.yh = void 0);
    },
    522094: (a) => {
      let b = navigator.getGamepads();
      return b ? ((a = b[a]) && a.vibrationActuator ? 1 : 0) : 0;
    },
    522269: (a, b, c) => {
      let d = navigator.getGamepads();
      if (!d) return 0;
      a = d[a];
      if (!a || !a.vibrationActuator) return 0;
      a.vibrationActuator.playEffect("dual-rumble", {
        startDelay: 0,
        duration: 3e3,
        weakMagnitude: b / 65535,
        strongMagnitude: c / 65535,
      });
      return 1;
    },
    522605: (a, b, c, d) => {
      d = d ? B(q, d) : "";
      var e = document.querySelector(d);
      h.SDL3 || (h.SDL3 = {});
      d = h.SDL3;
      if (d.Ij !== e) {
        d.si = Kd(e);
        if (!d.si) return !1;
        d.Ij = e;
      }
      if (d.w !== a || d.h !== b || d.Uj !== d.si)
        ((d.image = d.si.createImageData(a, b)),
          (d.w = a),
          (d.h = b),
          (d.Uj = d.si));
      a = d.image.data;
      c /= 4;
      d.Mj !== a && ((d.Lj = new Int32Array(a.buffer)), (d.Mj = a));
      a = d.Lj;
      a.set(u.subarray(c, c + a.length));
      d.si.putImageData(d.image, 0, 0);
      return !0;
    },
    523396: () => {
      h.SDL3 || (h.SDL3 = {});
      var a = h.SDL3;
      a.mouse_x = 0;
      a.mouse_y = 0;
      a.mouse_buttons = [];
      for (var b = 0; 5 > b; ++b) a.mouse_buttons[b] = !1;
      document.addEventListener("mousemove", function (c) {
        var d = h.SDL3;
        d.mouse_x = c.clientX;
        d.mouse_y = c.clientY;
      });
      document.addEventListener("mousedown", function (c) {
        var d = h.SDL3;
        0 <= c.button &&
          c.button < d.mouse_buttons.length &&
          (d.mouse_buttons[c.button] = !0);
      });
      document.addEventListener("mouseup", function (c) {
        var d = h.SDL3;
        0 <= c.button &&
          c.button < d.mouse_buttons.length &&
          (d.mouse_buttons[c.button] = !1);
      });
    },
    524130: (a, b, c, d, e) => {
      var f = document.createElement("canvas");
      f.width = a;
      f.height = b;
      var g = f.getContext("2d");
      a = g.createImageData(a, b);
      e /= 4;
      b = new Int32Array(a.data.buffer);
      b.set(u.subarray(e, e + b.length));
      g.putImageData(a, 0, 0);
      c =
        0 === c && 0 === d
          ? "url(" + f.toDataURL() + "), auto"
          : "url(" + f.toDataURL() + ") " + c + " " + d + ", auto";
      d = kg(c.length + 1);
      E(c, q, d, c.length + 1);
      return d;
    },
    524788: (a) => {
      h.canvas && (h.canvas.style.cursor = a ? B(q, a) : "");
    },
    524871: () => {
      h.canvas && (h.canvas.style.cursor = "none");
    },
    524940: () => h.SDL3.mouse_x,
    524978: () => h.SDL3.mouse_y,
    525016: (a) => h.SDL3.mouse_buttons[a],
    525064: (a) => {
      document.Fh = function (b) {
        "CapsLock" != b.key &&
          "NumLock" != b.key &&
          "ScrollLock" != b.key &&
          lg(
            a,
            b.getModifierState("CapsLock"),
            b.getModifierState("NumLock"),
            b.getModifierState("ScrollLock"),
          );
      };
      document.addEventListener("keydown", document.Fh);
    },
    525463: () => {
      document.removeEventListener("keydown", document.Fh);
    },
    525547: (a) => {
      var b = document;
      b &&
        ((b.Bh = function (c) {
          c = h.SDL3.wi(0, 0, c);
          0 != c && (mg(a, c), ng(c));
        }),
        b.addEventListener("pointerup", b.Bh));
    },
    525890: (a) => {
      "undefined" === typeof h.SDL3 && (h.SDL3 = {});
      var b = h.SDL3;
      void 0 === b.wi &&
        (b.wi = function (c, d, e) {
          if ("mouse" == e.pointerType) var f = 1;
          else if ("touch" == e.pointerType) f = 2;
          else if ("pen" == e.pointerType) f = 3;
          else return 0;
          var g = kg(a);
          if (0 != g) {
            var k = g >> 2;
            u[k++] = f;
            u[k++] = e.pointerId;
            u[k++] = "undefined" !== typeof e.button ? e.button : -1;
            u[k++] = e.buttons;
            y[k++] = e.movementX;
            y[k++] = e.movementY;
            y[k++] = e.clientX - c;
            y[k++] = e.clientY - d;
            3 == f &&
              ((y[k++] = e.pressure),
              (y[k++] = e.Pk),
              (y[k++] = e.tiltX),
              (y[k++] = e.tiltY),
              (y[k++] = e.Sk));
          }
          return g;
        });
    },
    526877: (a) => {
      a = a ? B(q, a) : "";
      try {
        var b = document.querySelector(a);
        if (b) return b === document.activeElement;
      } catch (c) {}
      return !1;
    },
    527043: () => document.hasFocus(),
    527075: () => {
      var a = document;
      a && (a.removeEventListener("pointerup", a.Bh), (a.Bh = void 0));
    },
    527257: () => document.body.clientWidth,
    527295: () => document.body.clientHeight,
    527334: () => window.innerWidth,
    527364: () => window.innerHeight,
    527395: () => window.outerWidth,
    527425: () => window.outerHeight,
    527456: () => window.pageXOffset,
    527487: () => window.pageYOffset,
    527518: (a, b) => {
      var c = document.querySelector(b ? B(q, b) : "");
      if (c) {
        var d = h.SDL3;
        c.pi = function (e) {
          var f = c.getBoundingClientRect();
          e = d.wi(f.left, f.top, e);
          0 != e && (og(a, e), ng(e));
        };
        c.Zh = function (e) {
          var f = c.getBoundingClientRect();
          e = d.wi(f.left, f.top, e);
          0 != e && (pg(a, e), ng(e));
        };
        c.Fh = function (e) {
          var f = c.getBoundingClientRect();
          e = d.wi(f.left, f.top, e);
          0 != e && (qg(a, e), ng(e));
        };
        c.style.touchAction = "none";
        c.addEventListener("pointerenter", c.pi);
        c.addEventListener("pointerleave", c.Zh);
        c.addEventListener("pointercancel", c.Zh);
        c.addEventListener("pointerdown", c.Fh);
        c.addEventListener("pointermove", c.Fh);
        c.addEventListener("pointerup", c.Fh);
      }
    },
    528852: (a, b, c) => {
      var d = document.querySelector(b ? B(q, b) : "");
      if (d) {
        "undefined" === typeof h.SDL3 && (h.SDL3 = {});
        var e = h.SDL3,
          f = function (g) {
            var k = kg(c);
            if (0 != k) {
              var p = k >> 2,
                n = d.getBoundingClientRect();
              u[p++] = g.clientX - n.left;
              u[p++] = g.clientY - n.top;
            }
            return k;
          };
        e.Ti = function (g) {
          g.preventDefault();
          g = f(g);
          0 != g && (rg(a, g), ng(g));
        };
        d.addEventListener("dragover", e.Ti);
        e.Fi = 0;
        K("/tmp/filedrop");
        e.Ui = function (g) {
          g.preventDefault();
          if (g.dataTransfer.types.includes("text/plain"))
            ((g = lf(g.dataTransfer.getData("text/plain"))), sg(a, g), Jf(g));
          else if (g.dataTransfer.types.includes("Files")) {
            let k = 0;
            const p = g.dataTransfer.files.length;
            for (let n = 0; n < p; n++) {
              const r = g.dataTransfer.files.item(n),
                v = new FileReader();
              v.readAsArrayBuffer(r);
              v.onload = function (x) {
                var D = `/tmp/filedrop/${e.Fi}`;
                e.Fi += 1;
                const G = `${D}/${r.name}`,
                  N = lf(G);
                x = new Uint8Array(x.target.result);
                K(D);
                D = Xb(G, "w");
                $b(D, x, 0, x.length, 0);
                Yb(D);
                tg(a, N);
                Jf(N);
                ++k;
                k === p && ug(a);
              };
              v.onerror = function () {
                ++k;
                k === p && ug(a);
              };
            }
          }
          ug(a);
        };
        d.addEventListener("drop", e.Ui);
        e.vi = function (g) {
          g.preventDefault();
          ug(a);
        };
        d.addEventListener("dragend", e.vi);
        d.addEventListener("dragleave", e.vi);
      }
    },
    531211: (a) => {
      if ((a = document.querySelector(a ? B(q, a) : ""))) {
        var b = h.SDL3;
        a.removeEventListener("dragleave", b.vi);
        a.removeEventListener("dragend", b.vi);
        a.removeEventListener("drop", b.Ui);
        b.Fi = void 0;
        ("/tmp/filedrop");
        var c = Db("/tmp/filedrop", { parent: !0 }).node,
          d = Xa("/tmp/filedrop"),
          e = lb(c, d),
          f = Jb(c, d, !0);
        if (f) throw new F(f);
        if (!c.vh.rmdir) throw new F(63);
        if (e.li) throw new F(10);
        c.vh.rmdir(c, d);
        mb(e);
        a.removeEventListener("dragover", b.Ti);
        b.Ti = void 0;
        b.Ui = void 0;
        b.vi = void 0;
      }
    },
    532041: (a) => {
      if ((a = document.querySelector(a ? B(q, a) : "")))
        (a.removeEventListener("pointerenter", a.pi),
          a.removeEventListener("pointerleave", a.Zh),
          a.removeEventListener("pointercancel", a.Zh),
          a.removeEventListener("pointerdown", a.Fh),
          a.removeEventListener("pointermove", a.Fh),
          a.removeEventListener("pointerup", a.Fh),
          (a.style.touchAction = ""),
          (a.pi = void 0),
          (a.Zh = void 0),
          (a.Fh = void 0));
    },
    532775: () =>
      window.matchMedia
        ? window.matchMedia("(prefers-color-scheme: light)").matches
          ? 0
          : window.matchMedia("(prefers-color-scheme: dark)").matches
            ? 1
            : -1
        : -1,
    532984: () => {
      if ("undefined" !== typeof h.SDL3) {
        var a = h.SDL3;
        a.lj.removeEventListener("change", a.Vi);
        a.lj = void 0;
        a.Vi = void 0;
      }
    },
    533237: () => window.innerWidth,
    533267: () => window.innerHeight,
    533298: (a) => {
      h.requestFullscreen = function () {
        vg(a);
      };
    },
    533407: (a, b) => {
      a = q.subarray(a, a + b);
      a.buffer instanceof SharedArrayBuffer && (a = new Uint8Array(a));
      a = URL.createObjectURL(new Blob([a], { type: "image/png" }));
      b = document.querySelector("link[rel~='icon']");
      b ||
        ((b = document.createElement("link")),
        (b.rel = "icon"),
        (b.type = "image/png"),
        document.head.appendChild(b));
      b.href && b.href.startsWith("blob:") && URL.revokeObjectURL(b.href);
      b.href = a;
    },
    533921: () => {
      h.requestFullscreen = function () {};
    },
    533995: () => window.innerWidth,
    534025: () => window.innerHeight,
    534056: (a) => {
      a = document.querySelector(a ? B(q, a) : "");
      a.Gj = a.style.position;
      a.Hj = a.style.top;
      a.Fj = a.style.left;
      var b = document.createElement("div");
      b.id = "SDL3_fill_document_background_elements";
      b.Bh = a;
      b.Ai = a.parentNode;
      b.zi = a.nextSibling;
      var c = Array.from(document.body.children),
        d;
      for (d of c) b.appendChild(d);
      document.body.appendChild(b);
      b.style.display = "none";
      document.body.appendChild(a);
      a.style.position = "fixed";
      a.style.top = "0";
      a.style.left = "0";
    },
    534754: () => {
      var a = document.getElementById("SDL3_fill_document_background_elements");
      if (a) {
        for (
          a.zi ? a.Ai.insertBefore(a.Bh, a.zi) : a.Ai.appendChild(a.Bh);
          a.firstChild;
        )
          document.body.insertBefore(a.firstChild, a);
        a.Bh.style.position = a.Bh.Gj;
        a.Bh.style.top = a.Bh.Hj;
        a.Bh.style.left = a.Bh.Fj;
        a.remove();
      }
    },
    535313: () => {
      if (window.matchMedia) {
        "undefined" === typeof h.SDL3 && (h.SDL3 = {});
        var a = h.SDL3;
        a.Vi = function () {
          wg();
        };
        a.lj = window.matchMedia("(prefers-color-scheme: dark)");
        a.lj.addEventListener("change", a.Vi);
      }
    },
    535704: (a, b, c, d, e) => {
      a = a ? B(q, a) : "";
      b = b ? B(q, b) : "";
      c = c ? B(q, c) : "";
      d = d ? B(q, d) : "";
      var f = e ? B(q, e) : "";
      e = document.createElement("dialog");
      e.classList.add("SDL3_messagebox");
      e.id = f;
      e.style.color = d;
      e.style.backgroundColor = c;
      document.body.append(e);
      d = document.createElement("h1");
      d.innerText = a;
      e.append(d);
      a = document.createElement("p");
      a.innerText = b;
      e.append(a);
      e.showModal();
    },
    536245: (a, b, c, d, e, f, g, k) => {
      a = a ? B(q, a) : "";
      b = b ? B(q, b) : "";
      f = f ? B(q, f) : "";
      var p = g ? B(q, g) : "",
        n = k ? B(q, k) : "",
        r = document.getElementById(a);
      if (!r) return !1;
      var v = document.createElement("button");
      v.innerText = b;
      v.style.borderColor = f;
      v.style.backgroundColor = p;
      r.addEventListener("keydown", function (x) {
        d && "Enter" === x.key
          ? (x.preventDefault(), v.click())
          : e && "Escape" === x.key && (x.preventDefault(), v.click());
      });
      r.addEventListener("cancel", function (x) {
        x.preventDefault();
      });
      v.onmouseenter = function () {
        v.style.backgroundColor = n;
      };
      v.onmouseleave = function () {
        v.style.backgroundColor = p;
      };
      v.onclick = function () {
        r.close(c);
      };
      r.append(v);
      return !0;
    },
    537254: (a) => {
      a = a ? B(q, a) : "";
      return (a = document.getElementById(a)) ? a.open : !1;
    },
    537392: (a) => {
      a = a ? B(q, a) : "";
      a = document.getElementById(a);
      if (!a) return 0;
      try {
        return parseInt(a.returnValue);
      } catch (b) {
        return 0;
      }
    },
    537574: (a, b) => {
      alert((a ? B(q, a) : "") + "\n\n" + (b ? B(q, b) : ""));
    },
  },
  xg,
  Y,
  Jf,
  ng,
  kg,
  og,
  pg,
  qg,
  mg,
  rg,
  ug,
  sg,
  tg,
  lg,
  wg,
  vg,
  yg,
  Yc,
  Vc,
  Xc,
  ua,
  Oa,
  zg = {
    Ja: function (a) {
      a = navigator.getGamepads()[a];
      if (0 < a.id.indexOf("Product: ")) {
        let b = a.id.indexOf("Product: ") + 9;
        return parseInt(a.id.substr(b, 4), 16);
      }
      a = a.id.split("-");
      return 1 < a.length && !isNaN(parseInt(a[1], 16))
        ? parseInt(a[1], 16)
        : 0;
    },
    Ka: function (a) {
      a = navigator.getGamepads()[a];
      if (0 < a.id.indexOf("Vendor: ")) {
        let b = a.id.indexOf("Vendor: ") + 8;
        return parseInt(a.id.substr(b, 4), 16);
      }
      a = a.id.split("-");
      return 1 < a.length && !isNaN(parseInt(a[0], 16))
        ? parseInt(a[0], 16)
        : 0;
    },
    Ia: function (a) {
      return 0 <= navigator.getGamepads()[a].id.toLowerCase().indexOf("xinput");
    },
    a: (a, b, c, d) =>
      A(
        `Assertion failed: ${a ? B(q, a) : ""}, at: ` +
          [
            b ? (b ? B(q, b) : "") : "unknown filename",
            c,
            d ? (d ? B(q, d) : "") : "unknown function",
          ],
      ),
    _a: (a, b) => C(a)(b),
    y: (a, b, c) => {
      var d = new Pa(a);
      w[(d.Yh + 16) >> 2] = 0;
      w[(d.Yh + 4) >> 2] = b;
      w[(d.Yh + 8) >> 2] = c;
      Qa = a;
      Ra++;
      throw Qa;
    },
    la: function (a, b, c) {
      Sa = c;
      try {
        var d = Lb(a);
        switch (b) {
          case 0:
            var e = Ta();
            if (0 > e) break;
            for (; vb[e]; ) e++;
            return Nb(d, e).fd;
          case 1:
          case 2:
            return 0;
          case 3:
            return d.flags;
          case 4:
            return ((e = Ta()), (d.flags |= e), 0);
          case 12:
            return ((e = Ta()), (t[(e + 0) >> 1] = 2), 0);
          case 13:
          case 14:
            return 0;
        }
        return -28;
      } catch (f) {
        if ("undefined" == typeof M || "ErrnoError" !== f.name) throw f;
        return -f.Dh;
      }
    },
    vb: function (a) {
      try {
        return (Lb(a), 0);
      } catch (b) {
        if ("undefined" == typeof M || "ErrnoError" !== b.name) throw b;
        return -b.Dh;
      }
    },
    pb: function (a, b) {
      try {
        var c = Lb(a),
          d = c.node,
          e = c.wh.Nh;
        a = e ? c : d;
        e ??= d.vh.Nh;
        Kb(e);
        var f = e(a);
        return hc(b, f);
      } catch (g) {
        if ("undefined" == typeof M || "ErrnoError" !== g.name) throw g;
        return -g.Dh;
      }
    },
    tb: function (a, b, c) {
      Sa = c;
      try {
        var d = Lb(a);
        switch (b) {
          case 21509:
            return d.tty ? 0 : -59;
          case 21505:
            if (!d.tty) return -59;
            if (d.tty.Xh.Xj) {
              a = [
                3, 28, 127, 21, 4, 0, 1, 0, 17, 19, 26, 0, 18, 15, 23, 22, 0, 0,
                0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
              ];
              var e = Ta();
              u[e >> 2] = 25856;
              u[(e + 4) >> 2] = 5;
              u[(e + 8) >> 2] = 191;
              u[(e + 12) >> 2] = 35387;
              for (var f = 0; 32 > f; f++) m[e + f + 17] = a[f] || 0;
            }
            return 0;
          case 21510:
          case 21511:
          case 21512:
            return d.tty ? 0 : -59;
          case 21506:
          case 21507:
          case 21508:
            if (!d.tty) return -59;
            if (d.tty.Xh.Yj)
              for (e = Ta(), a = [], f = 0; 32 > f; f++) a.push(m[e + f + 17]);
            return 0;
          case 21519:
            if (!d.tty) return -59;
            e = Ta();
            return (u[e >> 2] = 0);
          case 21520:
            return d.tty ? -28 : -59;
          case 21537:
          case 21531:
            e = Ta();
            if (!d.wh.Wj) throw new F(59);
            return d.wh.Wj(d, b, e);
          case 21523:
            if (!d.tty) return -59;
            d.tty.Xh.Zj &&
              ((f = [24, 80]),
              (e = Ta()),
              (t[e >> 1] = f[0]),
              (t[(e + 2) >> 1] = f[1]));
            return 0;
          case 21524:
            return d.tty ? 0 : -59;
          case 21515:
            return d.tty ? 0 : -59;
          default:
            return -28;
        }
      } catch (g) {
        if ("undefined" == typeof M || "ErrnoError" !== g.name) throw g;
        return -g.Dh;
      }
    },
    nb: function (a, b) {
      try {
        return ((a = a ? B(q, a) : ""), hc(b, Vb(a, !0)));
      } catch (c) {
        if ("undefined" == typeof M || "ErrnoError" !== c.name) throw c;
        return -c.Dh;
      }
    },
    mb: function (a, b, c, d) {
      try {
        b = b ? B(q, b) : "";
        var e = d & 256;
        b = gc(a, b, d & 4096);
        return hc(c, e ? Vb(b, !0) : Vb(b));
      } catch (f) {
        if ("undefined" == typeof M || "ErrnoError" !== f.name) throw f;
        return -f.Dh;
      }
    },
    ub: function (a, b, c, d) {
      Sa = d;
      try {
        b = b ? B(q, b) : "";
        b = gc(a, b);
        var e = d ? Ta() : 0;
        return Xb(b, c, e).fd;
      } catch (f) {
        if ("undefined" == typeof M || "ErrnoError" !== f.name) throw f;
        return -f.Dh;
      }
    },
    ob: function (a, b) {
      try {
        return ((a = a ? B(q, a) : ""), hc(b, Vb(a)));
      } catch (c) {
        if ("undefined" == typeof M || "ErrnoError" !== c.name) throw c;
        return -c.Dh;
      }
    },
    xb: () => A(""),
    ja: (a, b, c, d, e) => {
      b = ic(b);
      d = 0n === d;
      let f = (g) => g;
      if (d) {
        const g = 8 * c;
        f = (k) => BigInt.asUintN(g, k);
        e = f(e);
      }
      oc(a, {
        name: b,
        Jh: f,
        hi: (g, k) => {
          "number" == typeof k && (k = BigInt(k));
          return k;
        },
        fi: pc(b, c, !d),
        ki: null,
      });
    },
    fb: (a, b, c, d) => {
      b = ic(b);
      oc(a, {
        name: b,
        Jh: function (e) {
          return !!e;
        },
        hi: function (e, f) {
          return f ? c : d;
        },
        fi: function (e) {
          return this.Jh(q[e]);
        },
        ki: null,
      });
    },
    db: (a) => oc(a, uc),
    ia: (a, b, c) => {
      b = ic(b);
      oc(a, { name: b, Jh: (d) => d, hi: (d, e) => e, fi: vc(b, c), ki: null });
    },
    m: (a, b, c, d, e) => {
      b = ic(b);
      let f = (k) => k;
      if (0 === d) {
        var g = 32 - 8 * c;
        f = (k) => (k << g) >>> g;
        e = f(e);
      }
      oc(a, {
        name: b,
        Jh: f,
        hi: (k, p) => p,
        fi: pc(b, c, 0 !== d),
        ki: null,
      });
    },
    h: (a, b, c) => {
      function d(f) {
        return new e(m.buffer, w[(f + 4) >> 2], w[f >> 2]);
      }
      var e = [
        Int8Array,
        Uint8Array,
        Int16Array,
        Uint16Array,
        Int32Array,
        Uint32Array,
        Float32Array,
        Float64Array,
        BigInt64Array,
        BigUint64Array,
      ][b];
      c = ic(c);
      oc(a, { name: c, Jh: d, fi: d }, { Tj: !0 });
    },
    eb: (a, b) => {
      b = ic(b);
      oc(a, {
        name: b,
        Jh(c) {
          var d = Ma(c + 4, w[c >> 2], !0);
          Jf(c);
          return d;
        },
        hi(c, d) {
          d instanceof ArrayBuffer && (d = new Uint8Array(d));
          var e = "string" == typeof d;
          if (!(e || (ArrayBuffer.isView(d) && 1 == d.BYTES_PER_ELEMENT)))
            throw new mc("Cannot pass non-string to std::string");
          var f = e ? bb(d) : d.length;
          var g = Y(4 + f + 1),
            k = g + 4;
          w[g >> 2] = f;
          e ? E(d, q, k, f + 1) : q.set(d, k);
          null !== c && c.push(Jf, g);
          return g;
        },
        fi: tc,
        ki(c) {
          Jf(c);
        },
      });
    },
    H: (a, b, c) => {
      c = ic(c);
      if (2 === b) {
        var d = xc;
        var e = yc;
        var f = zc;
      } else ((d = Ac), (e = Bc), (f = Cc));
      oc(a, {
        name: c,
        Jh: (g) => {
          var k = d(g + 4, w[g >> 2] * b, !0);
          Jf(g);
          return k;
        },
        hi: (g, k) => {
          if ("string" != typeof k)
            throw new mc(`Cannot pass non-string to C++ string type ${c}`);
          var p = f(k),
            n = Y(4 + p + b);
          w[n >> 2] = p / b;
          e(k, n + 4, p + b);
          null !== g && g.push(Jf, n);
          return n;
        },
        fi: tc,
        ki(g) {
          Jf(g);
        },
      });
    },
    gb: (a, b) => {
      b = ic(b);
      oc(a, { Fk: !0, name: b, Jh: () => {}, hi: () => {} });
    },
    ab: () => {
      Ia = !1;
      Dc = 0;
    },
    bb: (a, b) => {
      Ec[a] && (clearTimeout(Ec[a].id), delete Ec[a]);
      if (!b) return 0;
      var c = setTimeout(() => {
        delete Ec[a];
        Ic(() => yg(a, performance.now()));
      }, b);
      Ec[a] = { id: c, Qk: b };
      return 0;
    },
    ib: (a, b, c, d) => {
      var e = new Date().getFullYear(),
        f = new Date(e, 0, 1).getTimezoneOffset();
      e = new Date(e, 6, 1).getTimezoneOffset();
      w[a >> 2] = 60 * Math.max(f, e);
      u[b >> 2] = Number(f != e);
      b = (g) => {
        var k = Math.abs(g);
        return `UTC${0 <= g ? "-" : "+"}${String(Math.floor(k / 60)).padStart(2, "0")}${String(k % 60).padStart(2, "0")}`;
      };
      a = b(f);
      b = b(e);
      e < f
        ? (E(a, q, c, 17), E(b, q, d, 17))
        : (E(a, q, d, 17), E(b, q, c, 17));
    },
    wb: function (a, b, c) {
      if (!(0 <= a && 3 >= a)) return 28;
      ra[c >> 3] = BigInt(
        Math.round(1e6 * (0 === a ? Date.now() : performance.now())),
      );
      return 0;
    },
    S: Mc,
    p: (a, b, c) => {
      b = Kc(b, c);
      return Lc[a](...b);
    },
    b: Mc,
    Da: (a, b, c) => {
      b = Kc(b, c);
      return Lc[a](...b);
    },
    ma: () => Date.now(),
    Rg: () => {
      if (!O.fullscreenEnabled()) return -1;
      Pc(gd);
      var a = Uc[1];
      if (a.exitFullscreen) a.fullscreenElement && a.exitFullscreen();
      else if (a.webkitExitFullscreen)
        a.webkitFullscreenElement && a.webkitExitFullscreen();
      else return -1;
      return 0;
    },
    Ca: () => {
      Pc(hd);
      if (!document.exitPointerLock) return -1;
      document.exitPointerLock();
      return 0;
    },
    u: () => globalThis.devicePixelRatio ?? 1,
    o: (a, b, c) => {
      a = P(a);
      if (!a) return -4;
      a = fd(a);
      z[b >> 3] = a.width;
      z[c >> 3] = a.height;
      return 0;
    },
    Tg: (a) => {
      if (!O.fullscreenEnabled()) return -1;
      jd(a);
      return 0;
    },
    Z: (a, b) => {
      if (0 > a || a >= O.Hi.length) return -5;
      if (!O.Hi[a]) return -7;
      kd(b, O.Hi[a]);
      return 0;
    },
    kb: () => 2147483648,
    Ga: (a, b) => {
      a && (u[a >> 2] = ld);
      b && (u[b >> 2] = md);
    },
    E: () => performance.now(),
    La: () => O.Hi.length,
    Ea: (a, b) => {
      u[a >> 2] = screen.width;
      u[b >> 2] = screen.height;
    },
    xg: ie,
    wg: je,
    pd: (a, b) => {
      Q.beginQuery(a, U[b]);
    },
    Ng: (a, b) => {
      Q.Mh.beginQueryEXT(a, U[b]);
    },
    Uc: (a) => Q.beginTransformFeedback(a),
    vg: (a, b, c) => {
      Q.bindAttribLocation(S[a], b, c ? B(q, c) : "");
    },
    ug: ke,
    Rc: le,
    Sc: (a, b, c, d, e) => {
      Q.bindBufferRange(a, b, Nd[c], d, e);
    },
    tg: me,
    sg: ne,
    Zb: (a, b) => {
      Q.bindSampler(a, Ud[b]);
    },
    rg: oe,
    Qb: (a, b) => {
      Q.bindTransformFeedback(a, Vd[b]);
    },
    Zc: pe,
    Fg: pe,
    qg: (a, b, c, d) => Q.blendColor(a, b, c, d),
    pg: (a) => Q.blendEquation(a),
    og: (a, b) => Q.blendEquationSeparate(a, b),
    ng: qe,
    mg: (a, b, c, d) => Q.blendFuncSeparate(a, b, c, d),
    cd: (a, b, c, d, e, f, g, k, p, n) =>
      Q.blitFramebuffer(a, b, c, d, e, f, g, k, p, n),
    lg: re,
    kg: se,
    jg: (a) => Q.checkFramebufferStatus(a),
    ig: te,
    uc: (a, b, c, d) => Q.clearBufferfi(a, b, c, d),
    vc: (a, b, c) => {
      Q.clearBufferfv(a, b, y, c >> 2);
    },
    xc: (a, b, c) => {
      Q.clearBufferiv(a, b, u, c >> 2);
    },
    wc: (a, b, c) => {
      Q.clearBufferuiv(a, b, w, c >> 2);
    },
    hg: ue,
    gg: (a) => Q.clearDepth(a),
    fg: (a) => Q.clearStencil(a),
    gc: (a, b, c) => {
      c = Number(c);
      return Q.clientWaitSync(Wd[a], b, c);
    },
    Kd: (a, b) => {
      Q.Pj.clipControlEXT(a, b);
    },
    eg: (a, b, c, d) => {
      Q.colorMask(!!a, !!b, !!c, !!d);
    },
    dg: ve,
    cg: (a, b, c, d, e, f, g, k) => {
      Q.Rh || !g
        ? Q.compressedTexImage2D(a, b, c, d, e, f, g, k)
        : Q.compressedTexImage2D(a, b, c, d, e, f, q, k, g);
    },
    ud: (a, b, c, d, e, f, g, k, p) => {
      Q.Rh
        ? Q.compressedTexImage3D(a, b, c, d, e, f, g, k, p)
        : Q.compressedTexImage3D(a, b, c, d, e, f, g, q, p, k);
    },
    bg: (a, b, c, d, e, f, g, k, p) => {
      Q.Rh || !k
        ? Q.compressedTexSubImage2D(a, b, c, d, e, f, g, k, p)
        : Q.compressedTexSubImage2D(a, b, c, d, e, f, g, q, p, k);
    },
    td: (a, b, c, d, e, f, g, k, p, n, r) => {
      Q.Rh
        ? Q.compressedTexSubImage3D(a, b, c, d, e, f, g, k, p, n, r)
        : Q.compressedTexSubImage3D(a, b, c, d, e, f, g, k, p, q, r, n);
    },
    sc: (a, b, c, d, e) => Q.copyBufferSubData(a, b, c, d, e),
    ag: (a, b, c, d, e, f, g, k) => Q.copyTexImage2D(a, b, c, d, e, f, g, k),
    $f: (a, b, c, d, e, f, g, k) => Q.copyTexSubImage2D(a, b, c, d, e, f, g, k),
    vd: (a, b, c, d, e, f, g, k, p) =>
      Q.copyTexSubImage3D(a, b, c, d, e, f, g, k, p),
    _f: we,
    Zf: xe,
    Yf: ye,
    Xf: ze,
    Vf: Ae,
    Uf: Be,
    rd: (a, b) => {
      for (var c = 0; c < a; c++) {
        var d = u[(b + 4 * c) >> 2],
          e = U[d];
        e && (Q.deleteQuery(e), (U[d] = null));
      }
    },
    Pg: (a, b) => {
      for (var c = 0; c < a; c++) {
        var d = u[(b + 4 * c) >> 2],
          e = U[d];
        e && (Q.Mh.deleteQueryEXT(e), (U[d] = null));
      }
    },
    Tf: Ce,
    $b: (a, b) => {
      for (var c = 0; c < a; c++) {
        var d = u[(b + 4 * c) >> 2],
          e = Ud[d];
        e && (Q.deleteSampler(e), (e.name = 0), (Ud[d] = null));
      }
    },
    Sf: De,
    hc: (a) => {
      if (a) {
        var b = Wd[a];
        b ? (Q.deleteSync(b), (b.name = 0), (Wd[a] = null)) : (V ||= 1281);
      }
    },
    Rf: Ee,
    Pb: (a, b) => {
      for (var c = 0; c < a; c++) {
        var d = u[(b + 4 * c) >> 2],
          e = Vd[d];
        e && (Q.deleteTransformFeedback(e), (e.name = 0), (Vd[d] = null));
      }
    },
    Yc: Fe,
    Eg: Fe,
    Qf: Ge,
    Pf: He,
    Of: (a, b) => Q.depthRange(a, b),
    Nf: (a, b) => {
      Q.detachShader(S[a], T[b]);
    },
    Mf: Ie,
    Lf: (a) => {
      W.Vh[a].enabled = !1;
      Q.disableVertexAttribArray(a);
    },
    Kf: Je,
    lc: Ke,
    Ag: Ke,
    Fd: Ke,
    Gd: Ke,
    Bb: Ke,
    jd: Me,
    Ad: Me,
    Bg: Me,
    Jf: Ne,
    kc: Oe,
    zg: Oe,
    Bd: Oe,
    Cd: Oe,
    Dd: Oe,
    yd: (a, b, c, d, e, f) => {
      Ne(a, d, e, f);
    },
    If: Pe,
    Hf: Qe,
    od: (a) => Q.endQuery(a),
    Mg: (a) => {
      Q.Mh.endQueryEXT(a);
    },
    Tc: () => Q.endTransformFeedback(),
    jc: (a, b) =>
      (a = Q.fenceSync(a, b))
        ? ((b = be(Wd)), (a.name = b), (Wd[b] = a), b)
        : 0,
    Gf: () => Q.finish(),
    Ff: () => Q.flush(),
    _c: (a, b, c) => {
      if (Se(a)) {
        var d = Od[Re(a)];
        d
          ? d.rj & 16
            ? 0 > b || 0 > c || b + c > d.length
              ? ((V ||= 1281), l("invalid range in glFlushMappedBufferRange"))
              : Q.bufferSubData(a, d.offset, q.subarray(d.ei + b, d.ei + b + c))
            : ((V ||= 1282),
              l(
                "buffer was not mapped with GL_MAP_FLUSH_EXPLICIT_BIT in glFlushMappedBufferRange",
              ))
          : ((V ||= 1282),
            l("buffer was never mapped in glFlushMappedBufferRange"));
      } else ((V ||= 1280), l("GL_INVALID_ENUM in glFlushMappedBufferRange"));
    },
    Ef: Te,
    Df: Ue,
    ad: (a, b, c, d, e) => {
      Q.framebufferTextureLayer(a, b, Rd[c], d, e);
    },
    Cf: (a) => Q.frontFace(a),
    Bf: Ve,
    zf: We,
    sd: (a, b) => {
      ce(a, b, "createQuery", U);
    },
    Qg: (a, b) => {
      for (var c = 0; c < a; c++) {
        var d = Q.Mh.createQueryEXT();
        if (!d) {
          for (V ||= 1282; c < a; ) u[(b + 4 * c++) >> 2] = 0;
          break;
        }
        var e = be(U);
        d.name = e;
        U[e] = d;
        u[(b + 4 * c) >> 2] = e;
      }
    },
    yf: Xe,
    ac: (a, b) => {
      ce(a, b, "createSampler", Ud);
    },
    xf: Ye,
    Ob: (a, b) => {
      ce(a, b, "createTransformFeedback", Vd);
    },
    Xc: Ze,
    Dg: Ze,
    Af: (a) => Q.generateMipmap(a),
    wf: (a, b, c, d, e, f, g) => $e("getActiveAttrib", a, b, c, d, e, f, g),
    vf: (a, b, c, d, e, f, g) => $e("getActiveUniform", a, b, c, d, e, f, g),
    nc: (a, b, c, d, e) => {
      a = S[a];
      if ((a = Q.getActiveUniformBlockName(a, b)))
        e && 0 < c
          ? ((c = E(a, q, e, c)), d && (u[d >> 2] = c))
          : d && (u[d >> 2] = 0);
    },
    oc: (a, b, c, d) => {
      if (d)
        if (((a = S[a]), 35393 == c))
          u[d >> 2] = Q.getActiveUniformBlockName(a, b).length + 1;
        else {
          if (((a = Q.getActiveUniformBlockParameter(a, b, c)), null !== a))
            if (35395 == c)
              for (c = 0; c < a.length; c++) u[(d + 4 * c) >> 2] = a[c];
            else u[d >> 2] = a;
        }
      else V ||= 1281;
    },
    qc: (a, b, c, d, e) => {
      if (e)
        if (0 < b && 0 == c) V ||= 1281;
        else {
          a = S[a];
          for (var f = [], g = 0; g < b; g++) f.push(u[(c + 4 * g) >> 2]);
          if ((a = Q.getActiveUniforms(a, f, d)))
            for (b = a.length, g = 0; g < b; g++) u[(e + 4 * g) >> 2] = a[g];
        }
      else V ||= 1281;
    },
    uf: (a, b, c, d) => {
      a = Q.getAttachedShaders(S[a]);
      var e = a.length;
      e > b && (e = b);
      u[c >> 2] = e;
      for (b = 0; b < e; ++b) u[(d + 4 * b) >> 2] = T.indexOf(a[b]);
    },
    tf: (a, b) => Q.getAttribLocation(S[a], b ? B(q, b) : ""),
    sf: (a, b) => cf(a, b, 4),
    bc: (a, b, c) => {
      c ? af(c, Q.getBufferParameter(a, b)) : (V ||= 1281);
    },
    qf: (a, b, c) => {
      c ? (u[c >> 2] = Q.getBufferParameter(a, b)) : (V ||= 1281);
    },
    kd: (a, b, c) => {
      if (35005 == b) {
        b = 0;
        if ((a = Od[Re(a)])) b = a.ei;
        u[c >> 2] = b;
      } else ((V ||= 1280), l("GL_INVALID_ENUM in glGetBufferPointerv"));
    },
    pf: () => {
      var a = Q.getError() || V;
      V = 0;
      return a;
    },
    of: (a, b) => cf(a, b, 2),
    Gc: (a, b) => Q.getFragDataLocation(S[a], b ? B(q, b) : ""),
    nf: (a, b, c, d) => {
      a = Q.getFramebufferAttachmentParameter(a, b, c);
      if (a instanceof WebGLRenderbuffer || a instanceof WebGLTexture)
        a = a.name | 0;
      u[d >> 2] = a;
    },
    cc: (a, b, c) => df(a, b, c, 1),
    ec: (a, b) => {
      cf(a, b, 1);
    },
    Vc: (a, b, c) => df(a, b, c, 0),
    mf: (a, b) => cf(a, b, 0),
    Db: (a, b, c, d, e) => {
      if (0 > d) V ||= 1281;
      else if (e) {
        if (((a = Q.getInternalformatParameter(a, b, c)), null !== a))
          for (b = 0; b < a.length && b < d; ++b) u[(e + 4 * b) >> 2] = a[b];
      } else V ||= 1281;
    },
    Kb: () => {
      V ||= 1282;
    },
    kf: ef,
    lf: ff,
    Hg: gf,
    Jg: hf,
    Gg: gf,
    md: (a, b, c) => {
      if (c) {
        a = Q.getQueryParameter(U[a], b);
        var d;
        "boolean" == typeof a ? (d = a ? 1 : 0) : (d = a);
        u[c >> 2] = d;
      } else V ||= 1281;
    },
    Ig: hf,
    nd: (a, b, c) => {
      c ? (u[c >> 2] = Q.getQuery(a, b)) : (V ||= 1281);
    },
    Kg: (a, b, c) => {
      c ? (u[c >> 2] = Q.Mh.getQueryEXT(a, b)) : (V ||= 1281);
    },
    jf: (a, b, c) => {
      c ? (u[c >> 2] = Q.getRenderbufferParameter(a, b)) : (V ||= 1281);
    },
    Sb: (a, b, c) => {
      c ? (y[c >> 2] = Q.getSamplerParameter(Ud[a], b)) : (V ||= 1281);
    },
    Tb: (a, b, c) => {
      c ? (u[c >> 2] = Q.getSamplerParameter(Ud[a], b)) : (V ||= 1281);
    },
    gf: jf,
    ff: (a, b, c, d) => {
      a = Q.getShaderPrecisionFormat(a, b);
      u[c >> 2] = a.rangeMin;
      u[(c + 4) >> 2] = a.rangeMax;
      u[d >> 2] = a.precision;
    },
    ef: (a, b, c, d) => {
      if ((a = Q.getShaderSource(T[a])))
        ((b = 0 < b && d ? E(a, q, d, b) : 0), c && (u[c >> 2] = b));
    },
    hf: kf,
    df: mf,
    tc: (a, b) => {
      if (2 > W.version) return ((V ||= 1282), 0);
      var c = Zd[a];
      if (c) return 0 > b || b >= c.length ? ((V ||= 1281), 0) : c[b];
      switch (a) {
        case 7939:
          return (
            (c = bf().map(lf)),
            (c = Zd[a] = c),
            0 > b || b >= c.length ? ((V ||= 1281), 0) : c[b]
          );
        default:
          return ((V ||= 1280), 0);
      }
    },
    dc: (a, b, c, d, e) => {
      0 > c
        ? (V ||= 1281)
        : e
          ? ((a = Q.getSyncParameter(Wd[a], b)),
            null !== a && ((u[e >> 2] = a), d && (u[d >> 2] = 1)))
          : (V ||= 1281);
    },
    cf: (a, b, c) => {
      c ? (y[c >> 2] = Q.getTexParameter(a, b)) : (V ||= 1281);
    },
    bf: (a, b, c) => {
      c ? (u[c >> 2] = Q.getTexParameter(a, b)) : (V ||= 1281);
    },
    Pc: (a, b, c, d, e, f, g) => {
      a = S[a];
      if ((a = Q.getTransformFeedbackVarying(a, b)))
        (g && 0 < c
          ? ((c = E(a.name, q, g, c)), d && (u[d >> 2] = c))
          : d && (u[d >> 2] = 0),
          e && (u[e >> 2] = a.size),
          f && (u[f >> 2] = a.type));
    },
    pc: nf,
    rc: (a, b, c, d) => {
      if (d)
        if (0 < b && (0 == c || 0 == d)) V ||= 1281;
        else {
          a = S[a];
          for (var e = [], f = 0; f < b; f++) e.push(Ma(w[(c + 4 * f) >> 2]));
          if ((a = Q.getUniformIndices(a, e)))
            for (b = a.length, f = 0; f < b; f++) u[(d + 4 * f) >> 2] = a[f];
        }
      else V ||= 1281;
    },
    _e: qf,
    af: (a, b, c) => {
      rf(a, b, c, 2);
    },
    $e: (a, b, c) => {
      rf(a, b, c, 0);
    },
    Hc: (a, b, c) => rf(a, b, c, 0),
    Nc: tf,
    Mc: tf,
    Xe: (a, b, c) => {
      c
        ? (W.Vh[a].enabled &&
            l(
              "glGetVertexAttribPointer on client-side array: not supported, bad data returned",
            ),
          (u[c >> 2] = Q.getVertexAttribOffset(a, b)))
        : (V ||= 1281);
    },
    Ze: (a, b, c) => {
      sf(a, b, c, 2);
    },
    Ye: (a, b, c) => {
      sf(a, b, c, 5);
    },
    We: (a, b) => Q.hint(a, b),
    Hb: (a, b, c) => {
      for (var d = Le[b], e = 0; e < b; e++) d[e] = u[(c + 4 * e) >> 2];
      Q.invalidateFramebuffer(a, d);
    },
    Gb: (a, b, c, d, e, f, g) => {
      for (var k = Le[b], p = 0; p < b; p++) k[p] = u[(c + 4 * p) >> 2];
      Q.invalidateSubFramebuffer(a, k, d, e, f, g);
    },
    Ve: (a) => ((a = Nd[a]) ? Q.isBuffer(a) : 0),
    Ue: (a) => Q.isEnabled(a),
    Te: (a) => ((a = Pd[a]) ? Q.isFramebuffer(a) : 0),
    Se: (a) => ((a = S[a]) ? Q.isProgram(a) : 0),
    qd: (a) => ((a = U[a]) ? Q.isQuery(a) : 0),
    Og: (a) => ((a = U[a]) ? Q.Mh.isQueryEXT(a) : 0),
    Re: (a) => ((a = Qd[a]) ? Q.isRenderbuffer(a) : 0),
    _b: (a) => ((a = Ud[a]) ? Q.isSampler(a) : 0),
    Qe: (a) => ((a = T[a]) ? Q.isShader(a) : 0),
    ic: (a) => Q.isSync(Wd[a]),
    Pe: (a) => ((a = Rd[a]) ? Q.isTexture(a) : 0),
    Nb: (a) => Q.isTransformFeedback(Vd[a]),
    Wc: uf,
    Cg: uf,
    Oe: (a) => Q.lineWidth(a),
    Me: vf,
    $c: wf,
    Mb: () => Q.pauseTransformFeedback(),
    Le: (a, b) => {
      3317 == a ? ($d = b) : 3314 == a && (ae = b);
      Q.pixelStorei(a, b);
    },
    Jd: (a, b) => {
      Q.ik.polygonModeWEBGL(a, b);
    },
    Ke: (a, b) => Q.polygonOffset(a, b),
    Ld: (a, b, c) => {
      Q.Qj.polygonOffsetClampEXT(a, b, c);
    },
    Jb: () => {
      V ||= 1280;
    },
    Ib: () => {
      V ||= 1280;
    },
    Lg: (a, b) => {
      Q.Mh.queryCounterEXT(U[a], b);
    },
    zd: (a) => Q.readBuffer(a),
    Je: (a, b, c, d, e, f, g) => {
      if (Q.Qi) Q.readPixels(a, b, c, d, e, f, g);
      else {
        var k = xf(f);
        g >>>= 31 - Math.clz32(k.BYTES_PER_ELEMENT);
        Q.readPixels(a, b, c, d, e, f, k, g);
      }
    },
    Ie: () => {},
    He: yf,
    bd: (a, b, c, d, e) => Q.renderbufferStorageMultisample(a, b, c, d, e),
    Lb: () => Q.resumeTransformFeedback(),
    Ge: (a, b) => {
      Q.sampleCoverage(a, !!b);
    },
    Wb: (a, b, c) => {
      Q.samplerParameterf(Ud[a], b, c);
    },
    Ub: (a, b, c) => {
      Q.samplerParameterf(Ud[a], b, y[c >> 2]);
    },
    Yb: (a, b, c) => {
      Q.samplerParameteri(Ud[a], b, c);
    },
    Xb: (a, b, c) => {
      Q.samplerParameteri(Ud[a], b, u[c >> 2]);
    },
    Fe: (a, b, c, d) => Q.scissor(a, b, c, d),
    Ee: () => {
      V ||= 1280;
    },
    De: zf,
    Ce: (a, b, c) => Q.stencilFunc(a, b, c),
    Be: (a, b, c, d) => Q.stencilFuncSeparate(a, b, c, d),
    Ae: (a) => Q.stencilMask(a),
    ze: (a, b) => Q.stencilMaskSeparate(a, b),
    ye: (a, b, c) => Q.stencilOp(a, b, c),
    xe: (a, b, c, d) => Q.stencilOpSeparate(a, b, c, d),
    we: Bf,
    xd: (a, b, c, d, e, f, g, k, p, n) => {
      if (Q.Rh) Q.texImage3D(a, b, c, d, e, f, g, k, p, n);
      else if (n) {
        var r = xf(p);
        Q.texImage3D(
          a,
          b,
          c,
          d,
          e,
          f,
          g,
          k,
          p,
          r,
          n >>> (31 - Math.clz32(r.BYTES_PER_ELEMENT)),
        );
      } else Q.texImage3D(a, b, c, d, e, f, g, k, p, null);
    },
    ve: (a, b, c) => Q.texParameterf(a, b, c),
    ue: (a, b, c) => {
      Q.texParameterf(a, b, y[c >> 2]);
    },
    te: Cf,
    se: (a, b, c) => {
      Q.texParameteri(a, b, u[c >> 2]);
    },
    Fb: (a, b, c, d, e) => Q.texStorage2D(a, b, c, d, e),
    Eb: (a, b, c, d, e, f) => Q.texStorage3D(a, b, c, d, e, f),
    re: (a, b, c, d, e, f, g, k, p) => {
      if (Q.Rh) Q.texSubImage2D(a, b, c, d, e, f, g, k, p);
      else if (p) {
        var n = xf(k);
        Q.texSubImage2D(
          a,
          b,
          c,
          d,
          e,
          f,
          g,
          k,
          n,
          p >>> (31 - Math.clz32(n.BYTES_PER_ELEMENT)),
        );
      } else
        ((p = p ? Af(k, g, e, f, p) : null),
          Q.texSubImage2D(a, b, c, d, e, f, g, k, p));
    },
    wd: (a, b, c, d, e, f, g, k, p, n, r) => {
      if (Q.Rh) Q.texSubImage3D(a, b, c, d, e, f, g, k, p, n, r);
      else if (r) {
        var v = xf(n);
        Q.texSubImage3D(
          a,
          b,
          c,
          d,
          e,
          f,
          g,
          k,
          p,
          n,
          v,
          r >>> (31 - Math.clz32(v.BYTES_PER_ELEMENT)),
        );
      } else Q.texSubImage3D(a, b, c, d, e, f, g, k, p, n, null);
    },
    Qc: (a, b, c, d) => {
      a = S[a];
      for (var e = [], f = 0; f < b; f++) e.push(Ma(w[(c + 4 * f) >> 2]));
      Q.transformFeedbackVaryings(a, e, d);
    },
    qe: Df,
    pe: (a, b, c) => {
      b && Q.uniform1fv(Z(a), y, c >> 2, b);
    },
    oe: Ef,
    ne: (a, b, c) => {
      b && Q.uniform1iv(Z(a), u, c >> 2, b);
    },
    Fc: (a, b) => {
      Q.uniform1ui(Z(a), b);
    },
    Bc: (a, b, c) => {
      b && Q.uniform1uiv(Z(a), w, c >> 2, b);
    },
    me: Ff,
    le: (a, b, c) => {
      b && Q.uniform2fv(Z(a), y, c >> 2, 2 * b);
    },
    ke: (a, b, c) => {
      Q.uniform2i(Z(a), b, c);
    },
    je: (a, b, c) => {
      b && Q.uniform2iv(Z(a), u, c >> 2, 2 * b);
    },
    Ec: (a, b, c) => {
      Q.uniform2ui(Z(a), b, c);
    },
    Ac: (a, b, c) => {
      b && Q.uniform2uiv(Z(a), w, c >> 2, 2 * b);
    },
    he: (a, b, c, d) => {
      Q.uniform3f(Z(a), b, c, d);
    },
    ge: (a, b, c) => {
      b && Q.uniform3fv(Z(a), y, c >> 2, 3 * b);
    },
    fe: (a, b, c, d) => {
      Q.uniform3i(Z(a), b, c, d);
    },
    ee: (a, b, c) => {
      b && Q.uniform3iv(Z(a), u, c >> 2, 3 * b);
    },
    Dc: (a, b, c, d) => {
      Q.uniform3ui(Z(a), b, c, d);
    },
    zc: (a, b, c) => {
      b && Q.uniform3uiv(Z(a), w, c >> 2, 3 * b);
    },
    de: Gf,
    ce: (a, b, c) => {
      b && Q.uniform4fv(Z(a), y, c >> 2, 4 * b);
    },
    be: (a, b, c, d, e) => {
      Q.uniform4i(Z(a), b, c, d, e);
    },
    ae: (a, b, c) => {
      b && Q.uniform4iv(Z(a), u, c >> 2, 4 * b);
    },
    Cc: (a, b, c, d, e) => {
      Q.uniform4ui(Z(a), b, c, d, e);
    },
    yc: (a, b, c) => {
      b && Q.uniform4uiv(Z(a), w, c >> 2, 4 * b);
    },
    mc: Hf,
    $d: (a, b, c, d) => {
      b && Q.uniformMatrix2fv(Z(a), !!c, y, d >> 2, 4 * b);
    },
    id: (a, b, c, d) => {
      b && Q.uniformMatrix2x3fv(Z(a), !!c, y, d >> 2, 6 * b);
    },
    gd: (a, b, c, d) => {
      b && Q.uniformMatrix2x4fv(Z(a), !!c, y, d >> 2, 8 * b);
    },
    _d: (a, b, c, d) => {
      b && Q.uniformMatrix3fv(Z(a), !!c, y, d >> 2, 9 * b);
    },
    hd: (a, b, c, d) => {
      b && Q.uniformMatrix3x2fv(Z(a), !!c, y, d >> 2, 6 * b);
    },
    ed: (a, b, c, d) => {
      b && Q.uniformMatrix3x4fv(Z(a), !!c, y, d >> 2, 12 * b);
    },
    Zd: If,
    fd: (a, b, c, d) => {
      b && Q.uniformMatrix4x2fv(Z(a), !!c, y, d >> 2, 8 * b);
    },
    dd: (a, b, c, d) => {
      b && Q.uniformMatrix4x3fv(Z(a), !!c, y, d >> 2, 12 * b);
    },
    ld: Kf,
    Yd: Lf,
    Xd: (a) => {
      Q.validateProgram(S[a]);
    },
    Wd: (a, b) => Q.vertexAttrib1f(a, b),
    Vd: (a, b) => {
      Q.vertexAttrib1f(a, y[b >> 2]);
    },
    Ud: (a, b, c) => Q.vertexAttrib2f(a, b, c),
    Td: (a, b) => {
      Q.vertexAttrib2f(a, y[b >> 2], y[(b + 4) >> 2]);
    },
    Sd: (a, b, c, d) => Q.vertexAttrib3f(a, b, c, d),
    Rd: (a, b) => {
      Q.vertexAttrib3f(a, y[b >> 2], y[(b + 4) >> 2], y[(b + 8) >> 2]);
    },
    Qd: (a, b, c, d, e) => Q.vertexAttrib4f(a, b, c, d, e),
    Od: (a, b) => {
      Q.vertexAttrib4f(
        a,
        y[b >> 2],
        y[(b + 4) >> 2],
        y[(b + 8) >> 2],
        y[(b + 12) >> 2],
      );
    },
    Rb: Mf,
    yg: Mf,
    Hd: Mf,
    Id: Mf,
    Cb: Mf,
    Lc: (a, b, c, d, e) => Q.vertexAttribI4i(a, b, c, d, e),
    Jc: (a, b) => {
      Q.vertexAttribI4i(
        a,
        u[b >> 2],
        u[(b + 4) >> 2],
        u[(b + 8) >> 2],
        u[(b + 12) >> 2],
      );
    },
    Kc: (a, b, c, d, e) => Q.vertexAttribI4ui(a, b, c, d, e),
    Ic: (a, b) => {
      Q.vertexAttribI4ui(
        a,
        w[b >> 2],
        w[(b + 4) >> 2],
        w[(b + 8) >> 2],
        w[(b + 12) >> 2],
      );
    },
    Oc: Nf,
    Nd: Of,
    Md: Pf,
    fc: (a, b, c) => {
      c = Number(c);
      Q.waitSync(Wd[a], b, c);
    },
    C: () => 0,
    Sg: (a, b, c) =>
      Qf(a, {
        jj: u[c >> 2],
        Oi: u[(c + 4) >> 2],
        Rj: u[(c + 8) >> 2],
        Nj: b,
        Ci: u[(c + 12) >> 2],
        uj: u[(c + 16) >> 2],
      }),
    T: (a, b) => {
      a = P(a);
      return a
        ? a.requestPointerLock
          ? Qc()
            ? hd(a)
            : b
              ? (Oc(hd, 2, [a]), 1)
              : -2
          : -1
        : -4;
    },
    jb: (a) => {
      var b = q.length;
      a >>>= 0;
      if (2147483648 < a) return !1;
      for (var c = 1; 4 >= c; c *= 2) {
        var d = b * (1 + 0.2 / c);
        d = Math.min(d, a + 100663296);
        a: {
          d =
            ((Math.min(2147483648, 65536 * Math.ceil(Math.max(a, d) / 65536)) -
              ua.buffer.byteLength +
              65535) /
              65536) |
            0;
          try {
            ua.grow(d);
            ta();
            var e = 1;
            break a;
          } catch (f) {}
          e = void 0;
        }
        if (e) return !0;
      }
      return !1;
    },
    _: Rf,
    wa: (a, b, c) =>
      "undefined" == typeof onbeforeunload ? -1 : 1 !== c ? -5 : Sf(a, b),
    Q: (a, b, c, d) => Tf(a, b, c, d, 12, "blur"),
    t: $c,
    Ha: (a, b, c) => Uf(a, b, c),
    z: (a, b, c) => {
      a = P(a);
      if (!a) return -4;
      a.style.width = b + "px";
      a.style.height = c + "px";
      return 0;
    },
    R: (a, b, c, d) => Tf(a, b, c, d, 13, "focus"),
    O: (a, b, c, d) => {
      if (!O.fullscreenEnabled()) return -1;
      a = P(a);
      if (!a) return -4;
      Vf(a, b, c, d, "webkitfullscreenchange");
      return Vf(a, b, c, d, "fullscreenchange");
    },
    Y: (a, b, c) => (Rf() ? -1 : Wf(a, b, c, 26, "gamepadconnected")),
    X: (a, b, c) => (Rf() ? -1 : Wf(a, b, c, 27, "gamepaddisconnected")),
    Aa: (a, b, c, d) => Xf(a, b, c, d, 2, "keydown"),
    ya: (a, b, c, d) => Xf(a, b, c, d, 1, "keypress"),
    za: (a, b, c, d) => Xf(a, b, c, d, 3, "keyup"),
    rf: (a, b, c, d) => {
      Dd(() => C(a)(b), c, d, b);
    },
    W: ud,
    Ba: (a, b, c) => (window.screen && screen.orientation ? Yf(a, b, c) : -1),
    P: (a, b, c, d) =>
      document.body?.requestPointerLock
        ? (a = P(a))
          ? Zf(a, b, c, d)
          : -4
        : -1,
    N: (a, b, c, d) => $f(a, b, c, d),
    xa: (a, b, c) => (Uc[1] ? ag(a, b, c) : -4),
    M: (a, b, c, d) =>
      (a = P(a)) ? ("undefined" != typeof a.onwheel ? bg(a, b, c, d) : -1) : -4,
    Ug: (a) => (document.title = a ? B(q, a) : ""),
    A: () => {
      A(
        "Please compile your program with async support in order to use asynchronous operations like emscripten_sleep",
      );
    },
    Fa: (a, b) => {
      var c = b >> 2;
      b = {
        alpha: !!m[b + 0],
        depth: !!m[b + 1],
        stencil: !!m[b + 2],
        antialias: !!m[b + 3],
        premultipliedAlpha: !!m[b + 4],
        preserveDrawingBuffer: !!m[b + 5],
        powerPreference: cg[u[c + 2]],
        failIfMajorPerformanceCaveat: !!m[b + 12],
        bk: u[c + 4],
        Hk: u[c + 5],
        wj: m[b + 24],
        Oj: m[b + 25],
        Lk: u[c + 7],
        Ok: m[b + 32],
      };
      a = P(a);
      return !a || b.Oj ? 0 : he(a, b);
    },
    U: (a) => {
      W == a && (W = 0);
      W === Td[a] && (W = null);
      "object" == typeof O && O.fk(Td[a].$h.canvas);
      Td[a]?.$h.canvas && (Td[a].$h.canvas.ri = void 0);
      Td[a] = null;
    },
    V: (a) => {
      W = Td[a];
      h.ctx = Q = W?.$h;
      return !a || Q ? 0 : -5;
    },
    yb: (a, b) => {
      var c = 0,
        d = 0,
        e;
      for (e of fg()) {
        var f = b + c;
        w[(a + d) >> 2] = f;
        c += E(e, q, f, Infinity) + 1;
        d += 4;
      }
      return 0;
    },
    zb: (a, b) => {
      var c = fg();
      w[a >> 2] = c.length;
      a = 0;
      for (var d of c) a += bb(d) + 1;
      w[b >> 2] = a;
      return 0;
    },
    na: function (a) {
      try {
        var b = Lb(a);
        Yb(b);
        return 0;
      } catch (c) {
        if ("undefined" == typeof M || "ErrnoError" !== c.name) throw c;
        return c.Dh;
      }
    },
    rb: function (a, b, c, d) {
      try {
        a: {
          var e = Lb(a);
          a = b;
          for (var f, g = (b = 0); g < c; g++) {
            var k = w[a >> 2],
              p = w[(a + 4) >> 2];
            a += 8;
            var n = e,
              r = k,
              v = p,
              x = f,
              D = m;
            if (0 > v || 0 > x) throw new F(28);
            if (null === n.fd) throw new F(8);
            if (1 === (n.flags & 2097155)) throw new F(8);
            if (J(n.node.mode)) throw new F(31);
            if (!n.wh.read) throw new F(28);
            var G = "undefined" != typeof x;
            if (!G) x = n.position;
            else if (!n.seekable) throw new F(70);
            var N = n.wh.read(n, D, r, v, x);
            G || (n.position += N);
            var H = N;
            if (0 > H) {
              var L = -1;
              break a;
            }
            b += H;
            if (H < p) break;
            "undefined" != typeof f && (f += H);
          }
          L = b;
        }
        w[d >> 2] = L;
        return 0;
      } catch (X) {
        if ("undefined" == typeof M || "ErrnoError" !== X.name) throw X;
        return X.Dh;
      }
    },
    lb: function (a, b, c, d) {
      b = -9007199254740992 > b || 9007199254740992 < b ? NaN : Number(b);
      try {
        if (isNaN(b)) return 61;
        var e = Lb(a);
        Zb(e, b, c);
        ra[d >> 3] = BigInt(e.position);
        e.$i && 0 === b && 0 === c && (e.$i = null);
        return 0;
      } catch (f) {
        if ("undefined" == typeof M || "ErrnoError" !== f.name) throw f;
        return f.Dh;
      }
    },
    qb: function (a, b, c, d) {
      try {
        a: {
          var e = Lb(a);
          a = b;
          for (var f, g = (b = 0); g < c; g++) {
            var k = w[a >> 2],
              p = w[(a + 4) >> 2];
            a += 8;
            var n = $b(e, m, k, p, f);
            if (0 > n) {
              var r = -1;
              break a;
            }
            b += n;
            if (n < p) break;
            "undefined" != typeof f && (f += n);
          }
          r = b;
        }
        w[d >> 2] = r;
        return 0;
      } catch (v) {
        if ("undefined" == typeof M || "ErrnoError" !== v.name) throw v;
        return v.Dh;
      }
    },
    J: ie,
    da: je,
    c: ke,
    ba: le,
    n: me,
    ua: ne,
    x: oe,
    i: pe,
    qa: qe,
    d: re,
    q: se,
    K: te,
    Ed: ue,
    ga: ve,
    cb: we,
    ka: xe,
    ra: ye,
    w: ze,
    sa: Ae,
    sb: Be,
    Pd: Ce,
    ca: De,
    Oa: Ee,
    G: Fe,
    D: Ge,
    B: He,
    k: Ie,
    I: Je,
    oa: Ke,
    Vb: Ne,
    s: Oe,
    j: Pe,
    e: Qe,
    ie: Te,
    $: Ue,
    g: Ve,
    va: We,
    Ne: Xe,
    Pa: Ye,
    l: Ze,
    Xa: ef,
    Ya: ff,
    ea: jf,
    fa: kf,
    Ab: mf,
    Wa: nf,
    v: qf,
    Za: vf,
    Na: wf,
    ta: yf,
    ha: zf,
    aa: Bf,
    F: Cf,
    Ta: Df,
    Ua: Ef,
    Sa: Ff,
    Ra: Gf,
    Va: Hf,
    Qa: If,
    Ma: Kf,
    pa: Lf,
    r: Mf,
    Wf: Nf,
    f: Of,
    L: Pf,
    $a: Gc,
    hb: function (a, b) {
      try {
        return (Za(q.subarray(a, a + b)), 0);
      } catch (c) {
        if ("undefined" == typeof M || "ErrnoError" !== c.name) throw c;
        return c.Dh;
      }
    },
  };
function Ag(a = []) {
  var b = xg;
  a.unshift(ea);
  var c = a.length,
    d = Vc(4 * (c + 1)),
    e = d,
    f;
  for (f of a) ((w[e >> 2] = Wc(f)), (e += 4));
  w[e >> 2] = 0;
  try {
    var g = b(c, d);
    pa = g;
    Gc(g);
  } catch (k) {
    Fc(k);
  }
}
function Bg(a = da) {
  function b() {
    h.calledRun = !0;
    if (!oa) {
      if (!h.noFSInit && !yb) {
        var c, d;
        yb = !0;
        c ??= h.stdin;
        d ??= h.stdout;
        e ??= h.stderr;
        c ? dc("/dev", "stdin", c) : Tb("/dev/tty", "/dev/stdin");
        d ? dc("/dev", "stdout", null, d) : Tb("/dev/tty", "/dev/stdout");
        e ? dc("/dev", "stderr", null, e) : Tb("/dev/tty1", "/dev/stderr");
        Xb("/dev/stdin", 0);
        Xb("/dev/stdout", 1);
        Xb("/dev/stderr", 1);
      }
      Cg.Wg();
      zb = !1;
      h.onRuntimeInitialized?.();
      h.noInitialRun || Ag(a);
      if (h.postRun)
        for (
          "function" == typeof h.postRun && (h.postRun = [h.postRun]);
          h.postRun.length;
        ) {
          var e = h.postRun.shift();
          Ba.push(e);
        }
      Aa(Ba);
    }
  }
  if (0 < Ea) Fa = Bg;
  else {
    if (h.preRun)
      for (
        "function" == typeof h.preRun && (h.preRun = [h.preRun]);
        h.preRun.length;
      )
        Da();
    Aa(Ca);
    0 < Ea
      ? (Fa = Bg)
      : h.setStatus
        ? (h.setStatus("Running..."),
          setTimeout(() => {
            setTimeout(() => h.setStatus(""), 1);
            b();
          }, 1))
        : b();
  }
}
var Cg;
(async function () {
  function a(c) {
    c = Cg = c.exports;
    xg = h._main = c.Yg;
    Y = c.Zg;
    Jf = c._g;
    ng = h._SDL_free = c.$g;
    kg = h._SDL_malloc = c.ah;
    h._SDL_calloc = c.bh;
    h._SDL_realloc = c.ch;
    h._SDLEmscriptenCameraPermissionOutcome = c.dh;
    h._SDLEmscriptenThreadIterate = c.eh;
    og = h._Emscripten_HandlePointerEnter = c.fh;
    pg = h._Emscripten_HandlePointerLeave = c.gh;
    qg = h._Emscripten_HandlePointerGeneric = c.hh;
    mg = h._Emscripten_HandleMouseButtonUpGlobal = c.ih;
    rg = h._Emscripten_SendDragEvent = c.jh;
    ug = h._Emscripten_SendDragCompleteEvent = c.kh;
    sg = h._Emscripten_SendDragTextEvent = c.lh;
    tg = h._Emscripten_SendDragFileEvent = c.mh;
    lg = h._Emscripten_HandleLockKeysCheck = c.nh;
    wg = h._Emscripten_SendSystemThemeChangedEvent = c.oh;
    vg = h._requestFullscreenThroughSDL = c.ph;
    yg = c.qh;
    Yc = c.rh;
    Vc = c.sh;
    Xc = c.th;
    ua = c.Vg;
    Oa = c.Xg;
    ta();
    Ga("wasm-instantiate");
    return Cg;
  }
  Ha("wasm-instantiate");
  var b = { a: zg };
  if (h.instantiateWasm)
    return new Promise((c) => {
      h.instantiateWasm(b, (d, e) => {
        c(a(d, e));
      });
    });
  va ??= h.locateFile ? h.locateFile("index.wasm", ia) : ia + "index.wasm";
  return a((await ya(b)).instance);
})();
Bg();
