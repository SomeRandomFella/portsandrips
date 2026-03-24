(function () {
  var Player = {};

  var indexedDB =
    window.indexedDB ||
    window.mozIndexedDB ||
    window.webkitIndexedDB ||
    window.msIndexedDB;
  Player.openDB = function () {
    return new Promise(function (resolve, reject) {
      if (!indexedDB) reject("IndexedDB is not supported");
      var req = indexedDB.open("EM_PRELOAD_CACHE", 1);
      req.onupgradeneeded = function (event) {
        var db = event.target.result;
        if (db.objectStoreNames.contains("PACKAGES"))
          db.deleteObjectStore("PACKAGES");
        db.createObjectStore("PACKAGES");
      };
      req.onerror = function (error) {
        reject(error);
      };
      req.onsuccess = function (event) {
        var db = event.target.result;
        if (!db.objectStoreNames.contains("PACKAGES")) {
          db.close();
          var req2 = indexedDB.deleteDatabase("EM_PRELOAD_CACHE");
          req2.onerror = function (error) {
            reject(error);
          };
          req2.onsuccess = function (event) {
            resolve(db);
          };
        } else {
          resolve(db);
        }
      };
    });
  };

  Player.deletePkg = function (uri) {
    return new Promise(function (resolve, reject) {
      Player.openDB()
        .then(function (db) {
          var trans = db.transaction(["PACKAGES"], "readwrite");
          var req = trans.objectStore("PACKAGES").delete(uri);
          req.onerror = function (error) {
            reject(error);
          };
          req.onsuccess = function (event) {
            resolve();
          };
        })
        .catch(function (e) {
          reject(e);
        });
    });
  };

  Player.deletePkgs = function () {
    return new Promise(function (resolve, reject) {
      var req = indexedDB.deleteDatabase("PACKAGES");
      req.onerror = function (e) {
        reject(e);
      };
      req.onsuccess = function (e) {
        resolve();
      };
    });
  };

  Player.storePkg = function (uri, data) {
    return new Promise(function (resolve, reject) {
      Player.openDB()
        .then(function (db) {
          var trans = db.transaction(["PACKAGES"], "readwrite");
          var req = trans.objectStore("PACKAGES").put(data, uri);
          req.onerror = function (error) {
            reject(error);
          };
          req.onsuccess = function (event) {
            resolve();
          };
        })
        .catch(function (e) {
          reject(e);
        });
    });
  };

  Player.readPkg = function (uri) {
    return new Promise(function (resolve, reject) {
      Player.openDB()
        .then(function (db) {
          var trans = db.transaction(["PACKAGES"], "readonly");
          var req = trans.objectStore("PACKAGES").get(uri);
          req.onerror = function (error) {
            reject(error);
          };
          req.onsuccess = function (event) {
            resolve(event.target.result);
          };
        })
        .catch(function (e) {
          reject(e);
        });
    });
  };

  Player.mergeParts = function (uri) {
    return fetch("split-manifest.json")
      .then(function (res) {
        if (!res.ok) throw new Error("no manifest");
        return res.json();
      })
      .then(function (manifest) {
        return Promise.all(
          manifest.chunks.map(function (p) {
            return fetch(p).then(function (res) {
              if (!res.ok) throw new Error("Could not fetch " + p);
              return res.arrayBuffer();
            });
          }),
        );
      })
      .then(function (buffers) {
        var totalLength = buffers.reduce(function (acc, b) {
          return acc + b.byteLength;
        }, 0);
        var merged = new Uint8Array(totalLength);
        var offset = 0;
        buffers.forEach(function (b) {
          merged.set(new Uint8Array(b), offset);
          offset += b.byteLength;
        });
        return merged;
      });
  };

  Player.fetchPkg = function (uri, nocache, love) {
    return new Promise(function (resolve, reject) {
      if (love) {
        Player.readPkg(uri)
          .then(function (cached) {
            if (cached && !nocache) {
              resolve(cached);
              return;
            }
            Player.mergeParts(uri)
              .then(function (merged) {
                var head = [80, 75, 3, 4];
                for (var i = 0; i < head.length; i++) {
                  if (merged[i] != head[i]) {
                    return reject(
                      "The fetched resource is not a valid love package",
                    );
                  }
                }
                Player.storePkg(uri, merged);
                resolve(merged);
              })
              .catch(reject);
          })
          .catch(function () {
            Player.mergeParts(uri)
              .then(function (merged) {
                var head = [80, 75, 3, 4];
                for (var i = 0; i < head.length; i++) {
                  if (merged[i] != head[i]) {
                    return reject(
                      "The fetched resource is not a valid love package",
                    );
                  }
                }
                Player.storePkg(uri, merged);
                resolve(merged);
              })
              .catch(reject);
          });
        return;
      }

      var data;
      Player.readPkg(uri)
        .then(function (cache) {
          data = cache;
        })
        .catch(function (e) {
          console.warn(e);
        })
        .finally(function () {
          if (data && !nocache) {
            resolve(data);
            return;
          }
          fetch(uri)
            .then(function (res) {
              if (!res.ok) return reject("Could not fetch the love package");
              return res.arrayBuffer();
            })
            .then(function (data) {
              data = new Uint8Array(data);
              Player.storePkg(uri, data);
              resolve(data);
            });
        });
    });
  };

  Player.fetchPkgs = function (uri, nocache) {
    return new Promise(function (resolve, reject) {
      var list = [uri];
      list.push("normalize.lua");
      list.push("normalizem.lua");
      var loaded = 0;
      var cache = {};
      for (let i = 0; i < list.length; i++) {
        Player.fetchPkg(list[i], nocache, i == 0)
          .then(function (raw) {
            cache[list[i]] = raw;
            loaded++;
            if (list.length == loaded) resolve(cache);
          })
          .catch(function (e) {
            reject(e);
          });
      }
    });
  };

  Player.runPkgs = function (uri, cache, arg, canvas, ops) {
    return new Promise(function (resolve, reject) {
      ops.base = ops.version + "/" + (ops.compat ? "compat" : "release");
      var Module = {};

      var data = cache[uri];
      var mem = (navigator.deviceMemory || 1) * 1e9;
      Module.INITIAL_MEMORY = Math.min(4 * data.length + 2e7, mem);
      Module.canvas = canvas;
      Module.printErr = window.onerror;
      Module.arguments = arg;

      Module.runWithFS = function () {
        Module.FS_createPath("/", "/usr/local/share/lua/5.1", true, true);
        for (var file in cache) {
          var data = cache[file];
          Module.addRunDependency("fp " + file);
          if (file == uri) {
            var ptr = Module.getMemory(data.length);
            Module.HEAPU8.set(data, ptr);
            Module.FS_createDataFile("/", arg[0], data, true, true, true);
          } else {
            Module.FS_createDataFile(
              "/usr/local/share/lua/5.1",
              file,
              cache[file],
              true,
              true,
              true,
            );
          }
          Module.removeRunDependency("fp " + file);
          Module.finishedDataFileDownloads++;
        }
      };

      if (Module.calledRun) {
        Module.runWithFS();
      } else {
        if (!Module.preRun) Module.preRun = [];
        Module.preRun.push(Module.runWithFS);
      }

      if (window.Love === undefined) {
        var s = document.createElement("script");
        s.type = "text/javascript";
        s.src = ops.base + "/love.js";
        s.async = true;
        s.onload = function () {
          resolve(Module);
        };
        document.body.appendChild(s);
      } else {
        window.Module.pauseMainLoop();
        resolve(Module);
      }

      window.Module = Module;

      if (Module._open) return;
      Module._open = window.open;
      window.open = function (url) {
        if (Module.command(url)) return;
        return Module._open.apply(null, arguments);
      };

      var _prompt = null;
      window.prompt = function (a) {
        var tmp = _prompt;
        _prompt = null;
        return tmp;
      };

      Module.writeFile = function (path, data) {
        if (!path || path == ".") return;
        var file = path;
        var base = "/";
        var offset = path.lastIndexOf("/");
        if (offset >= 0) {
          file = path.substring(offset + 1);
          base = path.substring(0, offset);
        }
        Module.FS_createPath("/", base, true, true);
        Module.FS_createDataFile(base, file, data, true, true, true);
      };

      Module.commands = {};

      Module.commands.fetch = function (ops) {
        ops = ops || {};
        ops.method = ops.method || "GET";
        ops.headers = ops.headers || {};
        if (ops.body && typeof ops.body === "object") {
          var form = new FormData();
          for (var k in ops.body) form.append(k, ops.body[k]);
          ops.body = form;
        }

        var code = 0;
        var data = null;
        fetch(ops.url, ops)
          .then(function (res) {
            code = res.status;
            return res.arrayBuffer();
          })
          .then(function (array) {
            data = array;
          })
          .catch(function (error) {
            var msg = error.toString();
            var bytes = new Uint8Array(msg.length);
            for (var i = 0; i < msg.length; i++) bytes[i] = msg.charCodeAt(i);
            data = bytes.buffer;
            console.warn(error);
          })
          .finally(function () {
            var acode = Array.from(String(code), Number);
            while (acode.length < 3) acode.unshift(0);
            for (var i = 0; i < acode.length; i++) acode[i] += 48;
            acode = Uint8Array.from(acode);
            var length = data ? data.byteLength : 0;
            var output = new Uint8Array(length + 3);
            output.set(acode);
            if (data && data.byteLength > 0)
              output.set(new Uint8Array(data), 3);
            Module.writeFile(ops.sink, output);
          });
      };

      var _clipboard = false;
      function updateClipboard() {
        navigator.clipboard
          .readText()
          .then(function (text) {
            _clipboard = text;
          })
          .catch(function (error) {})
          .finally(function () {
            setTimeout(function () {
              updateClipboard();
            }, 10);
          });
      }
      Module.commands.clipboard = async function (ops) {
        if (ops.text !== undefined) {
          _clipboard = ops.text;
          navigator.clipboard.writeText(ops.text).catch(function () {});
          document.execCommand("copy");
        } else {
          if (_clipboard === false) {
            _clipboard = "";
            updateClipboard();
          }
          _prompt = _clipboard;
        }
      };

      Module.commands.speak = function (ops) {
        var synth = window.speechSynthesis;
        if (synth) {
          if (synth.speaking) synth.cancel();
          var utter = new SpeechSynthesisUtterance(ops.utterance);
          utter.volume = ops.volume || 1;
          utter.rate = ops.rate || 1;
          synth.speak(utter);
        }
      };

      Module.commands.reload = function (ops) {
        Player.deletePkgs().then(function () {
          window.location.reload();
        });
      };

      var regex = /^([\w]+)(.*)/;
      Module.command = function (cmd) {
        if (!cmd.startsWith("javascript:")) return;
        cmd = cmd.substring(11);
        var matches = regex.exec(cmd);
        if (!matches[1]) return false;
        var ops;
        try {
          ops = JSON.parse(matches[2]);
        } catch (error) {}
        ops = ops || {};
        var func = Module.commands[matches[1]];
        if (!func) return false;
        func(ops);
        return true;
      };
    });
  };

  var script = document.currentScript;
  var canvas = document.getElementById("canvas");
  if (!canvas) {
    canvas = document.createElement("CANVAS");
    canvas.id = "canvas";
    script.parentNode.insertBefore(canvas, script);
  }
  canvas.oncontextmenu = function () {
    event.preventDefault();
  };
  var spinner = document.getElementById("spinner");
  if (!spinner) {
    spinner = document.createElement("DIV");
    spinner.id = "spinner";
    script.parentNode.after(spinner, script);
  }
  spinner.className = "pending";

  var url = new URL(script.src);
  if (!url.searchParams.has("g")) url = new URL(window.location.href);

  var search = url.searchParams;
  var arg = search.get("arg");
  var uri = search.get("g");
  var ops = {
    version: search.get("v") || "11.5",
    compat: search.get("c") != "0",
    nocache: search.get("n") == "1",
  };
  if (uri == null) uri = "nogame.love";
  if (arg) {
    try {
      arg = JSON.parse(arg);
      if (!Array.isArray(arg)) arg = [arg];
    } catch (error) {
      arg = null;
      console.log(error);
    }
  }

  window.onerror = function (msg) {
    console.error(msg);
    if (spinner.className != "") {
      canvas.style.display = "none";
      spinner.className = "error";
    }
  };

  window.onload = window.focus.bind(window);

  window.onclick = function (e) {
    window.focus();
  };

  window.onpageshow = function (event) {
    canvas.style.display = "none";
    if (event.persisted) window.location.reload();
  };

  Player.runLove = function () {
    spinner.className = "loading";
    Player.fetchPkgs(uri, ops.nocache)
      .then(function (cache) {
        var pkg = uri.substring(uri.lastIndexOf("/") + 1);
        var varg = [pkg];
        if (arg && Array.isArray(arg))
          for (var i = 0; i < arg.length; i++) varg.push(String(arg[i]));

        Player.runPkgs(uri, cache, varg, canvas, ops).then(function (Module) {
          Love(Module);
          Module.onRuntimeInitialized = function () {
            canvas.style.display = "block";
            canvas.focus();
            spinner.className = "";
          };
        });
      })
      .catch(function (err) {
        console.log(err);
        if (uri != "nogame.love") {
          uri = "nogame.love";
          arg = null;
          Player.runLove();
        }
      });
  };

  Player.runLove();
})();
