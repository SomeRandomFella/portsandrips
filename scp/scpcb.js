var Module = typeof Module != "undefined" ? Module : {};
var ENVIRONMENT_IS_WEB = !!globalThis.window;
var ENVIRONMENT_IS_WORKER = !!globalThis.WorkerGlobalScope;
var ENVIRONMENT_IS_NODE =
  globalThis.process?.versions?.node && globalThis.process?.type != "renderer";
var Module = typeof Module != "undefined" ? Module : {};
if (!Module["expectedDataFileDownloads"])
  Module["expectedDataFileDownloads"] = 0;
Module["expectedDataFileDownloads"]++;
(() => {
  var isPthread =
    typeof ENVIRONMENT_IS_PTHREAD != "undefined" && ENVIRONMENT_IS_PTHREAD;
  var isWasmWorker =
    typeof ENVIRONMENT_IS_WASM_WORKER != "undefined" &&
    ENVIRONMENT_IS_WASM_WORKER;
  if (isPthread || isWasmWorker) return;
  async function loadPackage(metadata) {
    var PACKAGE_PATH = "";
    if (typeof window === "object") {
      PACKAGE_PATH = window["encodeURIComponent"](
        window.location.pathname.substring(
          0,
          window.location.pathname.lastIndexOf("/"),
        ) + "/",
      );
    } else if (
      typeof process === "undefined" &&
      typeof location !== "undefined"
    ) {
      PACKAGE_PATH = encodeURIComponent(
        location.pathname.substring(0, location.pathname.lastIndexOf("/")) +
          "/",
      );
    }
    var PACKAGE_NAME =
      "/var/folders/g3/pffjr_y96bq06blnkf72x_hw0000gn/T/scpcb-web/assets.data";
    var REMOTE_PACKAGE_BASE = "assets.data";
    var REMOTE_PACKAGE_NAME = Module["locateFile"]
      ? Module["locateFile"](REMOTE_PACKAGE_BASE, "")
      : REMOTE_PACKAGE_BASE;
    var REMOTE_PACKAGE_SIZE = metadata["remote_package_size"];
    async function fetchRemotePackage(packageName, packageSize) {
      if (!Module["dataFileDownloads"]) Module["dataFileDownloads"] = {};
      try {
        var response = await fetch(packageName);
      } catch (e) {
        throw new Error(`Network Error: ${packageName}`, { e });
      }
      if (!response.ok) {
        throw new Error(`${response.status}: ${response.url}`);
      }
      const chunks = [];
      const headers = response.headers;
      const total = Number(headers.get("Content-Length") || packageSize);
      let loaded = 0;
      Module["setStatus"] && Module["setStatus"]("Downloading data...");
      const reader = response.body.getReader();
      while (1) {
        var { done, value } = await reader.read();
        if (done) break;
        chunks.push(value);
        loaded += value.length;
        Module["dataFileDownloads"][packageName] = { loaded, total };
        let totalLoaded = 0;
        let totalSize = 0;
        for (const download of Object.values(Module["dataFileDownloads"])) {
          totalLoaded += download.loaded;
          totalSize += download.total;
        }
        Module["setStatus"] &&
          Module["setStatus"](
            `Downloading data... (${totalLoaded}/${totalSize})`,
          );
      }
      const packageData = new Uint8Array(
        chunks.map((c) => c.length).reduce((a, b) => a + b, 0),
      );
      let offset = 0;
      for (const chunk of chunks) {
        packageData.set(chunk, offset);
        offset += chunk.length;
      }
      return packageData.buffer;
    }
    var fetchPromise;
    var fetched =
      Module["getPreloadedPackage"] &&
      Module["getPreloadedPackage"](REMOTE_PACKAGE_NAME, REMOTE_PACKAGE_SIZE);
    if (!fetched) {
      fetchPromise = fetchRemotePackage(
        REMOTE_PACKAGE_NAME,
        REMOTE_PACKAGE_SIZE,
      );
    }
    async function runWithFS(Module) {
      function assert(check, msg) {
        if (!check) throw new Error(msg);
      }
      Module["FS_createPath"]("/", "Data", true, true);
      Module["FS_createPath"]("/", "GFX", true, true);
      Module["FS_createPath"]("/GFX", "895pics", true, true);
      Module["FS_createPath"]("/GFX", "bd", true, true);
      Module["FS_createPath"]("/GFX", "font", true, true);
      Module["FS_createPath"]("/GFX/font", "DS-DIGI", true, true);
      Module["FS_createPath"]("/GFX/font", "Journal", true, true);
      Module["FS_createPath"]("/GFX/font", "cour", true, true);
      Module["FS_createPath"]("/GFX", "items", true, true);
      Module["FS_createPath"]("/GFX/items", "1025", true, true);
      Module["FS_createPath"]("/GFX/items", "1048", true, true);
      Module["FS_createPath"]("/GFX/items", "Battery", true, true);
      Module["FS_createPath"]("/GFX/items", "Syringe", true, true);
      Module["FS_createPath"]("/GFX", "map", true, true);
      Module["FS_createPath"]("/GFX/map", "Props", true, true);
      Module["FS_createPath"]("/GFX/map", "dimension1499", true, true);
      Module["FS_createPath"]("/GFX/map", "forest", true, true);
      Module["FS_createPath"]("/GFX/map/forest", "detail", true, true);
      Module["FS_createPath"]("/GFX/map", "sky", true, true);
      Module["FS_createPath"]("/GFX", "menu", true, true);
      Module["FS_createPath"]("/GFX/menu", "achievements", true, true);
      Module["FS_createPath"]("/GFX", "navigator", true, true);
      Module["FS_createPath"]("/GFX", "npcs", true, true);
      Module["FS_createPath"]("/GFX", "screens", true, true);
      Module["FS_createPath"]("/", "Loadingscreens", true, true);
      Module["FS_createPath"]("/", "SFX", true, true);
      Module["FS_createPath"]("/SFX", "Alarm", true, true);
      Module["FS_createPath"]("/SFX", "Ambient", true, true);
      Module["FS_createPath"]("/SFX/Ambient", "Forest", true, true);
      Module["FS_createPath"]("/SFX/Ambient", "General", true, true);
      Module["FS_createPath"]("/SFX/Ambient", "Pre-breach", true, true);
      Module["FS_createPath"]("/SFX/Ambient", "Room ambience", true, true);
      Module["FS_createPath"]("/SFX/Ambient", "Zone1", true, true);
      Module["FS_createPath"]("/SFX/Ambient", "Zone2", true, true);
      Module["FS_createPath"]("/SFX/Ambient", "Zone3", true, true);
      Module["FS_createPath"]("/SFX", "Character", true, true);
      Module["FS_createPath"]("/SFX/Character", "Apache", true, true);
      Module["FS_createPath"]("/SFX/Character", "D9341", true, true);
      Module["FS_createPath"]("/SFX/Character", "Guard", true, true);
      Module["FS_createPath"]("/SFX/Character", "Janitor", true, true);
      Module["FS_createPath"]("/SFX/Character", "LureSubject", true, true);
      Module["FS_createPath"]("/SFX/Character", "MTF", true, true);
      Module["FS_createPath"]("/SFX/Character/MTF", "049", true, true);
      Module["FS_createPath"]("/SFX/Character/MTF", "096", true, true);
      Module["FS_createPath"]("/SFX/Character/MTF", "106", true, true);
      Module["FS_createPath"]("/SFX/Character/MTF", "173", true, true);
      Module["FS_createPath"]("/SFX/Character", "Scientist", true, true);
      Module["FS_createPath"]("/SFX", "Door", true, true);
      Module["FS_createPath"]("/SFX", "Ending", true, true);
      Module["FS_createPath"]("/SFX/Ending", "GateA", true, true);
      Module["FS_createPath"]("/SFX/Ending", "GateB", true, true);
      Module["FS_createPath"]("/SFX", "General", true, true);
      Module["FS_createPath"]("/SFX/General", "Elevator", true, true);
      Module["FS_createPath"]("/SFX", "Horror", true, true);
      Module["FS_createPath"]("/SFX", "Interact", true, true);
      Module["FS_createPath"]("/SFX", "Music", true, true);
      Module["FS_createPath"]("/SFX/Music", "Custom", true, true);
      Module["FS_createPath"]("/SFX", "Radio", true, true);
      Module["FS_createPath"]("/SFX/Radio", "UserTracks", true, true);
      Module["FS_createPath"]("/SFX", "Room", true, true);
      Module["FS_createPath"]("/SFX/Room", "035Chamber", true, true);
      Module["FS_createPath"]("/SFX/Room", "106Chamber", true, true);
      Module["FS_createPath"]("/SFX/Room", "895Chamber", true, true);
      Module["FS_createPath"]("/SFX/Room", "BD", true, true);
      Module["FS_createPath"]("/SFX/Room", "Intro", true, true);
      Module["FS_createPath"]("/SFX/Room/Intro", "ClassD", true, true);
      Module["FS_createPath"]("/SFX/Room/Intro", "Commotion", true, true);
      Module["FS_createPath"]("/SFX/Room/Intro", "Guard", true, true);
      Module["FS_createPath"]("/SFX/Room/Intro/Guard", "Balcony", true, true);
      Module["FS_createPath"]("/SFX/Room/Intro/Guard", "Ulgrin", true, true);
      Module["FS_createPath"]("/SFX/Room/Intro", "PA", true, true);
      Module["FS_createPath"]("/SFX/Room/Intro/PA", "1", true, true);
      Module["FS_createPath"]("/SFX/Room/Intro/PA", "2", true, true);
      Module["FS_createPath"]("/SFX/Room/Intro/PA", "3", true, true);
      Module["FS_createPath"]("/SFX/Room/Intro/PA", "4", true, true);
      Module["FS_createPath"]("/SFX/Room/Intro/PA", "5", true, true);
      Module["FS_createPath"]("/SFX/Room/Intro/PA", "numbers", true, true);
      Module["FS_createPath"]("/SFX/Room/Intro/PA", "scripted", true, true);
      Module["FS_createPath"]("/SFX/Room/Intro", "Scientist", true, true);
      Module["FS_createPath"](
        "/SFX/Room/Intro/Scientist",
        "Franklin",
        true,
        true,
      );
      Module["FS_createPath"]("/SFX/Room", "PocketDimension", true, true);
      Module["FS_createPath"]("/SFX/Room", "Storeroom", true, true);
      Module["FS_createPath"]("/SFX/Room", "Tesla", true, true);
      Module["FS_createPath"]("/SFX", "SCP", true, true);
      Module["FS_createPath"]("/SFX/SCP", "008", true, true);
      Module["FS_createPath"]("/SFX/SCP", "012", true, true);
      Module["FS_createPath"]("/SFX/SCP", "035", true, true);
      Module["FS_createPath"]("/SFX/SCP", "049", true, true);
      Module["FS_createPath"]("/SFX/SCP", "066", true, true);
      Module["FS_createPath"]("/SFX/SCP", "079", true, true);
      Module["FS_createPath"]("/SFX/SCP", "096", true, true);
      Module["FS_createPath"]("/SFX/SCP", "1048A", true, true);
      Module["FS_createPath"]("/SFX/SCP", "106", true, true);
      Module["FS_createPath"]("/SFX/SCP", "1123", true, true);
      Module["FS_createPath"]("/SFX/SCP", "1162", true, true);
      Module["FS_createPath"]("/SFX/SCP", "1499", true, true);
      Module["FS_createPath"]("/SFX/SCP", "173", true, true);
      Module["FS_createPath"]("/SFX/SCP", "205", true, true);
      Module["FS_createPath"]("/SFX/SCP", "294", true, true);
      Module["FS_createPath"]("/SFX/SCP", "372", true, true);
      Module["FS_createPath"]("/SFX/SCP", "427", true, true);
      Module["FS_createPath"]("/SFX/SCP", "513", true, true);
      Module["FS_createPath"]("/SFX/SCP", "682", true, true);
      Module["FS_createPath"]("/SFX/SCP", "860", true, true);
      Module["FS_createPath"]("/SFX/SCP", "914", true, true);
      Module["FS_createPath"]("/SFX/SCP", "939", true, true);
      Module["FS_createPath"]("/SFX/SCP", "966", true, true);
      Module["FS_createPath"]("/SFX/SCP", "970", true, true);
      Module["FS_createPath"]("/SFX/SCP", "990", true, true);
      Module["FS_createPath"]("/SFX/SCP", "Joke", true, true);
      Module["FS_createPath"]("/SFX", "Step", true, true);
      Module["FS_createPath"]("/SFX/Step", "SCP", true, true);
      async function processPackageData(arrayBuffer) {
        assert(arrayBuffer, "Loading data file failed.");
        assert(
          arrayBuffer.constructor.name === ArrayBuffer.name,
          "bad input to processPackageData " + arrayBuffer.constructor.name,
        );
        var byteArray = new Uint8Array(arrayBuffer);
        for (var file of metadata["files"]) {
          var name = file["filename"];
          var data = byteArray.subarray(file["start"], file["end"]);
          Module["FS_createDataFile"](name, null, data, true, true, true);
        }
        Module["removeRunDependency"](
          "datafile_/var/folders/g3/pffjr_y96bq06blnkf72x_hw0000gn/T/scpcb-web/assets.data",
        );
      }
      Module["addRunDependency"](
        "datafile_/var/folders/g3/pffjr_y96bq06blnkf72x_hw0000gn/T/scpcb-web/assets.data",
      );
      if (!Module["preloadResults"]) Module["preloadResults"] = {};
      Module["preloadResults"][PACKAGE_NAME] = { fromCache: false };
      if (!fetched) {
        fetched = await fetchPromise;
      }
      await processPackageData(fetched);
    }
    if (Module["FS_createPath"]) {
      runWithFS(Module);
    } else {
      if (!Module["preRun"]) Module["preRun"] = [];
      Module["preRun"].push(runWithFS);
    }
  }
  loadPackage({
    files: [
      { filename: "/Data/1499chunks.ini", start: 0, end: 827 },
      { filename: "/Data/NPCBones.ini", start: 827, end: 1407 },
      { filename: "/Data/NPCs.ini", start: 1407, end: 1838 },
      { filename: "/Data/SCP-294.ini", start: 1838, end: 32007 },
      { filename: "/Data/SCP-294Keyboard.ini", start: 32007, end: 32469 },
      { filename: "/Data/events.ini", start: 32469, end: 39001 },
      { filename: "/Data/items.ini", start: 39001, end: 56676 },
      { filename: "/Data/map.ini", start: 56676, end: 56859 },
      { filename: "/Data/materials.ini", start: 56859, end: 57558 },
      { filename: "/Data/rooms.ini", start: 57558, end: 76374 },
      { filename: "/Data/strings.ini", start: 76374, end: 114067 },
      { filename: "/Data/subtitles.ini", start: 114067, end: 170305 },
      { filename: "/Data/subtitles_captions.ini", start: 170305, end: 181450 },
      { filename: "/Data/voices.ini", start: 181450, end: 182096 },
      { filename: "/GFX/173box.b3d", start: 182096, end: 236521 },
      { filename: "/GFX/294panel.jpg", start: 236521, end: 327670 },
      { filename: "/GFX/895pics/pic1.jpg", start: 327670, end: 366302 },
      { filename: "/GFX/895pics/pic2.jpg", start: 366302, end: 395845 },
      { filename: "/GFX/895pics/pic3.jpg", start: 395845, end: 465517 },
      { filename: "/GFX/895pics/pic4.jpg", start: 465517, end: 519387 },
      { filename: "/GFX/895pics/pic5.jpg", start: 519387, end: 549522 },
      { filename: "/GFX/895pics/pic6.jpg", start: 549522, end: 614506 },
      { filename: "/GFX/AIface.jpg", start: 614506, end: 680977 },
      { filename: "/GFX/AIface2.jpg", start: 680977, end: 715468 },
      { filename: "/GFX/BlinkIcon.png", start: 715468, end: 717377 },
      { filename: "/GFX/BlinkMeter.jpg", start: 717377, end: 729071 },
      { filename: "/GFX/GasmaskOverlay.jpg", start: 729071, end: 897520 },
      { filename: "/GFX/InfectOverlay.jpg", start: 897520, end: 1020914 },
      { filename: "/GFX/NightVisionOverlay.jpg", start: 1020914, end: 1151380 },
      { filename: "/GFX/SL_monitors.jpg", start: 1151380, end: 1317731 },
      {
        filename: "/GFX/SL_monitors_checkpoint.jpg",
        start: 1317731,
        end: 1540194,
      },
      { filename: "/GFX/Spark.png", start: 1540194, end: 1541088 },
      { filename: "/GFX/StaminaMeter.jpg", start: 1541088, end: 1552885 },
      { filename: "/GFX/apache.b3d", start: 1552885, end: 1595399 },
      { filename: "/GFX/apacherotor.b3d", start: 1595399, end: 1606265 },
      { filename: "/GFX/apacherotor2.b3d", start: 1606265, end: 1613887 },
      { filename: "/GFX/apachetexture.jpg", start: 1613887, end: 1769568 },
      { filename: "/GFX/battery.png", start: 1769568, end: 1771854 },
      { filename: "/GFX/bd/Confetti.png", start: 1771854, end: 2043809 },
      { filename: "/GFX/bd/Confetti1.png", start: 2043809, end: 2071807 },
      { filename: "/GFX/bd/Confetti2.png", start: 2071807, end: 2106285 },
      { filename: "/GFX/bd/Confetti3.png", start: 2106285, end: 2154876 },
      { filename: "/GFX/bd/Confetti4.png", start: 2154876, end: 2199595 },
      { filename: "/GFX/bd/Confetti5.png", start: 2199595, end: 2232791 },
      { filename: "/GFX/blooddrop1.png", start: 2232791, end: 2240108 },
      { filename: "/GFX/blooddrop2.png", start: 2240108, end: 2247865 },
      { filename: "/GFX/bloodsprite.png", start: 2247865, end: 2324498 },
      { filename: "/GFX/bullethole1.jpg", start: 2324498, end: 2350333 },
      { filename: "/GFX/bullethole2.jpg", start: 2350333, end: 2377146 },
      { filename: "/GFX/containment_doors.jpg", start: 2377146, end: 3176950 },
      { filename: "/GFX/creditsscreen.pt", start: 3176950, end: 3448362 },
      { filename: "/GFX/cursor.PNG", start: 3448362, end: 3466e3 },
      { filename: "/GFX/cwm.cwm", start: 3466e3, end: 3505137 },
      { filename: "/GFX/decal1.png", start: 3505137, end: 3692654 },
      { filename: "/GFX/decal19.png", start: 3692654, end: 4179214 },
      { filename: "/GFX/decal2.png", start: 4179214, end: 4530706 },
      { filename: "/GFX/decal3.png", start: 4530706, end: 4580949 },
      { filename: "/GFX/decal4.png", start: 4580949, end: 5502839 },
      { filename: "/GFX/decal427.png", start: 5502839, end: 5883434 },
      { filename: "/GFX/decal5.png", start: 5883434, end: 6217727 },
      { filename: "/GFX/decal6.png", start: 6217727, end: 6501212 },
      { filename: "/GFX/decal7.png", start: 6501212, end: 6805858 },
      { filename: "/GFX/decal8.png", start: 6805858, end: 6926169 },
      { filename: "/GFX/decalpd1.jpg", start: 6926169, end: 6968662 },
      { filename: "/GFX/decalpd2.jpg", start: 6968662, end: 7009447 },
      { filename: "/GFX/decalpd3.jpg", start: 7009447, end: 7053897 },
      { filename: "/GFX/decalpd4.jpg", start: 7053897, end: 7095345 },
      { filename: "/GFX/decalpd5.jpg", start: 7095345, end: 7136534 },
      { filename: "/GFX/decalpd6.dc", start: 7136534, end: 7193280 },
      { filename: "/GFX/dirtymetal.jpg", start: 7193280, end: 7436094 },
      { filename: "/GFX/doorhit.b3d", start: 7436094, end: 7437195 },
      { filename: "/GFX/dust.jpg", start: 7437195, end: 7458879 },
      { filename: "/GFX/endingscreen.pt", start: 7458879, end: 7582515 },
      { filename: "/GFX/flash.jpg", start: 7582515, end: 7599497 },
      { filename: "/GFX/fog.jpg", start: 7599497, end: 7635128 },
      { filename: "/GFX/fogNV.jpg", start: 7635128, end: 7674094 },
      {
        filename: "/GFX/font/DS-DIGI/DS-Digital.TTF",
        start: 7674094,
        end: 7698542,
      },
      {
        filename: "/GFX/font/Journal/Journal.ttf",
        start: 7698542,
        end: 7834034,
      },
      {
        filename: "/GFX/font/cour/Courier New.ttf",
        start: 7834034,
        end: 8543634,
      },
      { filename: "/GFX/font/readme.txt", start: 8543634, end: 8543827 },
      { filename: "/GFX/handsymbol.png", start: 8543827, end: 8549360 },
      { filename: "/GFX/handsymbol2.png", start: 8549360, end: 8552290 },
      { filename: "/GFX/items/1025/1025_0.jpg", start: 8552290, end: 8736361 },
      { filename: "/GFX/items/1025/1025_1.jpg", start: 8736361, end: 8917531 },
      { filename: "/GFX/items/1025/1025_2.jpg", start: 8917531, end: 9109769 },
      { filename: "/GFX/items/1025/1025_3.jpg", start: 9109769, end: 9305514 },
      { filename: "/GFX/items/1025/1025_4.jpg", start: 9305514, end: 9495667 },
      { filename: "/GFX/items/1025/1025_5.jpg", start: 9495667, end: 9668414 },
      { filename: "/GFX/items/1048/1048_1.jpg", start: 9668414, end: 9838788 },
      {
        filename: "/GFX/items/1048/1048_10.jpg",
        start: 9838788,
        end: 10006991,
      },
      {
        filename: "/GFX/items/1048/1048_11.jpg",
        start: 10006991,
        end: 10200807,
      },
      {
        filename: "/GFX/items/1048/1048_12.jpg",
        start: 10200807,
        end: 10348436,
      },
      {
        filename: "/GFX/items/1048/1048_13.jpg",
        start: 10348436,
        end: 10501232,
      },
      {
        filename: "/GFX/items/1048/1048_14.jpg",
        start: 10501232,
        end: 10702542,
      },
      {
        filename: "/GFX/items/1048/1048_15.jpg",
        start: 10702542,
        end: 10861870,
      },
      {
        filename: "/GFX/items/1048/1048_16.jpg",
        start: 10861870,
        end: 11035399,
      },
      {
        filename: "/GFX/items/1048/1048_17.jpg",
        start: 11035399,
        end: 11198456,
      },
      {
        filename: "/GFX/items/1048/1048_18.jpg",
        start: 11198456,
        end: 11385224,
      },
      {
        filename: "/GFX/items/1048/1048_19.jpg",
        start: 11385224,
        end: 11571585,
      },
      {
        filename: "/GFX/items/1048/1048_2.jpg",
        start: 11571585,
        end: 11731221,
      },
      {
        filename: "/GFX/items/1048/1048_20.jpg",
        start: 11731221,
        end: 11908077,
      },
      {
        filename: "/GFX/items/1048/1048_3.jpg",
        start: 11908077,
        end: 12064551,
      },
      {
        filename: "/GFX/items/1048/1048_4.jpg",
        start: 12064551,
        end: 12214674,
      },
      {
        filename: "/GFX/items/1048/1048_5.jpg",
        start: 12214674,
        end: 12383366,
      },
      {
        filename: "/GFX/items/1048/1048_6.jpg",
        start: 12383366,
        end: 12544844,
      },
      {
        filename: "/GFX/items/1048/1048_7.jpg",
        start: 12544844,
        end: 12703562,
      },
      {
        filename: "/GFX/items/1048/1048_8.jpg",
        start: 12703562,
        end: 12883812,
      },
      {
        filename: "/GFX/items/1048/1048_9.jpg",
        start: 12883812,
        end: 13043459,
      },
      { filename: "/GFX/items/1723051.jpg", start: 13043459, end: 13050218 },
      { filename: "/GFX/items/420.x", start: 13050218, end: 13070522 },
      { filename: "/GFX/items/427.b3d", start: 13070522, end: 13277080 },
      { filename: "/GFX/items/427.png", start: 13277080, end: 14423249 },
      { filename: "/GFX/items/513.jpg", start: 14423249, end: 14469601 },
      { filename: "/GFX/items/513.x", start: 14469601, end: 14534252 },
      {
        filename: "/GFX/items/Battery/Battery 18V.jpg",
        start: 14534252,
        end: 14580730,
      },
      {
        filename: "/GFX/items/Battery/Battery 9V.jpg",
        start: 14580730,
        end: 14627442,
      },
      {
        filename: "/GFX/items/Battery/Battery.x",
        start: 14627442,
        end: 14648438,
      },
      {
        filename: "/GFX/items/Battery/INVbattery18v.jpg",
        start: 14648438,
        end: 14650186,
      },
      {
        filename: "/GFX/items/Battery/INVbattery22900.jpg",
        start: 14650186,
        end: 14651552,
      },
      {
        filename: "/GFX/items/Battery/INVbattery9v.jpg",
        start: 14651552,
        end: 14653399,
      },
      {
        filename: "/GFX/items/Battery/Strange Battery.jpg",
        start: 14653399,
        end: 14698518,
      },
      {
        filename: "/GFX/items/BurntNoteTexture.jpg",
        start: 14698518,
        end: 14730047,
      },
      {
        filename: "/GFX/items/HGIB_Skull1.b3d",
        start: 14730047,
        end: 14746128,
      },
      { filename: "/GFX/items/INV1025.jpg", start: 14746128, end: 14770120 },
      { filename: "/GFX/items/INV1123.jpg", start: 14770120, end: 14783767 },
      { filename: "/GFX/items/INV1162_1.jpg", start: 14783767, end: 14799341 },
      { filename: "/GFX/items/INV420.jpg", start: 14799341, end: 14822470 },
      { filename: "/GFX/items/INV513.jpg", start: 14822470, end: 14846084 },
      { filename: "/GFX/items/INV714.jpg", start: 14846084, end: 14869775 },
      { filename: "/GFX/items/INVbadge.jpg", start: 14869775, end: 14893682 },
      { filename: "/GFX/items/INVbdc.ae", start: 14893682, end: 14899451 },
      { filename: "/GFX/items/INVbn.jpg", start: 14899451, end: 14923416 },
      { filename: "/GFX/items/INVbottle.jpg", start: 14923416, end: 14946509 },
      { filename: "/GFX/items/INVcard.jpg", start: 14946509, end: 14973520 },
      {
        filename: "/GFX/items/INVclipboard.jpg",
        start: 14973520,
        end: 14976460,
      },
      {
        filename: "/GFX/items/INVclipboard2.jpg",
        start: 14976460,
        end: 14978718,
      },
      { filename: "/GFX/items/INVcoin.jpg", start: 14978718, end: 14980399 },
      { filename: "/GFX/items/INVcup.jpg", start: 14980399, end: 15003683 },
      {
        filename: "/GFX/items/INVelectronics.jpg",
        start: 15003683,
        end: 15027801,
      },
      {
        filename: "/GFX/items/INVeyedrops.jpg",
        start: 15027801,
        end: 15051026,
      },
      {
        filename: "/GFX/items/INVeyedropsred.jpg",
        start: 15051026,
        end: 15074243,
      },
      {
        filename: "/GFX/items/INVfirstaid.jpg",
        start: 15074243,
        end: 15098900,
      },
      {
        filename: "/GFX/items/INVfirstaid2.jpg",
        start: 15098900,
        end: 15123673,
      },
      { filename: "/GFX/items/INVgasmask.jpg", start: 15123673, end: 15146445 },
      { filename: "/GFX/items/INVhand.jpg", start: 15146445, end: 15159943 },
      { filename: "/GFX/items/INVhand2.jpg", start: 15159943, end: 15172447 },
      { filename: "/GFX/items/INVhazmat.jpg", start: 15172447, end: 15196931 },
      { filename: "/GFX/items/INVkey.jpg", start: 15196931, end: 15220262 },
      { filename: "/GFX/items/INVkey1.jpg", start: 15220262, end: 15225109 },
      { filename: "/GFX/items/INVkey2.jpg", start: 15225109, end: 15230022 },
      { filename: "/GFX/items/INVkey3.jpg", start: 15230022, end: 15234949 },
      { filename: "/GFX/items/INVkey4.jpg", start: 15234949, end: 15239873 },
      { filename: "/GFX/items/INVkey5.jpg", start: 15239873, end: 15244637 },
      { filename: "/GFX/items/INVkeyomni.jpg", start: 15244637, end: 15248872 },
      {
        filename: "/GFX/items/INVmastercard.jpg",
        start: 15248872,
        end: 15273986,
      },
      {
        filename: "/GFX/items/INVmetalpanel.jpg",
        start: 15273986,
        end: 15297530,
      },
      {
        filename: "/GFX/items/INVnavigator.jpg",
        start: 15297530,
        end: 15322220,
      },
      {
        filename: "/GFX/items/INVnightvision.jpg",
        start: 15322220,
        end: 15334922,
      },
      { filename: "/GFX/items/INVnote.jpg", start: 15334922, end: 15345026 },
      { filename: "/GFX/items/INVnote2.jpg", start: 15345026, end: 15363644 },
      {
        filename: "/GFX/items/INVoldbadge.jpg",
        start: 15363644,
        end: 15385472,
      },
      { filename: "/GFX/items/INVorigami.jpg", start: 15385472, end: 15409867 },
      { filename: "/GFX/items/INVpaper.jpg", start: 15409867, end: 15420609 },
      {
        filename: "/GFX/items/INVpaperstrips.jpg",
        start: 15420609,
        end: 15445775,
      },
      { filename: "/GFX/items/INVpill.jpg", start: 15445775, end: 15455497 },
      {
        filename: "/GFX/items/INVpillwhite.jpg",
        start: 15455497,
        end: 15457043,
      },
      { filename: "/GFX/items/INVradio.jpg", start: 15457043, end: 15480292 },
      { filename: "/GFX/items/INVscp148.jpg", start: 15480292, end: 15503294 },
      { filename: "/GFX/items/INVscp1499.jpg", start: 15503294, end: 15516407 },
      { filename: "/GFX/items/INVscp427.jpg", start: 15516407, end: 15518501 },
      {
        filename: "/GFX/items/INVsupernightvision.jpg",
        start: 15518501,
        end: 15531227,
      },
      { filename: "/GFX/items/INVticket.jpg", start: 15531227, end: 15533022 },
      {
        filename: "/GFX/items/INVveryfinenightvision.jpg",
        start: 15533022,
        end: 15536271,
      },
      { filename: "/GFX/items/INVvest.jpg", start: 15536271, end: 15560277 },
      { filename: "/GFX/items/INVwallet.jpg", start: 15560277, end: 15563459 },
      { filename: "/GFX/items/NVG.b3d", start: 15563459, end: 15750190 },
      { filename: "/GFX/items/Navigator.png", start: 15750190, end: 15972208 },
      { filename: "/GFX/items/SCP-1499.b3d", start: 15972208, end: 16057784 },
      { filename: "/GFX/items/SCP-1499.jpg", start: 16057784, end: 16101128 },
      {
        filename: "/GFX/items/Syringe/inv.png",
        start: 16101128,
        end: 16103588,
      },
      {
        filename: "/GFX/items/Syringe/syringe.b3d",
        start: 16103588,
        end: 16129110,
      },
      {
        filename: "/GFX/items/Syringe/syringe.png",
        start: 16129110,
        end: 16367359,
      },
      { filename: "/GFX/items/Vest.png", start: 16367359, end: 16514004 },
      { filename: "/GFX/items/badge.x", start: 16514004, end: 16517932 },
      { filename: "/GFX/items/badge1.jpg", start: 16517932, end: 16601474 },
      { filename: "/GFX/items/badge1_tex.jpg", start: 16601474, end: 16625844 },
      { filename: "/GFX/items/badge2.png", start: 16625844, end: 17677879 },
      { filename: "/GFX/items/badge2_tex.png", start: 17677879, end: 17688602 },
      { filename: "/GFX/items/bdc.b3d", start: 17688602, end: 17790799 },
      { filename: "/GFX/items/bdc.tx", start: 17790799, end: 19018302 },
      { filename: "/GFX/items/bn.it", start: 19018302, end: 19136531 },
      { filename: "/GFX/items/bottle.jpg", start: 19136531, end: 19185607 },
      { filename: "/GFX/items/card.jpg", start: 19185607, end: 19225032 },
      { filename: "/GFX/items/circuit.jpg", start: 19225032, end: 19287534 },
      { filename: "/GFX/items/clipboard.b3d", start: 19287534, end: 19292100 },
      { filename: "/GFX/items/clipboard.png", start: 19292100, end: 19392956 },
      { filename: "/GFX/items/coin.png", start: 19392956, end: 19397284 },
      { filename: "/GFX/items/crtrec.jpg", start: 19397284, end: 19439856 },
      { filename: "/GFX/items/cup.x", start: 19439856, end: 19480363 },
      { filename: "/GFX/items/cupliquid.x", start: 19480363, end: 19484007 },
      { filename: "/GFX/items/dh.s", start: 19484007, end: 19593231 },
      { filename: "/GFX/items/doc008.jpg", start: 19593231, end: 19824660 },
      { filename: "/GFX/items/doc012.jpg", start: 19824660, end: 20038725 },
      { filename: "/GFX/items/doc035.jpg", start: 20038725, end: 20249591 },
      { filename: "/GFX/items/doc035ad.jpg", start: 20249591, end: 20452102 },
      { filename: "/GFX/items/doc049.jpg", start: 20452102, end: 20666291 },
      { filename: "/GFX/items/doc079.jpg", start: 20666291, end: 20893794 },
      { filename: "/GFX/items/doc093rm.jpg", start: 20893794, end: 21029593 },
      { filename: "/GFX/items/doc096.jpg", start: 21029593, end: 21248459 },
      { filename: "/GFX/items/doc1048.jpg", start: 21248459, end: 21451118 },
      { filename: "/GFX/items/doc1048a.jpg", start: 21451118, end: 21614892 },
      { filename: "/GFX/items/doc106.jpg", start: 21614892, end: 21797678 },
      { filename: "/GFX/items/doc106_2.jpg", start: 21797678, end: 21928253 },
      { filename: "/GFX/items/doc1123.jpg", start: 21928253, end: 22078194 },
      { filename: "/GFX/items/doc1162.jpg", start: 22078194, end: 22426519 },
      { filename: "/GFX/items/doc1499.png", start: 22426519, end: 22885709 },
      { filename: "/GFX/items/doc173.png", start: 22885709, end: 23416739 },
      { filename: "/GFX/items/doc372.jpg", start: 23416739, end: 23625888 },
      { filename: "/GFX/items/doc427.jpg", start: 23625888, end: 23878121 },
      { filename: "/GFX/items/doc500.png", start: 23878121, end: 24315702 },
      { filename: "/GFX/items/doc513.jpg", start: 24315702, end: 24497540 },
      { filename: "/GFX/items/doc682.jpg", start: 24497540, end: 24715865 },
      { filename: "/GFX/items/doc714.jpg", start: 24715865, end: 24921209 },
      { filename: "/GFX/items/doc860.jpg", start: 24921209, end: 25112980 },
      { filename: "/GFX/items/doc8601.jpg", start: 25112980, end: 25332772 },
      { filename: "/GFX/items/doc895.jpg", start: 25332772, end: 25525327 },
      { filename: "/GFX/items/doc939.jpg", start: 25525327, end: 25728419 },
      { filename: "/GFX/items/doc966.jpg", start: 25728419, end: 25885256 },
      { filename: "/GFX/items/doc970.jpg", start: 25885256, end: 26103878 },
      { filename: "/GFX/items/docAC.jpg", start: 26103878, end: 26223439 },
      {
        filename: "/GFX/items/docGonzales.jpg",
        start: 26223439,
        end: 26441167,
      },
      { filename: "/GFX/items/docIR106.jpg", start: 26441167, end: 26568531 },
      { filename: "/GFX/items/docL1.jpg", start: 26568531, end: 26687037 },
      { filename: "/GFX/items/docL2.jpg", start: 26687037, end: 26826520 },
      { filename: "/GFX/items/docL3.jpg", start: 26826520, end: 26976798 },
      { filename: "/GFX/items/docL4.jpg", start: 26976798, end: 27093953 },
      { filename: "/GFX/items/docL5.jpg", start: 27093953, end: 27214779 },
      { filename: "/GFX/items/docL6.jpg", start: 27214779, end: 27307028 },
      { filename: "/GFX/items/docMSP.jpg", start: 27307028, end: 27513093 },
      { filename: "/GFX/items/docMTF.jpg", start: 27513093, end: 27710169 },
      { filename: "/GFX/items/docNDP.jpg", start: 27710169, end: 27822270 },
      { filename: "/GFX/items/docOBJC.jpg", start: 27822270, end: 28037316 },
      { filename: "/GFX/items/docORI.jpg", start: 28037316, end: 28273336 },
      { filename: "/GFX/items/docRAND1.jpg", start: 28273336, end: 28368883 },
      { filename: "/GFX/items/docRAND2.jpg", start: 28368883, end: 28594968 },
      { filename: "/GFX/items/docRAND3.jpg", start: 28594968, end: 28743825 },
      { filename: "/GFX/items/docRP.jpg", start: 28743825, end: 28915187 },
      { filename: "/GFX/items/docSC.jpg", start: 28915187, end: 29114975 },
      { filename: "/GFX/items/docStrange.jpg", start: 29114975, end: 29256823 },
      { filename: "/GFX/items/docdan.jpg", start: 29256823, end: 29337033 },
      { filename: "/GFX/items/docmap.jpg", start: 29337033, end: 29513998 },
      { filename: "/GFX/items/electronics.x", start: 29513998, end: 29521792 },
      { filename: "/GFX/items/eyedrops.b3d", start: 29521792, end: 29537889 },
      { filename: "/GFX/items/eyedrops.jpg", start: 29537889, end: 29588541 },
      {
        filename: "/GFX/items/eyedropsred.jpg",
        start: 29588541,
        end: 29635951,
      },
      { filename: "/GFX/items/f4.jpg", start: 29635951, end: 29727175 },
      { filename: "/GFX/items/f5.jpg", start: 29727175, end: 29825841 },
      { filename: "/GFX/items/f6.jpg", start: 29825841, end: 29941759 },
      { filename: "/GFX/items/firstaid.x", start: 29941759, end: 29950171 },
      {
        filename: "/GFX/items/firstaidkit.jpg",
        start: 29950171,
        end: 29992803,
      },
      {
        filename: "/GFX/items/firstaidkit2.jpg",
        start: 29992803,
        end: 30036961,
      },
      { filename: "/GFX/items/gasmask.b3d", start: 30036961, end: 30065320 },
      { filename: "/GFX/items/gasmask.jpg", start: 30065320, end: 30094418 },
      { filename: "/GFX/items/happy.b3d", start: 30094418, end: 30196617 },
      { filename: "/GFX/items/happy.tx", start: 30196617, end: 31424120 },
      { filename: "/GFX/items/hazmat.b3d", start: 31424120, end: 31588036 },
      { filename: "/GFX/items/hazmat.jpg", start: 31588036, end: 31775764 },
      {
        filename: "/GFX/items/infrared_goggles_diffuse1.png",
        start: 31775764,
        end: 31912884,
      },
      { filename: "/GFX/items/key.b3d", start: 31912884, end: 31913975 },
      { filename: "/GFX/items/key.png", start: 31913975, end: 31932452 },
      { filename: "/GFX/items/key2.png", start: 31932452, end: 31951985 },
      { filename: "/GFX/items/keyboard.jpg", start: 31951985, end: 32001141 },
      { filename: "/GFX/items/keycard.x", start: 32001141, end: 32015626 },
      { filename: "/GFX/items/keycard1.jpg", start: 32015626, end: 32047289 },
      { filename: "/GFX/items/keycard2.jpg", start: 32047289, end: 32081316 },
      { filename: "/GFX/items/keycard3.jpg", start: 32081316, end: 32115542 },
      { filename: "/GFX/items/keycard4.jpg", start: 32115542, end: 32149105 },
      { filename: "/GFX/items/keycard5.jpg", start: 32149105, end: 32180487 },
      {
        filename: "/GFX/items/keycardomni.jpg",
        start: 32180487,
        end: 32204475,
      },
      { filename: "/GFX/items/leaflet.png", start: 32204475, end: 32422894 },
      { filename: "/GFX/items/liquid.jpg", start: 32422894, end: 32423525 },
      { filename: "/GFX/items/mastercard.jpg", start: 32423525, end: 32457519 },
      { filename: "/GFX/items/metal.jpg", start: 32457519, end: 32720970 },
      { filename: "/GFX/items/metal_6.jpg", start: 32720970, end: 32753541 },
      { filename: "/GFX/items/metalpanel.x", start: 32753541, end: 32755750 },
      { filename: "/GFX/items/nav.jpg", start: 32755750, end: 32829259 },
      { filename: "/GFX/items/navigator.x", start: 32829259, end: 32843331 },
      { filename: "/GFX/items/note.x", start: 32843331, end: 32845445 },
      { filename: "/GFX/items/note682.jpg", start: 32845445, end: 32910536 },
      { filename: "/GFX/items/note_tex.jpg", start: 32910536, end: 32930603 },
      {
        filename: "/GFX/items/notetexture.jpg",
        start: 32930603,
        end: 32954260,
      },
      { filename: "/GFX/items/origami.b3d", start: 32954260, end: 32955903 },
      { filename: "/GFX/items/paper.x", start: 32955903, end: 32958009 },
      {
        filename: "/GFX/items/papertexture.jpg",
        start: 32958009,
        end: 32992592,
      },
      { filename: "/GFX/items/pill.b3d", start: 32992592, end: 33017287 },
      { filename: "/GFX/items/radio.png", start: 33017287, end: 33275964 },
      { filename: "/GFX/items/radio.x", start: 33275964, end: 33516547 },
      { filename: "/GFX/items/radioHUD.png", start: 33516547, end: 33637731 },
      {
        filename: "/GFX/items/scp-1025_diff.png",
        start: 33637731,
        end: 33668572,
      },
      { filename: "/GFX/items/scp1025.b3d", start: 33668572, end: 33672916 },
      { filename: "/GFX/items/scp148.x", start: 33672916, end: 33678979 },
      { filename: "/GFX/items/scp714.b3d", start: 33678979, end: 33685540 },
      { filename: "/GFX/items/scp714.jpg", start: 33685540, end: 33715994 },
      {
        filename: "/GFX/items/severedhand.b3d",
        start: 33715994,
        end: 33757176,
      },
      { filename: "/GFX/items/shand2.png", start: 33757176, end: 33820364 },
      {
        filename: "/GFX/items/shand_diffuse.png",
        start: 33820364,
        end: 33913008,
      },
      { filename: "/GFX/items/skull1.png", start: 33913008, end: 34247902 },
      { filename: "/GFX/items/sn.it", start: 34247902, end: 34308841 },
      { filename: "/GFX/items/ticket.png", start: 34308841, end: 34498068 },
      {
        filename: "/GFX/items/tickettexture.png",
        start: 34498068,
        end: 34504160,
      },
      { filename: "/GFX/items/vest.x", start: 34504160, end: 34533997 },
      { filename: "/GFX/items/wallet.b3d", start: 34533997, end: 34543692 },
      { filename: "/GFX/items/wallet_tex.jpg", start: 34543692, end: 34600866 },
      { filename: "/GFX/kneelmortal.pd", start: 34600866, end: 34634245 },
      { filename: "/GFX/light1.jpg", start: 34634245, end: 34661258 },
      { filename: "/GFX/light2.jpg", start: 34661258, end: 34684241 },
      { filename: "/GFX/lightcone.b3d", start: 34684241, end: 34686682 },
      { filename: "/GFX/lightcone.png", start: 34686682, end: 34835263 },
      { filename: "/GFX/lightsprite.jpg", start: 34835263, end: 34842079 },
      { filename: "/GFX/map/008_2.b3d", start: 34842079, end: 34850772 },
      { filename: "/GFX/map/008_2_lm1.bmp", start: 34850772, end: 34863114 },
      { filename: "/GFX/map/008_lm1.png", start: 34863114, end: 34901852 },
      { filename: "/GFX/map/008_opt.rmesh", start: 34901852, end: 35330557 },
      {
        filename: "/GFX/map/079-monitor-screen.jpg",
        start: 35330557,
        end: 35361907,
      },
      { filename: "/GFX/map/079.b3d", start: 35361907, end: 35740597 },
      {
        filename: "/GFX/map/079_computer_1.jpg",
        start: 35740597,
        end: 35863181,
      },
      {
        filename: "/GFX/map/079_computer_2.jpg",
        start: 35863181,
        end: 35931037,
      },
      { filename: "/GFX/map/079_monitor.jpg", start: 35931037, end: 36040755 },
      {
        filename: "/GFX/map/079_peripherals.jpg",
        start: 36040755,
        end: 36136359,
      },
      { filename: "/GFX/map/1123_hb.b3d", start: 36136359, end: 36138341 },
      { filename: "/GFX/map/1123_lm1.png", start: 36138341, end: 36177688 },
      { filename: "/GFX/map/1123_opt.rmesh", start: 36177688, end: 36415431 },
      { filename: "/GFX/map/173_2.b3d", start: 36415431, end: 36631455 },
      { filename: "/GFX/map/173_2_lm1.bmp", start: 36631455, end: 39777237 },
      { filename: "/GFX/map/173_lm1.png", start: 39777237, end: 39830388 },
      { filename: "/GFX/map/173_lm2.png", start: 39830388, end: 39837430 },
      { filename: "/GFX/map/173_opt.rmesh", start: 39837430, end: 40749110 },
      {
        filename: "/GFX/map/173bright_lm1.png",
        start: 40749110,
        end: 40833733,
      },
      {
        filename: "/GFX/map/173bright_lm2.png",
        start: 40833733,
        end: 40896758,
      },
      {
        filename: "/GFX/map/173bright_lm3.png",
        start: 40896758,
        end: 40900132,
      },
      {
        filename: "/GFX/map/173bright_opt.rmesh",
        start: 40900132,
        end: 42407791,
      },
      {
        filename: "/GFX/map/201_camera_diffuse1.png",
        start: 42407791,
        end: 42540016,
      },
      { filename: "/GFX/map/294.jpg", start: 42540016, end: 42717538 },
      { filename: "/GFX/map/294.x", start: 42717538, end: 43119455 },
      { filename: "/GFX/map/294test.png", start: 43119455, end: 43820795 },
      {
        filename: "/GFX/map/2_office_lamps_dif.jpg",
        start: 43820795,
        end: 43876699,
      },
      { filename: "/GFX/map/372_hb.b3d", start: 43876699, end: 43885323 },
      { filename: "/GFX/map/4tunnels_lm1.png", start: 43885323, end: 43893754 },
      {
        filename: "/GFX/map/4tunnels_opt.rmesh",
        start: 43893754,
        end: 44035409,
      },
      { filename: "/GFX/map/914key.x", start: 44035409, end: 44061609 },
      { filename: "/GFX/map/914knob.x", start: 44061609, end: 44079267 },
      { filename: "/GFX/map/914labels.jpg", start: 44079267, end: 44132561 },
      { filename: "/GFX/map/914panel.jpg", start: 44132561, end: 44236735 },
      { filename: "/GFX/map/Button.x", start: 44236735, end: 44250294 },
      { filename: "/GFX/map/ButtonCode.x", start: 44250294, end: 44287464 },
      { filename: "/GFX/map/ButtonKeycard.x", start: 44287464, end: 44307425 },
      { filename: "/GFX/map/ButtonScanner.x", start: 44307425, end: 44322799 },
      { filename: "/GFX/map/CD_Diff.png", start: 44322799, end: 45005294 },
      { filename: "/GFX/map/CamHead.b3d", start: 45005294, end: 45021772 },
      { filename: "/GFX/map/CamHead.x", start: 45021772, end: 45120155 },
      {
        filename: "/GFX/map/CameraTexture.jpg",
        start: 45120155,
        end: 45163397,
      },
      { filename: "/GFX/map/ContDoorLeft.x", start: 45163397, end: 45178975 },
      { filename: "/GFX/map/ContDoorRight.x", start: 45178975, end: 45194457 },
      { filename: "/GFX/map/Door01.jpg", start: 45194457, end: 45397271 },
      { filename: "/GFX/map/Door01.x", start: 45397271, end: 45453810 },
      { filename: "/GFX/map/Door02.jpg", start: 45453810, end: 45689052 },
      { filename: "/GFX/map/DoorColl.x", start: 45689052, end: 45694788 },
      { filename: "/GFX/map/DoorFrame.x", start: 45694788, end: 45765978 },
      { filename: "/GFX/map/ElecBox.jpg", start: 45765978, end: 45952150 },
      { filename: "/GFX/map/IntroDesk.b3d", start: 45952150, end: 45964221 },
      {
        filename: "/GFX/map/IntroDesk_lm1.bmp",
        start: 45964221,
        end: 45976563,
      },
      { filename: "/GFX/map/IntroDrawer.b3d", start: 45976563, end: 45998388 },
      {
        filename: "/GFX/map/IntroDrawer_lm1.bmp",
        start: 45998388,
        end: 46010730,
      },
      { filename: "/GFX/map/KeyPad.jpg", start: 46010730, end: 46180234 },
      { filename: "/GFX/map/LAMP.jpg", start: 46180234, end: 46216399 },
      {
        filename: "/GFX/map/LockdownScreen.jpg",
        start: 46216399,
        end: 46342859,
      },
      {
        filename: "/GFX/map/LockdownScreen2.jpg",
        start: 46342859,
        end: 46429152,
      },
      {
        filename: "/GFX/map/LockdownScreen3.jpg",
        start: 46429152,
        end: 46488243,
      },
      {
        filename: "/GFX/map/Logo_of_the_SCP_Foundation.png",
        start: 46488243,
        end: 46495832,
      },
      { filename: "/GFX/map/MEQM805_9.jpg", start: 46495832, end: 46511812 },
      {
        filename: "/GFX/map/MonitorTexture.jpg",
        start: 46511812,
        end: 46555307,
      },
      {
        filename: "/GFX/map/MonitorTexture2.jpg",
        start: 46555307,
        end: 46612176,
      },
      { filename: "/GFX/map/Pipes.jpg", start: 46612176, end: 46717477 },
      {
        filename: "/GFX/map/Pipes_NoRust2.jpg",
        start: 46717477,
        end: 47061174,
      },
      {
        filename: "/GFX/map/Props/201_camera_diffuse1.png",
        start: 47061174,
        end: 47193399,
      },
      { filename: "/GFX/map/Props/205.x", start: 47193399, end: 47306861 },
      {
        filename: "/GFX/map/Props/2_office_lamps_dif.jpg",
        start: 47306861,
        end: 47362765,
      },
      {
        filename: "/GFX/map/Props/ContDoorFrame.x",
        start: 47362765,
        end: 47414380,
      },
      {
        filename: "/GFX/map/Props/ElecBox.jpg",
        start: 47414380,
        end: 47600552,
      },
      { filename: "/GFX/map/Props/ElecBox.x", start: 47600552, end: 47678256 },
      {
        filename: "/GFX/map/Props/MonitorTexture.jpg",
        start: 47678256,
        end: 47721751,
      },
      { filename: "/GFX/map/Props/Pipes.jpg", start: 47721751, end: 47827052 },
      { filename: "/GFX/map/Props/Tank1.x", start: 47827052, end: 47995702 },
      { filename: "/GFX/map/Props/Tank2.x", start: 47995702, end: 48084952 },
      {
        filename: "/GFX/map/Props/bathroomsinks.smf",
        start: 48084952,
        end: 48139224,
      },
      {
        filename: "/GFX/map/Props/boxfile_a.jpg",
        start: 48139224,
        end: 48193516,
      },
      {
        filename: "/GFX/map/Props/boxfile_a.x",
        start: 48193516,
        end: 48198282,
      },
      {
        filename: "/GFX/map/Props/boxfile_b.x",
        start: 48198282,
        end: 48203048,
      },
      {
        filename: "/GFX/map/Props/cabinet_a.jpg",
        start: 48203048,
        end: 48349920,
      },
      {
        filename: "/GFX/map/Props/cabinet_a.x",
        start: 48349920,
        end: 48402905,
      },
      {
        filename: "/GFX/map/Props/cabinet_b.x",
        start: 48402905,
        end: 48613999,
      },
      {
        filename: "/GFX/map/Props/containment_doors.jpg",
        start: 48613999,
        end: 49413803,
      },
      { filename: "/GFX/map/Props/crate1.x", start: 49413803, end: 49571169 },
      { filename: "/GFX/map/Props/crate2.x", start: 49571169, end: 49633957 },
      { filename: "/GFX/map/Props/crate3.x", start: 49633957, end: 49688348 },
      { filename: "/GFX/map/Props/crtbev.jpg", start: 49688348, end: 49800678 },
      { filename: "/GFX/map/Props/crtrec.jpg", start: 49800678, end: 49843250 },
      { filename: "/GFX/map/Props/crtroc.jpg", start: 49843250, end: 49883390 },
      {
        filename: "/GFX/map/Props/flat_monitor.jpg",
        start: 49883390,
        end: 49937779,
      },
      {
        filename: "/GFX/map/Props/keyboard.jpg",
        start: 49937779,
        end: 49986935,
      },
      { filename: "/GFX/map/Props/keyboard.x", start: 49986935, end: 49995634 },
      { filename: "/GFX/map/Props/lamp1.x", start: 49995634, end: 50043941 },
      { filename: "/GFX/map/Props/lamp2.x", start: 50043941, end: 50057518 },
      { filename: "/GFX/map/Props/lamp3.png", start: 50057518, end: 50227307 },
      { filename: "/GFX/map/Props/lamp3.x", start: 50227307, end: 50413013 },
      { filename: "/GFX/map/Props/monitor.x", start: 50413013, end: 50428863 },
      { filename: "/GFX/map/Props/mug.x", start: 50428863, end: 50486973 },
      {
        filename: "/GFX/map/Props/officeseat_a.jpg",
        start: 50486973,
        end: 50560558,
      },
      {
        filename: "/GFX/map/Props/officeseat_a.x",
        start: 50560558,
        end: 50806793,
      },
      { filename: "/GFX/map/Props/tank1.jpg", start: 50806793, end: 50902953 },
      { filename: "/GFX/map/Props/tank2.jpg", start: 50902953, end: 50992811 },
      {
        filename: "/GFX/map/SLH_1499_tex1.jpg",
        start: 50992811,
        end: 51010096,
      },
      {
        filename: "/GFX/map/SLH_1499_tex2.jpg",
        start: 51010096,
        end: 51036345,
      },
      {
        filename: "/GFX/map/SLH_1499_water.png",
        start: 51036345,
        end: 51047681,
      },
      {
        filename: "/GFX/map/SLH_miscsigns.jpg",
        start: 51047681,
        end: 51232746,
      },
      {
        filename: "/GFX/map/alcohol-hand-gel-v2-256-blood.jpg",
        start: 51232746,
        end: 51249659,
      },
      { filename: "/GFX/map/bed-table.jpg", start: 51249659, end: 51286370 },
      { filename: "/GFX/map/bowl-blood.jpg", start: 51286370, end: 51317894 },
      { filename: "/GFX/map/boxfile_a.jpg", start: 51317894, end: 51372186 },
      { filename: "/GFX/map/cabinet_a.jpg", start: 51372186, end: 51519058 },
      { filename: "/GFX/map/cable_black.jpg", start: 51519058, end: 51520820 },
      { filename: "/GFX/map/cam.x", start: 51520820, end: 51565573 },
      { filename: "/GFX/map/cambase.x", start: 51565573, end: 51585841 },
      {
        filename: "/GFX/map/caution_tesla.jpg",
        start: 51585841,
        end: 51738098,
      },
      { filename: "/GFX/map/ceiling.jpg", start: 51738098, end: 52062090 },
      { filename: "/GFX/map/chatscreen.jpg", start: 52062090, end: 52108262 },
      { filename: "/GFX/map/chatscreen2.jpg", start: 52108262, end: 52172007 },
      {
        filename: "/GFX/map/checkpoint1_lm1.png",
        start: 52172007,
        end: 52205668,
      },
      {
        filename: "/GFX/map/checkpoint1_opt.rmesh",
        start: 52205668,
        end: 52359190,
      },
      {
        filename: "/GFX/map/checkpoint2_lm1.png",
        start: 52359190,
        end: 52392654,
      },
      {
        filename: "/GFX/map/checkpoint2_opt.rmesh",
        start: 52392654,
        end: 52544697,
      },
      { filename: "/GFX/map/circuit.jpg", start: 52544697, end: 52581769 },
      { filename: "/GFX/map/cloth.jpg", start: 52581769, end: 52678416 },
      { filename: "/GFX/map/coffin_lm1.png", start: 52678416, end: 52693176 },
      { filename: "/GFX/map/coffin_opt.rmesh", start: 52693176, end: 52889973 },
      { filename: "/GFX/map/concrete.jpg", start: 52889973, end: 52968116 },
      {
        filename: "/GFX/map/concretefloor.jpg",
        start: 52968116,
        end: 53057157,
      },
      {
        filename: "/GFX/map/concretefloorbump.jpg",
        start: 53057157,
        end: 53157849,
      },
      { filename: "/GFX/map/concretemoss.jpg", start: 53157849, end: 53588718 },
      { filename: "/GFX/map/concretewall.jpg", start: 53588718, end: 53981834 },
      {
        filename: "/GFX/map/concretewallbump.jpg",
        start: 53981834,
        end: 54093023,
      },
      {
        filename: "/GFX/map/containment_doors.jpg",
        start: 54093023,
        end: 54892827,
      },
      {
        filename: "/GFX/map/containmentdoorsbump.jpg",
        start: 54892827,
        end: 55565002,
      },
      { filename: "/GFX/map/controlpanel.jpg", start: 55565002, end: 55730958 },
      {
        filename: "/GFX/map/controlpanel2.jpg",
        start: 55730958,
        end: 56030974,
      },
      { filename: "/GFX/map/crtbev.jpg", start: 56030974, end: 56143304 },
      { filename: "/GFX/map/crtrec.jpg", start: 56143304, end: 56185876 },
      { filename: "/GFX/map/crtroc.jpg", start: 56185876, end: 56226016 },
      { filename: "/GFX/map/ctwalls.png", start: 56226016, end: 56728361 },
      { filename: "/GFX/map/ctwalls2.png", start: 56728361, end: 57283637 },
      { filename: "/GFX/map/d-quest173.png", start: 57283637, end: 58220560 },
      { filename: "/GFX/map/decal1.png", start: 58220560, end: 58408077 },
      { filename: "/GFX/map/decal4.png", start: 58408077, end: 58485493 },
      { filename: "/GFX/map/diff_trolley.jpg", start: 58485493, end: 58529035 },
      {
        filename: "/GFX/map/dimension1499/1499object0_cull.b3d",
        start: 58529035,
        end: 58532577,
      },
      {
        filename: "/GFX/map/dimension1499/1499object0_lm1.png",
        start: 58532577,
        end: 58542958,
      },
      {
        filename: "/GFX/map/dimension1499/1499object0_lm2.png",
        start: 58542958,
        end: 58554167,
      },
      {
        filename: "/GFX/map/dimension1499/1499object0_lm3.png",
        start: 58554167,
        end: 58572941,
      },
      {
        filename: "/GFX/map/dimension1499/1499object0_opt.rmesh",
        start: 58572941,
        end: 58817984,
      },
      {
        filename: "/GFX/map/dimension1499/1499object1.b3d",
        start: 58817984,
        end: 58821938,
      },
      {
        filename: "/GFX/map/dimension1499/1499object10.b3d",
        start: 58821938,
        end: 58822820,
      },
      {
        filename: "/GFX/map/dimension1499/1499object11.b3d",
        start: 58822820,
        end: 58829718,
      },
      {
        filename: "/GFX/map/dimension1499/1499object12.b3d",
        start: 58829718,
        end: 58831224,
      },
      {
        filename: "/GFX/map/dimension1499/1499object13.b3d",
        start: 58831224,
        end: 58838122,
      },
      {
        filename: "/GFX/map/dimension1499/1499object14.b3d",
        start: 58838122,
        end: 58844044,
      },
      {
        filename: "/GFX/map/dimension1499/1499object15.b3d",
        start: 58844044,
        end: 58844926,
      },
      {
        filename: "/GFX/map/dimension1499/1499object2.b3d",
        start: 58844926,
        end: 58850808,
      },
      {
        filename: "/GFX/map/dimension1499/1499object3.b3d",
        start: 58850808,
        end: 58861962,
      },
      {
        filename: "/GFX/map/dimension1499/1499object4.b3d",
        start: 58861962,
        end: 58863084,
      },
      {
        filename: "/GFX/map/dimension1499/1499object5.b3d",
        start: 58863084,
        end: 58888086,
      },
      {
        filename: "/GFX/map/dimension1499/1499object6.b3d",
        start: 58888086,
        end: 58894984,
      },
      {
        filename: "/GFX/map/dimension1499/1499object7.b3d",
        start: 58894984,
        end: 58899946,
      },
      {
        filename: "/GFX/map/dimension1499/1499object8.b3d",
        start: 58899946,
        end: 58904908,
      },
      {
        filename: "/GFX/map/dimension1499/1499object9.b3d",
        start: 58904908,
        end: 58911806,
      },
      {
        filename: "/GFX/map/dimension1499/1499plane.b3d",
        start: 58911806,
        end: 58912215,
      },
      {
        filename: "/GFX/map/dimension1499/grit1.jpg",
        start: 58912215,
        end: 59295979,
      },
      {
        filename: "/GFX/map/dimension1499/grit2.jpg",
        start: 59295979,
        end: 59803949,
      },
      {
        filename: "/GFX/map/dimension1499/grit3.jpg",
        start: 59803949,
        end: 60458106,
      },
      {
        filename: "/GFX/map/dimension1499_lm1.png",
        start: 60458106,
        end: 60461074,
      },
      {
        filename: "/GFX/map/dimension1499_opt.rmesh",
        start: 60461074,
        end: 60711841,
      },
      { filename: "/GFX/map/dirtymetal.jpg", start: 60711841, end: 60998710 },
      {
        filename: "/GFX/map/dirtymetalbump.jpg",
        start: 60998710,
        end: 61323011,
      },
      { filename: "/GFX/map/doctors.jpg", start: 61323011, end: 61387014 },
      { filename: "/GFX/map/door.jpg", start: 61387014, end: 61549287 },
      { filename: "/GFX/map/elevatordoor.b3d", start: 61549287, end: 61557628 },
      { filename: "/GFX/map/endroom2_lm1.png", start: 61557628, end: 61564904 },
      {
        filename: "/GFX/map/endroom2_opt.rmesh",
        start: 61564904,
        end: 61710603,
      },
      { filename: "/GFX/map/endroom_lm1.png", start: 61710603, end: 61736260 },
      {
        filename: "/GFX/map/endroom_opt.rmesh",
        start: 61736260,
        end: 62070889,
      },
      { filename: "/GFX/map/exit1_lm1.png", start: 62070889, end: 62142846 },
      { filename: "/GFX/map/exit1_lm2.png", start: 62142846, end: 62187699 },
      { filename: "/GFX/map/exit1_lm3.png", start: 62187699, end: 62282244 },
      { filename: "/GFX/map/exit1_lm4.png", start: 62282244, end: 62337738 },
      { filename: "/GFX/map/exit1_lm5.png", start: 62337738, end: 62357979 },
      { filename: "/GFX/map/exit1_opt.rmesh", start: 62357979, end: 64347417 },
      { filename: "/GFX/map/exit1terrain.b3d", start: 64347417, end: 64963368 },
      {
        filename: "/GFX/map/exit1terrain_lm1.bmp",
        start: 64963368,
        end: 65749856,
      },
      {
        filename: "/GFX/map/exit1terrain_lm2.bmp",
        start: 65749856,
        end: 66536344,
      },
      {
        filename: "/GFX/map/exit1terrain_lm3.bmp",
        start: 66536344,
        end: 67322832,
      },
      {
        filename: "/GFX/map/exit1terrain_lm4.bmp",
        start: 67322832,
        end: 68109320,
      },
      { filename: "/GFX/map/exit2.jpg", start: 68109320, end: 68130694 },
      { filename: "/GFX/map/fan.b3d", start: 68130694, end: 68153827 },
      { filename: "/GFX/map/fan_lm1.bmp", start: 68153827, end: 68940313 },
      {
        filename: "/GFX/map/fire_extinguisher.jpg",
        start: 68940313,
        end: 68962428,
      },
      { filename: "/GFX/map/flat_monitor.jpg", start: 68962428, end: 69016817 },
      {
        filename: "/GFX/map/forest/concrete.jpg",
        start: 69016817,
        end: 69094960,
      },
      {
        filename: "/GFX/map/forest/detail/rock.b3d",
        start: 69094960,
        end: 69100785,
      },
      {
        filename: "/GFX/map/forest/detail/rock.jpg",
        start: 69100785,
        end: 69159292,
      },
      {
        filename: "/GFX/map/forest/detail/tree1.dds",
        start: 69159292,
        end: 70557548,
      },
      {
        filename: "/GFX/map/forest/detail/tree1.jpg",
        start: 70557548,
        end: 70660398,
      },
      {
        filename: "/GFX/map/forest/detail/tree2.png",
        start: 70660398,
        end: 71512802,
      },
      {
        filename: "/GFX/map/forest/detail/treetest4.b3d",
        start: 71512802,
        end: 71530048,
      },
      {
        filename: "/GFX/map/forest/detail/treetest5.b3d",
        start: 71530048,
        end: 71532676,
      },
      { filename: "/GFX/map/forest/door.b3d", start: 71532676, end: 71584554 },
      {
        filename: "/GFX/map/forest/door_frame.b3d",
        start: 71584554,
        end: 71598768,
      },
      {
        filename: "/GFX/map/forest/forest1h.png",
        start: 71598768,
        end: 71602114,
      },
      {
        filename: "/GFX/map/forest/forest1h_mask.png",
        start: 71602114,
        end: 71605419,
      },
      {
        filename: "/GFX/map/forest/forest2Ch.png",
        start: 71605419,
        end: 71608788,
      },
      {
        filename: "/GFX/map/forest/forest2Ch_mask.png",
        start: 71608788,
        end: 71612407,
      },
      {
        filename: "/GFX/map/forest/forest2h.png",
        start: 71612407,
        end: 71615738,
      },
      {
        filename: "/GFX/map/forest/forest2h_mask.png",
        start: 71615738,
        end: 71619415,
      },
      {
        filename: "/GFX/map/forest/forest3h.png",
        start: 71619415,
        end: 71622748,
      },
      {
        filename: "/GFX/map/forest/forest3h_mask.png",
        start: 71622748,
        end: 71626749,
      },
      {
        filename: "/GFX/map/forest/forest4h.png",
        start: 71626749,
        end: 71630087,
      },
      {
        filename: "/GFX/map/forest/forest4h_mask.png",
        start: 71630087,
        end: 71635058,
      },
      {
        filename: "/GFX/map/forest/forestfloor.jpg",
        start: 71635058,
        end: 72049488,
      },
      {
        filename: "/GFX/map/forest/forestpath.jpg",
        start: 72049488,
        end: 72473458,
      },
      {
        filename: "/GFX/map/forest/scp_860_testingdoor_diffuse.png",
        start: 72473458,
        end: 72638015,
      },
      {
        filename: "/GFX/map/forest/wall.rmesh",
        start: 72638015,
        end: 72639856,
      },
      {
        filename: "/GFX/map/forest/wall_lm.png",
        start: 72639856,
        end: 72647719,
      },
      { filename: "/GFX/map/forest_lm1.bmp", start: 72647719, end: 73434205 },
      { filename: "/GFX/map/forestfloor.jpg", start: 73434205, end: 73848635 },
      { filename: "/GFX/map/forestpath.jpg", start: 73848635, end: 74272605 },
      {
        filename: "/GFX/map/forestterrain_lm1.bmp",
        start: 74272605,
        end: 75059091,
      },
      {
        filename: "/GFX/map/gatea_hitbox1.b3d",
        start: 75059091,
        end: 75060973,
      },
      { filename: "/GFX/map/gatea_lm1.png", start: 75060973, end: 75108651 },
      { filename: "/GFX/map/gatea_lm2.png", start: 75108651, end: 75169863 },
      { filename: "/GFX/map/gatea_lm3.png", start: 75169863, end: 75204188 },
      { filename: "/GFX/map/gatea_opt.rmesh", start: 75204188, end: 76443681 },
      {
        filename: "/GFX/map/gateaentrance_lm1.png",
        start: 76443681,
        end: 76469021,
      },
      {
        filename: "/GFX/map/gateaentrance_opt.rmesh",
        start: 76469021,
        end: 76760775,
      },
      { filename: "/GFX/map/gateatunnel.b3d", start: 76760775, end: 77177070 },
      {
        filename: "/GFX/map/gateatunnel_lm1.bmp",
        start: 77177070,
        end: 77963556,
      },
      {
        filename: "/GFX/map/gateatunnel_lm2.bmp",
        start: 77963556,
        end: 78750042,
      },
      {
        filename: "/GFX/map/gateatunnel_lm3.bmp",
        start: 78750042,
        end: 79536528,
      },
      { filename: "/GFX/map/gateawall1.b3d", start: 79536528, end: 79560083 },
      { filename: "/GFX/map/gateawall2.b3d", start: 79560083, end: 79583638 },
      { filename: "/GFX/map/gears.jpg", start: 79583638, end: 79712564 },
      { filename: "/GFX/map/glass.png", start: 79712564, end: 80131936 },
      {
        filename: "/GFX/map/granite-texture-tileable.png",
        start: 80131936,
        end: 81030999,
      },
      { filename: "/GFX/map/grass.png", start: 81030999, end: 81134639 },
      { filename: "/GFX/map/grass2.jpg", start: 81134639, end: 81302635 },
      { filename: "/GFX/map/grass2bump.jpg", start: 81302635, end: 82686034 },
      { filename: "/GFX/map/gravel.jpg", start: 82686034, end: 83363415 },
      { filename: "/GFX/map/gravelbump.jpg", start: 83363415, end: 83687310 },
      { filename: "/GFX/map/heavydoor1.x", start: 83687310, end: 83709907 },
      { filename: "/GFX/map/heavydoor2.x", start: 83709907, end: 83724692 },
      { filename: "/GFX/map/intro_labels.b3d", start: 83724692, end: 83764754 },
      {
        filename: "/GFX/map/intro_labels_lm1.bmp",
        start: 83764754,
        end: 83777096,
      },
      { filename: "/GFX/map/keyboard.jpg", start: 83777096, end: 83826252 },
      { filename: "/GFX/map/label008.jpg", start: 83826252, end: 83900146 },
      { filename: "/GFX/map/label012.jpg", start: 83900146, end: 83972241 },
      { filename: "/GFX/map/label035.jpg", start: 83972241, end: 84055120 },
      { filename: "/GFX/map/label049.jpg", start: 84055120, end: 84132544 },
      { filename: "/GFX/map/label079.jpg", start: 84132544, end: 84210069 },
      { filename: "/GFX/map/label106.jpg", start: 84210069, end: 84380091 },
      { filename: "/GFX/map/label1123.png", start: 84380091, end: 84871771 },
      { filename: "/GFX/map/label173.jpg", start: 84871771, end: 85315259 },
      { filename: "/GFX/map/label205.jpg", start: 85315259, end: 85369089 },
      { filename: "/GFX/map/label372.jpg", start: 85369089, end: 85445037 },
      { filename: "/GFX/map/label513.jpg", start: 85445037, end: 85518728 },
      { filename: "/GFX/map/label895.jpg", start: 85518728, end: 85593182 },
      { filename: "/GFX/map/label914.jpg", start: 85593182, end: 86053886 },
      { filename: "/GFX/map/label966.jpg", start: 86053886, end: 86116018 },
      {
        filename: "/GFX/map/labelmedicalbay.jpg",
        start: 86116018,
        end: 86265714,
      },
      { filename: "/GFX/map/lamp3.jpg", start: 86265714, end: 86296703 },
      { filename: "/GFX/map/larry.jpg", start: 86296703, end: 86332254 },
      { filename: "/GFX/map/leverbase.x", start: 86332254, end: 86373469 },
      { filename: "/GFX/map/leverhandle.x", start: 86373469, end: 86398105 },
      { filename: "/GFX/map/lightgun.b3d", start: 86398105, end: 86462931 },
      { filename: "/GFX/map/lightgunbase.b3d", start: 86462931, end: 86489806 },
      {
        filename: "/GFX/map/lockroom2_lm1.png",
        start: 86489806,
        end: 86508491,
      },
      {
        filename: "/GFX/map/lockroom2_opt.rmesh",
        start: 86508491,
        end: 86616366,
      },
      {
        filename: "/GFX/map/lockroom3_lm1.png",
        start: 86616366,
        end: 86626041,
      },
      {
        filename: "/GFX/map/lockroom3_lm2.png",
        start: 86626041,
        end: 86630239,
      },
      {
        filename: "/GFX/map/lockroom3_opt.rmesh",
        start: 86630239,
        end: 86710939,
      },
      {
        filename: "/GFX/map/lockroom_ez.rmesh",
        start: 86710939,
        end: 86793382,
      },
      { filename: "/GFX/map/lockroom_lm1.png", start: 86793382, end: 86813840 },
      {
        filename: "/GFX/map/lockroom_opt.rmesh",
        start: 86813840,
        end: 86897466,
      },
      {
        filename: "/GFX/map/machineroom_lm1.png",
        start: 86897466,
        end: 86936923,
      },
      {
        filename: "/GFX/map/machineroom_opt.rmesh",
        start: 86936923,
        end: 87425867,
      },
      {
        filename: "/GFX/map/maintenance_lm.png",
        start: 87425867,
        end: 87487386,
      },
      { filename: "/GFX/map/mat_glass.png", start: 87487386, end: 87543482 },
      {
        filename: "/GFX/map/mechanical_lever.jpg",
        start: 87543482,
        end: 87622404,
      },
      { filename: "/GFX/map/medibay.jpg", start: 87622404, end: 87674443 },
      { filename: "/GFX/map/medibay_lm1.png", start: 87674443, end: 87700996 },
      { filename: "/GFX/map/medibay_lm2.png", start: 87700996, end: 87706931 },
      {
        filename: "/GFX/map/medibay_opt.rmesh",
        start: 87706931,
        end: 87847286,
      },
      {
        filename: "/GFX/map/medibay_props.b3d",
        start: 87847286,
        end: 89145794,
      },
      {
        filename: "/GFX/map/medibay_props_lm1.bmp",
        start: 89145794,
        end: 89932280,
      },
      {
        filename: "/GFX/map/medibay_props_lm2.bmp",
        start: 89932280,
        end: 90718766,
      },
      { filename: "/GFX/map/metal.jpg", start: 90718766, end: 90903090 },
      { filename: "/GFX/map/metal3.jpg", start: 90903090, end: 91051161 },
      { filename: "/GFX/map/metal3bump.jpg", start: 91051161, end: 91089151 },
      { filename: "/GFX/map/metal_darker.jpg", start: 91089151, end: 91163537 },
      { filename: "/GFX/map/metalpanels.jpg", start: 91163537, end: 91235020 },
      { filename: "/GFX/map/metalpanels2.jpg", start: 91235020, end: 91316978 },
      {
        filename: "/GFX/map/metalpanels2bump.jpg",
        start: 91316978,
        end: 91421304,
      },
      {
        filename: "/GFX/map/metalpanelsbump.jpg",
        start: 91421304,
        end: 91467836,
      },
      { filename: "/GFX/map/microscope.jpg", start: 91467836, end: 91502557 },
      { filename: "/GFX/map/misc.jpg", start: 91502557, end: 91607672 },
      { filename: "/GFX/map/miscbump.jpg", start: 91607672, end: 91727379 },
      { filename: "/GFX/map/miscsigns.jpg", start: 91727379, end: 91898388 },
      { filename: "/GFX/map/miscsigns2.jpg", start: 91898388, end: 92078365 },
      { filename: "/GFX/map/miscsigns3.ae", start: 92078365, end: 92473775 },
      { filename: "/GFX/map/miscsigns3.jpg", start: 92473775, end: 92660240 },
      { filename: "/GFX/map/miscsigns4.jpg", start: 92660240, end: 92758701 },
      { filename: "/GFX/map/monitor.b3d", start: 92758701, end: 92763728 },
      {
        filename: "/GFX/map/monitor_checkpoint.b3d",
        start: 92763728,
        end: 92770875,
      },
      { filename: "/GFX/map/mt1.rmesh", start: 92770875, end: 92781759 },
      { filename: "/GFX/map/mt2.rmesh", start: 92781759, end: 92789115 },
      { filename: "/GFX/map/mt2c.rmesh", start: 92789115, end: 92801521 },
      { filename: "/GFX/map/mt3.rmesh", start: 92801521, end: 92818763 },
      { filename: "/GFX/map/mt4.rmesh", start: 92818763, end: 92841285 },
      {
        filename: "/GFX/map/mt_elevator.rmesh",
        start: 92841285,
        end: 92866722,
      },
      {
        filename: "/GFX/map/mt_generator.rmesh",
        start: 92866722,
        end: 93018343,
      },
      { filename: "/GFX/map/navtexture.jpg", start: 93018343, end: 93065775 },
      { filename: "/GFX/map/new_metal1.jpg", start: 93065775, end: 93130038 },
      { filename: "/GFX/map/officeseat_a.jpg", start: 93130038, end: 93203623 },
      { filename: "/GFX/map/officewall.jpg", start: 93203623, end: 93441699 },
      {
        filename: "/GFX/map/op-table-light-blood.jpg",
        start: 93441699,
        end: 93492866,
      },
      { filename: "/GFX/map/ox-cy-tray.jpg", start: 93492866, end: 93523876 },
      {
        filename: "/GFX/map/oxygen-cylinder.jpg",
        start: 93523876,
        end: 93560206,
      },
      { filename: "/GFX/map/papertexture.jpg", start: 93560206, end: 93590587 },
      { filename: "/GFX/map/pdfloor.jpg", start: 93590587, end: 93722148 },
      { filename: "/GFX/map/pdwall.jpg", start: 93722148, end: 93835293 },
      {
        filename: "/GFX/map/pocketdimension1_lm1.png",
        start: 93835293,
        end: 93839865,
      },
      {
        filename: "/GFX/map/pocketdimension1_opt.rmesh",
        start: 93839865,
        end: 93863082,
      },
      {
        filename: "/GFX/map/pocketdimension2.b3d",
        start: 93863082,
        end: 93879283,
      },
      {
        filename: "/GFX/map/pocketdimension2_lm1.bmp",
        start: 93879283,
        end: 94665769,
      },
      {
        filename: "/GFX/map/pocketdimension3.b3d",
        start: 94665769,
        end: 95215166,
      },
      {
        filename: "/GFX/map/pocketdimension3_lm1.bmp",
        start: 95215166,
        end: 96001652,
      },
      {
        filename: "/GFX/map/pocketdimension3_lm2.bmp",
        start: 96001652,
        end: 96788138,
      },
      {
        filename: "/GFX/map/pocketdimension3_lm3.bmp",
        start: 96788138,
        end: 97574624,
      },
      {
        filename: "/GFX/map/pocketdimension4.b3d",
        start: 97574624,
        end: 97577098,
      },
      {
        filename: "/GFX/map/pocketdimension4_lm1.bmp",
        start: 97577098,
        end: 98363584,
      },
      {
        filename: "/GFX/map/pocketdimension5.b3d",
        start: 98363584,
        end: 98431599,
      },
      {
        filename: "/GFX/map/pocketdimension5_lm1.bmp",
        start: 98431599,
        end: 99218085,
      },
      {
        filename: "/GFX/map/pocketdimensionterrain.b3d",
        start: 99218085,
        end: 99540479,
      },
      { filename: "/GFX/map/red.jpg", start: 99540479, end: 99567302 },
      { filename: "/GFX/map/rock.jpg", start: 99567302, end: 99625809 },
      { filename: "/GFX/map/rockmoss.jpg", start: 99625809, end: 99888482 },
      {
        filename: "/GFX/map/rockmossbump.jpg",
        start: 99888482,
        end: 100305818,
      },
      { filename: "/GFX/map/room012_2.b3d", start: 100305818, end: 100345241 },
      {
        filename: "/GFX/map/room012_2_lm1.bmp",
        start: 100345241,
        end: 101131727,
      },
      { filename: "/GFX/map/room012_3.b3d", start: 101131727, end: 101150305 },
      {
        filename: "/GFX/map/room012_lm1.png",
        start: 101150305,
        end: 101180504,
      },
      {
        filename: "/GFX/map/room012_opt.rmesh",
        start: 101180504,
        end: 101378133,
      },
      {
        filename: "/GFX/map/room035_lm1.png",
        start: 101378133,
        end: 101404948,
      },
      {
        filename: "/GFX/map/room035_opt.rmesh",
        start: 101404948,
        end: 101548975,
      },
      { filename: "/GFX/map/room049_hb.b3d", start: 101548975, end: 101555837 },
      {
        filename: "/GFX/map/room049_lm1.png",
        start: 101555837,
        end: 101683829,
      },
      {
        filename: "/GFX/map/room049_lm2.png",
        start: 101683829,
        end: 101725730,
      },
      {
        filename: "/GFX/map/room049_opt.rmesh",
        start: 101725730,
        end: 102464479,
      },
      { filename: "/GFX/map/room079.rmesh", start: 102464479, end: 102740730 },
      {
        filename: "/GFX/map/room079_lm_0.png",
        start: 102740730,
        end: 102819092,
      },
      {
        filename: "/GFX/map/room079_lm_1.png",
        start: 102819092,
        end: 102871625,
      },
      { filename: "/GFX/map/room1062.b3d", start: 102871625, end: 102955687 },
      {
        filename: "/GFX/map/room1062_lm1.bmp",
        start: 102955687,
        end: 103742173,
      },
      {
        filename: "/GFX/map/room106_lm1.png",
        start: 103742173,
        end: 103830446,
      },
      {
        filename: "/GFX/map/room106_lm2.png",
        start: 103830446,
        end: 103861983,
      },
      {
        filename: "/GFX/map/room106_opt.rmesh",
        start: 103861983,
        end: 104750390,
      },
      {
        filename: "/GFX/map/room1162_lm1.png",
        start: 104750390,
        end: 104771461,
      },
      {
        filename: "/GFX/map/room1162_opt.rmesh",
        start: 104771461,
        end: 105016829,
      },
      {
        filename: "/GFX/map/room1archive_lm1.png",
        start: 105016829,
        end: 105025941,
      },
      {
        filename: "/GFX/map/room1archive_opt.rmesh",
        start: 105025941,
        end: 105048356,
      },
      {
        filename: "/GFX/map/room1lifts_lm1.png",
        start: 105048356,
        end: 105051218,
      },
      {
        filename: "/GFX/map/room1lifts_lm2.png",
        start: 105051218,
        end: 105054696,
      },
      {
        filename: "/GFX/map/room1lifts_opt.rmesh",
        start: 105054696,
        end: 105207162,
      },
      {
        filename: "/GFX/map/room205_lm1.png",
        start: 105207162,
        end: 105226084,
      },
      {
        filename: "/GFX/map/room205_opt.rmesh",
        start: 105226084,
        end: 105314383,
      },
      {
        filename: "/GFX/map/room2C_opt.rmesh",
        start: 105314383,
        end: 105544201,
      },
      {
        filename: "/GFX/map/room2Ctunnel_opt.rmesh",
        start: 105544201,
        end: 105698935,
      },
      {
        filename: "/GFX/map/room2Cz3_opt.rmesh",
        start: 105698935,
        end: 105765583,
      },
      {
        filename: "/GFX/map/room2_2_lm1.png",
        start: 105765583,
        end: 105778560,
      },
      {
        filename: "/GFX/map/room2_2_opt.rmesh",
        start: 105778560,
        end: 106041253,
      },
      {
        filename: "/GFX/map/room2_3_lm1.png",
        start: 106041253,
        end: 106044299,
      },
      {
        filename: "/GFX/map/room2_3_opt.rmesh",
        start: 106044299,
        end: 106050857,
      },
      {
        filename: "/GFX/map/room2_4_lm1.png",
        start: 106050857,
        end: 106064743,
      },
      {
        filename: "/GFX/map/room2_4_lm2.png",
        start: 106064743,
        end: 106086093,
      },
      {
        filename: "/GFX/map/room2_4_lm3.png",
        start: 106086093,
        end: 106103749,
      },
      {
        filename: "/GFX/map/room2_4_lm4.png",
        start: 106103749,
        end: 106124295,
      },
      {
        filename: "/GFX/map/room2_4_lm5.png",
        start: 106124295,
        end: 106137963,
      },
      {
        filename: "/GFX/map/room2_4_lm6.png",
        start: 106137963,
        end: 106141619,
      },
      {
        filename: "/GFX/map/room2_4_opt.rmesh",
        start: 106141619,
        end: 106440030,
      },
      {
        filename: "/GFX/map/room2_5_lm1.png",
        start: 106440030,
        end: 106460242,
      },
      {
        filename: "/GFX/map/room2_5_lm2.png",
        start: 106460242,
        end: 106480891,
      },
      {
        filename: "/GFX/map/room2_5_opt.rmesh",
        start: 106480891,
        end: 106719297,
      },
      { filename: "/GFX/map/room2_lm1.png", start: 106719297, end: 106737239 },
      {
        filename: "/GFX/map/room2_opt.rmesh",
        start: 106737239,
        end: 107071464,
      },
      {
        filename: "/GFX/map/room2c2_lm1.png",
        start: 107071464,
        end: 107096739,
      },
      {
        filename: "/GFX/map/room2c2_lm2.png",
        start: 107096739,
        end: 107123641,
      },
      {
        filename: "/GFX/map/room2c2_lm3.png",
        start: 107123641,
        end: 107124764,
      },
      {
        filename: "/GFX/map/room2c2_opt.rmesh",
        start: 107124764,
        end: 107473774,
      },
      { filename: "/GFX/map/room2c_lm1.png", start: 107473774, end: 107491805 },
      {
        filename: "/GFX/map/room2cafeteria_lm1.png",
        start: 107491805,
        end: 107534429,
      },
      {
        filename: "/GFX/map/room2cafeteria_opt.rmesh",
        start: 107534429,
        end: 107923478,
      },
      {
        filename: "/GFX/map/room2ccont_lm1.png",
        start: 107923478,
        end: 107952918,
      },
      {
        filename: "/GFX/map/room2ccont_opt.rmesh",
        start: 107952918,
        end: 108119105,
      },
      {
        filename: "/GFX/map/room2closets_lm1.png",
        start: 108119105,
        end: 108161924,
      },
      {
        filename: "/GFX/map/room2closets_lm2.png",
        start: 108161924,
        end: 108166334,
      },
      {
        filename: "/GFX/map/room2closets_opt.rmesh",
        start: 108166334,
        end: 108524992,
      },
      {
        filename: "/GFX/map/room2cpit_lm1.png",
        start: 108524992,
        end: 108553415,
      },
      {
        filename: "/GFX/map/room2cpit_opt.rmesh",
        start: 108553415,
        end: 108953364,
      },
      {
        filename: "/GFX/map/room2ctunnel_lm1.png",
        start: 108953364,
        end: 108968162,
      },
      {
        filename: "/GFX/map/room2cz3_lm1.png",
        start: 108968162,
        end: 108976507,
      },
      {
        filename: "/GFX/map/room2doors_lm1.png",
        start: 108976507,
        end: 108998334,
      },
      {
        filename: "/GFX/map/room2doors_opt.rmesh",
        start: 108998334,
        end: 109135654,
      },
      {
        filename: "/GFX/map/room2elevator_lm1.png",
        start: 109135654,
        end: 109145316,
      },
      {
        filename: "/GFX/map/room2elevator_opt.rmesh",
        start: 109145316,
        end: 109322201,
      },
      {
        filename: "/GFX/map/room2gw_b_lm1.png",
        start: 109322201,
        end: 109350715,
      },
      {
        filename: "/GFX/map/room2gw_b_opt.rmesh",
        start: 109350715,
        end: 109782695,
      },
      {
        filename: "/GFX/map/room2gw_lm1.png",
        start: 109782695,
        end: 109786558,
      },
      {
        filename: "/GFX/map/room2gw_lm2.png",
        start: 109786558,
        end: 109794117,
      },
      {
        filename: "/GFX/map/room2gw_lm3.png",
        start: 109794117,
        end: 109803978,
      },
      {
        filename: "/GFX/map/room2gw_lm4.png",
        start: 109803978,
        end: 109827382,
      },
      {
        filename: "/GFX/map/room2gw_lm5.png",
        start: 109827382,
        end: 109842573,
      },
      {
        filename: "/GFX/map/room2gw_lm6.png",
        start: 109842573,
        end: 109850246,
      },
      {
        filename: "/GFX/map/room2gw_opt.rmesh",
        start: 109850246,
        end: 110229197,
      },
      {
        filename: "/GFX/map/room2gw_pipes.b3d",
        start: 110229197,
        end: 110518116,
      },
      {
        filename: "/GFX/map/room2gw_pipes_lm1.bmp",
        start: 110518116,
        end: 110714778,
      },
      {
        filename: "/GFX/map/room2nuke_lm1.png",
        start: 110714778,
        end: 110815781,
      },
      {
        filename: "/GFX/map/room2nuke_opt.rmesh",
        start: 110815781,
        end: 111137161,
      },
      {
        filename: "/GFX/map/room2offices2_lm1.png",
        start: 111137161,
        end: 111170241,
      },
      {
        filename: "/GFX/map/room2offices2_opt.rmesh",
        start: 111170241,
        end: 111492725,
      },
      {
        filename: "/GFX/map/room2offices3_lm1.png",
        start: 111492725,
        end: 111544331,
      },
      {
        filename: "/GFX/map/room2offices3_opt.rmesh",
        start: 111544331,
        end: 112177733,
      },
      {
        filename: "/GFX/map/room2offices4_lm1.png",
        start: 112177733,
        end: 112196296,
      },
      {
        filename: "/GFX/map/room2offices4_lm2.png",
        start: 112196296,
        end: 112223175,
      },
      {
        filename: "/GFX/map/room2offices4_lm3.png",
        start: 112223175,
        end: 112241506,
      },
      {
        filename: "/GFX/map/room2offices4_opt.rmesh",
        start: 112241506,
        end: 112629147,
      },
      {
        filename: "/GFX/map/room2offices_lm1.png",
        start: 112629147,
        end: 112649751,
      },
      {
        filename: "/GFX/map/room2offices_opt.rmesh",
        start: 112649751,
        end: 113210708,
      },
      {
        filename: "/GFX/map/room2pipes2_lm1.png",
        start: 113210708,
        end: 113266841,
      },
      {
        filename: "/GFX/map/room2pipes2_opt.rmesh",
        start: 113266841,
        end: 113737680,
      },
      {
        filename: "/GFX/map/room2pipes_lm1.png",
        start: 113737680,
        end: 113764075,
      },
      {
        filename: "/GFX/map/room2pipes_opt.rmesh",
        start: 113764075,
        end: 114209232,
      },
      {
        filename: "/GFX/map/room2pit_lm1.png",
        start: 114209232,
        end: 114225828,
      },
      {
        filename: "/GFX/map/room2pit_opt.rmesh",
        start: 114225828,
        end: 114589444,
      },
      {
        filename: "/GFX/map/room2poffices2_lm1.png",
        start: 114589444,
        end: 114605555,
      },
      {
        filename: "/GFX/map/room2poffices2_opt.rmesh",
        start: 114605555,
        end: 115335770,
      },
      {
        filename: "/GFX/map/room2poffices_lm1.png",
        start: 115335770,
        end: 115355271,
      },
      {
        filename: "/GFX/map/room2poffices_opt.rmesh",
        start: 115355271,
        end: 115949855,
      },
      {
        filename: "/GFX/map/room2scps2_lm1.png",
        start: 115949855,
        end: 115985059,
      },
      {
        filename: "/GFX/map/room2scps2_lm2.png",
        start: 115985059,
        end: 116048347,
      },
      {
        filename: "/GFX/map/room2scps2_lm3.png",
        start: 116048347,
        end: 116104507,
      },
      {
        filename: "/GFX/map/room2scps2_lm4.png",
        start: 116104507,
        end: 116122314,
      },
      {
        filename: "/GFX/map/room2scps2_lm5.png",
        start: 116122314,
        end: 116134641,
      },
      {
        filename: "/GFX/map/room2scps2_lm6.png",
        start: 116134641,
        end: 116140383,
      },
      {
        filename: "/GFX/map/room2scps2_opt.rmesh",
        start: 116140383,
        end: 116524337,
      },
      {
        filename: "/GFX/map/room2scps_lm1.png",
        start: 116524337,
        end: 116565836,
      },
      {
        filename: "/GFX/map/room2scps_opt.rmesh",
        start: 116565836,
        end: 116807567,
      },
      {
        filename: "/GFX/map/room2servers2_lm1.png",
        start: 116807567,
        end: 116847773,
      },
      {
        filename: "/GFX/map/room2servers2_lm2.png",
        start: 116847773,
        end: 116884551,
      },
      {
        filename: "/GFX/map/room2servers2_opt.rmesh",
        start: 116884551,
        end: 117279782,
      },
      {
        filename: "/GFX/map/room2servers_lm1.png",
        start: 117279782,
        end: 117290840,
      },
      {
        filename: "/GFX/map/room2servers_opt.rmesh",
        start: 117290840,
        end: 117403292,
      },
      {
        filename: "/GFX/map/room2shaft_lm1.png",
        start: 117403292,
        end: 117423613,
      },
      {
        filename: "/GFX/map/room2shaft_lm2.png",
        start: 117423613,
        end: 117454529,
      },
      {
        filename: "/GFX/map/room2shaft_lm3.png",
        start: 117454529,
        end: 117476039,
      },
      {
        filename: "/GFX/map/room2shaft_opt.rmesh",
        start: 117476039,
        end: 118152416,
      },
      {
        filename: "/GFX/map/room2sl_lm1.png",
        start: 118152416,
        end: 118182589,
      },
      {
        filename: "/GFX/map/room2sl_lm2.png",
        start: 118182589,
        end: 118198626,
      },
      {
        filename: "/GFX/map/room2sl_opt.rmesh",
        start: 118198626,
        end: 118585411,
      },
      {
        filename: "/GFX/map/room2sroom_lm1.png",
        start: 118585411,
        end: 118608537,
      },
      {
        filename: "/GFX/map/room2sroom_opt.rmesh",
        start: 118608537,
        end: 118850009,
      },
      {
        filename: "/GFX/map/room2storage_lm1.png",
        start: 118850009,
        end: 118876332,
      },
      {
        filename: "/GFX/map/room2storage_opt.rmesh",
        start: 118876332,
        end: 119336973,
      },
      {
        filename: "/GFX/map/room2tesla_caution.b3d",
        start: 119336973,
        end: 119338781,
      },
      {
        filename: "/GFX/map/room2tesla_hcz_lm1.png",
        start: 119338781,
        end: 119394516,
      },
      {
        filename: "/GFX/map/room2tesla_hcz_opt.rmesh",
        start: 119394516,
        end: 119469235,
      },
      {
        filename: "/GFX/map/room2tesla_lcz_lm1.png",
        start: 119469235,
        end: 119517029,
      },
      {
        filename: "/GFX/map/room2tesla_lcz_opt.rmesh",
        start: 119517029,
        end: 119870318,
      },
      {
        filename: "/GFX/map/room2tesla_lm1.png",
        start: 119870318,
        end: 119911486,
      },
      {
        filename: "/GFX/map/room2tesla_opt.rmesh",
        start: 119911486,
        end: 120262589,
      },
      {
        filename: "/GFX/map/room2testmisc_lm1.png",
        start: 120262589,
        end: 120308499,
      },
      {
        filename: "/GFX/map/room2testroom2_lm1.png",
        start: 120308499,
        end: 120371015,
      },
      {
        filename: "/GFX/map/room2testroom2_opt.rmesh",
        start: 120371015,
        end: 120808036,
      },
      {
        filename: "/GFX/map/room2toilets_lm1.png",
        start: 120808036,
        end: 120822360,
      },
      {
        filename: "/GFX/map/room2toilets_opt.rmesh",
        start: 120822360,
        end: 121278955,
      },
      {
        filename: "/GFX/map/room2tunnel_lm1.png",
        start: 121278955,
        end: 121287519,
      },
      {
        filename: "/GFX/map/room2tunnel_lm2.png",
        start: 121287519,
        end: 121325779,
      },
      {
        filename: "/GFX/map/room2tunnel_opt.rmesh",
        start: 121325779,
        end: 121439135,
      },
      {
        filename: "/GFX/map/room2z3_2_lm1.png",
        start: 121439135,
        end: 121442409,
      },
      {
        filename: "/GFX/map/room2z3_2_lm2.png",
        start: 121442409,
        end: 121445e3,
      },
      {
        filename: "/GFX/map/room2z3_2_lm3.png",
        start: 121445e3,
        end: 121451603,
      },
      {
        filename: "/GFX/map/room2z3_2_lm4.png",
        start: 121451603,
        end: 121455428,
      },
      {
        filename: "/GFX/map/room2z3_2_opt.rmesh",
        start: 121455428,
        end: 121470634,
      },
      {
        filename: "/GFX/map/room2z3_lm1.png",
        start: 121470634,
        end: 121481543,
      },
      {
        filename: "/GFX/map/room2z3_opt.rmesh",
        start: 121481543,
        end: 121535768,
      },
      {
        filename: "/GFX/map/room3_2_lm1.png",
        start: 121535768,
        end: 121555605,
      },
      {
        filename: "/GFX/map/room3_2_opt.rmesh",
        start: 121555605,
        end: 122002389,
      },
      {
        filename: "/GFX/map/room3_3_lm1.png",
        start: 122002389,
        end: 122014748,
      },
      {
        filename: "/GFX/map/room3_3_opt.rmesh",
        start: 122014748,
        end: 122162762,
      },
      { filename: "/GFX/map/room3_lm1.png", start: 122162762, end: 122183884 },
      {
        filename: "/GFX/map/room3_opt.rmesh",
        start: 122183884,
        end: 122668947,
      },
      {
        filename: "/GFX/map/room3gw_lm1.png",
        start: 122668947,
        end: 122676467,
      },
      {
        filename: "/GFX/map/room3gw_lm2.png",
        start: 122676467,
        end: 122683228,
      },
      {
        filename: "/GFX/map/room3gw_opt.rmesh",
        start: 122683228,
        end: 123080380,
      },
      {
        filename: "/GFX/map/room3gw_pipes.b3d",
        start: 123080380,
        end: 123369299,
      },
      {
        filename: "/GFX/map/room3gw_pipes_lm1.bmp",
        start: 123369299,
        end: 123565961,
      },
      {
        filename: "/GFX/map/room3offices_hb.b3d",
        start: 123565961,
        end: 123567843,
      },
      {
        filename: "/GFX/map/room3offices_lm1.png",
        start: 123567843,
        end: 123579947,
      },
      {
        filename: "/GFX/map/room3offices_lm2.png",
        start: 123579947,
        end: 123618351,
      },
      {
        filename: "/GFX/map/room3offices_opt.rmesh",
        start: 123618351,
        end: 123813301,
      },
      {
        filename: "/GFX/map/room3pit_lm1.png",
        start: 123813301,
        end: 123842530,
      },
      {
        filename: "/GFX/map/room3pit_opt.rmesh",
        start: 123842530,
        end: 124098481,
      },
      {
        filename: "/GFX/map/room3servers2_lm1.png",
        start: 124098481,
        end: 124126205,
      },
      {
        filename: "/GFX/map/room3servers2_lm2.png",
        start: 124126205,
        end: 124129787,
      },
      {
        filename: "/GFX/map/room3servers2_opt.rmesh",
        start: 124129787,
        end: 124419816,
      },
      {
        filename: "/GFX/map/room3servers_lm1.png",
        start: 124419816,
        end: 124448621,
      },
      {
        filename: "/GFX/map/room3servers_opt.rmesh",
        start: 124448621,
        end: 124748339,
      },
      {
        filename: "/GFX/map/room3storage_hb.b3d",
        start: 124748339,
        end: 124755201,
      },
      {
        filename: "/GFX/map/room3storage_lm1.png",
        start: 124755201,
        end: 124810829,
      },
      {
        filename: "/GFX/map/room3storage_lm2.png",
        start: 124810829,
        end: 124850954,
      },
      {
        filename: "/GFX/map/room3storage_lm3.png",
        start: 124850954,
        end: 124915607,
      },
      {
        filename: "/GFX/map/room3storage_lm4.png",
        start: 124915607,
        end: 124946476,
      },
      {
        filename: "/GFX/map/room3storage_opt.rmesh",
        start: 124946476,
        end: 125658599,
      },
      {
        filename: "/GFX/map/room3tunnel_lm1.png",
        start: 125658599,
        end: 125666470,
      },
      {
        filename: "/GFX/map/room3tunnel_opt.rmesh",
        start: 125666470,
        end: 125780231,
      },
      { filename: "/GFX/map/room3z2_hb.b3d", start: 125780231, end: 125782113 },
      {
        filename: "/GFX/map/room3z2_lm1.png",
        start: 125782113,
        end: 125784482,
      },
      {
        filename: "/GFX/map/room3z2_opt.rmesh",
        start: 125784482,
        end: 125801988,
      },
      {
        filename: "/GFX/map/room3z3_lm1.png",
        start: 125801988,
        end: 125810512,
      },
      {
        filename: "/GFX/map/room3z3_opt.rmesh",
        start: 125810512,
        end: 125878353,
      },
      {
        filename: "/GFX/map/room4_2_lm1.png",
        start: 125878353,
        end: 125886392,
      },
      {
        filename: "/GFX/map/room4_2_lm2.png",
        start: 125886392,
        end: 125892583,
      },
      {
        filename: "/GFX/map/room4_2_lm3.png",
        start: 125892583,
        end: 125898577,
      },
      {
        filename: "/GFX/map/room4_2_lm4.png",
        start: 125898577,
        end: 125903215,
      },
      {
        filename: "/GFX/map/room4_2_lm5.png",
        start: 125903215,
        end: 125909787,
      },
      {
        filename: "/GFX/map/room4_2_opt.rmesh",
        start: 125909787,
        end: 126227622,
      },
      { filename: "/GFX/map/room4_lm1.png", start: 126227622, end: 126243149 },
      {
        filename: "/GFX/map/room4_opt.rmesh",
        start: 126243149,
        end: 126589053,
      },
      {
        filename: "/GFX/map/room4info_lm1.png",
        start: 126589053,
        end: 126615804,
      },
      {
        filename: "/GFX/map/room4info_opt.rmesh",
        start: 126615804,
        end: 126912783,
      },
      {
        filename: "/GFX/map/room4pit_lm1.png",
        start: 126912783,
        end: 127030630,
      },
      {
        filename: "/GFX/map/room4pit_lm2.png",
        start: 127030630,
        end: 127038353,
      },
      {
        filename: "/GFX/map/room4pit_lm3.bmp",
        start: 127038353,
        end: 130184135,
      },
      {
        filename: "/GFX/map/room4pit_lm3.png",
        start: 130184135,
        end: 130202188,
      },
      {
        filename: "/GFX/map/room4pit_opt.rmesh",
        start: 130202188,
        end: 130549059,
      },
      {
        filename: "/GFX/map/room4z3_lm1.png",
        start: 130549059,
        end: 130563334,
      },
      {
        filename: "/GFX/map/room4z3_opt.rmesh",
        start: 130563334,
        end: 130650373,
      },
      {
        filename: "/GFX/map/room513_lm1.png",
        start: 130650373,
        end: 130678704,
      },
      {
        filename: "/GFX/map/room513_opt.rmesh",
        start: 130678704,
        end: 130829533,
      },
      {
        filename: "/GFX/map/room860_lm1.png",
        start: 130829533,
        end: 130838097,
      },
      {
        filename: "/GFX/map/room860_opt.rmesh",
        start: 130838097,
        end: 131063321,
      },
      {
        filename: "/GFX/map/room966_lm1.png",
        start: 131063321,
        end: 131084042,
      },
      {
        filename: "/GFX/map/room966_opt.rmesh",
        start: 131084042,
        end: 131179796,
      },
      { filename: "/GFX/map/roompj_lm1.png", start: 131179796, end: 131202932 },
      {
        filename: "/GFX/map/roompj_opt.rmesh",
        start: 131202932,
        end: 131477352,
      },
      { filename: "/GFX/map/scp-012_0.jpg", start: 131477352, end: 131663754 },
      { filename: "/GFX/map/scp-012_1.jpg", start: 131663754, end: 131853379 },
      { filename: "/GFX/map/scp-012_2.jpg", start: 131853379, end: 132046222 },
      { filename: "/GFX/map/scp-012_3.jpg", start: 132046222, end: 132241994 },
      { filename: "/GFX/map/scp1162.jpg", start: 132241994, end: 132281700 },
      {
        filename: "/GFX/map/scp1162bump.jpg",
        start: 132281700,
        end: 132480664,
      },
      {
        filename: "/GFX/map/scp1162wall.jpg",
        start: 132480664,
        end: 132507569,
      },
      {
        filename: "/GFX/map/scp1162wallbump.jpg",
        start: 132507569,
        end: 132677156,
      },
      { filename: "/GFX/map/scplogo.jpg", start: 132677156, end: 132782815 },
      { filename: "/GFX/map/screen.jpg", start: 132782815, end: 132990895 },
      { filename: "/GFX/map/servers1.jpg", start: 132990895, end: 133268015 },
      {
        filename: "/GFX/map/sky/1499sky_back.jpg",
        start: 133268015,
        end: 133296575,
      },
      {
        filename: "/GFX/map/sky/1499sky_front.jpg",
        start: 133296575,
        end: 133327579,
      },
      {
        filename: "/GFX/map/sky/1499sky_left.jpg",
        start: 133327579,
        end: 133359718,
      },
      {
        filename: "/GFX/map/sky/1499sky_right.jpg",
        start: 133359718,
        end: 133387415,
      },
      {
        filename: "/GFX/map/sky/1499sky_up.jpg",
        start: 133387415,
        end: 133426108,
      },
      {
        filename: "/GFX/map/sky/sky_back.jpg",
        start: 133426108,
        end: 133634946,
      },
      {
        filename: "/GFX/map/sky/sky_front.jpg",
        start: 133634946,
        end: 133866414,
      },
      {
        filename: "/GFX/map/sky/sky_left.jpg",
        start: 133866414,
        end: 134070378,
      },
      {
        filename: "/GFX/map/sky/sky_right.jpg",
        start: 134070378,
        end: 134237097,
      },
      { filename: "/GFX/map/sky/sky_up.jpg", start: 134237097, end: 134487715 },
      { filename: "/GFX/map/soft grey.jpg", start: 134487715, end: 134555447 },
      { filename: "/GFX/map/sun.jpg", start: 134555447, end: 134600167 },
      { filename: "/GFX/map/tank1.jpg", start: 134600167, end: 134696327 },
      { filename: "/GFX/map/tank2.jpg", start: 134696327, end: 134786185 },
      { filename: "/GFX/map/tesla.jpg", start: 134786185, end: 135091497 },
      {
        filename: "/GFX/map/testroom_lm1.png",
        start: 135091497,
        end: 135138319,
      },
      {
        filename: "/GFX/map/testroom_lm2.png",
        start: 135138319,
        end: 135198712,
      },
      {
        filename: "/GFX/map/testroom_opt.rmesh",
        start: 135198712,
        end: 135784742,
      },
      { filename: "/GFX/map/tilebump.jpg", start: 135784742, end: 135983476 },
      { filename: "/GFX/map/tilefloor.jpg", start: 135983476, end: 136274691 },
      { filename: "/GFX/map/toilet02.smf", start: 136274691, end: 136303668 },
      { filename: "/GFX/map/tree1.jpg", start: 136303668, end: 136335217 },
      { filename: "/GFX/map/tree2.png", start: 136335217, end: 136453135 },
      {
        filename: "/GFX/map/tunnel2_lm1.png",
        start: 136453135,
        end: 136474826,
      },
      {
        filename: "/GFX/map/tunnel2_opt.rmesh",
        start: 136474826,
        end: 136605949,
      },
      { filename: "/GFX/map/tunnel_lm1.png", start: 136605949, end: 136615477 },
      {
        filename: "/GFX/map/tunnel_opt.rmesh",
        start: 136615477,
        end: 136688318,
      },
      { filename: "/GFX/map/vent.jpg", start: 136688318, end: 137780337 },
      { filename: "/GFX/map/ventbump.jpg", start: 137780337, end: 138478750 },
      { filename: "/GFX/map/white.jpg", start: 138478750, end: 138537991 },
      { filename: "/GFX/map/whitewall.jpg", start: 138537991, end: 138615617 },
      {
        filename: "/GFX/map/whitewallbump.jpg",
        start: 138615617,
        end: 138646913,
      },
      { filename: "/GFX/map/wood.jpg", start: 138646913, end: 138943459 },
      {
        filename: "/GFX/map/zimmerframe1.jpg",
        start: 138943459,
        end: 138979526,
      },
      { filename: "/GFX/menu/173back.png", start: 138979526, end: 139042101 },
      {
        filename: "/GFX/menu/achievements/Achv008.jpg",
        start: 139042101,
        end: 139055846,
      },
      {
        filename: "/GFX/menu/achievements/Achv012.jpg",
        start: 139055846,
        end: 139075222,
      },
      {
        filename: "/GFX/menu/achievements/Achv035.jpg",
        start: 139075222,
        end: 139086349,
      },
      {
        filename: "/GFX/menu/achievements/Achv049.jpg",
        start: 139086349,
        end: 139096705,
      },
      {
        filename: "/GFX/menu/achievements/Achv055.jpg",
        start: 139096705,
        end: 139106100,
      },
      {
        filename: "/GFX/menu/achievements/Achv066.jpg",
        start: 139106100,
        end: 139108749,
      },
      {
        filename: "/GFX/menu/achievements/Achv079.jpg",
        start: 139108749,
        end: 139119025,
      },
      {
        filename: "/GFX/menu/achievements/Achv096.jpg",
        start: 139119025,
        end: 139132910,
      },
      {
        filename: "/GFX/menu/achievements/Achv1025.jpg",
        start: 139132910,
        end: 139149848,
      },
      {
        filename: "/GFX/menu/achievements/Achv1048.jpg",
        start: 139149848,
        end: 139167651,
      },
      {
        filename: "/GFX/menu/achievements/Achv106.jpg",
        start: 139167651,
        end: 139178529,
      },
      {
        filename: "/GFX/menu/achievements/Achv1123.jpg",
        start: 139178529,
        end: 139195540,
      },
      {
        filename: "/GFX/menu/achievements/Achv1162.jpg",
        start: 139195540,
        end: 139211337,
      },
      {
        filename: "/GFX/menu/achievements/Achv148.jpg",
        start: 139211337,
        end: 139222100,
      },
      {
        filename: "/GFX/menu/achievements/Achv1499.jpg",
        start: 139222100,
        end: 139231561,
      },
      {
        filename: "/GFX/menu/achievements/Achv205.jpg",
        start: 139231561,
        end: 139244687,
      },
      {
        filename: "/GFX/menu/achievements/Achv294.jpg",
        start: 139244687,
        end: 139258574,
      },
      {
        filename: "/GFX/menu/achievements/Achv372.jpg",
        start: 139258574,
        end: 139268293,
      },
      {
        filename: "/GFX/menu/achievements/Achv420J.jpg",
        start: 139268293,
        end: 139278234,
      },
      {
        filename: "/GFX/menu/achievements/Achv427.jpg",
        start: 139278234,
        end: 139330420,
      },
      {
        filename: "/GFX/menu/achievements/Achv500.jpg",
        start: 139330420,
        end: 139343539,
      },
      {
        filename: "/GFX/menu/achievements/Achv513.jpg",
        start: 139343539,
        end: 139355808,
      },
      {
        filename: "/GFX/menu/achievements/Achv714.jpg",
        start: 139355808,
        end: 139369299,
      },
      {
        filename: "/GFX/menu/achievements/Achv789J.jpg",
        start: 139369299,
        end: 139378871,
      },
      {
        filename: "/GFX/menu/achievements/Achv860.jpg",
        start: 139378871,
        end: 139379624,
      },
      {
        filename: "/GFX/menu/achievements/Achv895.jpg",
        start: 139379624,
        end: 139389821,
      },
      {
        filename: "/GFX/menu/achievements/Achv914.jpg",
        start: 139389821,
        end: 139399657,
      },
      {
        filename: "/GFX/menu/achievements/Achv939.jpg",
        start: 139399657,
        end: 139400343,
      },
      {
        filename: "/GFX/menu/achievements/Achv966.jpg",
        start: 139400343,
        end: 139409669,
      },
      {
        filename: "/GFX/menu/achievements/Achv970.jpg",
        start: 139409669,
        end: 139410827,
      },
      {
        filename: "/GFX/menu/achievements/AchvConsole.jpg",
        start: 139410827,
        end: 139427304,
      },
      {
        filename: "/GFX/menu/achievements/AchvHarp.jpg",
        start: 139427304,
        end: 139437894,
      },
      {
        filename: "/GFX/menu/achievements/AchvKeter.jpg",
        start: 139437894,
        end: 139439992,
      },
      {
        filename: "/GFX/menu/achievements/AchvMaynard.jpg",
        start: 139439992,
        end: 139450983,
      },
      {
        filename: "/GFX/menu/achievements/AchvOmni.jpg",
        start: 139450983,
        end: 139452083,
      },
      {
        filename: "/GFX/menu/achievements/AchvPD.jpg",
        start: 139452083,
        end: 139462681,
      },
      {
        filename: "/GFX/menu/achievements/AchvSNAV.jpg",
        start: 139462681,
        end: 139473879,
      },
      {
        filename: "/GFX/menu/achievements/AchvTesla.jpg",
        start: 139473879,
        end: 139483965,
      },
      {
        filename: "/GFX/menu/achievements/achvlocked.jpg",
        start: 139483965,
        end: 139500046,
      },
      { filename: "/GFX/menu/arrow.png", start: 139500046, end: 139502998 },
      { filename: "/GFX/menu/back.jpg", start: 139502998, end: 139674734 },
      { filename: "/GFX/menu/launcher.png", start: 139674734, end: 139953628 },
      { filename: "/GFX/menu/menublack.jpg", start: 139953628, end: 140190046 },
      { filename: "/GFX/menu/menuwhite.jpg", start: 140190046, end: 140645814 },
      { filename: "/GFX/menu/pausemenu.jpg", start: 140645814, end: 140756226 },
      { filename: "/GFX/menu/scptext.jpg", start: 140756226, end: 140783010 },
      {
        filename: "/GFX/menu/startup_TSS.ogg",
        start: 140783010,
        end: 140897456,
      },
      {
        filename: "/GFX/menu/startup_TSS.webm",
        start: 140897456,
        end: 141579282,
      },
      {
        filename: "/GFX/menu/startup_Undertow.ogg",
        start: 141579282,
        end: 141712156,
      },
      {
        filename: "/GFX/menu/startup_Undertow.webm",
        start: 141712156,
        end: 143378589,
      },
      { filename: "/GFX/misc.jpg", start: 143378589, end: 143484033 },
      { filename: "/GFX/monitortexture.jpg", start: 143484033, end: 143518647 },
      {
        filename: "/GFX/navigator/batterymeter.png",
        start: 143518647,
        end: 143518745,
      },
      {
        filename: "/GFX/navigator/roomborder0.png",
        start: 143518745,
        end: 143518881,
      },
      {
        filename: "/GFX/navigator/roomborder1.png",
        start: 143518881,
        end: 143519015,
      },
      {
        filename: "/GFX/navigator/roomborder2.png",
        start: 143519015,
        end: 143519149,
      },
      {
        filename: "/GFX/navigator/roomborder3.png",
        start: 143519149,
        end: 143519284,
      },
      { filename: "/GFX/newmod.png", start: 143519284, end: 143540201 },
      { filename: "/GFX/npcs/035.b3d", start: 143540201, end: 144744066 },
      { filename: "/GFX/npcs/035.jpg", start: 144744066, end: 144789458 },
      {
        filename: "/GFX/npcs/035tentacle.b3d",
        start: 144789458,
        end: 145238885,
      },
      { filename: "/GFX/npcs/035victim.jpg", start: 145238885, end: 145427316 },
      {
        filename: "/GFX/npcs/1048_diffusetest01.png",
        start: 145427316,
        end: 145757969,
      },
      { filename: "/GFX/npcs/106_2.b3d", start: 145757969, end: 146903783 },
      {
        filename: "/GFX/npcs/106_diffuse.jpg",
        start: 146903783,
        end: 146978555,
      },
      {
        filename: "/GFX/npcs/106_normals.png",
        start: 146978555,
        end: 149593507,
      },
      { filename: "/GFX/npcs/106face.jpg", start: 149593507, end: 149650042 },
      { filename: "/GFX/npcs/106victim.jpg", start: 149650042, end: 149850044 },
      { filename: "/GFX/npcs/1499-1.b3d", start: 149850044, end: 150868006 },
      { filename: "/GFX/npcs/1499_King.jpg", start: 150868006, end: 151126192 },
      {
        filename: "/GFX/npcs/1499_normal.jpg",
        start: 151126192,
        end: 151219841,
      },
      { filename: "/GFX/npcs/173_2.b3d", start: 151219841, end: 151341413 },
      { filename: "/GFX/npcs/173_Norm.jpg", start: 151341413, end: 151757950 },
      { filename: "/GFX/npcs/173_Spec.jpg", start: 151757950, end: 151885782 },
      { filename: "/GFX/npcs/173h.pt", start: 151885782, end: 152226549 },
      {
        filename: "/GFX/npcs/173texture.jpg",
        start: 152226549,
        end: 152502864,
      },
      {
        filename: "/GFX/npcs/205_demon1.b3d",
        start: 152502864,
        end: 153855046,
      },
      {
        filename: "/GFX/npcs/205_demon2.b3d",
        start: 153855046,
        end: 155044473,
      },
      {
        filename: "/GFX/npcs/205_demon3.b3d",
        start: 155044473,
        end: 156618069,
      },
      { filename: "/GFX/npcs/205_woman.b3d", start: 156618069, end: 157943084 },
      { filename: "/GFX/npcs/372.b3d", start: 157943084, end: 158039400 },
      { filename: "/GFX/npcs/682arm.b3d", start: 158039400, end: 158048492 },
      { filename: "/GFX/npcs/682arm.jpg", start: 158048492, end: 158156587 },
      {
        filename: "/GFX/npcs/860_diffuse.jpg",
        start: 158156587,
        end: 158457175,
      },
      { filename: "/GFX/npcs/860_eyes.jpg", start: 158457175, end: 158488412 },
      { filename: "/GFX/npcs/860_eyes.png", start: 158488412, end: 158556800 },
      { filename: "/GFX/npcs/860_leaf.png", start: 158556800, end: 158617568 },
      {
        filename: "/GFX/npcs/966_diffusetest_1024_01.jpg",
        start: 158617568,
        end: 158718960,
      },
      {
        filename: "/GFX/npcs/966_normals_1024.png",
        start: 158718960,
        end: 159604366,
      },
      {
        filename: "/GFX/npcs/966_specular_1024.png",
        start: 159604366,
        end: 160212698,
      },
      { filename: "/GFX/npcs/AgentIJ.AIJ", start: 160212698, end: 160234041 },
      { filename: "/GFX/npcs/MTF2.b3d", start: 160234041, end: 163870586 },
      {
        filename: "/GFX/npcs/MTF_P90_diffuse02.jpg",
        start: 163870586,
        end: 163900447,
      },
      {
        filename: "/GFX/npcs/MTF_lens_diffuse01.png",
        start: 163900447,
        end: 163917570,
      },
      {
        filename: "/GFX/npcs/MTF_newdiffuse02.jpg",
        start: 163917570,
        end: 164000957,
      },
      { filename: "/GFX/npcs/PartyHat.png", start: 164000957, end: 164737024 },
      { filename: "/GFX/npcs/SCP096.jpg", start: 164737024, end: 164889577 },
      {
        filename: "/GFX/npcs/SCP096EYES.jpg",
        start: 164889577,
        end: 164895281,
      },
      { filename: "/GFX/npcs/bll.b3d", start: 164895281, end: 165642703 },
      { filename: "/GFX/npcs/bll.jpg", start: 165642703, end: 165991235 },
      { filename: "/GFX/npcs/body1.jpg", start: 165991235, end: 166200625 },
      { filename: "/GFX/npcs/body2.jpg", start: 166200625, end: 166373813 },
      { filename: "/GFX/npcs/classd.b3d", start: 166373813, end: 167457594 },
      { filename: "/GFX/npcs/classd1.jpg", start: 167457594, end: 167665991 },
      { filename: "/GFX/npcs/classd2.jpg", start: 167665991, end: 167859829 },
      { filename: "/GFX/npcs/classd3.jpg", start: 167859829, end: 168009157 },
      { filename: "/GFX/npcs/clerk.b3d", start: 168009157, end: 169011441 },
      { filename: "/GFX/npcs/clerk_d1.jpg", start: 169011441, end: 169175319 },
      { filename: "/GFX/npcs/corpse.jpg", start: 169175319, end: 169394060 },
      { filename: "/GFX/npcs/duck.ae", start: 169394060, end: 169454497 },
      { filename: "/GFX/npcs/duck1.png", start: 169454497, end: 169490669 },
      { filename: "/GFX/npcs/duck2.png", start: 169490669, end: 169509828 },
      { filename: "/GFX/npcs/duck3.png", start: 169509828, end: 169539814 },
      {
        filename: "/GFX/npcs/duck_low_res.b3d",
        start: 169539814,
        end: 169575960,
      },
      {
        filename: "/GFX/npcs/forestmonster.b3d",
        start: 169575960,
        end: 170389409,
      },
      { filename: "/GFX/npcs/gonzales.jpg", start: 170389409, end: 170634095 },
      { filename: "/GFX/npcs/guard.b3d", start: 170634095, end: 171406038 },
      {
        filename: "/GFX/npcs/guard_diffuse.jpg",
        start: 171406038,
        end: 171485685,
      },
      { filename: "/GFX/npcs/helmet.jpg", start: 171485685, end: 171523960 },
      {
        filename: "/GFX/npcs/helmet_guard.jpg",
        start: 171523960,
        end: 171546614,
      },
      {
        filename: "/GFX/npcs/helmet_vision.png",
        start: 171546614,
        end: 171556684,
      },
      {
        filename: "/GFX/npcs/helmetbump.jpg",
        start: 171556684,
        end: 171601450,
      },
      { filename: "/GFX/npcs/hg.pt", start: 171601450, end: 171636856 },
      { filename: "/GFX/npcs/janitor.jpg", start: 171636856, end: 171756219 },
      { filename: "/GFX/npcs/mauzer.jpg", start: 171756219, end: 171798618 },
      {
        filename: "/GFX/npcs/mtf_newnormal01.png",
        start: 171798618,
        end: 172413299,
      },
      {
        filename: "/GFX/npcs/naziofficer.b3d",
        start: 172413299,
        end: 172828846,
      },
      {
        filename: "/GFX/npcs/naziofficer.jpg",
        start: 172828846,
        end: 172925486,
      },
      {
        filename: "/GFX/npcs/oldmaneyes.jpg",
        start: 172925486,
        end: 172948936,
      },
      {
        filename: "/GFX/npcs/papertexture.jpg",
        start: 172948936,
        end: 172983519,
      },
      { filename: "/GFX/npcs/partyhat.b3d", start: 172983519, end: 173032233 },
      { filename: "/GFX/npcs/pdplane.png", start: 173032233, end: 173110192 },
      {
        filename: "/GFX/npcs/pdplaneeye.png",
        start: 173110192,
        end: 173195796,
      },
      { filename: "/GFX/npcs/pj.jpg", start: 173195796, end: 173247765 },
      { filename: "/GFX/npcs/pjface.jpg", start: 173247765, end: 173290067 },
      { filename: "/GFX/npcs/s2.b3d", start: 173290067, end: 173623908 },
      { filename: "/GFX/npcs/scientist.jpg", start: 173623908, end: 173747580 },
      {
        filename: "/GFX/npcs/scientist2.jpg",
        start: 173747580,
        end: 173958214,
      },
      { filename: "/GFX/npcs/scp-049.b3d", start: 173958214, end: 175979777 },
      {
        filename: "/GFX/npcs/scp-049_clothing_diffuse4.jpg",
        start: 175979777,
        end: 176110813,
      },
      {
        filename: "/GFX/npcs/scp-049_mask_diffuse5.jpg",
        start: 176110813,
        end: 176139679,
      },
      { filename: "/GFX/npcs/scp-066.b3d", start: 176139679, end: 176883382 },
      {
        filename: "/GFX/npcs/scp-066_diffuse01.jpg",
        start: 176883382,
        end: 177042081,
      },
      {
        filename: "/GFX/npcs/scp-066_normal.png",
        start: 177042081,
        end: 177379374,
      },
      { filename: "/GFX/npcs/scp-1048.b3d", start: 177379374, end: 177704083 },
      {
        filename: "/GFX/npcs/scp-1048_penandpaper_diffuse01.png",
        start: 177704083,
        end: 177727124,
      },
      { filename: "/GFX/npcs/scp-1048a.b3d", start: 177727124, end: 178381832 },
      {
        filename: "/GFX/npcs/scp-1048pp.b3d",
        start: 178381832,
        end: 178698900,
      },
      { filename: "/GFX/npcs/scp-939.b3d", start: 178698900, end: 180034991 },
      {
        filename: "/GFX/npcs/scp-939_licker_diffusetest01.jpg",
        start: 180034991,
        end: 180161077,
      },
      {
        filename: "/GFX/npcs/scp-939_licker_extremities2.png",
        start: 180161077,
        end: 180347379,
      },
      {
        filename: "/GFX/npcs/scp-939_licker_normal.png",
        start: 180347379,
        end: 180919033,
      },
      { filename: "/GFX/npcs/scp-966.b3d", start: 180919033, end: 182213487 },
      { filename: "/GFX/npcs/scp096.b3d", start: 182213487, end: 183038496 },
      {
        filename: "/GFX/npcs/scp_1048a_512_diffusetest01.png",
        start: 183038496,
        end: 183412120,
      },
      {
        filename: "/GFX/npcs/surgeonzombie.jpg",
        start: 183412120,
        end: 183546019,
      },
      { filename: "/GFX/npcs/tentacle.jpg", start: 183546019, end: 183661749 },
      { filename: "/GFX/npcs/zombie.jpg", start: 183661749, end: 183822756 },
      { filename: "/GFX/npcs/zombie1.b3d", start: 183822756, end: 185704246 },
      {
        filename: "/GFX/npcs/zombiesurgeon.b3d",
        start: 185704246,
        end: 186374561,
      },
      { filename: "/GFX/particle.png", start: 186374561, end: 186378492 },
      { filename: "/GFX/red.jpg", start: 186378492, end: 186404432 },
      { filename: "/GFX/screens/008.sc", start: 186404432, end: 186561268 },
      { filename: "/GFX/screens/012.jpg", start: 186561268, end: 186677476 },
      { filename: "/GFX/screens/205.jpg", start: 186677476, end: 186773859 },
      { filename: "/GFX/screens/372.jpg", start: 186773859, end: 186985405 },
      { filename: "/GFX/screens/860.jpg", start: 186985405, end: 187086101 },
      { filename: "/GFX/screens/Nordy.jpg", start: 187086101, end: 187218432 },
      { filename: "/GFX/screens/ai.sc", start: 187218432, end: 187401768 },
      { filename: "/GFX/screens/chen.jpg", start: 187401768, end: 187486444 },
      { filename: "/GFX/screens/conf.jpg", start: 187486444, end: 187640817 },
      { filename: "/GFX/screens/drL.jpg", start: 187640817, end: 187733239 },
      { filename: "/GFX/screens/gateb.sc", start: 187733239, end: 187863957 },
      { filename: "/GFX/screens/hooper.jpg", start: 187863957, end: 188028289 },
      { filename: "/GFX/screens/maynard.sc", start: 188028289, end: 188116425 },
      { filename: "/GFX/screens/office.sc", start: 188116425, end: 188214525 },
      {
        filename: "/GFX/screens/rosewood.sc",
        start: 188214525,
        end: 188364879,
      },
      { filename: "/GFX/smoke.png", start: 188364879, end: 188374020 },
      { filename: "/GFX/smoke2.png", start: 188374020, end: 188381963 },
      { filename: "/GFX/sneakicon.png", start: 188381963, end: 188383539 },
      { filename: "/GFX/spark.jpg", start: 188383539, end: 188392251 },
      { filename: "/GFX/sprinticon.png", start: 188392251, end: 188394020 },
      { filename: "/Loadingscreens/012.jpg", start: 188394020, end: 188473532 },
      { filename: "/Loadingscreens/035.jpg", start: 188473532, end: 188528922 },
      { filename: "/Loadingscreens/049.jpg", start: 188528922, end: 188575226 },
      { filename: "/Loadingscreens/066.jpg", start: 188575226, end: 188601779 },
      { filename: "/Loadingscreens/079.jpg", start: 188601779, end: 188665410 },
      { filename: "/Loadingscreens/096.png", start: 188665410, end: 188740339 },
      {
        filename: "/Loadingscreens/1025.jpg",
        start: 188740339,
        end: 188773767,
      },
      { filename: "/Loadingscreens/106.jpg", start: 188773767, end: 188804699 },
      {
        filename: "/Loadingscreens/1074.jpg",
        start: 188804699,
        end: 188849225,
      },
      {
        filename: "/Loadingscreens/1123.jpg",
        start: 188849225,
        end: 188920522,
      },
      {
        filename: "/Loadingscreens/1162.jpg",
        start: 188920522,
        end: 188990276,
      },
      {
        filename: "/Loadingscreens/1499.jpg",
        start: 188990276,
        end: 189068394,
      },
      { filename: "/Loadingscreens/173.jpg", start: 189068394, end: 189092690 },
      { filename: "/Loadingscreens/205.jpg", start: 189092690, end: 189114251 },
      { filename: "/Loadingscreens/294.jpg", start: 189114251, end: 189166597 },
      { filename: "/Loadingscreens/372.jpg", start: 189166597, end: 189217551 },
      { filename: "/Loadingscreens/427.jpg", start: 189217551, end: 189242429 },
      { filename: "/Loadingscreens/500.jpg", start: 189242429, end: 189305625 },
      { filename: "/Loadingscreens/513.jpg", start: 189305625, end: 189355836 },
      { filename: "/Loadingscreens/682.jpg", start: 189355836, end: 189438163 },
      { filename: "/Loadingscreens/714.jpg", start: 189438163, end: 189492759 },
      { filename: "/Loadingscreens/860.jpg", start: 189492759, end: 189583101 },
      { filename: "/Loadingscreens/895.jpg", start: 189583101, end: 189631046 },
      { filename: "/Loadingscreens/914.jpg", start: 189631046, end: 189680777 },
      { filename: "/Loadingscreens/939.jpg", start: 189680777, end: 189741877 },
      { filename: "/Loadingscreens/966.jpg", start: 189741877, end: 189775160 },
      { filename: "/Loadingscreens/970.jpg", start: 189775160, end: 189940867 },
      {
        filename: "/Loadingscreens/chaos.jpg",
        start: 189940867,
        end: 190038329,
      },
      {
        filename: "/Loadingscreens/classd.jpg",
        start: 190038329,
        end: 190105353,
      },
      { filename: "/Loadingscreens/cwm.jpg", start: 190105353, end: 190128628 },
      {
        filename: "/Loadingscreens/foundationlogo.jpg",
        start: 190128628,
        end: 190177735,
      },
      {
        filename: "/Loadingscreens/loadingback.jpg",
        start: 190177735,
        end: 190291956,
      },
      {
        filename: "/Loadingscreens/loadingscreens.ini",
        start: 190291956,
        end: 190310790,
      },
      { filename: "/Loadingscreens/mtf.jpg", start: 190310790, end: 190386580 },
      { filename: "/Loadingscreens/nvg.jpg", start: 190386580, end: 190408596 },
      { filename: "/SFX/Alarm/Alarm.ogg", start: 190408596, end: 190446470 },
      { filename: "/SFX/Alarm/Alarm2_1.ogg", start: 190446470, end: 190513009 },
      {
        filename: "/SFX/Alarm/Alarm2_10.ogg",
        start: 190513009,
        end: 190599836,
      },
      {
        filename: "/SFX/Alarm/Alarm2_11.ogg",
        start: 190599836,
        end: 190864637,
      },
      { filename: "/SFX/Alarm/Alarm2_2.ogg", start: 190864637, end: 190919166 },
      { filename: "/SFX/Alarm/Alarm2_3.ogg", start: 190919166, end: 190992222 },
      { filename: "/SFX/Alarm/Alarm2_4.ogg", start: 190992222, end: 191081425 },
      { filename: "/SFX/Alarm/Alarm2_5.ogg", start: 191081425, end: 191141183 },
      { filename: "/SFX/Alarm/Alarm2_6.ogg", start: 191141183, end: 191213186 },
      { filename: "/SFX/Alarm/Alarm2_7.ogg", start: 191213186, end: 191272486 },
      { filename: "/SFX/Alarm/Alarm2_8.ogg", start: 191272486, end: 191335127 },
      { filename: "/SFX/Alarm/Alarm2_9.ogg", start: 191335127, end: 191387427 },
      { filename: "/SFX/Alarm/Alarm3.ogg", start: 191387427, end: 191434768 },
      { filename: "/SFX/Alarm/Alarm4.ogg", start: 191434768, end: 191464157 },
      { filename: "/SFX/Alarm/Alarm5.ogg", start: 191464157, end: 191491503 },
      {
        filename: "/SFX/Ambient/Forest/ambient1.ogg",
        start: 191491503,
        end: 191551112,
      },
      {
        filename: "/SFX/Ambient/Forest/ambient10.ogg",
        start: 191551112,
        end: 191683186,
      },
      {
        filename: "/SFX/Ambient/Forest/ambient2.ogg",
        start: 191683186,
        end: 191800891,
      },
      {
        filename: "/SFX/Ambient/Forest/ambient3.ogg",
        start: 191800891,
        end: 191909392,
      },
      {
        filename: "/SFX/Ambient/Forest/ambient4.ogg",
        start: 191909392,
        end: 192013069,
      },
      {
        filename: "/SFX/Ambient/Forest/ambient5.ogg",
        start: 192013069,
        end: 192077985,
      },
      {
        filename: "/SFX/Ambient/Forest/ambient6.ogg",
        start: 192077985,
        end: 192131252,
      },
      {
        filename: "/SFX/Ambient/Forest/ambient7.ogg",
        start: 192131252,
        end: 192170320,
      },
      {
        filename: "/SFX/Ambient/Forest/ambient8.ogg",
        start: 192170320,
        end: 192225759,
      },
      {
        filename: "/SFX/Ambient/Forest/ambient9.ogg",
        start: 192225759,
        end: 192371536,
      },
      {
        filename: "/SFX/Ambient/General/Ambient1.ogg",
        start: 192371536,
        end: 192392416,
      },
      {
        filename: "/SFX/Ambient/General/Ambient10.ogg",
        start: 192392416,
        end: 192457686,
      },
      {
        filename: "/SFX/Ambient/General/Ambient11.ogg",
        start: 192457686,
        end: 192606431,
      },
      {
        filename: "/SFX/Ambient/General/Ambient12.ogg",
        start: 192606431,
        end: 192685325,
      },
      {
        filename: "/SFX/Ambient/General/Ambient13.ogg",
        start: 192685325,
        end: 192836767,
      },
      {
        filename: "/SFX/Ambient/General/Ambient14.ogg",
        start: 192836767,
        end: 192892912,
      },
      {
        filename: "/SFX/Ambient/General/Ambient15.ogg",
        start: 192892912,
        end: 192915288,
      },
      {
        filename: "/SFX/Ambient/General/Ambient2.ogg",
        start: 192915288,
        end: 192942816,
      },
      {
        filename: "/SFX/Ambient/General/Ambient3.ogg",
        start: 192942816,
        end: 192987802,
      },
      {
        filename: "/SFX/Ambient/General/Ambient4.ogg",
        start: 192987802,
        end: 193009760,
      },
      {
        filename: "/SFX/Ambient/General/Ambient5.ogg",
        start: 193009760,
        end: 193063442,
      },
      {
        filename: "/SFX/Ambient/General/Ambient6.ogg",
        start: 193063442,
        end: 193087631,
      },
      {
        filename: "/SFX/Ambient/General/Ambient7.ogg",
        start: 193087631,
        end: 193105865,
      },
      {
        filename: "/SFX/Ambient/General/Ambient8.ogg",
        start: 193105865,
        end: 193143748,
      },
      {
        filename: "/SFX/Ambient/General/Ambient9.ogg",
        start: 193143748,
        end: 193232723,
      },
      {
        filename: "/SFX/Ambient/Pre-breach/Ambient1.ogg",
        start: 193232723,
        end: 193261080,
      },
      {
        filename: "/SFX/Ambient/Pre-breach/Ambient2.ogg",
        start: 193261080,
        end: 193383964,
      },
      {
        filename: "/SFX/Ambient/Pre-breach/Ambient3.ogg",
        start: 193383964,
        end: 193411573,
      },
      {
        filename: "/SFX/Ambient/Pre-breach/Ambient4.ogg",
        start: 193411573,
        end: 193437285,
      },
      {
        filename: "/SFX/Ambient/Pre-breach/Ambient5.ogg",
        start: 193437285,
        end: 193500163,
      },
      {
        filename: "/SFX/Ambient/Room ambience/895.ogg",
        start: 193500163,
        end: 193739999,
      },
      {
        filename: "/SFX/Ambient/Room ambience/Fan.ogg",
        start: 193739999,
        end: 193786815,
      },
      {
        filename: "/SFX/Ambient/Room ambience/FanOff.ogg",
        start: 193786815,
        end: 193838249,
      },
      {
        filename: "/SFX/Ambient/Room ambience/FanOn.ogg",
        start: 193838249,
        end: 193890861,
      },
      {
        filename: "/SFX/Ambient/Room ambience/drip.ogg",
        start: 193890861,
        end: 193966881,
      },
      {
        filename: "/SFX/Ambient/Room ambience/fuelpump.ogg",
        start: 193966881,
        end: 193988523,
      },
      {
        filename: "/SFX/Ambient/Room ambience/lowdrone.ogg",
        start: 193988523,
        end: 194076525,
      },
      {
        filename: "/SFX/Ambient/Room ambience/pulsing.ogg",
        start: 194076525,
        end: 194132205,
      },
      {
        filename: "/SFX/Ambient/Room ambience/rumble.ogg",
        start: 194132205,
        end: 194177499,
      },
      {
        filename: "/SFX/Ambient/Room ambience/servers1.ogg",
        start: 194177499,
        end: 194257220,
      },
      {
        filename: "/SFX/Ambient/Room ambience/ventilation.ogg",
        start: 194257220,
        end: 194374668,
      },
      {
        filename: "/SFX/Ambient/ToZone2.ogg",
        start: 194374668,
        end: 194471516,
      },
      {
        filename: "/SFX/Ambient/ToZone3.ogg",
        start: 194471516,
        end: 194567425,
      },
      {
        filename: "/SFX/Ambient/Zone1/Ambient1.ogg",
        start: 194567425,
        end: 194601213,
      },
      {
        filename: "/SFX/Ambient/Zone1/Ambient10.ogg",
        start: 194601213,
        end: 194647739,
      },
      {
        filename: "/SFX/Ambient/Zone1/Ambient11.ogg",
        start: 194647739,
        end: 194662650,
      },
      {
        filename: "/SFX/Ambient/Zone1/Ambient2.ogg",
        start: 194662650,
        end: 194728605,
      },
      {
        filename: "/SFX/Ambient/Zone1/Ambient3.ogg",
        start: 194728605,
        end: 194743741,
      },
      {
        filename: "/SFX/Ambient/Zone1/Ambient4.ogg",
        start: 194743741,
        end: 194774756,
      },
      {
        filename: "/SFX/Ambient/Zone1/Ambient5.ogg",
        start: 194774756,
        end: 194840249,
      },
      {
        filename: "/SFX/Ambient/Zone1/Ambient6.ogg",
        start: 194840249,
        end: 194924553,
      },
      {
        filename: "/SFX/Ambient/Zone1/Ambient7.ogg",
        start: 194924553,
        end: 194965011,
      },
      {
        filename: "/SFX/Ambient/Zone1/Ambient8.ogg",
        start: 194965011,
        end: 194987665,
      },
      {
        filename: "/SFX/Ambient/Zone1/Ambient9.ogg",
        start: 194987665,
        end: 195118933,
      },
      {
        filename: "/SFX/Ambient/Zone2/Ambient1.ogg",
        start: 195118933,
        end: 195207076,
      },
      {
        filename: "/SFX/Ambient/Zone2/Ambient10.ogg",
        start: 195207076,
        end: 195256251,
      },
      {
        filename: "/SFX/Ambient/Zone2/Ambient11.ogg",
        start: 195256251,
        end: 195280748,
      },
      {
        filename: "/SFX/Ambient/Zone2/Ambient2.ogg",
        start: 195280748,
        end: 195343299,
      },
      {
        filename: "/SFX/Ambient/Zone2/Ambient3.ogg",
        start: 195343299,
        end: 195473826,
      },
      {
        filename: "/SFX/Ambient/Zone2/Ambient4.ogg",
        start: 195473826,
        end: 195586187,
      },
      {
        filename: "/SFX/Ambient/Zone2/Ambient5.ogg",
        start: 195586187,
        end: 195658419,
      },
      {
        filename: "/SFX/Ambient/Zone2/Ambient6.ogg",
        start: 195658419,
        end: 195758135,
      },
      {
        filename: "/SFX/Ambient/Zone2/Ambient7.ogg",
        start: 195758135,
        end: 195878829,
      },
      {
        filename: "/SFX/Ambient/Zone2/Ambient8.ogg",
        start: 195878829,
        end: 195952187,
      },
      {
        filename: "/SFX/Ambient/Zone2/Ambient9.ogg",
        start: 195952187,
        end: 196071958,
      },
      {
        filename: "/SFX/Ambient/Zone3/Ambient1.ogg",
        start: 196071958,
        end: 196145121,
      },
      {
        filename: "/SFX/Ambient/Zone3/Ambient10.ogg",
        start: 196145121,
        end: 196177825,
      },
      {
        filename: "/SFX/Ambient/Zone3/Ambient11.ogg",
        start: 196177825,
        end: 196197188,
      },
      {
        filename: "/SFX/Ambient/Zone3/Ambient12.ogg",
        start: 196197188,
        end: 196223958,
      },
      {
        filename: "/SFX/Ambient/Zone3/Ambient2.ogg",
        start: 196223958,
        end: 196251820,
      },
      {
        filename: "/SFX/Ambient/Zone3/Ambient3.ogg",
        start: 196251820,
        end: 196290762,
      },
      {
        filename: "/SFX/Ambient/Zone3/Ambient4.ogg",
        start: 196290762,
        end: 196322849,
      },
      {
        filename: "/SFX/Ambient/Zone3/Ambient5.ogg",
        start: 196322849,
        end: 196463720,
      },
      {
        filename: "/SFX/Ambient/Zone3/Ambient6.ogg",
        start: 196463720,
        end: 196509627,
      },
      {
        filename: "/SFX/Ambient/Zone3/Ambient7.ogg",
        start: 196509627,
        end: 196561310,
      },
      {
        filename: "/SFX/Ambient/Zone3/Ambient8.ogg",
        start: 196561310,
        end: 196630656,
      },
      {
        filename: "/SFX/Ambient/Zone3/Ambient9.ogg",
        start: 196630656,
        end: 196649268,
      },
      {
        filename: "/SFX/Character/Apache/Crash1.ogg",
        start: 196649268,
        end: 196880624,
      },
      {
        filename: "/SFX/Character/Apache/Crash2.ogg",
        start: 196880624,
        end: 197042842,
      },
      {
        filename: "/SFX/Character/Apache/Propeller.ogg",
        start: 197042842,
        end: 197066926,
      },
      {
        filename: "/SFX/Character/D9341/BloodDrip0.ogg",
        start: 197066926,
        end: 197072430,
      },
      {
        filename: "/SFX/Character/D9341/BloodDrip1.ogg",
        start: 197072430,
        end: 197078785,
      },
      {
        filename: "/SFX/Character/D9341/BloodDrip2.ogg",
        start: 197078785,
        end: 197084797,
      },
      {
        filename: "/SFX/Character/D9341/BloodDrip3.ogg",
        start: 197084797,
        end: 197090292,
      },
      {
        filename: "/SFX/Character/D9341/Cough1.ogg",
        start: 197090292,
        end: 197113492,
      },
      {
        filename: "/SFX/Character/D9341/Cough2.ogg",
        start: 197113492,
        end: 197128531,
      },
      {
        filename: "/SFX/Character/D9341/Cough3.ogg",
        start: 197128531,
        end: 197155353,
      },
      {
        filename: "/SFX/Character/D9341/Damage1.ogg",
        start: 197155353,
        end: 197186234,
      },
      {
        filename: "/SFX/Character/D9341/Damage2.ogg",
        start: 197186234,
        end: 197223595,
      },
      {
        filename: "/SFX/Character/D9341/Damage3.ogg",
        start: 197223595,
        end: 197251829,
      },
      {
        filename: "/SFX/Character/D9341/Damage4.ogg",
        start: 197251829,
        end: 197285241,
      },
      {
        filename: "/SFX/Character/D9341/Damage5.ogg",
        start: 197285241,
        end: 197330746,
      },
      {
        filename: "/SFX/Character/D9341/Damage6.ogg",
        start: 197330746,
        end: 197372955,
      },
      {
        filename: "/SFX/Character/D9341/Damage7.ogg",
        start: 197372955,
        end: 197420141,
      },
      {
        filename: "/SFX/Character/D9341/Damage8.ogg",
        start: 197420141,
        end: 197431576,
      },
      {
        filename: "/SFX/Character/D9341/Damage9.ogg",
        start: 197431576,
        end: 197441317,
      },
      {
        filename: "/SFX/Character/D9341/Heartbeat.ogg",
        start: 197441317,
        end: 197450839,
      },
      {
        filename: "/SFX/Character/D9341/breath0.ogg",
        start: 197450839,
        end: 197523521,
      },
      {
        filename: "/SFX/Character/D9341/breath0gas.ogg",
        start: 197523521,
        end: 197586299,
      },
      {
        filename: "/SFX/Character/D9341/breath1.ogg",
        start: 197586299,
        end: 197599919,
      },
      {
        filename: "/SFX/Character/D9341/breath1gas.ogg",
        start: 197599919,
        end: 197613021,
      },
      {
        filename: "/SFX/Character/D9341/breath2.ogg",
        start: 197613021,
        end: 197626925,
      },
      {
        filename: "/SFX/Character/D9341/breath2gas.ogg",
        start: 197626925,
        end: 197640299,
      },
      {
        filename: "/SFX/Character/D9341/breath3.ogg",
        start: 197640299,
        end: 197653726,
      },
      {
        filename: "/SFX/Character/D9341/breath3gas.ogg",
        start: 197653726,
        end: 197666565,
      },
      {
        filename: "/SFX/Character/D9341/breath4.ogg",
        start: 197666565,
        end: 197677267,
      },
      {
        filename: "/SFX/Character/D9341/breath4gas.ogg",
        start: 197677267,
        end: 197691289,
      },
      {
        filename: "/SFX/Character/Guard/096ServerRoom1.ogg",
        start: 197691289,
        end: 198000241,
      },
      {
        filename: "/SFX/Character/Guard/096ServerRoom2.ogg",
        start: 198000241,
        end: 198090094,
      },
      {
        filename: "/SFX/Character/Guard/SuicideGuard1.ogg",
        start: 198090094,
        end: 198536050,
      },
      {
        filename: "/SFX/Character/Guard/SuicideGuard2.ogg",
        start: 198536050,
        end: 198623851,
      },
      {
        filename: "/SFX/Character/Janitor/106Abduct.ogg",
        start: 198623851,
        end: 198697640,
      },
      {
        filename: "/SFX/Character/Janitor/Idle.ogg",
        start: 198697640,
        end: 198909346,
      },
      {
        filename: "/SFX/Character/LureSubject/106Bait.ogg",
        start: 198909346,
        end: 199131938,
      },
      {
        filename: "/SFX/Character/LureSubject/Idle1.ogg",
        start: 199131938,
        end: 199158349,
      },
      {
        filename: "/SFX/Character/LureSubject/Idle2.ogg",
        start: 199158349,
        end: 199217041,
      },
      {
        filename: "/SFX/Character/LureSubject/Idle3.ogg",
        start: 199217041,
        end: 199251194,
      },
      {
        filename: "/SFX/Character/LureSubject/Idle4.ogg",
        start: 199251194,
        end: 199311948,
      },
      {
        filename: "/SFX/Character/LureSubject/Idle5.ogg",
        start: 199311948,
        end: 199371202,
      },
      {
        filename: "/SFX/Character/LureSubject/Idle6.ogg",
        start: 199371202,
        end: 199451288,
      },
      {
        filename: "/SFX/Character/LureSubject/Sniffling.ogg",
        start: 199451288,
        end: 199501482,
      },
      {
        filename: "/SFX/Character/MTF/049/Player0492_1.ogg",
        start: 199501482,
        end: 199559987,
      },
      {
        filename: "/SFX/Character/MTF/049/Player0492_2.ogg",
        start: 199559987,
        end: 199608588,
      },
      {
        filename: "/SFX/Character/MTF/049/Spotted1.ogg",
        start: 199608588,
        end: 199664013,
      },
      {
        filename: "/SFX/Character/MTF/049/Spotted2.ogg",
        start: 199664013,
        end: 199716547,
      },
      {
        filename: "/SFX/Character/MTF/049/Spotted3.ogg",
        start: 199716547,
        end: 199770114,
      },
      {
        filename: "/SFX/Character/MTF/049/Spotted4.ogg",
        start: 199770114,
        end: 199818960,
      },
      {
        filename: "/SFX/Character/MTF/049/Spotted5.ogg",
        start: 199818960,
        end: 199845136,
      },
      {
        filename: "/SFX/Character/MTF/096/Spotted1.ogg",
        start: 199845136,
        end: 199953853,
      },
      {
        filename: "/SFX/Character/MTF/096/Spotted2.ogg",
        start: 199953853,
        end: 200025608,
      },
      {
        filename: "/SFX/Character/MTF/106/Spotted1.ogg",
        start: 200025608,
        end: 200095603,
      },
      {
        filename: "/SFX/Character/MTF/106/Spotted2.ogg",
        start: 200095603,
        end: 200171962,
      },
      {
        filename: "/SFX/Character/MTF/106/Spotted3.ogg",
        start: 200171962,
        end: 200232284,
      },
      {
        filename: "/SFX/Character/MTF/106/Spotted4.ogg",
        start: 200232284,
        end: 200287393,
      },
      {
        filename: "/SFX/Character/MTF/173/BLINKING.ogg",
        start: 200287393,
        end: 200306873,
      },
      {
        filename: "/SFX/Character/MTF/173/Box1.ogg",
        start: 200306873,
        end: 200419357,
      },
      {
        filename: "/SFX/Character/MTF/173/Box2.ogg",
        start: 200419357,
        end: 200498723,
      },
      {
        filename: "/SFX/Character/MTF/173/Box3.ogg",
        start: 200498723,
        end: 200650465,
      },
      {
        filename: "/SFX/Character/MTF/173/Cont1.ogg",
        start: 200650465,
        end: 200751847,
      },
      {
        filename: "/SFX/Character/MTF/173/Cont2.ogg",
        start: 200751847,
        end: 200817842,
      },
      {
        filename: "/SFX/Character/MTF/173/Cont3.ogg",
        start: 200817842,
        end: 200931459,
      },
      {
        filename: "/SFX/Character/MTF/173/Cont4.ogg",
        start: 200931459,
        end: 201085835,
      },
      {
        filename: "/SFX/Character/MTF/173/Spotted1.ogg",
        start: 201085835,
        end: 201138408,
      },
      {
        filename: "/SFX/Character/MTF/173/Spotted2.ogg",
        start: 201138408,
        end: 201175829,
      },
      {
        filename: "/SFX/Character/MTF/173/Spotted3.ogg",
        start: 201175829,
        end: 201259229,
      },
      {
        filename: "/SFX/Character/MTF/Announc.ogg",
        start: 201259229,
        end: 201605853,
      },
      {
        filename: "/SFX/Character/MTF/Announc173Contain.ogg",
        start: 201605853,
        end: 201700285,
      },
      {
        filename: "/SFX/Character/MTF/AnnouncAfter1.ogg",
        start: 201700285,
        end: 201935541,
      },
      {
        filename: "/SFX/Character/MTF/AnnouncAfter2.ogg",
        start: 201935541,
        end: 202212906,
      },
      {
        filename: "/SFX/Character/MTF/AnnouncCameraCheck.ogg",
        start: 202212906,
        end: 202382257,
      },
      {
        filename: "/SFX/Character/MTF/AnnouncCameraFound1.ogg",
        start: 202382257,
        end: 202520517,
      },
      {
        filename: "/SFX/Character/MTF/AnnouncCameraFound2.ogg",
        start: 202520517,
        end: 202640747,
      },
      {
        filename: "/SFX/Character/MTF/AnnouncCameraNoFound.ogg",
        start: 202640747,
        end: 202757371,
      },
      {
        filename: "/SFX/Character/MTF/Beep.ogg",
        start: 202757371,
        end: 202769288,
      },
      {
        filename: "/SFX/Character/MTF/Breath.ogg",
        start: 202769288,
        end: 202822506,
      },
      {
        filename: "/SFX/Character/MTF/ClassD1.ogg",
        start: 202822506,
        end: 202855011,
      },
      {
        filename: "/SFX/Character/MTF/ClassD2.ogg",
        start: 202855011,
        end: 202931596,
      },
      {
        filename: "/SFX/Character/MTF/ClassD3.ogg",
        start: 202931596,
        end: 202994538,
      },
      {
        filename: "/SFX/Character/MTF/ClassD4.ogg",
        start: 202994538,
        end: 203031455,
      },
      {
        filename: "/SFX/Character/MTF/GateB1.ogg",
        start: 203031455,
        end: 203188541,
      },
      {
        filename: "/SFX/Character/MTF/GateB2.ogg",
        start: 203188541,
        end: 203255620,
      },
      {
        filename: "/SFX/Character/MTF/GateB3.ogg",
        start: 203255620,
        end: 203327178,
      },
      {
        filename: "/SFX/Character/MTF/GateB4.ogg",
        start: 203327178,
        end: 203438957,
      },
      {
        filename: "/SFX/Character/MTF/Random1.ogg",
        start: 203438957,
        end: 203621300,
      },
      {
        filename: "/SFX/Character/MTF/Random2.ogg",
        start: 203621300,
        end: 203675307,
      },
      {
        filename: "/SFX/Character/MTF/Random3.ogg",
        start: 203675307,
        end: 203722018,
      },
      {
        filename: "/SFX/Character/MTF/Random4.ogg",
        start: 203722018,
        end: 203790401,
      },
      {
        filename: "/SFX/Character/MTF/Random5.ogg",
        start: 203790401,
        end: 203836808,
      },
      {
        filename: "/SFX/Character/MTF/Random6.ogg",
        start: 203836808,
        end: 203985628,
      },
      {
        filename: "/SFX/Character/MTF/Random7.ogg",
        start: 203985628,
        end: 204146220,
      },
      {
        filename: "/SFX/Character/MTF/Searching1.ogg",
        start: 204146220,
        end: 204196658,
      },
      {
        filename: "/SFX/Character/MTF/Searching2.ogg",
        start: 204196658,
        end: 204248248,
      },
      {
        filename: "/SFX/Character/MTF/Searching3.ogg",
        start: 204248248,
        end: 204317697,
      },
      {
        filename: "/SFX/Character/MTF/Searching4.ogg",
        start: 204317697,
        end: 204335500,
      },
      {
        filename: "/SFX/Character/MTF/Searching5.ogg",
        start: 204335500,
        end: 204364055,
      },
      {
        filename: "/SFX/Character/MTF/Searching6.ogg",
        start: 204364055,
        end: 204397668,
      },
      {
        filename: "/SFX/Character/MTF/Step1.ogg",
        start: 204397668,
        end: 204408773,
      },
      {
        filename: "/SFX/Character/MTF/Step2.ogg",
        start: 204408773,
        end: 204418476,
      },
      {
        filename: "/SFX/Character/MTF/Step3.ogg",
        start: 204418476,
        end: 204428173,
      },
      {
        filename: "/SFX/Character/MTF/Stop1.ogg",
        start: 204428173,
        end: 204443187,
      },
      {
        filename: "/SFX/Character/MTF/Stop2.ogg",
        start: 204443187,
        end: 204492845,
      },
      {
        filename: "/SFX/Character/MTF/Stop3.ogg",
        start: 204492845,
        end: 204512191,
      },
      {
        filename: "/SFX/Character/MTF/Stop4.ogg",
        start: 204512191,
        end: 204532940,
      },
      {
        filename: "/SFX/Character/MTF/Stop5.ogg",
        start: 204532940,
        end: 204560783,
      },
      {
        filename: "/SFX/Character/MTF/Stop6.ogg",
        start: 204560783,
        end: 204596747,
      },
      {
        filename: "/SFX/Character/MTF/TargetLost1.ogg",
        start: 204596747,
        end: 204707487,
      },
      {
        filename: "/SFX/Character/MTF/TargetLost2.ogg",
        start: 204707487,
        end: 204823695,
      },
      {
        filename: "/SFX/Character/MTF/TargetLost3.ogg",
        start: 204823695,
        end: 204932508,
      },
      {
        filename: "/SFX/Character/MTF/TargetTerminated2.ogg",
        start: 204932508,
        end: 205001519,
      },
      {
        filename: "/SFX/Character/MTF/TargetTerminated3.ogg",
        start: 205001519,
        end: 205102621,
      },
      {
        filename: "/SFX/Character/MTF/TargetTerminated4.ogg",
        start: 205102621,
        end: 205173887,
      },
      {
        filename: "/SFX/Character/MTF/Targetterminated1.ogg",
        start: 205173887,
        end: 205205683,
      },
      {
        filename: "/SFX/Character/MTF/Tesla0.ogg",
        start: 205205683,
        end: 205293636,
      },
      {
        filename: "/SFX/Character/MTF/Tesla1.ogg",
        start: 205293636,
        end: 205401807,
      },
      {
        filename: "/SFX/Character/MTF/Tesla2.ogg",
        start: 205401807,
        end: 205511546,
      },
      {
        filename: "/SFX/Character/MTF/Tesla3.ogg",
        start: 205511546,
        end: 205645073,
      },
      {
        filename: "/SFX/Character/MTF/ThereHeIs1.ogg",
        start: 205645073,
        end: 205691456,
      },
      {
        filename: "/SFX/Character/MTF/ThereHeIs2.ogg",
        start: 205691456,
        end: 205743678,
      },
      {
        filename: "/SFX/Character/MTF/ThereHeIs3.ogg",
        start: 205743678,
        end: 205769507,
      },
      {
        filename: "/SFX/Character/MTF/ThereHeIs4.ogg",
        start: 205769507,
        end: 205792680,
      },
      {
        filename: "/SFX/Character/MTF/ThereHeIs5.ogg",
        start: 205792680,
        end: 205825022,
      },
      {
        filename: "/SFX/Character/MTF/ThereHeIs6.ogg",
        start: 205825022,
        end: 205861580,
      },
      {
        filename: "/SFX/Character/MTF/ThreatAnnounc1.ogg",
        start: 205861580,
        end: 206022476,
      },
      {
        filename: "/SFX/Character/MTF/ThreatAnnounc2.ogg",
        start: 206022476,
        end: 206182853,
      },
      {
        filename: "/SFX/Character/MTF/ThreatAnnounc3.ogg",
        start: 206182853,
        end: 206323369,
      },
      {
        filename: "/SFX/Character/MTF/ThreatAnnouncFinal.ogg",
        start: 206323369,
        end: 206436543,
      },
      {
        filename: "/SFX/Character/MTF/ThreatAnnouncPossession.ogg",
        start: 206436543,
        end: 206606777,
      },
      {
        filename: "/SFX/Character/Scientist/EmilyScream.ogg",
        start: 206606777,
        end: 206719361,
      },
      {
        filename: "/SFX/Door/1123DoorOpen.ogg",
        start: 206719361,
        end: 206731381,
      },
      { filename: "/SFX/Door/Airlock.ogg", start: 206731381, end: 206833203 },
      {
        filename: "/SFX/Door/BigDoorClose.ogg",
        start: 206833203,
        end: 206900363,
      },
      {
        filename: "/SFX/Door/BigDoorClose1.ogg",
        start: 206900363,
        end: 206992949,
      },
      {
        filename: "/SFX/Door/BigDoorClose2.ogg",
        start: 206992949,
        end: 207115981,
      },
      {
        filename: "/SFX/Door/BigDoorOpen.ogg",
        start: 207115981,
        end: 207159280,
      },
      {
        filename: "/SFX/Door/BigDoorOpen1.ogg",
        start: 207159280,
        end: 207252065,
      },
      {
        filename: "/SFX/Door/BigDoorOpen2.ogg",
        start: 207252065,
        end: 207361634,
      },
      {
        filename: "/SFX/Door/Door2Close1.ogg",
        start: 207361634,
        end: 207498994,
      },
      {
        filename: "/SFX/Door/Door2Close2.ogg",
        start: 207498994,
        end: 207551847,
      },
      {
        filename: "/SFX/Door/Door2Close3.ogg",
        start: 207551847,
        end: 207601066,
      },
      {
        filename: "/SFX/Door/Door2Open1.ogg",
        start: 207601066,
        end: 207632331,
      },
      {
        filename: "/SFX/Door/Door2Open1_dist.ogg",
        start: 207632331,
        end: 207706535,
      },
      {
        filename: "/SFX/Door/Door2Open2.ogg",
        start: 207706535,
        end: 207744783,
      },
      {
        filename: "/SFX/Door/Door2Open3.ogg",
        start: 207744783,
        end: 207852305,
      },
      {
        filename: "/SFX/Door/DoorCheckpoint.ogg",
        start: 207852305,
        end: 207964503,
      },
      {
        filename: "/SFX/Door/DoorClose079.ogg",
        start: 207964503,
        end: 208022490,
      },
      {
        filename: "/SFX/Door/DoorClose1.ogg",
        start: 208022490,
        end: 208072784,
      },
      {
        filename: "/SFX/Door/DoorClose2.ogg",
        start: 208072784,
        end: 208125473,
      },
      {
        filename: "/SFX/Door/DoorClose3.ogg",
        start: 208125473,
        end: 208178996,
      },
      { filename: "/SFX/Door/DoorError.ogg", start: 208178996, end: 208219945 },
      {
        filename: "/SFX/Door/DoorOpen079.ogg",
        start: 208219945,
        end: 208275221,
      },
      { filename: "/SFX/Door/DoorOpen1.ogg", start: 208275221, end: 208314914 },
      {
        filename: "/SFX/Door/DoorOpen173.ogg",
        start: 208314914,
        end: 208466901,
      },
      { filename: "/SFX/Door/DoorOpen2.ogg", start: 208466901, end: 208506507 },
      { filename: "/SFX/Door/DoorOpen3.ogg", start: 208506507, end: 208547874 },
      {
        filename: "/SFX/Door/DoorOpenFast.ogg",
        start: 208547874,
        end: 208667335,
      },
      {
        filename: "/SFX/Door/DoorSparks.ogg",
        start: 208667335,
        end: 208683521,
      },
      {
        filename: "/SFX/Door/ElevatorClose1.ogg",
        start: 208683521,
        end: 208811564,
      },
      {
        filename: "/SFX/Door/ElevatorClose2.ogg",
        start: 208811564,
        end: 208941040,
      },
      {
        filename: "/SFX/Door/ElevatorClose3.ogg",
        start: 208941040,
        end: 209069282,
      },
      {
        filename: "/SFX/Door/ElevatorOpen1.ogg",
        start: 209069282,
        end: 209202998,
      },
      {
        filename: "/SFX/Door/ElevatorOpen2.ogg",
        start: 209202998,
        end: 209334925,
      },
      {
        filename: "/SFX/Door/ElevatorOpen3.ogg",
        start: 209334925,
        end: 209464722,
      },
      {
        filename: "/SFX/Door/EndroomDoor.ogg",
        start: 209464722,
        end: 209518286,
      },
      {
        filename: "/SFX/Door/WoodenDoorBudge.ogg",
        start: 209518286,
        end: 209526393,
      },
      {
        filename: "/SFX/Door/WoodenDoorClose.ogg",
        start: 209526393,
        end: 209592321,
      },
      {
        filename: "/SFX/Door/WoodenDoorOpen.ogg",
        start: 209592321,
        end: 209655449,
      },
      {
        filename: "/SFX/Ending/GateA/106Escape.ogg",
        start: 209655449,
        end: 209969828,
      },
      {
        filename: "/SFX/Ending/GateA/106Retreat.ogg",
        start: 209969828,
        end: 210588267,
      },
      {
        filename: "/SFX/Ending/GateA/Bell1.ogg",
        start: 210588267,
        end: 210694185,
      },
      {
        filename: "/SFX/Ending/GateA/Bell2.ogg",
        start: 210694185,
        end: 210781496,
      },
      {
        filename: "/SFX/Ending/GateA/CI.ogg",
        start: 210781496,
        end: 210848633,
      },
      {
        filename: "/SFX/Ending/GateA/EndingA1.ogg",
        start: 210848633,
        end: 211282358,
      },
      {
        filename: "/SFX/Ending/GateA/EndingA2.ogg",
        start: 211282358,
        end: 212162354,
      },
      {
        filename: "/SFX/Ending/GateA/Franklin.ogg",
        start: 212162354,
        end: 212310683,
      },
      {
        filename: "/SFX/Ending/GateA/HIDTurret.ogg",
        start: 212310683,
        end: 212595403,
      },
      {
        filename: "/SFX/Ending/GateA/STOPRIGHTTHERE.ogg",
        start: 212595403,
        end: 212738579,
      },
      {
        filename: "/SFX/Ending/GateB/682Battle.ogg",
        start: 212738579,
        end: 213201431,
      },
      {
        filename: "/SFX/Ending/GateB/AlphaWarheadsFail.ogg",
        start: 213201431,
        end: 213524798,
      },
      {
        filename: "/SFX/Ending/GateB/DetonatingAlphaWarheads.ogg",
        start: 213524798,
        end: 213798730,
      },
      {
        filename: "/SFX/Ending/GateB/EndingB1.ogg",
        start: 213798730,
        end: 213957709,
      },
      {
        filename: "/SFX/Ending/GateB/EndingB2.ogg",
        start: 213957709,
        end: 214297066,
      },
      {
        filename: "/SFX/Ending/GateB/EndingB3.ogg",
        start: 214297066,
        end: 214765494,
      },
      {
        filename: "/SFX/Ending/GateB/Gunshot.ogg",
        start: 214765494,
        end: 214812393,
      },
      {
        filename: "/SFX/Ending/GateB/Nuke1.ogg",
        start: 214812393,
        end: 214841638,
      },
      {
        filename: "/SFX/Ending/GateB/Nuke2.ogg",
        start: 214841638,
        end: 214975129,
      },
      {
        filename: "/SFX/Ending/GateB/PlayerDetect.ogg",
        start: 214975129,
        end: 215218296,
      },
      {
        filename: "/SFX/Ending/GateB/Siren.ogg",
        start: 215218296,
        end: 215310047,
      },
      {
        filename: "/SFX/Ending/MenuBreath.ogg",
        start: 215310047,
        end: 215445370,
      },
      {
        filename: "/SFX/General/BodyFall.ogg",
        start: 215445370,
        end: 215520700,
      },
      {
        filename: "/SFX/General/BulletHit.ogg",
        start: 215520700,
        end: 215526264,
      },
      {
        filename: "/SFX/General/BulletMiss.ogg",
        start: 215526264,
        end: 215532540,
      },
      { filename: "/SFX/General/Camera.ogg", start: 215532540, end: 215622746 },
      {
        filename: "/SFX/General/Elevator/Beep.ogg",
        start: 215622746,
        end: 215646513,
      },
      {
        filename: "/SFX/General/Elevator/Moving.ogg",
        start: 215646513,
        end: 216120279,
      },
      {
        filename: "/SFX/General/GeneratorOn.ogg",
        start: 216120279,
        end: 216175738,
      },
      {
        filename: "/SFX/General/GlassBreak.ogg",
        start: 216175738,
        end: 216209371,
      },
      {
        filename: "/SFX/General/Gunshot.ogg",
        start: 216209371,
        end: 216223587,
      },
      {
        filename: "/SFX/General/Gunshot2.ogg",
        start: 216223587,
        end: 216244159,
      },
      { filename: "/SFX/General/Hiss.ogg", start: 216244159, end: 216271858 },
      {
        filename: "/SFX/General/LightSwitch.ogg",
        start: 216271858,
        end: 216315281,
      },
      { filename: "/SFX/General/Save1.ogg", start: 216315281, end: 216354820 },
      { filename: "/SFX/General/Save2.ogg", start: 216354820, end: 216372538 },
      { filename: "/SFX/General/Slash1.ogg", start: 216372538, end: 216389670 },
      { filename: "/SFX/General/Slash2.ogg", start: 216389670, end: 216401587 },
      { filename: "/SFX/Horror/Horror0.ogg", start: 216401587, end: 216508809 },
      { filename: "/SFX/Horror/Horror1.ogg", start: 216508809, end: 216604672 },
      {
        filename: "/SFX/Horror/Horror10.ogg",
        start: 216604672,
        end: 216648877,
      },
      {
        filename: "/SFX/Horror/Horror11.ogg",
        start: 216648877,
        end: 216728741,
      },
      {
        filename: "/SFX/Horror/Horror12.ogg",
        start: 216728741,
        end: 217071710,
      },
      {
        filename: "/SFX/Horror/Horror13.ogg",
        start: 217071710,
        end: 217138770,
      },
      {
        filename: "/SFX/Horror/Horror14.ogg",
        start: 217138770,
        end: 217235411,
      },
      {
        filename: "/SFX/Horror/Horror15.ogg",
        start: 217235411,
        end: 217371368,
      },
      {
        filename: "/SFX/Horror/Horror16.ogg",
        start: 217371368,
        end: 217526535,
      },
      { filename: "/SFX/Horror/Horror2.ogg", start: 217526535, end: 217640790 },
      { filename: "/SFX/Horror/Horror3.ogg", start: 217640790, end: 217731176 },
      { filename: "/SFX/Horror/Horror4.ogg", start: 217731176, end: 217810172 },
      { filename: "/SFX/Horror/Horror5.ogg", start: 217810172, end: 217868940 },
      { filename: "/SFX/Horror/Horror6.ogg", start: 217868940, end: 217938925 },
      { filename: "/SFX/Horror/Horror7.ogg", start: 217938925, end: 217987867 },
      { filename: "/SFX/Horror/Horror8.ogg", start: 217987867, end: 218047872 },
      { filename: "/SFX/Horror/Horror9.ogg", start: 218047872, end: 218085560 },
      {
        filename: "/SFX/Interact/Button.ogg",
        start: 218085560,
        end: 218097714,
      },
      {
        filename: "/SFX/Interact/Button2.ogg",
        start: 218097714,
        end: 218112071,
      },
      {
        filename: "/SFX/Interact/KeycardUse1.ogg",
        start: 218112071,
        end: 218146044,
      },
      {
        filename: "/SFX/Interact/KeycardUse2.ogg",
        start: 218146044,
        end: 218171869,
      },
      {
        filename: "/SFX/Interact/LeverFlip.ogg",
        start: 218171869,
        end: 218179157,
      },
      {
        filename: "/SFX/Interact/PickItem0.ogg",
        start: 218179157,
        end: 218189808,
      },
      {
        filename: "/SFX/Interact/PickItem1.ogg",
        start: 218189808,
        end: 218200223,
      },
      {
        filename: "/SFX/Interact/PickItem2.ogg",
        start: 218200223,
        end: 218211995,
      },
      {
        filename: "/SFX/Interact/PickItem3.ogg",
        start: 218211995,
        end: 218219929,
      },
      {
        filename: "/SFX/Interact/ScannerUse1.ogg",
        start: 218219929,
        end: 218232608,
      },
      {
        filename: "/SFX/Interact/ScannerUse2.ogg",
        start: 218232608,
        end: 218244218,
      },
      { filename: "/SFX/Music/012.ogg", start: 218244218, end: 218531019 },
      {
        filename: "/SFX/Music/012Golgotha.ogg",
        start: 218531019,
        end: 218843387,
      },
      { filename: "/SFX/Music/049Chase.ogg", start: 218843387, end: 219305282 },
      { filename: "/SFX/Music/079.ogg", start: 219305282, end: 220041845 },
      { filename: "/SFX/Music/096.ogg", start: 220041845, end: 220597298 },
      {
        filename: "/SFX/Music/096Angered.ogg",
        start: 220597298,
        end: 221047629,
      },
      { filename: "/SFX/Music/096Chase.ogg", start: 221047629, end: 221268755 },
      { filename: "/SFX/Music/106.ogg", start: 221268755, end: 221693862 },
      { filename: "/SFX/Music/1123.ogg", start: 221693862, end: 222355624 },
      { filename: "/SFX/Music/1499.ogg", start: 222355624, end: 222925565 },
      {
        filename: "/SFX/Music/1499Danger.ogg",
        start: 222925565,
        end: 223944425,
      },
      { filename: "/SFX/Music/178.ogg", start: 223944425, end: 224182976 },
      { filename: "/SFX/Music/205.ogg", start: 224182976, end: 225007305 },
      { filename: "/SFX/Music/420J.ogg", start: 225007305, end: 225240702 },
      { filename: "/SFX/Music/8601.ogg", start: 225240702, end: 225595614 },
      {
        filename: "/SFX/Music/8601Cancer.ogg",
        start: 225595614,
        end: 225804065,
      },
      { filename: "/SFX/Music/914.ogg", start: 225804065, end: 226312982 },
      { filename: "/SFX/Music/Credits.ogg", start: 226312982, end: 228946498 },
      {
        filename: "/SFX/Music/Custom/custom.txt",
        start: 228946498,
        end: 228946647,
      },
      { filename: "/SFX/Music/Ending.ogg", start: 228946647, end: 229138685 },
      {
        filename: "/SFX/Music/EntranceZone.ogg",
        start: 229138685,
        end: 229831030,
      },
      { filename: "/SFX/Music/GateA.ogg", start: 229831030, end: 230447381 },
      { filename: "/SFX/Music/GateB1.ogg", start: 230447381, end: 231110536 },
      { filename: "/SFX/Music/GateB2.ogg", start: 231110536, end: 231377425 },
      {
        filename: "/SFX/Music/HaveMercyOnMe(Choir).ogg",
        start: 231377425,
        end: 232905144,
      },
      {
        filename: "/SFX/Music/HaveMercyOnMe(NoChoir).ogg",
        start: 232905144,
        end: 241313201,
      },
      {
        filename: "/SFX/Music/HeavyContainment.ogg",
        start: 241313201,
        end: 241984903,
      },
      { filename: "/SFX/Music/Intro.ogg", start: 241984903, end: 245091951 },
      { filename: "/SFX/Music/Menu.ogg", start: 245091951, end: 245740048 },
      { filename: "/SFX/Music/PD.ogg", start: 245740048, end: 246238877 },
      { filename: "/SFX/Music/PDTrench.ogg", start: 246238877, end: 246541503 },
      { filename: "/SFX/Music/Room049.ogg", start: 246541503, end: 247092172 },
      {
        filename: "/SFX/Music/Room3Storage.ogg",
        start: 247092172,
        end: 247347e3,
      },
      {
        filename: "/SFX/Music/SaveMeFrom.ogg",
        start: 247347e3,
        end: 247978398,
      },
      {
        filename: "/SFX/Music/The Dread.ogg",
        start: 247978398,
        end: 249285499,
      },
      { filename: "/SFX/Radio/Buzz.ogg", start: 249285499, end: 249299155 },
      { filename: "/SFX/Radio/Chatter1.ogg", start: 249299155, end: 249665582 },
      { filename: "/SFX/Radio/Chatter2.ogg", start: 249665582, end: 250329421 },
      { filename: "/SFX/Radio/Chatter3.ogg", start: 250329421, end: 250385765 },
      { filename: "/SFX/Radio/Chatter4.ogg", start: 250385765, end: 250495209 },
      { filename: "/SFX/Radio/OhGod.ogg", start: 250495209, end: 250796542 },
      {
        filename: "/SFX/Radio/RadioAlarm.ogg",
        start: 250796542,
        end: 250825190,
      },
      {
        filename: "/SFX/Radio/RadioAlarm2.ogg",
        start: 250825190,
        end: 250889535,
      },
      {
        filename: "/SFX/Radio/UserTracks/usertracks.txt",
        start: 250889535,
        end: 250889791,
      },
      {
        filename: "/SFX/Radio/franklin1.ogg",
        start: 250889791,
        end: 250960787,
      },
      {
        filename: "/SFX/Radio/franklin2.ogg",
        start: 250960787,
        end: 251079819,
      },
      {
        filename: "/SFX/Radio/franklin3.ogg",
        start: 251079819,
        end: 251194057,
      },
      {
        filename: "/SFX/Radio/franklin4.ogg",
        start: 251194057,
        end: 251412938,
      },
      {
        filename: "/SFX/Radio/scpradio0.ogg",
        start: 251412938,
        end: 251770857,
      },
      {
        filename: "/SFX/Radio/scpradio1.ogg",
        start: 251770857,
        end: 251937607,
      },
      {
        filename: "/SFX/Radio/scpradio2.ogg",
        start: 251937607,
        end: 252251723,
      },
      {
        filename: "/SFX/Radio/scpradio3.ogg",
        start: 252251723,
        end: 252639428,
      },
      {
        filename: "/SFX/Radio/scpradio4.ogg",
        start: 252639428,
        end: 252958761,
      },
      {
        filename: "/SFX/Radio/scpradio5.ogg",
        start: 252958761,
        end: 253257792,
      },
      {
        filename: "/SFX/Radio/scpradio6.ogg",
        start: 253257792,
        end: 254110359,
      },
      {
        filename: "/SFX/Radio/scpradio7.ogg",
        start: 254110359,
        end: 254403460,
      },
      {
        filename: "/SFX/Radio/scpradio8.ogg",
        start: 254403460,
        end: 254759768,
      },
      { filename: "/SFX/Radio/squelch.ogg", start: 254759768, end: 254765092 },
      { filename: "/SFX/Radio/static.ogg", start: 254765092, end: 254785854 },
      {
        filename: "/SFX/Room/035Chamber/InProximity.ogg",
        start: 254785854,
        end: 255002081,
      },
      {
        filename: "/SFX/Room/035Chamber/TentacleAttack1.ogg",
        start: 255002081,
        end: 255065751,
      },
      {
        filename: "/SFX/Room/035Chamber/TentacleAttack2.ogg",
        start: 255065751,
        end: 255127138,
      },
      {
        filename: "/SFX/Room/035Chamber/TentacleIdle.ogg",
        start: 255127138,
        end: 255239375,
      },
      {
        filename: "/SFX/Room/035Chamber/TentacleSpawn.ogg",
        start: 255239375,
        end: 255398986,
      },
      {
        filename: "/SFX/Room/035Chamber/Whispers1.ogg",
        start: 255398986,
        end: 255603206,
      },
      {
        filename: "/SFX/Room/035Chamber/Whispers2.ogg",
        start: 255603206,
        end: 255823974,
      },
      {
        filename: "/SFX/Room/106Chamber/FemurBreaker.ogg",
        start: 255823974,
        end: 256217029,
      },
      {
        filename: "/SFX/Room/106Chamber/MagnetDown.ogg",
        start: 256217029,
        end: 256298047,
      },
      {
        filename: "/SFX/Room/106Chamber/MagnetUp.ogg",
        start: 256298047,
        end: 256380930,
      },
      {
        filename: "/SFX/Room/895Chamber/GuardIdle1.ogg",
        start: 256380930,
        end: 256491006,
      },
      {
        filename: "/SFX/Room/895Chamber/GuardIdle2.ogg",
        start: 256491006,
        end: 256609538,
      },
      {
        filename: "/SFX/Room/895Chamber/GuardIdle3.ogg",
        start: 256609538,
        end: 256780388,
      },
      {
        filename: "/SFX/Room/895Chamber/GuardRadio.ogg",
        start: 256780388,
        end: 256971086,
      },
      {
        filename: "/SFX/Room/895Chamber/GuardScream1.ogg",
        start: 256971086,
        end: 257023216,
      },
      {
        filename: "/SFX/Room/895Chamber/GuardScream2.ogg",
        start: 257023216,
        end: 257084825,
      },
      {
        filename: "/SFX/Room/895Chamber/GuardScream3.ogg",
        start: 257084825,
        end: 257143985,
      },
      { filename: "/SFX/Room/BD/horn.ogg", start: 257143985, end: 257159766 },
      {
        filename: "/SFX/Room/BD/keycard.ogg",
        start: 257159766,
        end: 257190756,
      },
      { filename: "/SFX/Room/BD/sad.ogg", start: 257190756, end: 257211309 },
      { filename: "/SFX/Room/Blackout.ogg", start: 257211309, end: 257282545 },
      {
        filename: "/SFX/Room/Intro/173Chamber.ogg",
        start: 257282545,
        end: 257440140,
      },
      {
        filename: "/SFX/Room/Intro/173Vent.ogg",
        start: 257440140,
        end: 257490338,
      },
      {
        filename: "/SFX/Room/Intro/Bang1.ogg",
        start: 257490338,
        end: 257513803,
      },
      {
        filename: "/SFX/Room/Intro/Bang2.ogg",
        start: 257513803,
        end: 257556701,
      },
      {
        filename: "/SFX/Room/Intro/Bang3.ogg",
        start: 257556701,
        end: 257590797,
      },
      {
        filename: "/SFX/Room/Intro/ClassD/Breen.ogg",
        start: 257590797,
        end: 257611767,
      },
      {
        filename: "/SFX/Room/Intro/ClassD/DontLikeThis.ogg",
        start: 257611767,
        end: 257639578,
      },
      {
        filename: "/SFX/Room/Intro/ClassD/Gasp.ogg",
        start: 257639578,
        end: 257650208,
      },
      {
        filename: "/SFX/Room/Intro/Commotion/Commotion1.ogg",
        start: 257650208,
        end: 257691258,
      },
      {
        filename: "/SFX/Room/Intro/Commotion/Commotion10.ogg",
        start: 257691258,
        end: 257716651,
      },
      {
        filename: "/SFX/Room/Intro/Commotion/Commotion11.ogg",
        start: 257716651,
        end: 257758533,
      },
      {
        filename: "/SFX/Room/Intro/Commotion/Commotion12.ogg",
        start: 257758533,
        end: 257805337,
      },
      {
        filename: "/SFX/Room/Intro/Commotion/Commotion13.ogg",
        start: 257805337,
        end: 257854922,
      },
      {
        filename: "/SFX/Room/Intro/Commotion/Commotion14.ogg",
        start: 257854922,
        end: 257927036,
      },
      {
        filename: "/SFX/Room/Intro/Commotion/Commotion15.ogg",
        start: 257927036,
        end: 257997606,
      },
      {
        filename: "/SFX/Room/Intro/Commotion/Commotion16.ogg",
        start: 257997606,
        end: 258029327,
      },
      {
        filename: "/SFX/Room/Intro/Commotion/Commotion17.ogg",
        start: 258029327,
        end: 258072840,
      },
      {
        filename: "/SFX/Room/Intro/Commotion/Commotion18.ogg",
        start: 258072840,
        end: 258129181,
      },
      {
        filename: "/SFX/Room/Intro/Commotion/Commotion19.ogg",
        start: 258129181,
        end: 258305411,
      },
      {
        filename: "/SFX/Room/Intro/Commotion/Commotion2.ogg",
        start: 258305411,
        end: 258373857,
      },
      {
        filename: "/SFX/Room/Intro/Commotion/Commotion20.ogg",
        start: 258373857,
        end: 258424808,
      },
      {
        filename: "/SFX/Room/Intro/Commotion/Commotion21.ogg",
        start: 258424808,
        end: 258599597,
      },
      {
        filename: "/SFX/Room/Intro/Commotion/Commotion22.ogg",
        start: 258599597,
        end: 258648978,
      },
      {
        filename: "/SFX/Room/Intro/Commotion/Commotion23.ogg",
        start: 258648978,
        end: 258717598,
      },
      {
        filename: "/SFX/Room/Intro/Commotion/Commotion24.ogg",
        start: 258717598,
        end: 258787996,
      },
      {
        filename: "/SFX/Room/Intro/Commotion/Commotion25.ogg",
        start: 258787996,
        end: 258904674,
      },
      {
        filename: "/SFX/Room/Intro/Commotion/Commotion3.ogg",
        start: 258904674,
        end: 258938253,
      },
      {
        filename: "/SFX/Room/Intro/Commotion/Commotion4.ogg",
        start: 258938253,
        end: 258970212,
      },
      {
        filename: "/SFX/Room/Intro/Commotion/Commotion5.ogg",
        start: 258970212,
        end: 259062986,
      },
      {
        filename: "/SFX/Room/Intro/Commotion/Commotion6.ogg",
        start: 259062986,
        end: 259146995,
      },
      {
        filename: "/SFX/Room/Intro/Commotion/Commotion7.ogg",
        start: 259146995,
        end: 259275646,
      },
      {
        filename: "/SFX/Room/Intro/Commotion/Commotion8.ogg",
        start: 259275646,
        end: 259338348,
      },
      {
        filename: "/SFX/Room/Intro/Commotion/Commotion9.ogg",
        start: 259338348,
        end: 259796640,
      },
      {
        filename: "/SFX/Room/Intro/Guard/Balcony/Alert1.ogg",
        start: 259796640,
        end: 259922673,
      },
      {
        filename: "/SFX/Room/Intro/Guard/Balcony/Alert2.ogg",
        start: 259922673,
        end: 260032591,
      },
      {
        filename: "/SFX/Room/Intro/Guard/Balcony/OhSh.ogg",
        start: 260032591,
        end: 260075195,
      },
      {
        filename: "/SFX/Room/Intro/Guard/Balcony/WTF1.ogg",
        start: 260075195,
        end: 260108135,
      },
      {
        filename: "/SFX/Room/Intro/Guard/Balcony/WTF2.ogg",
        start: 260108135,
        end: 260140815,
      },
      {
        filename: "/SFX/Room/Intro/Guard/Conversation1a.ogg",
        start: 260140815,
        end: 260451706,
      },
      {
        filename: "/SFX/Room/Intro/Guard/Conversation1b.ogg",
        start: 260451706,
        end: 260767775,
      },
      {
        filename: "/SFX/Room/Intro/Guard/Conversation2a.ogg",
        start: 260767775,
        end: 261088746,
      },
      {
        filename: "/SFX/Room/Intro/Guard/Conversation2b.ogg",
        start: 261088746,
        end: 261379301,
      },
      {
        filename: "/SFX/Room/Intro/Guard/Conversation3a.ogg",
        start: 261379301,
        end: 261677921,
      },
      {
        filename: "/SFX/Room/Intro/Guard/Conversation3b.ogg",
        start: 261677921,
        end: 261995151,
      },
      {
        filename: "/SFX/Room/Intro/Guard/Conversation4a.ogg",
        start: 261995151,
        end: 262371476,
      },
      {
        filename: "/SFX/Room/Intro/Guard/Conversation4b.ogg",
        start: 262371476,
        end: 262768504,
      },
      {
        filename: "/SFX/Room/Intro/Guard/Conversation5a.ogg",
        start: 262768504,
        end: 262968237,
      },
      {
        filename: "/SFX/Room/Intro/Guard/Conversation5b.ogg",
        start: 262968237,
        end: 263080380,
      },
      {
        filename: "/SFX/Room/Intro/Guard/Music1.ogg",
        start: 263080380,
        end: 263457598,
      },
      {
        filename: "/SFX/Room/Intro/Guard/Music2.ogg",
        start: 263457598,
        end: 263802008,
      },
      {
        filename: "/SFX/Room/Intro/Guard/Music3.ogg",
        start: 263802008,
        end: 264312161,
      },
      {
        filename: "/SFX/Room/Intro/Guard/Music4.ogg",
        start: 264312161,
        end: 264739534,
      },
      {
        filename: "/SFX/Room/Intro/Guard/Music5.ogg",
        start: 264739534,
        end: 265183114,
      },
      {
        filename: "/SFX/Room/Intro/Guard/PlayerEscape.ogg",
        start: 265183114,
        end: 265254266,
      },
      {
        filename: "/SFX/Room/Intro/Guard/Ulgrin/BeforeDoorOpen.ogg",
        start: 265254266,
        end: 265308413,
      },
      {
        filename: "/SFX/Room/Intro/Guard/Ulgrin/CellGas1.ogg",
        start: 265308413,
        end: 265375611,
      },
      {
        filename: "/SFX/Room/Intro/Guard/Ulgrin/CellGas2.ogg",
        start: 265375611,
        end: 265473480,
      },
      {
        filename: "/SFX/Room/Intro/Guard/Ulgrin/Escort1.ogg",
        start: 265473480,
        end: 265581554,
      },
      {
        filename: "/SFX/Room/Intro/Guard/Ulgrin/Escort2.ogg",
        start: 265581554,
        end: 265744136,
      },
      {
        filename: "/SFX/Room/Intro/Guard/Ulgrin/EscortDone1.ogg",
        start: 265744136,
        end: 265810281,
      },
      {
        filename: "/SFX/Room/Intro/Guard/Ulgrin/EscortDone2.ogg",
        start: 265810281,
        end: 265890519,
      },
      {
        filename: "/SFX/Room/Intro/Guard/Ulgrin/EscortDone3.ogg",
        start: 265890519,
        end: 265984812,
      },
      {
        filename: "/SFX/Room/Intro/Guard/Ulgrin/EscortDone4.ogg",
        start: 265984812,
        end: 266132607,
      },
      {
        filename: "/SFX/Room/Intro/Guard/Ulgrin/EscortDone5.ogg",
        start: 266132607,
        end: 266198425,
      },
      {
        filename: "/SFX/Room/Intro/Guard/Ulgrin/EscortKill1.ogg",
        start: 266198425,
        end: 266239336,
      },
      {
        filename: "/SFX/Room/Intro/Guard/Ulgrin/EscortKill2.ogg",
        start: 266239336,
        end: 266296561,
      },
      {
        filename: "/SFX/Room/Intro/Guard/Ulgrin/EscortPissedOff1.ogg",
        start: 266296561,
        end: 266351575,
      },
      {
        filename: "/SFX/Room/Intro/Guard/Ulgrin/EscortPissedOff2.ogg",
        start: 266351575,
        end: 266448942,
      },
      {
        filename: "/SFX/Room/Intro/Guard/Ulgrin/EscortRefuse1.ogg",
        start: 266448942,
        end: 266473159,
      },
      {
        filename: "/SFX/Room/Intro/Guard/Ulgrin/EscortRefuse2.ogg",
        start: 266473159,
        end: 266511097,
      },
      {
        filename: "/SFX/Room/Intro/Guard/Ulgrin/EscortRun.ogg",
        start: 266511097,
        end: 266556314,
      },
      {
        filename: "/SFX/Room/Intro/Guard/Ulgrin/EscortTerminated.ogg",
        start: 266556314,
        end: 266631240,
      },
      {
        filename: "/SFX/Room/Intro/Guard/Ulgrin/ExitCell.ogg",
        start: 266631240,
        end: 266695497,
      },
      {
        filename: "/SFX/Room/Intro/Guard/Ulgrin/ExitCellRefuse1.ogg",
        start: 266695497,
        end: 266753511,
      },
      {
        filename: "/SFX/Room/Intro/Guard/Ulgrin/ExitCellRefuse2.ogg",
        start: 266753511,
        end: 266849131,
      },
      {
        filename: "/SFX/Room/Intro/Guard/Ulgrin/OhAndByTheWay.ogg",
        start: 266849131,
        end: 266871025,
      },
      {
        filename: "/SFX/Room/Intro/Horror.ogg",
        start: 266871025,
        end: 267238016,
      },
      {
        filename: "/SFX/Room/Intro/Light1.ogg",
        start: 267238016,
        end: 267252412,
      },
      {
        filename: "/SFX/Room/Intro/Light2.ogg",
        start: 267252412,
        end: 267267769,
      },
      {
        filename: "/SFX/Room/Intro/Light3.ogg",
        start: 267267769,
        end: 267283889,
      },
      {
        filename: "/SFX/Room/Intro/PA/1/attention1.ogg",
        start: 267283889,
        end: 267325310,
      },
      {
        filename: "/SFX/Room/Intro/PA/1/attention2.ogg",
        start: 267325310,
        end: 267375152,
      },
      {
        filename: "/SFX/Room/Intro/PA/2/crew0.ogg",
        start: 267375152,
        end: 267455138,
      },
      {
        filename: "/SFX/Room/Intro/PA/2/crew1.ogg",
        start: 267455138,
        end: 267538972,
      },
      {
        filename: "/SFX/Room/Intro/PA/2/crew2.ogg",
        start: 267538972,
        end: 267618669,
      },
      {
        filename: "/SFX/Room/Intro/PA/2/crew3.ogg",
        start: 267618669,
        end: 267710226,
      },
      {
        filename: "/SFX/Room/Intro/PA/2/crew4.ogg",
        start: 267710226,
        end: 267819145,
      },
      {
        filename: "/SFX/Room/Intro/PA/2/crew5.ogg",
        start: 267819145,
        end: 267899184,
      },
      {
        filename: "/SFX/Room/Intro/PA/2/scientist0.ogg",
        start: 267899184,
        end: 267974992,
      },
      {
        filename: "/SFX/Room/Intro/PA/2/scientist1.ogg",
        start: 267974992,
        end: 268055385,
      },
      {
        filename: "/SFX/Room/Intro/PA/2/scientist10.ogg",
        start: 268055385,
        end: 268114319,
      },
      {
        filename: "/SFX/Room/Intro/PA/2/scientist11.ogg",
        start: 268114319,
        end: 268193564,
      },
      {
        filename: "/SFX/Room/Intro/PA/2/scientist12.ogg",
        start: 268193564,
        end: 268272803,
      },
      {
        filename: "/SFX/Room/Intro/PA/2/scientist13.ogg",
        start: 268272803,
        end: 268353877,
      },
      {
        filename: "/SFX/Room/Intro/PA/2/scientist14.ogg",
        start: 268353877,
        end: 268433154,
      },
      {
        filename: "/SFX/Room/Intro/PA/2/scientist15.ogg",
        start: 268433154,
        end: 268510730,
      },
      {
        filename: "/SFX/Room/Intro/PA/2/scientist16.ogg",
        start: 268510730,
        end: 268619179,
      },
      {
        filename: "/SFX/Room/Intro/PA/2/scientist17.ogg",
        start: 268619179,
        end: 268713060,
      },
      {
        filename: "/SFX/Room/Intro/PA/2/scientist18.ogg",
        start: 268713060,
        end: 268788533,
      },
      {
        filename: "/SFX/Room/Intro/PA/2/scientist19.ogg",
        start: 268788533,
        end: 268869931,
      },
      {
        filename: "/SFX/Room/Intro/PA/2/scientist2.ogg",
        start: 268869931,
        end: 268948522,
      },
      {
        filename: "/SFX/Room/Intro/PA/2/scientist3.ogg",
        start: 268948522,
        end: 269023491,
      },
      {
        filename: "/SFX/Room/Intro/PA/2/scientist4.ogg",
        start: 269023491,
        end: 269072186,
      },
      {
        filename: "/SFX/Room/Intro/PA/2/scientist5.ogg",
        start: 269072186,
        end: 269125417,
      },
      {
        filename: "/SFX/Room/Intro/PA/2/scientist6.ogg",
        start: 269125417,
        end: 269181619,
      },
      {
        filename: "/SFX/Room/Intro/PA/2/scientist7.ogg",
        start: 269181619,
        end: 269235548,
      },
      {
        filename: "/SFX/Room/Intro/PA/2/scientist8.ogg",
        start: 269235548,
        end: 269284207,
      },
      {
        filename: "/SFX/Room/Intro/PA/2/scientist9.ogg",
        start: 269284207,
        end: 269341986,
      },
      {
        filename: "/SFX/Room/Intro/PA/2/security0.ogg",
        start: 269341986,
        end: 269433350,
      },
      {
        filename: "/SFX/Room/Intro/PA/2/security1.ogg",
        start: 269433350,
        end: 269527047,
      },
      {
        filename: "/SFX/Room/Intro/PA/2/security2.ogg",
        start: 269527047,
        end: 269579342,
      },
      {
        filename: "/SFX/Room/Intro/PA/2/security3.ogg",
        start: 269579342,
        end: 269672547,
      },
      {
        filename: "/SFX/Room/Intro/PA/2/security4.ogg",
        start: 269672547,
        end: 269767029,
      },
      {
        filename: "/SFX/Room/Intro/PA/2/security5.ogg",
        start: 269767029,
        end: 269828017,
      },
      {
        filename: "/SFX/Room/Intro/PA/3/callonline.ogg",
        start: 269828017,
        end: 269871677,
      },
      {
        filename: "/SFX/Room/Intro/PA/3/crew0.ogg",
        start: 269871677,
        end: 269958157,
      },
      {
        filename: "/SFX/Room/Intro/PA/3/report0.ogg",
        start: 269958157,
        end: 269991331,
      },
      {
        filename: "/SFX/Room/Intro/PA/3/report1.ogg",
        start: 269991331,
        end: 270029556,
      },
      {
        filename: "/SFX/Room/Intro/PA/4/crew0.ogg",
        start: 270029556,
        end: 270128024,
      },
      {
        filename: "/SFX/Room/Intro/PA/4/crew1.ogg",
        start: 270128024,
        end: 270244226,
      },
      {
        filename: "/SFX/Room/Intro/PA/4/crew2.ogg",
        start: 270244226,
        end: 270340007,
      },
      {
        filename: "/SFX/Room/Intro/PA/4/crew3.ogg",
        start: 270340007,
        end: 270431144,
      },
      {
        filename: "/SFX/Room/Intro/PA/4/crew4.ogg",
        start: 270431144,
        end: 270678175,
      },
      {
        filename: "/SFX/Room/Intro/PA/4/crew5.ogg",
        start: 270678175,
        end: 270763837,
      },
      {
        filename: "/SFX/Room/Intro/PA/4/crew6.ogg",
        start: 270763837,
        end: 270883826,
      },
      {
        filename: "/SFX/Room/Intro/PA/4/scientist0.ogg",
        start: 270883826,
        end: 270969780,
      },
      {
        filename: "/SFX/Room/Intro/PA/4/scientist1.ogg",
        start: 270969780,
        end: 271077310,
      },
      {
        filename: "/SFX/Room/Intro/PA/4/scientist2.ogg",
        start: 271077310,
        end: 271369274,
      },
      {
        filename: "/SFX/Room/Intro/PA/4/scientist3.ogg",
        start: 271369274,
        end: 271548463,
      },
      {
        filename: "/SFX/Room/Intro/PA/4/scientist4.ogg",
        start: 271548463,
        end: 271805198,
      },
      {
        filename: "/SFX/Room/Intro/PA/4/scientist5.ogg",
        start: 271805198,
        end: 271926471,
      },
      {
        filename: "/SFX/Room/Intro/PA/4/scientist6.ogg",
        start: 271926471,
        end: 272036167,
      },
      {
        filename: "/SFX/Room/Intro/PA/4/scientist7.ogg",
        start: 272036167,
        end: 272106668,
      },
      {
        filename: "/SFX/Room/Intro/PA/4/security0.ogg",
        start: 272106668,
        end: 272170093,
      },
      {
        filename: "/SFX/Room/Intro/PA/4/security1.ogg",
        start: 272170093,
        end: 272245448,
      },
      {
        filename: "/SFX/Room/Intro/PA/4/security2.ogg",
        start: 272245448,
        end: 272303811,
      },
      {
        filename: "/SFX/Room/Intro/PA/4/security3.ogg",
        start: 272303811,
        end: 272396837,
      },
      {
        filename: "/SFX/Room/Intro/PA/4/security4.ogg",
        start: 272396837,
        end: 272486876,
      },
      {
        filename: "/SFX/Room/Intro/PA/4/security5.ogg",
        start: 272486876,
        end: 272590111,
      },
      {
        filename: "/SFX/Room/Intro/PA/5/crew0.ogg",
        start: 272590111,
        end: 272759051,
      },
      {
        filename: "/SFX/Room/Intro/PA/5/crew1.ogg",
        start: 272759051,
        end: 272979908,
      },
      {
        filename: "/SFX/Room/Intro/PA/5/crew2.ogg",
        start: 272979908,
        end: 273200501,
      },
      {
        filename: "/SFX/Room/Intro/PA/5/crew3.ogg",
        start: 273200501,
        end: 273385697,
      },
      {
        filename: "/SFX/Room/Intro/PA/5/crew4.ogg",
        start: 273385697,
        end: 273474767,
      },
      {
        filename: "/SFX/Room/Intro/PA/5/crew5.ogg",
        start: 273474767,
        end: 273584521,
      },
      {
        filename: "/SFX/Room/Intro/PA/5/crew6.ogg",
        start: 273584521,
        end: 273709725,
      },
      {
        filename: "/SFX/Room/Intro/PA/5/scientist0.ogg",
        start: 273709725,
        end: 273819628,
      },
      {
        filename: "/SFX/Room/Intro/PA/5/security0.ogg",
        start: 273819628,
        end: 273892690,
      },
      {
        filename: "/SFX/Room/Intro/PA/5/security1.ogg",
        start: 273892690,
        end: 273975266,
      },
      {
        filename: "/SFX/Room/Intro/PA/5/security2.ogg",
        start: 273975266,
        end: 274045331,
      },
      {
        filename: "/SFX/Room/Intro/PA/numbers/1.ogg",
        start: 274045331,
        end: 274068823,
      },
      {
        filename: "/SFX/Room/Intro/PA/numbers/2.ogg",
        start: 274068823,
        end: 274088458,
      },
      {
        filename: "/SFX/Room/Intro/PA/numbers/3.ogg",
        start: 274088458,
        end: 274109818,
      },
      {
        filename: "/SFX/Room/Intro/PA/numbers/4.ogg",
        start: 274109818,
        end: 274131744,
      },
      {
        filename: "/SFX/Room/Intro/PA/numbers/5.ogg",
        start: 274131744,
        end: 274153930,
      },
      {
        filename: "/SFX/Room/Intro/PA/numbers/6.ogg",
        start: 274153930,
        end: 274177789,
      },
      {
        filename: "/SFX/Room/Intro/PA/numbers/7.ogg",
        start: 274177789,
        end: 274197959,
      },
      {
        filename: "/SFX/Room/Intro/PA/numbers/8.ogg",
        start: 274197959,
        end: 274218546,
      },
      {
        filename: "/SFX/Room/Intro/PA/numbers/9.ogg",
        start: 274218546,
        end: 274239263,
      },
      {
        filename: "/SFX/Room/Intro/PA/off.ogg",
        start: 274239263,
        end: 274250205,
      },
      {
        filename: "/SFX/Room/Intro/PA/on.ogg",
        start: 274250205,
        end: 274296230,
      },
      {
        filename: "/SFX/Room/Intro/PA/scripted/announcement1.ogg",
        start: 274296230,
        end: 274508582,
      },
      {
        filename: "/SFX/Room/Intro/PA/scripted/announcement2.ogg",
        start: 274508582,
        end: 274733341,
      },
      {
        filename: "/SFX/Room/Intro/PA/scripted/announcement3.ogg",
        start: 274733341,
        end: 275026892,
      },
      {
        filename: "/SFX/Room/Intro/PA/scripted/announcement4.ogg",
        start: 275026892,
        end: 275270715,
      },
      {
        filename: "/SFX/Room/Intro/PA/scripted/announcement5.ogg",
        start: 275270715,
        end: 275492316,
      },
      {
        filename: "/SFX/Room/Intro/PA/scripted/announcement6.ogg",
        start: 275492316,
        end: 275690645,
      },
      {
        filename: "/SFX/Room/Intro/PA/scripted/announcement7.ogg",
        start: 275690645,
        end: 275944363,
      },
      {
        filename: "/SFX/Room/Intro/PA/scripted/scripted1.ogg",
        start: 275944363,
        end: 276671782,
      },
      {
        filename: "/SFX/Room/Intro/PA/scripted/scripted2.ogg",
        start: 276671782,
        end: 277145090,
      },
      {
        filename: "/SFX/Room/Intro/PA/scripted/scripted3.ogg",
        start: 277145090,
        end: 277723134,
      },
      {
        filename: "/SFX/Room/Intro/PA/scripted/scripted4.ogg",
        start: 277723134,
        end: 278464966,
      },
      {
        filename: "/SFX/Room/Intro/PA/scripted/scripted5.ogg",
        start: 278464966,
        end: 279010562,
      },
      {
        filename: "/SFX/Room/Intro/PA/scripted/scripted6.ogg",
        start: 279010562,
        end: 279151419,
      },
      {
        filename: "/SFX/Room/Intro/Scientist/Conversation.ogg",
        start: 279151419,
        end: 279494251,
      },
      {
        filename: "/SFX/Room/Intro/Scientist/Franklin/Approach173.ogg",
        start: 279494251,
        end: 279551762,
      },
      {
        filename: "/SFX/Room/Intro/Scientist/Franklin/EnterChamber.ogg",
        start: 279551762,
        end: 279628263,
      },
      {
        filename: "/SFX/Room/Intro/Scientist/Franklin/Problem.ogg",
        start: 279628263,
        end: 279916502,
      },
      {
        filename: "/SFX/Room/Intro/Scientist/Franklin/Refuse1.ogg",
        start: 279916502,
        end: 280014284,
      },
      {
        filename: "/SFX/Room/Intro/Scientist/Franklin/Refuse2.ogg",
        start: 280014284,
        end: 280089166,
      },
      {
        filename: "/SFX/Room/Intro/Scientist/Franklin/Refuse3.ogg",
        start: 280089166,
        end: 280186702,
      },
      {
        filename: "/SFX/Room/Intro/See173.ogg",
        start: 280186702,
        end: 280413601,
      },
      {
        filename: "/SFX/Room/Intro/WhatThe.ogg",
        start: 280413601,
        end: 280524708,
      },
      {
        filename: "/SFX/Room/LockroomSiren.ogg",
        start: 280524708,
        end: 280566259,
      },
      {
        filename: "/SFX/Room/PocketDimension/Enter.ogg",
        start: 280566259,
        end: 280683792,
      },
      {
        filename: "/SFX/Room/PocketDimension/Exit.ogg",
        start: 280683792,
        end: 280777330,
      },
      {
        filename: "/SFX/Room/PocketDimension/Explosion.ogg",
        start: 280777330,
        end: 280856216,
      },
      {
        filename: "/SFX/Room/PocketDimension/Impact.ogg",
        start: 280856216,
        end: 280872734,
      },
      {
        filename: "/SFX/Room/PocketDimension/Kneel.ogg",
        start: 280872734,
        end: 281043678,
      },
      {
        filename: "/SFX/Room/PocketDimension/PrisonVoices.ogg",
        start: 281043678,
        end: 281426155,
      },
      {
        filename: "/SFX/Room/PocketDimension/Rumble.ogg",
        start: 281426155,
        end: 281472990,
      },
      {
        filename: "/SFX/Room/PocketDimension/Screech.ogg",
        start: 281472990,
        end: 281600761,
      },
      {
        filename: "/SFX/Room/PocketDimension/TrenchPlane.ogg",
        start: 281600761,
        end: 281974286,
      },
      {
        filename: "/SFX/Room/Room2ElevatorDeath.ogg",
        start: 281974286,
        end: 282331786,
      },
      {
        filename: "/SFX/Room/Room2SL049Spawn.ogg",
        start: 282331786,
        end: 282514960,
      },
      { filename: "/SFX/Room/Sinkhole.ogg", start: 282514960, end: 282574423 },
      {
        filename: "/SFX/Room/SinkholeFall.ogg",
        start: 282574423,
        end: 282727965,
      },
      {
        filename: "/SFX/Room/Storeroom/Escape1.ogg",
        start: 282727965,
        end: 282770193,
      },
      {
        filename: "/SFX/Room/Storeroom/Escape2.ogg",
        start: 282770193,
        end: 282798736,
      },
      {
        filename: "/SFX/Room/Tesla/Idle.ogg",
        start: 282798736,
        end: 282831379,
      },
      {
        filename: "/SFX/Room/Tesla/PowerUp.ogg",
        start: 282831379,
        end: 282850230,
      },
      {
        filename: "/SFX/Room/Tesla/Shock.ogg",
        start: 282850230,
        end: 282878412,
      },
      {
        filename: "/SFX/Room/Tesla/WindUp.ogg",
        start: 282878412,
        end: 282903002,
      },
      {
        filename: "/SFX/Room/TunnelBurst.ogg",
        start: 282903002,
        end: 282944244,
      },
      {
        filename: "/SFX/SCP/008/KillScientist1.ogg",
        start: 282944244,
        end: 283048252,
      },
      {
        filename: "/SFX/SCP/008/KillScientist2.ogg",
        start: 283048252,
        end: 283137347,
      },
      {
        filename: "/SFX/SCP/008/Voices0.ogg",
        start: 283137347,
        end: 283149344,
      },
      {
        filename: "/SFX/SCP/008/Voices1.ogg",
        start: 283149344,
        end: 283273291,
      },
      {
        filename: "/SFX/SCP/008/Voices2.ogg",
        start: 283273291,
        end: 283340784,
      },
      {
        filename: "/SFX/SCP/008/Voices3.ogg",
        start: 283340784,
        end: 283352180,
      },
      {
        filename: "/SFX/SCP/008/Voices4.ogg",
        start: 283352180,
        end: 283456088,
      },
      {
        filename: "/SFX/SCP/008/Voices5.ogg",
        start: 283456088,
        end: 283547241,
      },
      {
        filename: "/SFX/SCP/008/Voices6.ogg",
        start: 283547241,
        end: 283756372,
      },
      {
        filename: "/SFX/SCP/012/Speech1.ogg",
        start: 283756372,
        end: 283896767,
      },
      {
        filename: "/SFX/SCP/012/Speech2.ogg",
        start: 283896767,
        end: 284135053,
      },
      {
        filename: "/SFX/SCP/012/Speech3.ogg",
        start: 284135053,
        end: 284364997,
      },
      {
        filename: "/SFX/SCP/012/Speech4.ogg",
        start: 284364997,
        end: 284514351,
      },
      {
        filename: "/SFX/SCP/012/Speech5.ogg",
        start: 284514351,
        end: 284699922,
      },
      {
        filename: "/SFX/SCP/012/Speech6.ogg",
        start: 284699922,
        end: 284855019,
      },
      {
        filename: "/SFX/SCP/012/Speech7.ogg",
        start: 284855019,
        end: 285011203,
      },
      {
        filename: "/SFX/SCP/035/Closet1.ogg",
        start: 285011203,
        end: 285244188,
      },
      {
        filename: "/SFX/SCP/035/Closet2.ogg",
        start: 285244188,
        end: 285303921,
      },
      { filename: "/SFX/SCP/035/Escape.ogg", start: 285303921, end: 285592394 },
      { filename: "/SFX/SCP/035/Gased1.ogg", start: 285592394, end: 285738729 },
      { filename: "/SFX/SCP/035/Gased2.ogg", start: 285738729, end: 285899026 },
      {
        filename: "/SFX/SCP/035/GasedCloset.ogg",
        start: 285899026,
        end: 286100271,
      },
      {
        filename: "/SFX/SCP/035/GasedEscape.ogg",
        start: 286100271,
        end: 286362911,
      },
      {
        filename: "/SFX/SCP/035/GasedKilled1.ogg",
        start: 286362911,
        end: 286532067,
      },
      {
        filename: "/SFX/SCP/035/GasedKilled2.ogg",
        start: 286532067,
        end: 286616568,
      },
      {
        filename: "/SFX/SCP/035/GasedStop1.ogg",
        start: 286616568,
        end: 286736341,
      },
      {
        filename: "/SFX/SCP/035/GasedStop2.ogg",
        start: 286736341,
        end: 286845938,
      },
      { filename: "/SFX/SCP/035/GetUp.ogg", start: 286845938, end: 287022770 },
      { filename: "/SFX/SCP/035/Help1.ogg", start: 287022770, end: 287093769 },
      { filename: "/SFX/SCP/035/Help2.ogg", start: 287093769, end: 287150452 },
      { filename: "/SFX/SCP/035/Idle1.ogg", start: 287150452, end: 287168746 },
      { filename: "/SFX/SCP/035/Idle2.ogg", start: 287168746, end: 287367133 },
      { filename: "/SFX/SCP/035/Idle3.ogg", start: 287367133, end: 287412424 },
      { filename: "/SFX/SCP/035/Idle4.ogg", start: 287412424, end: 287441124 },
      { filename: "/SFX/SCP/035/Idle5.ogg", start: 287441124, end: 287533672 },
      { filename: "/SFX/SCP/035/Idle6.ogg", start: 287533672, end: 287584114 },
      { filename: "/SFX/SCP/035/Idle7.ogg", start: 287584114, end: 287616418 },
      {
        filename: "/SFX/SCP/035/KilledEscape.ogg",
        start: 287616418,
        end: 287884009,
      },
      {
        filename: "/SFX/SCP/035/KilledGetUp.ogg",
        start: 287884009,
        end: 288074809,
      },
      {
        filename: "/SFX/SCP/035/RadioHelp1.ogg",
        start: 288074809,
        end: 288312153,
      },
      {
        filename: "/SFX/SCP/035/RadioHelp2.ogg",
        start: 288312153,
        end: 288409341,
      },
      {
        filename: "/SFX/SCP/049/0492Breath.ogg",
        start: 288409341,
        end: 288620020,
      },
      {
        filename: "/SFX/SCP/049/714Equipped.ogg",
        start: 288620020,
        end: 288659197,
      },
      {
        filename: "/SFX/SCP/049/DetectedInChamber.ogg",
        start: 288659197,
        end: 288719767,
      },
      {
        filename: "/SFX/SCP/049/Kidnap1.ogg",
        start: 288719767,
        end: 288752011,
      },
      {
        filename: "/SFX/SCP/049/Kidnap2.ogg",
        start: 288752011,
        end: 288802677,
      },
      {
        filename: "/SFX/SCP/049/Room2SL1.ogg",
        start: 288802677,
        end: 288890567,
      },
      {
        filename: "/SFX/SCP/049/Room2SL2.ogg",
        start: 288890567,
        end: 288957915,
      },
      {
        filename: "/SFX/SCP/049/Searching1.ogg",
        start: 288957915,
        end: 288982171,
      },
      {
        filename: "/SFX/SCP/049/Searching2.ogg",
        start: 288982171,
        end: 289020450,
      },
      {
        filename: "/SFX/SCP/049/Searching3.ogg",
        start: 289020450,
        end: 289043040,
      },
      {
        filename: "/SFX/SCP/049/Searching4.ogg",
        start: 289043040,
        end: 289102161,
      },
      {
        filename: "/SFX/SCP/049/Searching5.ogg",
        start: 289102161,
        end: 289138921,
      },
      {
        filename: "/SFX/SCP/049/Searching6.ogg",
        start: 289138921,
        end: 289168045,
      },
      {
        filename: "/SFX/SCP/049/Searching7.ogg",
        start: 289168045,
        end: 289322771,
      },
      {
        filename: "/SFX/SCP/049/Spotted1.ogg",
        start: 289322771,
        end: 289366533,
      },
      {
        filename: "/SFX/SCP/049/Spotted2.ogg",
        start: 289366533,
        end: 289389697,
      },
      {
        filename: "/SFX/SCP/049/Spotted3.ogg",
        start: 289389697,
        end: 289414806,
      },
      {
        filename: "/SFX/SCP/049/Spotted4.ogg",
        start: 289414806,
        end: 289453825,
      },
      {
        filename: "/SFX/SCP/049/Spotted5.ogg",
        start: 289453825,
        end: 289474291,
      },
      {
        filename: "/SFX/SCP/049/Spotted6.ogg",
        start: 289474291,
        end: 289488906,
      },
      {
        filename: "/SFX/SCP/049/Spotted7.ogg",
        start: 289488906,
        end: 289507176,
      },
      { filename: "/SFX/SCP/049/Step1.ogg", start: 289507176, end: 289517255 },
      { filename: "/SFX/SCP/049/Step2.ogg", start: 289517255, end: 289526928 },
      { filename: "/SFX/SCP/049/Step3.ogg", start: 289526928, end: 289534612 },
      {
        filename: "/SFX/SCP/049/TakeOffHazmat.ogg",
        start: 289534612,
        end: 289575490,
      },
      {
        filename: "/SFX/SCP/066/Beethoven.ogg",
        start: 289575490,
        end: 289853033,
      },
      { filename: "/SFX/SCP/066/Eric1.ogg", start: 289853033, end: 289865605 },
      { filename: "/SFX/SCP/066/Eric2.ogg", start: 289865605, end: 289877395 },
      { filename: "/SFX/SCP/066/Eric3.ogg", start: 289877395, end: 289887677 },
      { filename: "/SFX/SCP/066/Notes1.ogg", start: 289887677, end: 289917460 },
      { filename: "/SFX/SCP/066/Notes2.ogg", start: 289917460, end: 289951646 },
      { filename: "/SFX/SCP/066/Notes3.ogg", start: 289951646, end: 289972158 },
      { filename: "/SFX/SCP/066/Notes4.ogg", start: 289972158, end: 290019693 },
      { filename: "/SFX/SCP/066/Notes5.ogg", start: 290019693, end: 290043987 },
      { filename: "/SFX/SCP/066/Notes6.ogg", start: 290043987, end: 290062622 },
      {
        filename: "/SFX/SCP/066/Rolling.ogg",
        start: 290062622,
        end: 290120113,
      },
      {
        filename: "/SFX/SCP/079/Broadcast1.ogg",
        start: 290120113,
        end: 290133470,
      },
      {
        filename: "/SFX/SCP/079/Broadcast2.ogg",
        start: 290133470,
        end: 290169346,
      },
      {
        filename: "/SFX/SCP/079/Broadcast3.ogg",
        start: 290169346,
        end: 290178391,
      },
      {
        filename: "/SFX/SCP/079/Broadcast4.ogg",
        start: 290178391,
        end: 290237077,
      },
      {
        filename: "/SFX/SCP/079/Broadcast5.ogg",
        start: 290237077,
        end: 290363369,
      },
      {
        filename: "/SFX/SCP/079/Broadcast6.ogg",
        start: 290363369,
        end: 290526902,
      },
      {
        filename: "/SFX/SCP/079/Broadcast7.ogg",
        start: 290526902,
        end: 290589131,
      },
      { filename: "/SFX/SCP/079/GateB.ogg", start: 290589131, end: 290697893 },
      { filename: "/SFX/SCP/079/Refuse.ogg", start: 290697893, end: 290802994 },
      { filename: "/SFX/SCP/079/Speech.ogg", start: 290802994, end: 291495752 },
      {
        filename: "/SFX/SCP/079/TestroomWarning.ogg",
        start: 291495752,
        end: 291652110,
      },
      {
        filename: "/SFX/SCP/096/ElevatorSlam.ogg",
        start: 291652110,
        end: 292055715,
      },
      { filename: "/SFX/SCP/096/Scream.ogg", start: 292055715, end: 292212937 },
      {
        filename: "/SFX/SCP/096/Triggered.ogg",
        start: 292212937,
        end: 292370506,
      },
      {
        filename: "/SFX/SCP/1048A/Growth.ogg",
        start: 292370506,
        end: 293106590,
      },
      {
        filename: "/SFX/SCP/1048A/Shriek.ogg",
        start: 293106590,
        end: 293269653,
      },
      {
        filename: "/SFX/SCP/106/Breathing.ogg",
        start: 293269653,
        end: 293298509,
      },
      {
        filename: "/SFX/SCP/106/Corrosion1.ogg",
        start: 293298509,
        end: 293313618,
      },
      {
        filename: "/SFX/SCP/106/Corrosion2.ogg",
        start: 293313618,
        end: 293327645,
      },
      {
        filename: "/SFX/SCP/106/Corrosion3.ogg",
        start: 293327645,
        end: 293336688,
      },
      { filename: "/SFX/SCP/106/Decay0.ogg", start: 293336688, end: 293503897 },
      { filename: "/SFX/SCP/106/Decay1.ogg", start: 293503897, end: 293543567 },
      { filename: "/SFX/SCP/106/Decay2.ogg", start: 293543567, end: 293576281 },
      { filename: "/SFX/SCP/106/Decay3.ogg", start: 293576281, end: 293617417 },
      { filename: "/SFX/SCP/106/Laugh.ogg", start: 293617417, end: 293644698 },
      {
        filename: "/SFX/SCP/106/WallDecay1.ogg",
        start: 293644698,
        end: 293700675,
      },
      {
        filename: "/SFX/SCP/106/WallDecay2.ogg",
        start: 293700675,
        end: 293767903,
      },
      {
        filename: "/SFX/SCP/106/WallDecay3.ogg",
        start: 293767903,
        end: 293821647,
      },
      {
        filename: "/SFX/SCP/1123/Gunshot.ogg",
        start: 293821647,
        end: 293844439,
      },
      {
        filename: "/SFX/SCP/1123/Horror.ogg",
        start: 293844439,
        end: 293924578,
      },
      {
        filename: "/SFX/SCP/1123/Officer1.ogg",
        start: 293924578,
        end: 293958290,
      },
      {
        filename: "/SFX/SCP/1123/Officer2.ogg",
        start: 293958290,
        end: 293988275,
      },
      {
        filename: "/SFX/SCP/1123/Officer3.ogg",
        start: 293988275,
        end: 294247615,
      },
      { filename: "/SFX/SCP/1123/Touch.ogg", start: 294247615, end: 294287316 },
      {
        filename: "/SFX/SCP/1162/BodyHorrorExchange1.ogg",
        start: 294287316,
        end: 294419461,
      },
      {
        filename: "/SFX/SCP/1162/BodyHorrorExchange2.ogg",
        start: 294419461,
        end: 294536600,
      },
      {
        filename: "/SFX/SCP/1162/BodyHorrorExchange3.ogg",
        start: 294536600,
        end: 294650644,
      },
      {
        filename: "/SFX/SCP/1162/BodyHorrorExchange4.ogg",
        start: 294650644,
        end: 294774282,
      },
      {
        filename: "/SFX/SCP/1162/Exchange0.ogg",
        start: 294774282,
        end: 294802764,
      },
      {
        filename: "/SFX/SCP/1162/Exchange1.ogg",
        start: 294802764,
        end: 294833358,
      },
      {
        filename: "/SFX/SCP/1162/Exchange2.ogg",
        start: 294833358,
        end: 294857104,
      },
      {
        filename: "/SFX/SCP/1162/Exchange3.ogg",
        start: 294857104,
        end: 294885091,
      },
      {
        filename: "/SFX/SCP/1162/Exchange4.ogg",
        start: 294885091,
        end: 294912223,
      },
      {
        filename: "/SFX/SCP/1162/NostalgiaCancer1.ogg",
        start: 294912223,
        end: 295011542,
      },
      {
        filename: "/SFX/SCP/1162/NostalgiaCancer10.ogg",
        start: 295011542,
        end: 295194314,
      },
      {
        filename: "/SFX/SCP/1162/NostalgiaCancer2.ogg",
        start: 295194314,
        end: 295287595,
      },
      {
        filename: "/SFX/SCP/1162/NostalgiaCancer3.ogg",
        start: 295287595,
        end: 295403487,
      },
      {
        filename: "/SFX/SCP/1162/NostalgiaCancer4.ogg",
        start: 295403487,
        end: 295517861,
      },
      {
        filename: "/SFX/SCP/1162/NostalgiaCancer5.ogg",
        start: 295517861,
        end: 295702563,
      },
      {
        filename: "/SFX/SCP/1162/NostalgiaCancer6.ogg",
        start: 295702563,
        end: 295800914,
      },
      {
        filename: "/SFX/SCP/1162/NostalgiaCancer7.ogg",
        start: 295800914,
        end: 295892981,
      },
      {
        filename: "/SFX/SCP/1162/NostalgiaCancer8.ogg",
        start: 295892981,
        end: 296006770,
      },
      {
        filename: "/SFX/SCP/1162/NostalgiaCancer9.ogg",
        start: 296006770,
        end: 296120403,
      },
      { filename: "/SFX/SCP/1499/Enter.ogg", start: 296120403, end: 296764472 },
      { filename: "/SFX/SCP/1499/Exit.ogg", start: 296764472, end: 297211339 },
      { filename: "/SFX/SCP/1499/Idle1.ogg", start: 297211339, end: 297316802 },
      { filename: "/SFX/SCP/1499/Idle2.ogg", start: 297316802, end: 297452926 },
      { filename: "/SFX/SCP/1499/Idle3.ogg", start: 297452926, end: 297545072 },
      { filename: "/SFX/SCP/1499/Idle4.ogg", start: 297545072, end: 297646733 },
      {
        filename: "/SFX/SCP/1499/Triggered.ogg",
        start: 297646733,
        end: 297928064,
      },
      {
        filename: "/SFX/SCP/173/NeckSnap1.ogg",
        start: 297928064,
        end: 297939773,
      },
      {
        filename: "/SFX/SCP/173/NeckSnap2.ogg",
        start: 297939773,
        end: 297950892,
      },
      {
        filename: "/SFX/SCP/173/NeckSnap3.ogg",
        start: 297950892,
        end: 297971078,
      },
      {
        filename: "/SFX/SCP/173/Rattle1.ogg",
        start: 297971078,
        end: 297982880,
      },
      {
        filename: "/SFX/SCP/173/Rattle2.ogg",
        start: 297982880,
        end: 297992958,
      },
      {
        filename: "/SFX/SCP/173/Rattle3.ogg",
        start: 297992958,
        end: 298004203,
      },
      {
        filename: "/SFX/SCP/173/StoneDrag.ogg",
        start: 298004203,
        end: 298070319,
      },
      { filename: "/SFX/SCP/205/Enter.ogg", start: 298070319, end: 298428582 },
      { filename: "/SFX/SCP/205/Horror.ogg", start: 298428582, end: 298622361 },
      { filename: "/SFX/SCP/294/Vomit.ogg", start: 298622361, end: 298746746 },
      { filename: "/SFX/SCP/294/ahh.ogg", start: 298746746, end: 298786341 },
      { filename: "/SFX/SCP/294/burn.ogg", start: 298786341, end: 298824685 },
      {
        filename: "/SFX/SCP/294/coin_drop.ogg",
        start: 298824685,
        end: 298845552,
      },
      { filename: "/SFX/SCP/294/cough.ogg", start: 298845552, end: 298899750 },
      {
        filename: "/SFX/SCP/294/dispense0.ogg",
        start: 298899750,
        end: 298955291,
      },
      {
        filename: "/SFX/SCP/294/dispense1.ogg",
        start: 298955291,
        end: 299018990,
      },
      {
        filename: "/SFX/SCP/294/dispense2.ogg",
        start: 299018990,
        end: 299147638,
      },
      {
        filename: "/SFX/SCP/294/dispense3.ogg",
        start: 299147638,
        end: 299285337,
      },
      { filename: "/SFX/SCP/294/ew1.ogg", start: 299285337, end: 299316387 },
      { filename: "/SFX/SCP/294/ew2.ogg", start: 299316387, end: 299353163 },
      {
        filename: "/SFX/SCP/294/outofrange.ogg",
        start: 299353163,
        end: 299419126,
      },
      { filename: "/SFX/SCP/294/retch1.ogg", start: 299419126, end: 299427848 },
      { filename: "/SFX/SCP/294/retch2.ogg", start: 299427848, end: 299436488 },
      { filename: "/SFX/SCP/294/slurp.ogg", start: 299436488, end: 299453098 },
      { filename: "/SFX/SCP/294/spit.ogg", start: 299453098, end: 299489756 },
      {
        filename: "/SFX/SCP/372/Rustle0.ogg",
        start: 299489756,
        end: 299567027,
      },
      {
        filename: "/SFX/SCP/372/Rustle1.ogg",
        start: 299567027,
        end: 299663194,
      },
      {
        filename: "/SFX/SCP/372/Rustle2.ogg",
        start: 299663194,
        end: 299728876,
      },
      { filename: "/SFX/SCP/427/Effect.ogg", start: 299728876, end: 299898884 },
      {
        filename: "/SFX/SCP/427/Transform.ogg",
        start: 299898884,
        end: 300013320,
      },
      {
        filename: "/SFX/SCP/513/914Refine.ogg",
        start: 300013320,
        end: 300163291,
      },
      { filename: "/SFX/SCP/513/Bell1.ogg", start: 300163291, end: 300231353 },
      { filename: "/SFX/SCP/513/Bell2.ogg", start: 300231353, end: 300304290 },
      { filename: "/SFX/SCP/513/Bell3.ogg", start: 300304290, end: 300382747 },
      { filename: "/SFX/SCP/682/Roar.ogg", start: 300382747, end: 300484083 },
      {
        filename: "/SFX/SCP/860/Cancer0.ogg",
        start: 300484083,
        end: 300530886,
      },
      {
        filename: "/SFX/SCP/860/Cancer1.ogg",
        start: 300530886,
        end: 300579167,
      },
      {
        filename: "/SFX/SCP/860/Cancer2.ogg",
        start: 300579167,
        end: 300627680,
      },
      {
        filename: "/SFX/SCP/860/Cancer3.ogg",
        start: 300627680,
        end: 300677365,
      },
      {
        filename: "/SFX/SCP/860/Cancer4.ogg",
        start: 300677365,
        end: 300728016,
      },
      {
        filename: "/SFX/SCP/860/Cancer5.ogg",
        start: 300728016,
        end: 300764654,
      },
      { filename: "/SFX/SCP/860/Chase1.ogg", start: 300764654, end: 300829842 },
      { filename: "/SFX/SCP/860/Chase2.ogg", start: 300829842, end: 300909178 },
      {
        filename: "/SFX/SCP/914/DoorClose.ogg",
        start: 300909178,
        end: 300970884,
      },
      {
        filename: "/SFX/SCP/914/DoorOpen.ogg",
        start: 300970884,
        end: 301041970,
      },
      {
        filename: "/SFX/SCP/914/PlayerDeath.ogg",
        start: 301041970,
        end: 301143356,
      },
      {
        filename: "/SFX/SCP/914/PlayerUse.ogg",
        start: 301143356,
        end: 301150363,
      },
      {
        filename: "/SFX/SCP/914/Refining.ogg",
        start: 301150363,
        end: 301504345,
      },
      {
        filename: "/SFX/SCP/939/0Alert1.ogg",
        start: 301504345,
        end: 301536647,
      },
      {
        filename: "/SFX/SCP/939/0Alert2.ogg",
        start: 301536647,
        end: 301569762,
      },
      {
        filename: "/SFX/SCP/939/0Alert3.ogg",
        start: 301569762,
        end: 301602372,
      },
      {
        filename: "/SFX/SCP/939/0Attack1.ogg",
        start: 301602372,
        end: 301634643,
      },
      {
        filename: "/SFX/SCP/939/0Attack2.ogg",
        start: 301634643,
        end: 301683085,
      },
      {
        filename: "/SFX/SCP/939/0Attack3.ogg",
        start: 301683085,
        end: 301755465,
      },
      { filename: "/SFX/SCP/939/0Lure1.ogg", start: 301755465, end: 301781803 },
      {
        filename: "/SFX/SCP/939/0Lure10.ogg",
        start: 301781803,
        end: 301819755,
      },
      { filename: "/SFX/SCP/939/0Lure2.ogg", start: 301819755, end: 301850751 },
      { filename: "/SFX/SCP/939/0Lure3.ogg", start: 301850751, end: 301894552 },
      { filename: "/SFX/SCP/939/0Lure4.ogg", start: 301894552, end: 301933401 },
      { filename: "/SFX/SCP/939/0Lure5.ogg", start: 301933401, end: 301972331 },
      { filename: "/SFX/SCP/939/0Lure6.ogg", start: 301972331, end: 302000092 },
      { filename: "/SFX/SCP/939/0Lure7.ogg", start: 302000092, end: 302028469 },
      { filename: "/SFX/SCP/939/0Lure8.ogg", start: 302028469, end: 302065677 },
      { filename: "/SFX/SCP/939/0Lure9.ogg", start: 302065677, end: 302109037 },
      {
        filename: "/SFX/SCP/939/1Alert1.ogg",
        start: 302109037,
        end: 302135755,
      },
      {
        filename: "/SFX/SCP/939/1Alert2.ogg",
        start: 302135755,
        end: 302163810,
      },
      {
        filename: "/SFX/SCP/939/1Alert3.ogg",
        start: 302163810,
        end: 302195633,
      },
      {
        filename: "/SFX/SCP/939/1Attack1.ogg",
        start: 302195633,
        end: 302240228,
      },
      {
        filename: "/SFX/SCP/939/1Attack2.ogg",
        start: 302240228,
        end: 302279072,
      },
      {
        filename: "/SFX/SCP/939/1Attack3.ogg",
        start: 302279072,
        end: 302347270,
      },
      { filename: "/SFX/SCP/939/1Lure1.ogg", start: 302347270, end: 302368734 },
      {
        filename: "/SFX/SCP/939/1Lure10.ogg",
        start: 302368734,
        end: 302395924,
      },
      { filename: "/SFX/SCP/939/1Lure2.ogg", start: 302395924, end: 302437839 },
      { filename: "/SFX/SCP/939/1Lure3.ogg", start: 302437839, end: 302468588 },
      { filename: "/SFX/SCP/939/1Lure4.ogg", start: 302468588, end: 302495261 },
      { filename: "/SFX/SCP/939/1Lure5.ogg", start: 302495261, end: 302519490 },
      { filename: "/SFX/SCP/939/1Lure6.ogg", start: 302519490, end: 302542039 },
      { filename: "/SFX/SCP/939/1Lure7.ogg", start: 302542039, end: 302561428 },
      { filename: "/SFX/SCP/939/1Lure8.ogg", start: 302561428, end: 302582569 },
      { filename: "/SFX/SCP/939/1Lure9.ogg", start: 302582569, end: 302607678 },
      {
        filename: "/SFX/SCP/939/2Alert1.ogg",
        start: 302607678,
        end: 302650107,
      },
      {
        filename: "/SFX/SCP/939/2Alert2.ogg",
        start: 302650107,
        end: 302681679,
      },
      {
        filename: "/SFX/SCP/939/2Alert3.ogg",
        start: 302681679,
        end: 302713447,
      },
      {
        filename: "/SFX/SCP/939/2Attack1.ogg",
        start: 302713447,
        end: 302765799,
      },
      {
        filename: "/SFX/SCP/939/2Attack2.ogg",
        start: 302765799,
        end: 302801202,
      },
      {
        filename: "/SFX/SCP/939/2Attack3.ogg",
        start: 302801202,
        end: 302836605,
      },
      { filename: "/SFX/SCP/939/2Lure1.ogg", start: 302836605, end: 302857103 },
      {
        filename: "/SFX/SCP/939/2Lure10.ogg",
        start: 302857103,
        end: 302888242,
      },
      {
        filename: "/SFX/SCP/939/2Lure11.ogg",
        start: 302888242,
        end: 302907580,
      },
      { filename: "/SFX/SCP/939/2Lure2.ogg", start: 302907580, end: 302946701 },
      { filename: "/SFX/SCP/939/2Lure3.ogg", start: 302946701, end: 302976989 },
      { filename: "/SFX/SCP/939/2Lure4.ogg", start: 302976989, end: 303053170 },
      { filename: "/SFX/SCP/939/2Lure5.ogg", start: 303053170, end: 303079804 },
      { filename: "/SFX/SCP/939/2Lure6.ogg", start: 303079804, end: 303097594 },
      { filename: "/SFX/SCP/939/2Lure7.ogg", start: 303097594, end: 303116148 },
      { filename: "/SFX/SCP/939/2Lure8.ogg", start: 303116148, end: 303133243 },
      { filename: "/SFX/SCP/939/2Lure9.ogg", start: 303133243, end: 303154766 },
      { filename: "/SFX/SCP/939/attack.ogg", start: 303154766, end: 303289389 },
      { filename: "/SFX/SCP/966/Echo1.ogg", start: 303289389, end: 303423279 },
      { filename: "/SFX/SCP/966/Echo2.ogg", start: 303423279, end: 303595130 },
      { filename: "/SFX/SCP/966/Echo3.ogg", start: 303595130, end: 303754876 },
      { filename: "/SFX/SCP/966/Idle1.ogg", start: 303754876, end: 303810537 },
      { filename: "/SFX/SCP/966/Idle2.ogg", start: 303810537, end: 303948491 },
      { filename: "/SFX/SCP/966/Idle3.ogg", start: 303948491, end: 304103216 },
      { filename: "/SFX/SCP/970/Corpse.ogg", start: 304103216, end: 304203264 },
      { filename: "/SFX/SCP/970/fcveny.ogg", start: 304203264, end: 304737461 },
      { filename: "/SFX/SCP/990/cwm1.ogg", start: 304737461, end: 304891836 },
      { filename: "/SFX/SCP/990/cwm2.ogg", start: 304891836, end: 305008151 },
      { filename: "/SFX/SCP/Joke/789J.ogg", start: 305008151, end: 305077562 },
      {
        filename: "/SFX/SCP/Joke/Saxophone.ogg",
        start: 305077562,
        end: 305102549,
      },
      { filename: "/SFX/Step/Run1.ogg", start: 305102549, end: 305125405 },
      { filename: "/SFX/Step/Run2.ogg", start: 305125405, end: 305149473 },
      { filename: "/SFX/Step/Run3.ogg", start: 305149473, end: 305173124 },
      { filename: "/SFX/Step/Run4.ogg", start: 305173124, end: 305197657 },
      { filename: "/SFX/Step/Run5.ogg", start: 305197657, end: 305222818 },
      { filename: "/SFX/Step/Run6.ogg", start: 305222818, end: 305247163 },
      { filename: "/SFX/Step/Run7.ogg", start: 305247163, end: 305272923 },
      { filename: "/SFX/Step/Run8.ogg", start: 305272923, end: 305296672 },
      { filename: "/SFX/Step/RunMetal1.ogg", start: 305296672, end: 305319576 },
      { filename: "/SFX/Step/RunMetal2.ogg", start: 305319576, end: 305344365 },
      { filename: "/SFX/Step/RunMetal3.ogg", start: 305344365, end: 305368988 },
      { filename: "/SFX/Step/RunMetal4.ogg", start: 305368988, end: 305391863 },
      { filename: "/SFX/Step/RunMetal5.ogg", start: 305391863, end: 305419134 },
      { filename: "/SFX/Step/RunMetal6.ogg", start: 305419134, end: 305443603 },
      { filename: "/SFX/Step/RunMetal7.ogg", start: 305443603, end: 305469461 },
      { filename: "/SFX/Step/RunMetal8.ogg", start: 305469461, end: 305492492 },
      {
        filename: "/SFX/Step/SCP/StepSCP1.ogg",
        start: 305492492,
        end: 305504837,
      },
      {
        filename: "/SFX/Step/SCP/StepSCP2.ogg",
        start: 305504837,
        end: 305515562,
      },
      {
        filename: "/SFX/Step/SCP/StepSCP3.ogg",
        start: 305515562,
        end: 305525458,
      },
      {
        filename: "/SFX/Step/SCP/StepSCP4.ogg",
        start: 305525458,
        end: 305537595,
      },
      { filename: "/SFX/Step/Step1.ogg", start: 305537595, end: 305564168 },
      { filename: "/SFX/Step/Step2.ogg", start: 305564168, end: 305588893 },
      { filename: "/SFX/Step/Step3.ogg", start: 305588893, end: 305615713 },
      { filename: "/SFX/Step/Step4.ogg", start: 305615713, end: 305639666 },
      { filename: "/SFX/Step/Step5.ogg", start: 305639666, end: 305667597 },
      { filename: "/SFX/Step/Step6.ogg", start: 305667597, end: 305693388 },
      { filename: "/SFX/Step/Step7.ogg", start: 305693388, end: 305716930 },
      { filename: "/SFX/Step/Step8.ogg", start: 305716930, end: 305741038 },
      {
        filename: "/SFX/Step/StepForest1.ogg",
        start: 305741038,
        end: 305753522,
      },
      {
        filename: "/SFX/Step/StepForest2.ogg",
        start: 305753522,
        end: 305764675,
      },
      {
        filename: "/SFX/Step/StepForest3.ogg",
        start: 305764675,
        end: 305777438,
      },
      {
        filename: "/SFX/Step/StepMetal1.ogg",
        start: 305777438,
        end: 305802287,
      },
      {
        filename: "/SFX/Step/StepMetal2.ogg",
        start: 305802287,
        end: 305827970,
      },
      {
        filename: "/SFX/Step/StepMetal3.ogg",
        start: 305827970,
        end: 305848944,
      },
      {
        filename: "/SFX/Step/StepMetal4.ogg",
        start: 305848944,
        end: 305875994,
      },
      {
        filename: "/SFX/Step/StepMetal5.ogg",
        start: 305875994,
        end: 305904044,
      },
      {
        filename: "/SFX/Step/StepMetal6.ogg",
        start: 305904044,
        end: 305925877,
      },
      {
        filename: "/SFX/Step/StepMetal7.ogg",
        start: 305925877,
        end: 305950579,
      },
      {
        filename: "/SFX/Step/StepMetal8.ogg",
        start: 305950579,
        end: 305972728,
      },
      { filename: "/SFX/Step/StepPD1.ogg", start: 305972728, end: 306018972 },
      { filename: "/SFX/Step/StepPD2.ogg", start: 306018972, end: 306063042 },
      { filename: "/SFX/Step/StepPD3.ogg", start: 306063042, end: 306107440 },
      { filename: "/defaults.ini", start: 306107440, end: 306108668 },
    ],
    remote_package_size: 306108668,
  });
})();
var programArgs = [];
var thisProgram = "./this.program";
var quit_ = (status, toThrow) => {
  throw toThrow;
};
var _scriptName = globalThis.document?.currentScript?.src;
if (typeof __filename != "undefined") {
  _scriptName = __filename;
} else if (ENVIRONMENT_IS_WORKER) {
  _scriptName = self.location.href;
}
var scriptDirectory = "";
function locateFile(path) {
  if (Module["locateFile"]) {
    return Module["locateFile"](path, scriptDirectory);
  }
  return scriptDirectory + path;
}
var readAsync, readBinary;
if (ENVIRONMENT_IS_NODE) {
  var fs = require("node:fs");
  scriptDirectory = __dirname + "/";
  readBinary = (filename) => {
    filename = isFileURI(filename) ? new URL(filename) : filename;
    var ret = fs.readFileSync(filename);
    return ret;
  };
  readAsync = async (filename, binary = true) => {
    filename = isFileURI(filename) ? new URL(filename) : filename;
    var ret = fs.readFileSync(filename, binary ? undefined : "utf8");
    return ret;
  };
  if (process.argv.length > 1) {
    thisProgram = process.argv[1].replace(/\\/g, "/");
  }
  programArgs = process.argv.slice(2);
  if (typeof module != "undefined") {
    module["exports"] = Module;
  }
  quit_ = (status, toThrow) => {
    process.exitCode = status;
    throw toThrow;
  };
} else if (ENVIRONMENT_IS_WEB || ENVIRONMENT_IS_WORKER) {
  try {
    scriptDirectory = new URL(".", _scriptName).href;
  } catch {}
  {
    if (ENVIRONMENT_IS_WORKER) {
      readBinary = (url) => {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", url, false);
        xhr.responseType = "arraybuffer";
        xhr.send(null);
        return new Uint8Array(xhr.response);
      };
    }
    readAsync = async (url) => {
      if (isFileURI(url)) {
        return new Promise((resolve, reject) => {
          var xhr = new XMLHttpRequest();
          xhr.open("GET", url, true);
          xhr.responseType = "arraybuffer";
          xhr.onload = () => {
            if (xhr.status == 200 || (xhr.status == 0 && xhr.response)) {
              resolve(xhr.response);
              return;
            }
            reject(xhr.status);
          };
          xhr.onerror = reject;
          xhr.send(null);
        });
      }
      var response = await fetch(url, { credentials: "same-origin" });
      if (response.ok) {
        return response.arrayBuffer();
      }
      throw new Error(response.status + " : " + response.url);
    };
  }
} else {
}
var out = console.log.bind(console);
var err = console.error.bind(console);
var wasmBinary;
var ABORT = false;
var EXITSTATUS;
function assert(condition, text) {
  if (!condition) {
    abort(text);
  }
}
var isFileURI = (filename) => filename.startsWith("file://");
class EmscriptenEH {}
class EmscriptenSjLj extends EmscriptenEH {}
class CppException extends EmscriptenEH {
  constructor(excPtr) {
    super();
    this.excPtr = excPtr;
  }
}
var runtimeInitialized = false;
function getMemoryBuffer() {
  return wasmMemory.buffer;
}
function updateMemoryViews() {
  if (HEAP8?.buffer?.resizable) return;
  var b = getMemoryBuffer();
  HEAP8 = new Int8Array(b);
  HEAP16 = new Int16Array(b);
  HEAPU8 = new Uint8Array(b);
  HEAPU16 = new Uint16Array(b);
  HEAP32 = new Int32Array(b);
  HEAPU32 = new Uint32Array(b);
  HEAPF32 = new Float32Array(b);
  HEAPF64 = new Float64Array(b);
  HEAP64 = new BigInt64Array(b);
  HEAPU64 = new BigUint64Array(b);
}
function preRun() {
  var preRun = Module["preRun"];
  if (preRun) {
    if (typeof preRun == "function") preRun = [preRun];
    onPreRuns.push(...preRun);
  }
  callRuntimeCallbacks(onPreRuns);
}
function initRuntime() {
  runtimeInitialized = true;
  if (!Module["noFSInit"] && !FS.initialized) FS.init();
  TTY.init();
  wasmExports["Tf"]();
  FS.ignorePermissions = false;
}
function postRun() {
  var postRun = Module["postRun"];
  if (postRun) {
    if (typeof postRun == "function") postRun = [postRun];
    onPostRuns.push(...postRun);
  }
  callRuntimeCallbacks(onPostRuns);
}
function abort(what) {
  Module["onAbort"]?.(what);
  what = `Aborted(${what})`;
  err(what);
  ABORT = true;
  what += ". Build with -sASSERTIONS for more info.";
  var e = new WebAssembly.RuntimeError(what);
  throw e;
}
var wasmBinaryFile;
function findWasmBinary() {
  return locateFile("scpcb.wasm");
}
function getBinarySync(file) {
  if (readBinary) {
    return readBinary(file);
  }
  throw "both async and sync fetching of the wasm failed";
}
async function getWasmBinary(binaryFile) {
  if (!wasmBinary) {
    try {
      var response = await readAsync(binaryFile);
      return new Uint8Array(response);
    } catch {}
  }
  return getBinarySync(binaryFile);
}
async function instantiateArrayBuffer(binaryFile, imports) {
  try {
    var binary = await getWasmBinary(binaryFile);
    var instance = await WebAssembly.instantiate(binary, imports);
    return instance;
  } catch (reason) {
    err(`failed to asynchronously prepare wasm: ${reason}`);
    abort(reason);
  }
}
async function instantiateAsync(binary, binaryFile, imports) {
  if (!binary && !isFileURI(binaryFile) && !ENVIRONMENT_IS_NODE) {
    try {
      var response = fetch(binaryFile, { credentials: "same-origin" });
      var instantiationResult = await WebAssembly.instantiateStreaming(
        response,
        imports,
      );
      return instantiationResult;
    } catch (reason) {
      err(`wasm streaming compile failed: ${reason}`);
      err("falling back to ArrayBuffer instantiation");
    }
  }
  return instantiateArrayBuffer(binaryFile, imports);
}
function getWasmImports() {
  var imports = { a: wasmImports };
  return imports;
}
async function createWasm() {
  function receiveInstance(instance) {
    wasmExports = instance.exports;
    wasmExports = Asyncify.instrumentWasmExports(wasmExports);
    assignWasmExports(wasmExports);
    updateMemoryViews();
    return wasmExports;
  }
  function receiveInstantiationResult(result) {
    return receiveInstance(result["instance"]);
  }
  var info = getWasmImports();
  var instantiateWasm = Module["instantiateWasm"];
  if (instantiateWasm) {
    return new Promise((resolve) => {
      instantiateWasm(info, (inst) => resolve(receiveInstance(inst)));
    });
  }
  wasmBinaryFile ??= findWasmBinary();
  var result = await instantiateAsync(wasmBinary, wasmBinaryFile, info);
  var exports = receiveInstantiationResult(result);
  return exports;
}
class ExitStatus {
  name = "ExitStatus";
  constructor(status) {
    this.message = `Program terminated with exit(${status})`;
    this.status = status;
  }
}
var HEAP16;
var HEAP32;
var HEAP64;
var HEAP8;
var HEAPF32;
var HEAPF64;
var HEAPU16;
var HEAPU32;
var HEAPU64;
var HEAPU8;
var callRuntimeCallbacks = (callbacks) => {
  while (callbacks.length > 0) {
    callbacks.shift()(Module);
  }
};
var onPostRuns = [];
var onPreRuns = [];
var dynCalls = {};
var dynCallLegacy = (sig, ptr, args) => {
  sig = sig.replace(/p/g, "i");
  var f = dynCalls[sig];
  return f(ptr, ...args);
};
var dynCall = (sig, ptr, args = [], promising = false) => {
  var rtn = dynCallLegacy(sig, ptr, args);
  function convert(rtn) {
    return rtn;
  }
  return convert(rtn);
};
var noExitRuntime = true;
function setValue(ptr, value, type = "i8") {
  if (type.endsWith("*")) type = "*";
  switch (type) {
    case "i1":
      HEAP8[ptr] = value;
      break;
    case "i8":
      HEAP8[ptr] = value;
      break;
    case "i16":
      HEAP16[ptr >> 1] = value;
      break;
    case "i32":
      HEAP32[ptr >> 2] = value;
      break;
    case "i64":
      HEAP64[ptr >> 3] = BigInt(value);
      break;
    case "float":
      HEAPF32[ptr >> 2] = value;
      break;
    case "double":
      HEAPF64[ptr >> 3] = value;
      break;
    case "*":
      HEAPU32[ptr >> 2] = value;
      break;
    default:
      abort(`invalid type for setValue: ${type}`);
  }
}
var stackRestore = (val) => __emscripten_stack_restore(val);
var stackSave = () => _emscripten_stack_get_current();
var UTF8Decoder = globalThis.TextDecoder && new TextDecoder();
var findStringEnd = (heapOrArray, idx, maxBytesToRead, ignoreNul) => {
  var maxIdx = idx + maxBytesToRead;
  if (ignoreNul) return maxIdx;
  while (heapOrArray[idx] && !(idx >= maxIdx)) ++idx;
  return idx;
};
var UTF8ArrayToString = (heapOrArray, idx = 0, maxBytesToRead, ignoreNul) => {
  var endPtr = findStringEnd(heapOrArray, idx, maxBytesToRead, ignoreNul);
  if (endPtr - idx > 16 && heapOrArray.buffer && UTF8Decoder) {
    return UTF8Decoder.decode(heapOrArray.subarray(idx, endPtr));
  }
  var str = "";
  while (idx < endPtr) {
    var u0 = heapOrArray[idx++];
    if (!(u0 & 128)) {
      str += String.fromCharCode(u0);
      continue;
    }
    var u1 = heapOrArray[idx++] & 63;
    if ((u0 & 224) == 192) {
      str += String.fromCharCode(((u0 & 31) << 6) | u1);
      continue;
    }
    var u2 = heapOrArray[idx++] & 63;
    if ((u0 & 240) == 224) {
      u0 = ((u0 & 15) << 12) | (u1 << 6) | u2;
    } else {
      u0 =
        ((u0 & 7) << 18) | (u1 << 12) | (u2 << 6) | (heapOrArray[idx++] & 63);
    }
    if (u0 < 65536) {
      str += String.fromCharCode(u0);
    } else {
      var ch = u0 - 65536;
      str += String.fromCharCode(55296 | (ch >> 10), 56320 | (ch & 1023));
    }
  }
  return str;
};
var UTF8ToString = (ptr, maxBytesToRead, ignoreNul) =>
  ptr ? UTF8ArrayToString(HEAPU8, ptr, maxBytesToRead, ignoreNul) : "";
var ___assert_fail = (condition, filename, line, func) =>
  abort(
    `Assertion failed: ${UTF8ToString(condition)}, at: ` +
      [
        filename ? UTF8ToString(filename) : "unknown filename",
        line,
        func ? UTF8ToString(func) : "unknown function",
      ],
  );
var exceptionCaught = [];
var uncaughtExceptionCount = 0;
var ___cxa_begin_catch = (ptr) => {
  var info = new ExceptionInfo(ptr);
  if (!info.get_caught()) {
    info.set_caught(true);
    uncaughtExceptionCount--;
  }
  info.set_rethrown(false);
  exceptionCaught.push(info);
  return ___cxa_get_exception_ptr(ptr);
};
var exceptionLast = null;
var ___cxa_end_catch = () => {
  _setThrew(0, 0);
  var info = exceptionCaught.pop();
  ___cxa_decrement_exception_refcount(info.excPtr);
  exceptionLast = null;
};
class ExceptionInfo {
  constructor(excPtr) {
    this.excPtr = excPtr;
    this.ptr = excPtr - 24;
  }
  set_type(type) {
    HEAPU32[(this.ptr + 4) >> 2] = type;
  }
  get_type() {
    return HEAPU32[(this.ptr + 4) >> 2];
  }
  set_destructor(destructor) {
    HEAPU32[(this.ptr + 8) >> 2] = destructor;
  }
  get_destructor() {
    return HEAPU32[(this.ptr + 8) >> 2];
  }
  set_caught(caught) {
    caught = caught ? 1 : 0;
    HEAP8[this.ptr + 12] = caught;
  }
  get_caught() {
    return HEAP8[this.ptr + 12] != 0;
  }
  set_rethrown(rethrown) {
    rethrown = rethrown ? 1 : 0;
    HEAP8[this.ptr + 13] = rethrown;
  }
  get_rethrown() {
    return HEAP8[this.ptr + 13] != 0;
  }
  init(type, destructor) {
    this.set_adjusted_ptr(0);
    this.set_type(type);
    this.set_destructor(destructor);
  }
  set_adjusted_ptr(adjustedPtr) {
    HEAPU32[(this.ptr + 16) >> 2] = adjustedPtr;
  }
  get_adjusted_ptr() {
    return HEAPU32[(this.ptr + 16) >> 2];
  }
}
var setTempRet0 = (val) => __emscripten_tempret_set(val);
var findMatchingCatch = (args) => {
  var thrown = exceptionLast?.excPtr;
  if (!thrown) {
    setTempRet0(0);
    return 0;
  }
  var info = new ExceptionInfo(thrown);
  info.set_adjusted_ptr(thrown);
  var thrownType = info.get_type();
  if (!thrownType) {
    setTempRet0(0);
    return thrown;
  }
  for (var caughtType of args) {
    if (caughtType === 0 || caughtType === thrownType) {
      break;
    }
    var adjusted_ptr_addr = info.ptr + 16;
    if (___cxa_can_catch(caughtType, thrownType, adjusted_ptr_addr)) {
      setTempRet0(caughtType);
      return thrown;
    }
  }
  setTempRet0(thrownType);
  return thrown;
};
var ___cxa_find_matching_catch_2 = () => findMatchingCatch([]);
var ___cxa_find_matching_catch_3 = (arg0) => findMatchingCatch([arg0]);
var ___cxa_find_matching_catch_5 = (arg0, arg1, arg2) =>
  findMatchingCatch([arg0, arg1, arg2]);
var ___cxa_rethrow = () => {
  if (!exceptionCaught.length) {
    abort("no exception to throw");
  }
  var info = exceptionCaught.at(-1);
  var ptr = info.excPtr;
  info.set_rethrown(true);
  info.set_caught(false);
  uncaughtExceptionCount++;
  ___cxa_increment_exception_refcount(ptr);
  exceptionLast = new CppException(ptr);
  throw exceptionLast;
};
var ___cxa_throw = (ptr, type, destructor) => {
  var info = new ExceptionInfo(ptr);
  info.init(type, destructor);
  ___cxa_increment_exception_refcount(ptr);
  exceptionLast = new CppException(ptr);
  uncaughtExceptionCount++;
  throw exceptionLast;
};
var ___cxa_uncaught_exceptions = () => uncaughtExceptionCount;
var ___resumeException = (ptr) => {
  if (!exceptionLast) {
    exceptionLast = new CppException(ptr);
  }
  throw exceptionLast;
};
var PATH = {
  isAbs: (path) => path.charAt(0) === "/",
  splitPath: (filename) => {
    var splitPathRe =
      /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
    return splitPathRe.exec(filename).slice(1);
  },
  normalizeArray: (parts, allowAboveRoot) => {
    var up = 0;
    for (var i = parts.length - 1; i >= 0; i--) {
      var last = parts[i];
      if (last === ".") {
        parts.splice(i, 1);
      } else if (last === "..") {
        parts.splice(i, 1);
        up++;
      } else if (up) {
        parts.splice(i, 1);
        up--;
      }
    }
    if (allowAboveRoot) {
      for (; up; up--) {
        parts.unshift("..");
      }
    }
    return parts;
  },
  normalize: (path) => {
    var isAbsolute = PATH.isAbs(path),
      trailingSlash = path.slice(-1) === "/";
    path = PATH.normalizeArray(
      path.split("/").filter((p) => !!p),
      !isAbsolute,
    ).join("/");
    if (!path && !isAbsolute) {
      path = ".";
    }
    if (path && trailingSlash) {
      path += "/";
    }
    return (isAbsolute ? "/" : "") + path;
  },
  dirname: (path) => {
    var result = PATH.splitPath(path),
      root = result[0],
      dir = result[1];
    if (!root && !dir) {
      return ".";
    }
    if (dir) {
      dir = dir.slice(0, -1);
    }
    return root + dir;
  },
  basename: (path) => path && path.match(/([^\/]+|\/)\/*$/)[1],
  join: (...paths) => PATH.normalize(paths.join("/")),
  join2: (l, r) => PATH.normalize(l + "/" + r),
};
var initRandomFill = () => {
  if (ENVIRONMENT_IS_NODE) {
    var nodeCrypto = require("node:crypto");
    return (view) => (nodeCrypto.randomFillSync(view), 0);
  }
  return (view) => (crypto.getRandomValues(view), 0);
};
var randomFill = (view) => (randomFill = initRandomFill())(view);
var PATH_FS = {
  resolve: (...args) => {
    var resolvedPath = "",
      resolvedAbsolute = false;
    for (var i = args.length - 1; i >= -1 && !resolvedAbsolute; i--) {
      var path = i >= 0 ? args[i] : FS.cwd();
      if (typeof path != "string") {
        throw new TypeError("Arguments to path.resolve must be strings");
      } else if (!path) {
        return "";
      }
      resolvedPath = path + "/" + resolvedPath;
      resolvedAbsolute = PATH.isAbs(path);
    }
    resolvedPath = PATH.normalizeArray(
      resolvedPath.split("/").filter((p) => !!p),
      !resolvedAbsolute,
    ).join("/");
    return (resolvedAbsolute ? "/" : "") + resolvedPath || ".";
  },
  relative: (from, to) => {
    from = PATH_FS.resolve(from).slice(1);
    to = PATH_FS.resolve(to).slice(1);
    function trim(arr) {
      var start = 0;
      for (; start < arr.length; start++) {
        if (arr[start] !== "") break;
      }
      var end = arr.length - 1;
      for (; end >= 0; end--) {
        if (arr[end] !== "") break;
      }
      if (start > end) return [];
      return arr.slice(start, end - start + 1);
    }
    var fromParts = trim(from.split("/"));
    var toParts = trim(to.split("/"));
    var length = Math.min(fromParts.length, toParts.length);
    var samePartsLength = length;
    for (var i = 0; i < length; i++) {
      if (fromParts[i] !== toParts[i]) {
        samePartsLength = i;
        break;
      }
    }
    var outputParts = [];
    for (var i = samePartsLength; i < fromParts.length; i++) {
      outputParts.push("..");
    }
    outputParts = outputParts.concat(toParts.slice(samePartsLength));
    return outputParts.join("/");
  },
};
var FS_stdin_getChar_buffer = [];
var lengthBytesUTF8 = (str) => {
  var len = 0;
  for (var i = 0; i < str.length; ++i) {
    var c = str.charCodeAt(i);
    if (c <= 127) {
      len++;
    } else if (c <= 2047) {
      len += 2;
    } else if (c >= 55296 && c <= 57343) {
      len += 4;
      ++i;
    } else {
      len += 3;
    }
  }
  return len;
};
var stringToUTF8Array = (str, heap, outIdx, maxBytesToWrite) => {
  if (!(maxBytesToWrite > 0)) return 0;
  var startIdx = outIdx;
  var endIdx = outIdx + maxBytesToWrite - 1;
  for (var i = 0; i < str.length; ++i) {
    var u = str.codePointAt(i);
    if (u <= 127) {
      if (outIdx >= endIdx) break;
      heap[outIdx++] = u;
    } else if (u <= 2047) {
      if (outIdx + 1 >= endIdx) break;
      heap[outIdx++] = 192 | (u >> 6);
      heap[outIdx++] = 128 | (u & 63);
    } else if (u <= 65535) {
      if (outIdx + 2 >= endIdx) break;
      heap[outIdx++] = 224 | (u >> 12);
      heap[outIdx++] = 128 | ((u >> 6) & 63);
      heap[outIdx++] = 128 | (u & 63);
    } else {
      if (outIdx + 3 >= endIdx) break;
      heap[outIdx++] = 240 | (u >> 18);
      heap[outIdx++] = 128 | ((u >> 12) & 63);
      heap[outIdx++] = 128 | ((u >> 6) & 63);
      heap[outIdx++] = 128 | (u & 63);
      i++;
    }
  }
  heap[outIdx] = 0;
  return outIdx - startIdx;
};
var intArrayFromString = (stringy, dontAddNull, length) => {
  var len = length > 0 ? length : lengthBytesUTF8(stringy) + 1;
  var u8array = new Array(len);
  var numBytesWritten = stringToUTF8Array(stringy, u8array, 0, u8array.length);
  if (dontAddNull) u8array.length = numBytesWritten;
  return u8array;
};
var FS_stdin_getChar = () => {
  if (!FS_stdin_getChar_buffer.length) {
    var result = null;
    if (ENVIRONMENT_IS_NODE) {
      var BUFSIZE = 256;
      var buf = Buffer.alloc(BUFSIZE);
      var bytesRead = 0;
      var fd = process.stdin.fd;
      try {
        bytesRead = fs.readSync(fd, buf, 0, BUFSIZE);
      } catch (e) {
        if (e.toString().includes("EOF")) bytesRead = 0;
        else throw e;
      }
      if (bytesRead > 0) {
        result = buf.slice(0, bytesRead).toString("utf-8");
      }
    } else if (globalThis.window?.prompt) {
      result = window.prompt("Input: ");
      if (result !== null) {
        result += "\n";
      }
    } else {
    }
    if (!result) {
      return null;
    }
    FS_stdin_getChar_buffer = intArrayFromString(result, true);
  }
  return FS_stdin_getChar_buffer.shift();
};
var TTY = {
  ttys: [],
  init() {},
  shutdown() {},
  register(dev, ops) {
    TTY.ttys[dev] = { input: [], output: [], ops };
    FS.registerDevice(dev, TTY.stream_ops);
  },
  stream_ops: {
    open(stream) {
      var tty = TTY.ttys[stream.node.rdev];
      if (!tty) {
        throw new FS.ErrnoError(43);
      }
      stream.tty = tty;
      stream.seekable = false;
    },
    close(stream) {
      stream.tty.ops.fsync(stream.tty);
    },
    fsync(stream) {
      stream.tty.ops.fsync(stream.tty);
    },
    read(stream, buffer, offset, length, pos) {
      if (!stream.tty || !stream.tty.ops.get_char) {
        throw new FS.ErrnoError(60);
      }
      var bytesRead = 0;
      for (var i = 0; i < length; i++) {
        var result;
        try {
          result = stream.tty.ops.get_char(stream.tty);
        } catch (e) {
          throw new FS.ErrnoError(29);
        }
        if (result === undefined && bytesRead === 0) {
          throw new FS.ErrnoError(6);
        }
        if (result === null || result === undefined) break;
        bytesRead++;
        buffer[offset + i] = result;
      }
      if (bytesRead) {
        stream.node.atime = Date.now();
      }
      return bytesRead;
    },
    write(stream, buffer, offset, length, pos) {
      if (!stream.tty || !stream.tty.ops.put_char) {
        throw new FS.ErrnoError(60);
      }
      try {
        for (var i = 0; i < length; i++) {
          stream.tty.ops.put_char(stream.tty, buffer[offset + i]);
        }
      } catch (e) {
        throw new FS.ErrnoError(29);
      }
      if (length) {
        stream.node.mtime = stream.node.ctime = Date.now();
      }
      return i;
    },
  },
  default_tty_ops: {
    get_char(tty) {
      return FS_stdin_getChar();
    },
    put_char(tty, val) {
      if (val === null || val === 10) {
        out(UTF8ArrayToString(tty.output));
        tty.output = [];
      } else {
        if (val != 0) tty.output.push(val);
      }
    },
    fsync(tty) {
      if (tty.output?.length > 0) {
        out(UTF8ArrayToString(tty.output));
        tty.output = [];
      }
    },
    ioctl_tcgets(tty) {
      return {
        c_iflag: 25856,
        c_oflag: 5,
        c_cflag: 191,
        c_lflag: 35387,
        c_cc: [
          3, 28, 127, 21, 4, 0, 1, 0, 17, 19, 26, 0, 18, 15, 23, 22, 0, 0, 0, 0,
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        ],
      };
    },
    ioctl_tcsets(tty, optional_actions, data) {
      return 0;
    },
    ioctl_tiocgwinsz(tty) {
      return [24, 80];
    },
  },
  default_tty1_ops: {
    put_char(tty, val) {
      if (val === null || val === 10) {
        err(UTF8ArrayToString(tty.output));
        tty.output = [];
      } else {
        if (val != 0) tty.output.push(val);
      }
    },
    fsync(tty) {
      if (tty.output?.length > 0) {
        err(UTF8ArrayToString(tty.output));
        tty.output = [];
      }
    },
  },
};
var zeroMemory = (ptr, size) => HEAPU8.fill(0, ptr, ptr + size);
var alignMemory = (size, alignment) => Math.ceil(size / alignment) * alignment;
var mmapAlloc = (size) => {
  size = alignMemory(size, 65536);
  var ptr = _emscripten_builtin_memalign(65536, size);
  if (ptr) zeroMemory(ptr, size);
  return ptr;
};
var MEMFS = {
  ops_table: null,
  mount(mount) {
    return MEMFS.createNode(null, "/", 16895, 0);
  },
  createNode(parent, name, mode, dev) {
    if (FS.isBlkdev(mode) || FS.isFIFO(mode)) {
      throw new FS.ErrnoError(63);
    }
    MEMFS.ops_table ||= {
      dir: {
        node: {
          getattr: MEMFS.node_ops.getattr,
          setattr: MEMFS.node_ops.setattr,
          lookup: MEMFS.node_ops.lookup,
          mknod: MEMFS.node_ops.mknod,
          rename: MEMFS.node_ops.rename,
          unlink: MEMFS.node_ops.unlink,
          rmdir: MEMFS.node_ops.rmdir,
          readdir: MEMFS.node_ops.readdir,
          symlink: MEMFS.node_ops.symlink,
        },
        stream: { llseek: MEMFS.stream_ops.llseek },
      },
      file: {
        node: {
          getattr: MEMFS.node_ops.getattr,
          setattr: MEMFS.node_ops.setattr,
        },
        stream: {
          llseek: MEMFS.stream_ops.llseek,
          read: MEMFS.stream_ops.read,
          write: MEMFS.stream_ops.write,
          mmap: MEMFS.stream_ops.mmap,
          msync: MEMFS.stream_ops.msync,
        },
      },
      link: {
        node: {
          getattr: MEMFS.node_ops.getattr,
          setattr: MEMFS.node_ops.setattr,
          readlink: MEMFS.node_ops.readlink,
        },
        stream: {},
      },
      chrdev: {
        node: {
          getattr: MEMFS.node_ops.getattr,
          setattr: MEMFS.node_ops.setattr,
        },
        stream: FS.chrdev_stream_ops,
      },
    };
    var node = FS.createNode(parent, name, mode, dev);
    if (FS.isDir(node.mode)) {
      node.node_ops = MEMFS.ops_table.dir.node;
      node.stream_ops = MEMFS.ops_table.dir.stream;
      node.contents = {};
    } else if (FS.isFile(node.mode)) {
      node.node_ops = MEMFS.ops_table.file.node;
      node.stream_ops = MEMFS.ops_table.file.stream;
      node.usedBytes = 0;
      node.contents = MEMFS.emptyFileContents ??= new Uint8Array(0);
    } else if (FS.isLink(node.mode)) {
      node.node_ops = MEMFS.ops_table.link.node;
      node.stream_ops = MEMFS.ops_table.link.stream;
    } else if (FS.isChrdev(node.mode)) {
      node.node_ops = MEMFS.ops_table.chrdev.node;
      node.stream_ops = MEMFS.ops_table.chrdev.stream;
    }
    node.atime = node.mtime = node.ctime = Date.now();
    if (parent) {
      parent.contents[name] = node;
      parent.atime = parent.mtime = parent.ctime = node.atime;
    }
    return node;
  },
  getFileDataAsTypedArray(node) {
    return node.contents.subarray(0, node.usedBytes);
  },
  expandFileStorage(node, newCapacity) {
    var prevCapacity = node.contents.length;
    if (prevCapacity >= newCapacity) return;
    var CAPACITY_DOUBLING_MAX = 1024 * 1024;
    newCapacity = Math.max(
      newCapacity,
      (prevCapacity * (prevCapacity < CAPACITY_DOUBLING_MAX ? 2 : 1.125)) >>> 0,
    );
    if (prevCapacity) newCapacity = Math.max(newCapacity, 256);
    var oldContents = MEMFS.getFileDataAsTypedArray(node);
    node.contents = new Uint8Array(newCapacity);
    node.contents.set(oldContents);
  },
  resizeFileStorage(node, newSize) {
    if (node.usedBytes == newSize) return;
    var oldContents = node.contents;
    node.contents = new Uint8Array(newSize);
    node.contents.set(
      oldContents.subarray(0, Math.min(newSize, node.usedBytes)),
    );
    node.usedBytes = newSize;
  },
  node_ops: {
    getattr(node) {
      var attr = {};
      attr.dev = FS.isChrdev(node.mode) ? node.id : 1;
      attr.ino = node.id;
      attr.mode = node.mode;
      attr.nlink = 1;
      attr.uid = 0;
      attr.gid = 0;
      attr.rdev = node.rdev;
      if (FS.isDir(node.mode)) {
        attr.size = 4096;
      } else if (FS.isFile(node.mode)) {
        attr.size = node.usedBytes;
      } else if (FS.isLink(node.mode)) {
        attr.size = node.link.length;
      } else {
        attr.size = 0;
      }
      attr.atime = new Date(node.atime);
      attr.mtime = new Date(node.mtime);
      attr.ctime = new Date(node.ctime);
      attr.blksize = 4096;
      attr.blocks = Math.ceil(attr.size / attr.blksize);
      return attr;
    },
    setattr(node, attr) {
      for (const key of ["mode", "atime", "mtime", "ctime"]) {
        if (attr[key] != null) {
          node[key] = attr[key];
        }
      }
      if (attr.size !== undefined) {
        MEMFS.resizeFileStorage(node, attr.size);
      }
    },
    lookup(parent, name) {
      if (!MEMFS.doesNotExistError) {
        MEMFS.doesNotExistError = new FS.ErrnoError(44);
        MEMFS.doesNotExistError.stack = "<generic error, no stack>";
      }
      throw MEMFS.doesNotExistError;
    },
    mknod(parent, name, mode, dev) {
      return MEMFS.createNode(parent, name, mode, dev);
    },
    rename(old_node, new_dir, new_name) {
      var new_node;
      try {
        new_node = FS.lookupNode(new_dir, new_name);
      } catch (e) {}
      if (new_node) {
        if (FS.isDir(old_node.mode)) {
          for (var i in new_node.contents) {
            throw new FS.ErrnoError(55);
          }
        }
        FS.hashRemoveNode(new_node);
      }
      delete old_node.parent.contents[old_node.name];
      new_dir.contents[new_name] = old_node;
      old_node.name = new_name;
      new_dir.ctime =
        new_dir.mtime =
        old_node.parent.ctime =
        old_node.parent.mtime =
          Date.now();
    },
    unlink(parent, name) {
      delete parent.contents[name];
      parent.ctime = parent.mtime = Date.now();
    },
    rmdir(parent, name) {
      var node = FS.lookupNode(parent, name);
      for (var i in node.contents) {
        throw new FS.ErrnoError(55);
      }
      delete parent.contents[name];
      parent.ctime = parent.mtime = Date.now();
    },
    readdir(node) {
      return [".", "..", ...Object.keys(node.contents)];
    },
    symlink(parent, newname, oldpath) {
      var node = MEMFS.createNode(parent, newname, 511 | 40960, 0);
      node.link = oldpath;
      return node;
    },
    readlink(node) {
      if (!FS.isLink(node.mode)) {
        throw new FS.ErrnoError(28);
      }
      return node.link;
    },
  },
  stream_ops: {
    read(stream, buffer, offset, length, position) {
      var contents = stream.node.contents;
      if (position >= stream.node.usedBytes) return 0;
      var size = Math.min(stream.node.usedBytes - position, length);
      buffer.set(contents.subarray(position, position + size), offset);
      return size;
    },
    write(stream, buffer, offset, length, position, canOwn) {
      if (buffer.buffer === HEAP8.buffer) {
        canOwn = false;
      }
      if (!length) return 0;
      var node = stream.node;
      node.mtime = node.ctime = Date.now();
      if (canOwn) {
        node.contents = buffer.subarray(offset, offset + length);
        node.usedBytes = length;
      } else if (node.usedBytes === 0 && position === 0) {
        node.contents = buffer.slice(offset, offset + length);
        node.usedBytes = length;
      } else {
        MEMFS.expandFileStorage(node, position + length);
        node.contents.set(buffer.subarray(offset, offset + length), position);
        node.usedBytes = Math.max(node.usedBytes, position + length);
      }
      return length;
    },
    llseek(stream, offset, whence) {
      var position = offset;
      if (whence === 1) {
        position += stream.position;
      } else if (whence === 2) {
        if (FS.isFile(stream.node.mode)) {
          position += stream.node.usedBytes;
        }
      }
      if (position < 0) {
        throw new FS.ErrnoError(28);
      }
      return position;
    },
    mmap(stream, length, position, prot, flags) {
      if (!FS.isFile(stream.node.mode)) {
        throw new FS.ErrnoError(43);
      }
      var ptr;
      var allocated;
      var contents = stream.node.contents;
      if (!(flags & 2) && contents.buffer === HEAP8.buffer) {
        allocated = false;
        ptr = contents.byteOffset;
      } else {
        allocated = true;
        ptr = mmapAlloc(length);
        if (!ptr) {
          throw new FS.ErrnoError(48);
        }
        if (contents) {
          if (position > 0 || position + length < contents.length) {
            if (contents.subarray) {
              contents = contents.subarray(position, position + length);
            } else {
              contents = Array.prototype.slice.call(
                contents,
                position,
                position + length,
              );
            }
          }
          HEAP8.set(contents, ptr);
        }
      }
      return { ptr, allocated };
    },
    msync(stream, buffer, offset, length, mmapFlags) {
      MEMFS.stream_ops.write(stream, buffer, 0, length, offset, false);
      return 0;
    },
  },
};
var FS_modeStringToFlags = (str) => {
  if (typeof str != "string") return str;
  var flagModes = {
    r: 0,
    "r+": 2,
    w: 512 | 64 | 1,
    "w+": 512 | 64 | 2,
    a: 1024 | 64 | 1,
    "a+": 1024 | 64 | 2,
  };
  var flags = flagModes[str];
  if (typeof flags == "undefined") {
    throw new Error(`Unknown file open mode: ${str}`);
  }
  return flags;
};
var FS_fileDataToTypedArray = (data) => {
  if (typeof data == "string") {
    data = intArrayFromString(data, true);
  }
  if (!data.subarray) {
    data = new Uint8Array(data);
  }
  return data;
};
var FS_getMode = (canRead, canWrite) => {
  var mode = 0;
  if (canRead) mode |= 292 | 73;
  if (canWrite) mode |= 146;
  return mode;
};
var IDBFS = {
  dbs: {},
  indexedDB: () => indexedDB,
  DB_VERSION: 21,
  DB_STORE_NAME: "FILE_DATA",
  queuePersist: (mount) => {
    function onPersistComplete() {
      if (mount.idbPersistState === "again") startPersist();
      else {
        mount.idbPersistState = 0;
        IDBFS.onAutoPersistStateChanged?.(false);
      }
    }
    function startPersist() {
      mount.idbPersistState = "idb";
      IDBFS.onAutoPersistStateChanged?.(true);
      IDBFS.syncfs(mount, false, onPersistComplete);
    }
    if (!mount.idbPersistState) {
      mount.idbPersistState = setTimeout(startPersist, 0);
    } else if (mount.idbPersistState === "idb") {
      mount.idbPersistState = "again";
    }
  },
  mount: (mount) => {
    var mnt = MEMFS.mount(mount);
    if (mount?.opts?.autoPersist) {
      mount.idbPersistState = 0;
      var memfs_node_ops = mnt.node_ops;
      mnt.node_ops = { ...mnt.node_ops };
      mnt.node_ops.mknod = (parent, name, mode, dev) => {
        var node = memfs_node_ops.mknod(parent, name, mode, dev);
        node.node_ops = mnt.node_ops;
        node.idbfs_mount = mnt.mount;
        node.memfs_stream_ops = node.stream_ops;
        node.stream_ops = { ...node.stream_ops };
        node.stream_ops.write = (
          stream,
          buffer,
          offset,
          length,
          position,
          canOwn,
        ) => {
          stream.node.isModified = true;
          return node.memfs_stream_ops.write(
            stream,
            buffer,
            offset,
            length,
            position,
            canOwn,
          );
        };
        node.stream_ops.close = (stream) => {
          var n = stream.node;
          if (n.isModified) {
            IDBFS.queuePersist(n.idbfs_mount);
            n.isModified = false;
          }
          if (n.memfs_stream_ops.close) return n.memfs_stream_ops.close(stream);
        };
        IDBFS.queuePersist(mnt.mount);
        return node;
      };
      mnt.node_ops.rmdir = (...args) => (
        IDBFS.queuePersist(mnt.mount),
        memfs_node_ops.rmdir(...args)
      );
      mnt.node_ops.symlink = (...args) => (
        IDBFS.queuePersist(mnt.mount),
        memfs_node_ops.symlink(...args)
      );
      mnt.node_ops.unlink = (...args) => (
        IDBFS.queuePersist(mnt.mount),
        memfs_node_ops.unlink(...args)
      );
      mnt.node_ops.rename = (...args) => (
        IDBFS.queuePersist(mnt.mount),
        memfs_node_ops.rename(...args)
      );
    }
    return mnt;
  },
  syncfs: (mount, populate, callback) => {
    IDBFS.getLocalSet(mount, (err, local) => {
      if (err) return callback(err);
      IDBFS.getRemoteSet(mount, (err, remote) => {
        if (err) return callback(err);
        var src = populate ? remote : local;
        var dst = populate ? local : remote;
        IDBFS.reconcile(src, dst, callback);
      });
    });
  },
  quit: () => {
    for (var value of Object.values(IDBFS.dbs)) {
      value.close();
    }
    IDBFS.dbs = {};
  },
  getDB: (name, callback) => {
    var db = IDBFS.dbs[name];
    if (db) {
      return callback(null, db);
    }
    var req;
    try {
      req = IDBFS.indexedDB().open(name, IDBFS.DB_VERSION);
    } catch (e) {
      return callback(e);
    }
    if (!req) {
      return callback("Unable to connect to IndexedDB");
    }
    req.onupgradeneeded = (e) => {
      var db = e.target.result;
      var transaction = e.target.transaction;
      var fileStore;
      if (db.objectStoreNames.contains(IDBFS.DB_STORE_NAME)) {
        fileStore = transaction.objectStore(IDBFS.DB_STORE_NAME);
      } else {
        fileStore = db.createObjectStore(IDBFS.DB_STORE_NAME);
      }
      if (!fileStore.indexNames.contains("timestamp")) {
        fileStore.createIndex("timestamp", "timestamp", { unique: false });
      }
    };
    req.onsuccess = () => {
      db = req.result;
      IDBFS.dbs[name] = db;
      callback(null, db);
    };
    req.onerror = (e) => {
      callback(e.target.error);
      e.preventDefault();
    };
  },
  getLocalSet: (mount, callback) => {
    var entries = {};
    function isRealDir(p) {
      return p !== "." && p !== "..";
    }
    function toAbsolute(root) {
      return (p) => PATH.join2(root, p);
    }
    var check = FS.readdir(mount.mountpoint)
      .filter(isRealDir)
      .map(toAbsolute(mount.mountpoint));
    while (check.length) {
      var path = check.pop();
      var stat;
      try {
        stat = FS.lstat(path);
      } catch (e) {
        return callback(e);
      }
      if (FS.isDir(stat.mode)) {
        check.push(...FS.readdir(path).filter(isRealDir).map(toAbsolute(path)));
      }
      entries[path] = { timestamp: stat.mtime };
    }
    return callback(null, { type: "local", entries });
  },
  getRemoteSet: (mount, callback) => {
    var entries = {};
    IDBFS.getDB(mount.mountpoint, (err, db) => {
      if (err) return callback(err);
      try {
        var transaction = db.transaction([IDBFS.DB_STORE_NAME], "readonly");
        transaction.onerror = (e) => {
          callback(e.target.error);
          e.preventDefault();
        };
        var store = transaction.objectStore(IDBFS.DB_STORE_NAME);
        var index = store.index("timestamp");
        index.openKeyCursor().onsuccess = (event) => {
          var cursor = event.target.result;
          if (!cursor) {
            return callback(null, { type: "remote", db, entries });
          }
          entries[cursor.primaryKey] = { timestamp: cursor.key };
          cursor.continue();
        };
      } catch (e) {
        return callback(e);
      }
    });
  },
  loadLocalEntry: (path, callback) => {
    var stat, node;
    try {
      var lookup = FS.lookupPath(path);
      node = lookup.node;
      stat = FS.lstat(path);
    } catch (e) {
      return callback(e);
    }
    if (FS.isDir(stat.mode)) {
      return callback(null, { timestamp: stat.mtime, mode: stat.mode });
    } else if (FS.isLink(stat.mode)) {
      return callback(null, {
        timestamp: stat.mtime,
        mode: stat.mode,
        link: node.link,
      });
    } else if (FS.isFile(stat.mode)) {
      node.contents = MEMFS.getFileDataAsTypedArray(node);
      return callback(null, {
        timestamp: stat.mtime,
        mode: stat.mode,
        contents: node.contents,
      });
    } else {
      return callback(new Error("node type not supported"));
    }
  },
  storeLocalEntry: (path, entry, callback) => {
    try {
      if (FS.isDir(entry["mode"])) {
        FS.mkdirTree(path, entry["mode"]);
      } else if (FS.isLink(entry["mode"])) {
        FS.symlink(entry["link"], path);
      } else if (FS.isFile(entry["mode"])) {
        FS.writeFile(path, entry["contents"], { canOwn: true });
      } else {
        return callback(new Error("node type not supported"));
      }
      FS.chmod(path, entry["mode"]);
      FS.utime(path, entry["timestamp"], entry["timestamp"]);
    } catch (e) {
      return callback(e);
    }
    callback(null);
  },
  removeLocalEntry: (path, callback) => {
    try {
      var stat = FS.lstat(path);
      if (FS.isDir(stat.mode)) {
        FS.rmdir(path);
      } else {
        FS.unlink(path);
      }
    } catch (e) {
      return callback(e);
    }
    callback(null);
  },
  loadRemoteEntry: (store, path, callback) => {
    var req = store.get(path);
    req.onsuccess = (event) => callback(null, event.target.result);
    req.onerror = (e) => {
      callback(e.target.error);
      e.preventDefault();
    };
  },
  storeRemoteEntry: (store, path, entry, callback) => {
    try {
      var req = store.put(entry, path);
    } catch (e) {
      callback(e);
      return;
    }
    req.onsuccess = (event) => callback();
    req.onerror = (e) => {
      callback(e.target.error);
      e.preventDefault();
    };
  },
  removeRemoteEntry: (store, path, callback) => {
    var req = store.delete(path);
    req.onsuccess = (event) => callback();
    req.onerror = (e) => {
      callback(e.target.error);
      e.preventDefault();
    };
  },
  reconcile: (src, dst, callback) => {
    var total = 0;
    var create = [];
    for (var [key, e] of Object.entries(src.entries)) {
      var e2 = dst.entries[key];
      if (!e2 || e["timestamp"].getTime() != e2["timestamp"].getTime()) {
        create.push(key);
        total++;
      }
    }
    var remove = [];
    for (var key of Object.keys(dst.entries)) {
      if (!src.entries[key]) {
        remove.push(key);
        total++;
      }
    }
    if (!total) {
      return callback(null);
    }
    var errored = false;
    var db = src.type === "remote" ? src.db : dst.db;
    var transaction = db.transaction([IDBFS.DB_STORE_NAME], "readwrite");
    var store = transaction.objectStore(IDBFS.DB_STORE_NAME);
    function done(err) {
      if (err && !errored) {
        errored = true;
        return callback(err);
      }
    }
    transaction.onerror = transaction.onabort = (e) => {
      done(e.target.error);
      e.preventDefault();
    };
    transaction.oncomplete = (e) => {
      if (!errored) {
        callback(null);
      }
    };
    for (const path of create.sort()) {
      if (dst.type === "local") {
        IDBFS.loadRemoteEntry(store, path, (err, entry) => {
          if (err) return done(err);
          IDBFS.storeLocalEntry(path, entry, done);
        });
      } else {
        IDBFS.loadLocalEntry(path, (err, entry) => {
          if (err) return done(err);
          IDBFS.storeRemoteEntry(store, path, entry, done);
        });
      }
    }
    for (var path of remove.sort().reverse()) {
      if (dst.type === "local") {
        IDBFS.removeLocalEntry(path, done);
      } else {
        IDBFS.removeRemoteEntry(store, path, done);
      }
    }
  },
};
var asyncLoad = async (url) => {
  var arrayBuffer = await readAsync(url);
  return new Uint8Array(arrayBuffer);
};
var FS_createDataFile = (...args) => FS.createDataFile(...args);
var getUniqueRunDependency = (id) => id;
var dependenciesPromise = null;
var resolveRunDependencies = async () => dependenciesPromise;
var runDependencies = 0;
var removeRunDependency = (id) => {
  runDependencies--;
  Module["monitorRunDependencies"]?.(runDependencies);
  if (!runDependencies) {
    dependenciesPromise.resolve();
  }
};
var addRunDependency = (id) => {
  if (!runDependencies) {
    var resolve;
    dependenciesPromise = new Promise((r) => (resolve = r));
    dependenciesPromise.resolve = resolve;
  }
  runDependencies++;
  Module["monitorRunDependencies"]?.(runDependencies);
};
var preloadPlugins = [];
var FS_handledByPreloadPlugin = async (byteArray, fullname) => {
  if (typeof Browser != "undefined") Browser.init();
  for (var plugin of preloadPlugins) {
    if (plugin["canHandle"](fullname)) {
      return plugin["handle"](byteArray, fullname);
    }
  }
  return byteArray;
};
var FS_preloadFile = async (
  parent,
  name,
  url,
  canRead,
  canWrite,
  dontCreateFile,
  canOwn,
  preFinish,
) => {
  var fullname = name ? PATH_FS.resolve(PATH.join2(parent, name)) : parent;
  var dep = getUniqueRunDependency(`cp ${fullname}`);
  addRunDependency(dep);
  try {
    var byteArray = url;
    if (typeof url == "string") {
      byteArray = await asyncLoad(url);
    }
    byteArray = await FS_handledByPreloadPlugin(byteArray, fullname);
    preFinish?.();
    if (!dontCreateFile) {
      FS_createDataFile(parent, name, byteArray, canRead, canWrite, canOwn);
    }
  } finally {
    removeRunDependency(dep);
  }
};
var FS_createPreloadedFile = (
  parent,
  name,
  url,
  canRead,
  canWrite,
  onload,
  onerror,
  dontCreateFile,
  canOwn,
  preFinish,
) => {
  FS_preloadFile(
    parent,
    name,
    url,
    canRead,
    canWrite,
    dontCreateFile,
    canOwn,
    preFinish,
  )
    .then(onload)
    .catch(onerror);
};
var FS = {
  root: null,
  mounts: [],
  devices: {},
  streams: [],
  nextInode: 1,
  nameTable: null,
  currentPath: "/",
  initialized: false,
  ignorePermissions: true,
  filesystems: null,
  syncFSRequests: 0,
  ErrnoError: class {
    name = "ErrnoError";
    constructor(errno) {
      this.errno = errno;
    }
  },
  FSStream: class {
    shared = {};
    get object() {
      return this.node;
    }
    set object(val) {
      this.node = val;
    }
    get isRead() {
      return (this.flags & 2097155) !== 1;
    }
    get isWrite() {
      return (this.flags & 2097155) !== 0;
    }
    get isAppend() {
      return this.flags & 1024;
    }
    get flags() {
      return this.shared.flags;
    }
    set flags(val) {
      this.shared.flags = val;
    }
    get position() {
      return this.shared.position;
    }
    set position(val) {
      this.shared.position = val;
    }
  },
  FSNode: class {
    node_ops = {};
    stream_ops = {};
    readMode = 292 | 73;
    writeMode = 146;
    mounted = null;
    constructor(parent, name, mode, rdev) {
      if (!parent) {
        parent = this;
      }
      this.parent = parent;
      this.mount = parent.mount;
      this.id = FS.nextInode++;
      this.name = name;
      this.mode = mode;
      this.rdev = rdev;
      this.atime = this.mtime = this.ctime = Date.now();
    }
    get read() {
      return (this.mode & this.readMode) === this.readMode;
    }
    set read(val) {
      val ? (this.mode |= this.readMode) : (this.mode &= ~this.readMode);
    }
    get write() {
      return (this.mode & this.writeMode) === this.writeMode;
    }
    set write(val) {
      val ? (this.mode |= this.writeMode) : (this.mode &= ~this.writeMode);
    }
    get isFolder() {
      return FS.isDir(this.mode);
    }
    get isDevice() {
      return FS.isChrdev(this.mode);
    }
  },
  lookupPath(path, opts = {}) {
    if (!path) {
      throw new FS.ErrnoError(44);
    }
    opts.follow_mount ??= true;
    if (!PATH.isAbs(path)) {
      path = FS.cwd() + "/" + path;
    }
    linkloop: for (var nlinks = 0; nlinks < 40; nlinks++) {
      var parts = path.split("/").filter((p) => !!p);
      var current = FS.root;
      var current_path = "/";
      for (var i = 0; i < parts.length; i++) {
        var islast = i === parts.length - 1;
        if (islast && opts.parent) {
          break;
        }
        if (parts[i] === ".") {
          continue;
        }
        if (parts[i] === "..") {
          current_path = PATH.dirname(current_path);
          if (FS.isRoot(current)) {
            path = current_path + "/" + parts.slice(i + 1).join("/");
            nlinks--;
            continue linkloop;
          } else {
            current = current.parent;
          }
          continue;
        }
        current_path = PATH.join2(current_path, parts[i]);
        try {
          current = FS.lookupNode(current, parts[i]);
        } catch (e) {
          if (e?.errno === 44 && islast && opts.noent_okay) {
            return { path: current_path };
          }
          throw e;
        }
        if (FS.isMountpoint(current) && (!islast || opts.follow_mount)) {
          current = current.mounted.root;
        }
        if (FS.isLink(current.mode) && (!islast || opts.follow)) {
          if (!current.node_ops.readlink) {
            throw new FS.ErrnoError(52);
          }
          var link = current.node_ops.readlink(current);
          if (!PATH.isAbs(link)) {
            link = PATH.dirname(current_path) + "/" + link;
          }
          path = link + "/" + parts.slice(i + 1).join("/");
          continue linkloop;
        }
      }
      return { path: current_path, node: current };
    }
    throw new FS.ErrnoError(32);
  },
  getPath(node) {
    var path;
    while (true) {
      if (FS.isRoot(node)) {
        var mount = node.mount.mountpoint;
        if (!path) return mount;
        return mount[mount.length - 1] !== "/"
          ? `${mount}/${path}`
          : mount + path;
      }
      path = path ? `${node.name}/${path}` : node.name;
      node = node.parent;
    }
  },
  hashName(parentid, name) {
    var hash = 0;
    for (var i = 0; i < name.length; i++) {
      hash = ((hash << 5) - hash + name.charCodeAt(i)) | 0;
    }
    return ((parentid + hash) >>> 0) % FS.nameTable.length;
  },
  hashAddNode(node) {
    var hash = FS.hashName(node.parent.id, node.name);
    node.name_next = FS.nameTable[hash];
    FS.nameTable[hash] = node;
  },
  hashRemoveNode(node) {
    var hash = FS.hashName(node.parent.id, node.name);
    if (FS.nameTable[hash] === node) {
      FS.nameTable[hash] = node.name_next;
    } else {
      var current = FS.nameTable[hash];
      while (current) {
        if (current.name_next === node) {
          current.name_next = node.name_next;
          break;
        }
        current = current.name_next;
      }
    }
  },
  lookupNode(parent, name) {
    var errCode = FS.mayLookup(parent);
    if (errCode) {
      throw new FS.ErrnoError(errCode);
    }
    var hash = FS.hashName(parent.id, name);
    for (var node = FS.nameTable[hash]; node; node = node.name_next) {
      var nodeName = node.name;
      if (node.parent.id === parent.id && nodeName === name) {
        return node;
      }
    }
    return FS.lookup(parent, name);
  },
  createNode(parent, name, mode, rdev) {
    var node = new FS.FSNode(parent, name, mode, rdev);
    FS.hashAddNode(node);
    return node;
  },
  destroyNode(node) {
    FS.hashRemoveNode(node);
  },
  isRoot(node) {
    return node === node.parent;
  },
  isMountpoint(node) {
    return !!node.mounted;
  },
  isFile(mode) {
    return (mode & 61440) === 32768;
  },
  isDir(mode) {
    return (mode & 61440) === 16384;
  },
  isLink(mode) {
    return (mode & 61440) === 40960;
  },
  isChrdev(mode) {
    return (mode & 61440) === 8192;
  },
  isBlkdev(mode) {
    return (mode & 61440) === 24576;
  },
  isFIFO(mode) {
    return (mode & 61440) === 4096;
  },
  isSocket(mode) {
    return (mode & 49152) === 49152;
  },
  flagsToPermissionString(flag) {
    var perms = ["r", "w", "rw"][flag & 3];
    if (flag & 512) {
      perms += "w";
    }
    return perms;
  },
  nodePermissions(node, perms) {
    if (FS.ignorePermissions) {
      return 0;
    }
    if (perms.includes("r") && !(node.mode & 292)) {
      return 2;
    }
    if (perms.includes("w") && !(node.mode & 146)) {
      return 2;
    }
    if (perms.includes("x") && !(node.mode & 73)) {
      return 2;
    }
    return 0;
  },
  mayLookup(dir) {
    if (!FS.isDir(dir.mode)) return 54;
    var errCode = FS.nodePermissions(dir, "x");
    if (errCode) return errCode;
    if (!dir.node_ops.lookup) return 2;
    return 0;
  },
  mayCreate(dir, name) {
    if (!FS.isDir(dir.mode)) {
      return 54;
    }
    try {
      var node = FS.lookupNode(dir, name);
      return 20;
    } catch (e) {}
    return FS.nodePermissions(dir, "wx");
  },
  mayDelete(dir, name, isdir) {
    var node;
    try {
      node = FS.lookupNode(dir, name);
    } catch (e) {
      return e.errno;
    }
    var errCode = FS.nodePermissions(dir, "wx");
    if (errCode) {
      return errCode;
    }
    if (isdir) {
      if (!FS.isDir(node.mode)) {
        return 54;
      }
      if (FS.isRoot(node) || FS.getPath(node) === FS.cwd()) {
        return 10;
      }
    } else if (FS.isDir(node.mode)) {
      return 31;
    }
    return 0;
  },
  mayOpen(node, flags) {
    if (!node) {
      return 44;
    }
    if (FS.isLink(node.mode)) {
      return 32;
    }
    var mode = FS.flagsToPermissionString(flags);
    if (FS.isDir(node.mode)) {
      if (mode !== "r" || flags & (512 | 64)) {
        return 31;
      }
    }
    return FS.nodePermissions(node, mode);
  },
  checkOpExists(op, err) {
    if (!op) {
      throw new FS.ErrnoError(err);
    }
    return op;
  },
  MAX_OPEN_FDS: 4096,
  nextfd() {
    for (var fd = 0; fd <= FS.MAX_OPEN_FDS; fd++) {
      if (!FS.streams[fd]) {
        return fd;
      }
    }
    throw new FS.ErrnoError(33);
  },
  getStreamChecked(fd) {
    var stream = FS.getStream(fd);
    if (!stream) {
      throw new FS.ErrnoError(8);
    }
    return stream;
  },
  getStream: (fd) => FS.streams[fd],
  createStream(stream, fd = -1) {
    stream = Object.assign(new FS.FSStream(), stream);
    if (fd == -1) {
      fd = FS.nextfd();
    }
    stream.fd = fd;
    FS.streams[fd] = stream;
    return stream;
  },
  closeStream(fd) {
    FS.streams[fd] = null;
  },
  dupStream(origStream, fd = -1) {
    var stream = FS.createStream(origStream, fd);
    stream.stream_ops?.dup?.(stream);
    return stream;
  },
  doSetAttr(stream, node, attr) {
    var setattr = stream?.stream_ops.setattr;
    var arg = setattr ? stream : node;
    setattr ??= node.node_ops.setattr;
    FS.checkOpExists(setattr, 63);
    try {
      setattr(arg, attr);
    } catch (e) {
      if (e instanceof RangeError) {
        throw new FS.ErrnoError(22);
      }
      throw e;
    }
  },
  chrdev_stream_ops: {
    open(stream) {
      var device = FS.getDevice(stream.node.rdev);
      stream.stream_ops = device.stream_ops;
      stream.stream_ops.open?.(stream);
    },
    llseek() {
      throw new FS.ErrnoError(70);
    },
  },
  major: (dev) => dev >> 8,
  minor: (dev) => dev & 255,
  makedev: (ma, mi) => (ma << 8) | mi,
  registerDevice(dev, ops) {
    FS.devices[dev] = { stream_ops: ops };
  },
  getDevice: (dev) => FS.devices[dev],
  getMounts(mount) {
    var mounts = [];
    var check = [mount];
    while (check.length) {
      var m = check.pop();
      mounts.push(m);
      check.push(...m.mounts);
    }
    return mounts;
  },
  syncfs(populate, callback) {
    if (typeof populate == "function") {
      callback = populate;
      populate = false;
    }
    FS.syncFSRequests++;
    if (FS.syncFSRequests > 1) {
      err(
        `warning: ${FS.syncFSRequests} FS.syncfs operations in flight at once, probably just doing extra work`,
      );
    }
    var mounts = FS.getMounts(FS.root.mount);
    var completed = 0;
    function doCallback(errCode) {
      FS.syncFSRequests--;
      return callback(errCode);
    }
    function done(errCode) {
      if (errCode) {
        if (!done.errored) {
          done.errored = true;
          return doCallback(errCode);
        }
        return;
      }
      if (++completed >= mounts.length) {
        doCallback(null);
      }
    }
    for (var mount of mounts) {
      if (mount.type.syncfs) {
        mount.type.syncfs(mount, populate, done);
      } else {
        done(null);
      }
    }
  },
  mount(type, opts, mountpoint) {
    var root = mountpoint === "/";
    var pseudo = !mountpoint;
    var node;
    if (root && FS.root) {
      throw new FS.ErrnoError(10);
    } else if (!root && !pseudo) {
      var lookup = FS.lookupPath(mountpoint, { follow_mount: false });
      mountpoint = lookup.path;
      node = lookup.node;
      if (FS.isMountpoint(node)) {
        throw new FS.ErrnoError(10);
      }
      if (!FS.isDir(node.mode)) {
        throw new FS.ErrnoError(54);
      }
    }
    var mount = { type, opts, mountpoint, mounts: [] };
    var mountRoot = type.mount(mount);
    mountRoot.mount = mount;
    mount.root = mountRoot;
    if (root) {
      FS.root = mountRoot;
    } else if (node) {
      node.mounted = mount;
      if (node.mount) {
        node.mount.mounts.push(mount);
      }
    }
    return mountRoot;
  },
  unmount(mountpoint) {
    var lookup = FS.lookupPath(mountpoint, { follow_mount: false });
    if (!FS.isMountpoint(lookup.node)) {
      throw new FS.ErrnoError(28);
    }
    var node = lookup.node;
    var mount = node.mounted;
    var mounts = FS.getMounts(mount);
    for (var [hash, current] of Object.entries(FS.nameTable)) {
      while (current) {
        var next = current.name_next;
        if (mounts.includes(current.mount)) {
          FS.destroyNode(current);
        }
        current = next;
      }
    }
    node.mounted = null;
    var idx = node.mount.mounts.indexOf(mount);
    node.mount.mounts.splice(idx, 1);
  },
  lookup(parent, name) {
    return parent.node_ops.lookup(parent, name);
  },
  mknod(path, mode, dev) {
    var lookup = FS.lookupPath(path, { parent: true });
    var parent = lookup.node;
    var name = PATH.basename(path);
    if (!name) {
      throw new FS.ErrnoError(28);
    }
    if (name === "." || name === "..") {
      throw new FS.ErrnoError(20);
    }
    var errCode = FS.mayCreate(parent, name);
    if (errCode) {
      throw new FS.ErrnoError(errCode);
    }
    if (!parent.node_ops.mknod) {
      throw new FS.ErrnoError(63);
    }
    return parent.node_ops.mknod(parent, name, mode, dev);
  },
  statfs(path) {
    return FS.statfsNode(FS.lookupPath(path, { follow: true }).node);
  },
  statfsStream(stream) {
    return FS.statfsNode(stream.node);
  },
  statfsNode(node) {
    var rtn = {
      bsize: 4096,
      frsize: 4096,
      blocks: 1e6,
      bfree: 5e5,
      bavail: 5e5,
      files: FS.nextInode,
      ffree: FS.nextInode - 1,
      fsid: 42,
      flags: 2,
      namelen: 255,
    };
    if (node.node_ops.statfs) {
      Object.assign(rtn, node.node_ops.statfs(node.mount.opts.root));
    }
    return rtn;
  },
  create(path, mode = 438) {
    mode &= 4095;
    mode |= 32768;
    return FS.mknod(path, mode, 0);
  },
  mkdir(path, mode = 511) {
    mode &= 511 | 512;
    mode |= 16384;
    return FS.mknod(path, mode, 0);
  },
  mkdirTree(path, mode) {
    var dirs = path.split("/");
    var d = "";
    for (var dir of dirs) {
      if (!dir) continue;
      if (d || PATH.isAbs(path)) d += "/";
      d += dir;
      try {
        FS.mkdir(d, mode);
      } catch (e) {
        if (e.errno != 20) throw e;
      }
    }
  },
  mkdev(path, mode, dev) {
    if (typeof dev == "undefined") {
      dev = mode;
      mode = 438;
    }
    mode |= 8192;
    return FS.mknod(path, mode, dev);
  },
  symlink(oldpath, newpath) {
    if (!PATH_FS.resolve(oldpath)) {
      throw new FS.ErrnoError(44);
    }
    var lookup = FS.lookupPath(newpath, { parent: true });
    var parent = lookup.node;
    if (!parent) {
      throw new FS.ErrnoError(44);
    }
    var newname = PATH.basename(newpath);
    var errCode = FS.mayCreate(parent, newname);
    if (errCode) {
      throw new FS.ErrnoError(errCode);
    }
    if (!parent.node_ops.symlink) {
      throw new FS.ErrnoError(63);
    }
    return parent.node_ops.symlink(parent, newname, oldpath);
  },
  rename(old_path, new_path) {
    var old_dirname = PATH.dirname(old_path);
    var new_dirname = PATH.dirname(new_path);
    var old_name = PATH.basename(old_path);
    var new_name = PATH.basename(new_path);
    var lookup, old_dir, new_dir;
    lookup = FS.lookupPath(old_path, { parent: true });
    old_dir = lookup.node;
    lookup = FS.lookupPath(new_path, { parent: true });
    new_dir = lookup.node;
    if (!old_dir || !new_dir) throw new FS.ErrnoError(44);
    if (old_dir.mount !== new_dir.mount) {
      throw new FS.ErrnoError(75);
    }
    var old_node = FS.lookupNode(old_dir, old_name);
    var relative = PATH_FS.relative(old_path, new_dirname);
    if (relative.charAt(0) !== ".") {
      throw new FS.ErrnoError(28);
    }
    relative = PATH_FS.relative(new_path, old_dirname);
    if (relative.charAt(0) !== ".") {
      throw new FS.ErrnoError(55);
    }
    var new_node;
    try {
      new_node = FS.lookupNode(new_dir, new_name);
    } catch (e) {}
    if (old_node === new_node) {
      return;
    }
    var isdir = FS.isDir(old_node.mode);
    var errCode = FS.mayDelete(old_dir, old_name, isdir);
    if (errCode) {
      throw new FS.ErrnoError(errCode);
    }
    errCode = new_node
      ? FS.mayDelete(new_dir, new_name, isdir)
      : FS.mayCreate(new_dir, new_name);
    if (errCode) {
      throw new FS.ErrnoError(errCode);
    }
    if (!old_dir.node_ops.rename) {
      throw new FS.ErrnoError(63);
    }
    if (FS.isMountpoint(old_node) || (new_node && FS.isMountpoint(new_node))) {
      throw new FS.ErrnoError(10);
    }
    if (new_dir !== old_dir) {
      errCode = FS.nodePermissions(old_dir, "w");
      if (errCode) {
        throw new FS.ErrnoError(errCode);
      }
    }
    FS.hashRemoveNode(old_node);
    try {
      old_dir.node_ops.rename(old_node, new_dir, new_name);
      old_node.parent = new_dir;
    } catch (e) {
      throw e;
    } finally {
      FS.hashAddNode(old_node);
    }
  },
  rmdir(path) {
    var lookup = FS.lookupPath(path, { parent: true });
    var parent = lookup.node;
    var name = PATH.basename(path);
    var node = FS.lookupNode(parent, name);
    var errCode = FS.mayDelete(parent, name, true);
    if (errCode) {
      throw new FS.ErrnoError(errCode);
    }
    if (!parent.node_ops.rmdir) {
      throw new FS.ErrnoError(63);
    }
    if (FS.isMountpoint(node)) {
      throw new FS.ErrnoError(10);
    }
    parent.node_ops.rmdir(parent, name);
    FS.destroyNode(node);
  },
  readdir(path) {
    var lookup = FS.lookupPath(path, { follow: true });
    var node = lookup.node;
    var readdir = FS.checkOpExists(node.node_ops.readdir, 54);
    return readdir(node);
  },
  unlink(path) {
    var lookup = FS.lookupPath(path, { parent: true });
    var parent = lookup.node;
    if (!parent) {
      throw new FS.ErrnoError(44);
    }
    var name = PATH.basename(path);
    var node = FS.lookupNode(parent, name);
    var errCode = FS.mayDelete(parent, name, false);
    if (errCode) {
      throw new FS.ErrnoError(errCode);
    }
    if (!parent.node_ops.unlink) {
      throw new FS.ErrnoError(63);
    }
    if (FS.isMountpoint(node)) {
      throw new FS.ErrnoError(10);
    }
    parent.node_ops.unlink(parent, name);
    FS.destroyNode(node);
  },
  readlink(path) {
    var lookup = FS.lookupPath(path);
    var link = lookup.node;
    if (!link) {
      throw new FS.ErrnoError(44);
    }
    if (!link.node_ops.readlink) {
      throw new FS.ErrnoError(28);
    }
    return link.node_ops.readlink(link);
  },
  stat(path, dontFollow) {
    var lookup = FS.lookupPath(path, { follow: !dontFollow });
    var node = lookup.node;
    var getattr = FS.checkOpExists(node.node_ops.getattr, 63);
    return getattr(node);
  },
  fstat(fd) {
    var stream = FS.getStreamChecked(fd);
    var node = stream.node;
    var getattr = stream.stream_ops.getattr;
    var arg = getattr ? stream : node;
    getattr ??= node.node_ops.getattr;
    FS.checkOpExists(getattr, 63);
    return getattr(arg);
  },
  lstat(path) {
    return FS.stat(path, true);
  },
  doChmod(stream, node, mode, dontFollow) {
    FS.doSetAttr(stream, node, {
      mode: (mode & 4095) | (node.mode & ~4095),
      ctime: Date.now(),
      dontFollow,
    });
  },
  chmod(path, mode, dontFollow) {
    var node;
    if (typeof path == "string") {
      var lookup = FS.lookupPath(path, { follow: !dontFollow });
      node = lookup.node;
    } else {
      node = path;
    }
    FS.doChmod(null, node, mode, dontFollow);
  },
  lchmod(path, mode) {
    FS.chmod(path, mode, true);
  },
  fchmod(fd, mode) {
    var stream = FS.getStreamChecked(fd);
    FS.doChmod(stream, stream.node, mode, false);
  },
  doChown(stream, node, dontFollow) {
    FS.doSetAttr(stream, node, { timestamp: Date.now(), dontFollow });
  },
  chown(path, uid, gid, dontFollow) {
    var node;
    if (typeof path == "string") {
      var lookup = FS.lookupPath(path, { follow: !dontFollow });
      node = lookup.node;
    } else {
      node = path;
    }
    FS.doChown(null, node, dontFollow);
  },
  lchown(path, uid, gid) {
    FS.chown(path, uid, gid, true);
  },
  fchown(fd, uid, gid) {
    var stream = FS.getStreamChecked(fd);
    FS.doChown(stream, stream.node, false);
  },
  doTruncate(stream, node, len) {
    if (FS.isDir(node.mode)) {
      throw new FS.ErrnoError(31);
    }
    if (!FS.isFile(node.mode)) {
      throw new FS.ErrnoError(28);
    }
    var errCode = FS.nodePermissions(node, "w");
    if (errCode) {
      throw new FS.ErrnoError(errCode);
    }
    FS.doSetAttr(stream, node, { size: len, timestamp: Date.now() });
  },
  truncate(path, len) {
    if (len < 0) {
      throw new FS.ErrnoError(28);
    }
    var node;
    if (typeof path == "string") {
      var lookup = FS.lookupPath(path, { follow: true });
      node = lookup.node;
    } else {
      node = path;
    }
    FS.doTruncate(null, node, len);
  },
  ftruncate(fd, len) {
    var stream = FS.getStreamChecked(fd);
    if (len < 0 || (stream.flags & 2097155) === 0) {
      throw new FS.ErrnoError(28);
    }
    FS.doTruncate(stream, stream.node, len);
  },
  utime(path, atime, mtime) {
    var lookup = FS.lookupPath(path, { follow: true });
    var node = lookup.node;
    var setattr = FS.checkOpExists(node.node_ops.setattr, 63);
    setattr(node, { atime, mtime });
  },
  open(path, flags, mode = 438) {
    if (path === "") {
      throw new FS.ErrnoError(44);
    }
    flags = FS_modeStringToFlags(flags);
    if (flags & 64) {
      mode = (mode & 4095) | 32768;
    } else {
      mode = 0;
    }
    var node;
    var isDirPath;
    if (typeof path == "object") {
      node = path;
    } else {
      isDirPath = path.endsWith("/");
      var lookup = FS.lookupPath(path, {
        follow: !(flags & 131072),
        noent_okay: true,
      });
      node = lookup.node;
      path = lookup.path;
    }
    var created = false;
    if (flags & 64) {
      if (node) {
        if (flags & 128) {
          throw new FS.ErrnoError(20);
        }
      } else if (isDirPath) {
        throw new FS.ErrnoError(31);
      } else {
        node = FS.mknod(path, mode | 511, 0);
        created = true;
      }
    }
    if (!node) {
      throw new FS.ErrnoError(44);
    }
    if (FS.isChrdev(node.mode)) {
      flags &= ~512;
    }
    if (flags & 65536 && !FS.isDir(node.mode)) {
      throw new FS.ErrnoError(54);
    }
    if (!created) {
      var errCode = FS.mayOpen(node, flags);
      if (errCode) {
        throw new FS.ErrnoError(errCode);
      }
    }
    if (flags & 512 && !created) {
      FS.truncate(node, 0);
    }
    flags &= ~(128 | 512 | 131072);
    var stream = FS.createStream({
      node,
      path: FS.getPath(node),
      flags,
      seekable: true,
      position: 0,
      stream_ops: node.stream_ops,
      ungotten: [],
      error: false,
    });
    if (stream.stream_ops.open) {
      stream.stream_ops.open(stream);
    }
    if (created) {
      FS.chmod(node, mode & 511);
    }
    return stream;
  },
  close(stream) {
    if (FS.isClosed(stream)) {
      throw new FS.ErrnoError(8);
    }
    if (stream.getdents) stream.getdents = null;
    try {
      if (stream.stream_ops.close) {
        stream.stream_ops.close(stream);
      }
    } catch (e) {
      throw e;
    } finally {
      FS.closeStream(stream.fd);
    }
    stream.fd = null;
  },
  isClosed(stream) {
    return stream.fd === null;
  },
  llseek(stream, offset, whence) {
    if (FS.isClosed(stream)) {
      throw new FS.ErrnoError(8);
    }
    if (!stream.seekable || !stream.stream_ops.llseek) {
      throw new FS.ErrnoError(70);
    }
    if (whence != 0 && whence != 1 && whence != 2) {
      throw new FS.ErrnoError(28);
    }
    stream.position = stream.stream_ops.llseek(stream, offset, whence);
    stream.ungotten = [];
    return stream.position;
  },
  read(stream, buffer, offset, length, position) {
    if (length < 0 || position < 0) {
      throw new FS.ErrnoError(28);
    }
    if (FS.isClosed(stream)) {
      throw new FS.ErrnoError(8);
    }
    if ((stream.flags & 2097155) === 1) {
      throw new FS.ErrnoError(8);
    }
    if (FS.isDir(stream.node.mode)) {
      throw new FS.ErrnoError(31);
    }
    if (!stream.stream_ops.read) {
      throw new FS.ErrnoError(28);
    }
    var seeking = typeof position != "undefined";
    if (!seeking) {
      position = stream.position;
    } else if (!stream.seekable) {
      throw new FS.ErrnoError(70);
    }
    var bytesRead = stream.stream_ops.read(
      stream,
      buffer,
      offset,
      length,
      position,
    );
    if (!seeking) stream.position += bytesRead;
    return bytesRead;
  },
  write(stream, buffer, offset, length, position, canOwn) {
    if (length < 0 || position < 0) {
      throw new FS.ErrnoError(28);
    }
    if (FS.isClosed(stream)) {
      throw new FS.ErrnoError(8);
    }
    if ((stream.flags & 2097155) === 0) {
      throw new FS.ErrnoError(8);
    }
    if (FS.isDir(stream.node.mode)) {
      throw new FS.ErrnoError(31);
    }
    if (!stream.stream_ops.write) {
      throw new FS.ErrnoError(28);
    }
    if (stream.seekable && stream.flags & 1024) {
      FS.llseek(stream, 0, 2);
    }
    var seeking = typeof position != "undefined";
    if (!seeking) {
      position = stream.position;
    } else if (!stream.seekable) {
      throw new FS.ErrnoError(70);
    }
    var bytesWritten = stream.stream_ops.write(
      stream,
      buffer,
      offset,
      length,
      position,
      canOwn,
    );
    if (!seeking) stream.position += bytesWritten;
    return bytesWritten;
  },
  mmap(stream, length, position, prot, flags) {
    if (
      (prot & 2) !== 0 &&
      (flags & 2) === 0 &&
      (stream.flags & 2097155) !== 2
    ) {
      throw new FS.ErrnoError(2);
    }
    if ((stream.flags & 2097155) === 1) {
      throw new FS.ErrnoError(2);
    }
    if (!stream.stream_ops.mmap) {
      throw new FS.ErrnoError(43);
    }
    if (!length) {
      throw new FS.ErrnoError(28);
    }
    return stream.stream_ops.mmap(stream, length, position, prot, flags);
  },
  msync(stream, buffer, offset, length, mmapFlags) {
    if (!stream.stream_ops.msync) {
      return 0;
    }
    return stream.stream_ops.msync(stream, buffer, offset, length, mmapFlags);
  },
  ioctl(stream, cmd, arg) {
    if (!stream.stream_ops.ioctl) {
      throw new FS.ErrnoError(59);
    }
    return stream.stream_ops.ioctl(stream, cmd, arg);
  },
  readFile(path, opts = {}) {
    opts.flags = opts.flags ?? 0;
    opts.encoding = opts.encoding ?? "binary";
    if (opts.encoding !== "utf8" && opts.encoding !== "binary") {
      abort(`Invalid encoding type "${opts.encoding}"`);
    }
    var stream = FS.open(path, opts.flags);
    var stat = FS.stat(path);
    var length = stat.size;
    var buf = new Uint8Array(length);
    FS.read(stream, buf, 0, length, 0);
    if (opts.encoding === "utf8") {
      buf = UTF8ArrayToString(buf);
    }
    FS.close(stream);
    return buf;
  },
  writeFile(path, data, opts = {}) {
    opts.flags = opts.flags ?? 577;
    var stream = FS.open(path, opts.flags, opts.mode);
    data = FS_fileDataToTypedArray(data);
    FS.write(stream, data, 0, data.byteLength, undefined, opts.canOwn);
    FS.close(stream);
  },
  cwd: () => FS.currentPath,
  chdir(path) {
    var lookup = FS.lookupPath(path, { follow: true });
    if (lookup.node === null) {
      throw new FS.ErrnoError(44);
    }
    if (!FS.isDir(lookup.node.mode)) {
      throw new FS.ErrnoError(54);
    }
    var errCode = FS.nodePermissions(lookup.node, "x");
    if (errCode) {
      throw new FS.ErrnoError(errCode);
    }
    FS.currentPath = lookup.path;
  },
  createDefaultDirectories() {
    FS.mkdir("/tmp");
    FS.mkdir("/home");
    FS.mkdir("/home/web_user");
  },
  createDefaultDevices() {
    FS.mkdir("/dev");
    FS.registerDevice(FS.makedev(1, 3), {
      read: () => 0,
      write: (stream, buffer, offset, length, pos) => length,
      llseek: () => 0,
    });
    FS.mkdev("/dev/null", FS.makedev(1, 3));
    TTY.register(FS.makedev(5, 0), TTY.default_tty_ops);
    TTY.register(FS.makedev(6, 0), TTY.default_tty1_ops);
    FS.mkdev("/dev/tty", FS.makedev(5, 0));
    FS.mkdev("/dev/tty1", FS.makedev(6, 0));
    var randomBuffer = new Uint8Array(1024),
      randomLeft = 0;
    var randomByte = () => {
      if (randomLeft === 0) {
        randomFill(randomBuffer);
        randomLeft = randomBuffer.byteLength;
      }
      return randomBuffer[--randomLeft];
    };
    FS.createDevice("/dev", "random", randomByte);
    FS.createDevice("/dev", "urandom", randomByte);
    FS.mkdir("/dev/shm");
    FS.mkdir("/dev/shm/tmp");
  },
  createSpecialDirectories() {
    FS.mkdir("/proc");
    var proc_self = FS.mkdir("/proc/self");
    FS.mkdir("/proc/self/fd");
    FS.mount(
      {
        mount() {
          var node = FS.createNode(proc_self, "fd", 16895, 73);
          node.stream_ops = { llseek: MEMFS.stream_ops.llseek };
          node.node_ops = {
            lookup(parent, name) {
              var fd = +name;
              var stream = FS.getStreamChecked(fd);
              var ret = {
                parent: null,
                mount: { mountpoint: "fake" },
                node_ops: { readlink: () => stream.path },
                id: fd + 1,
              };
              ret.parent = ret;
              return ret;
            },
            readdir() {
              return Array.from(FS.streams.entries())
                .filter(([k, v]) => v)
                .map(([k, v]) => k.toString());
            },
          };
          return node;
        },
      },
      {},
      "/proc/self/fd",
    );
  },
  createStandardStreams(input, output, error) {
    if (input) {
      FS.createDevice("/dev", "stdin", input);
    } else {
      FS.symlink("/dev/tty", "/dev/stdin");
    }
    if (output) {
      FS.createDevice("/dev", "stdout", null, output);
    } else {
      FS.symlink("/dev/tty", "/dev/stdout");
    }
    if (error) {
      FS.createDevice("/dev", "stderr", null, error);
    } else {
      FS.symlink("/dev/tty1", "/dev/stderr");
    }
    var stdin = FS.open("/dev/stdin", 0);
    var stdout = FS.open("/dev/stdout", 1);
    var stderr = FS.open("/dev/stderr", 1);
  },
  staticInit() {
    FS.nameTable = new Array(4096);
    FS.mount(MEMFS, {}, "/");
    FS.createDefaultDirectories();
    FS.createDefaultDevices();
    FS.createSpecialDirectories();
    FS.filesystems = { MEMFS, IDBFS };
  },
  init(input, output, error) {
    FS.initialized = true;
    input ??= Module["stdin"];
    output ??= Module["stdout"];
    error ??= Module["stderr"];
    FS.createStandardStreams(input, output, error);
  },
  quit() {
    FS.initialized = false;
    for (var stream of FS.streams) {
      if (stream) {
        FS.close(stream);
      }
    }
  },
  findObject(path, dontResolveLastLink) {
    var ret = FS.analyzePath(path, dontResolveLastLink);
    if (!ret.exists) {
      return null;
    }
    return ret.object;
  },
  analyzePath(path, dontResolveLastLink) {
    try {
      var lookup = FS.lookupPath(path, { follow: !dontResolveLastLink });
      path = lookup.path;
    } catch (e) {}
    var ret = {
      isRoot: false,
      exists: false,
      error: 0,
      name: null,
      path: null,
      object: null,
      parentExists: false,
      parentPath: null,
      parentObject: null,
    };
    try {
      var lookup = FS.lookupPath(path, { parent: true });
      ret.parentExists = true;
      ret.parentPath = lookup.path;
      ret.parentObject = lookup.node;
      ret.name = PATH.basename(path);
      lookup = FS.lookupPath(path, { follow: !dontResolveLastLink });
      ret.exists = true;
      ret.path = lookup.path;
      ret.object = lookup.node;
      ret.name = lookup.node.name;
      ret.isRoot = lookup.path === "/";
    } catch (e) {
      ret.error = e.errno;
    }
    return ret;
  },
  createPath(parent, path, canRead, canWrite) {
    parent = typeof parent == "string" ? parent : FS.getPath(parent);
    var parts = path.split("/").reverse();
    while (parts.length) {
      var part = parts.pop();
      if (!part) continue;
      var current = PATH.join2(parent, part);
      try {
        FS.mkdir(current);
      } catch (e) {
        if (e.errno != 20) throw e;
      }
      parent = current;
    }
    return current;
  },
  createFile(parent, name, properties, canRead, canWrite) {
    var path = PATH.join2(
      typeof parent == "string" ? parent : FS.getPath(parent),
      name,
    );
    var mode = FS_getMode(canRead, canWrite);
    return FS.create(path, mode);
  },
  createDataFile(parent, name, data, canRead, canWrite, canOwn) {
    var path = name;
    if (parent) {
      parent = typeof parent == "string" ? parent : FS.getPath(parent);
      path = name ? PATH.join2(parent, name) : parent;
    }
    var mode = FS_getMode(canRead, canWrite);
    var node = FS.create(path, mode);
    if (data) {
      data = FS_fileDataToTypedArray(data);
      FS.chmod(node, mode | 146);
      var stream = FS.open(node, 577);
      FS.write(stream, data, 0, data.length, 0, canOwn);
      FS.close(stream);
      FS.chmod(node, mode);
    }
  },
  createDevice(parent, name, input, output) {
    var path = PATH.join2(
      typeof parent == "string" ? parent : FS.getPath(parent),
      name,
    );
    var mode = FS_getMode(!!input, !!output);
    FS.createDevice.major ??= 64;
    var dev = FS.makedev(FS.createDevice.major++, 0);
    FS.registerDevice(dev, {
      open(stream) {
        stream.seekable = false;
      },
      close(stream) {
        if (output?.buffer?.length) {
          output(10);
        }
      },
      read(stream, buffer, offset, length, pos) {
        var bytesRead = 0;
        for (var i = 0; i < length; i++) {
          var result;
          try {
            result = input();
          } catch (e) {
            throw new FS.ErrnoError(29);
          }
          if (result === undefined && bytesRead === 0) {
            throw new FS.ErrnoError(6);
          }
          if (result === null || result === undefined) break;
          bytesRead++;
          buffer[offset + i] = result;
        }
        if (bytesRead) {
          stream.node.atime = Date.now();
        }
        return bytesRead;
      },
      write(stream, buffer, offset, length, pos) {
        for (var i = 0; i < length; i++) {
          try {
            output(buffer[offset + i]);
          } catch (e) {
            throw new FS.ErrnoError(29);
          }
        }
        if (length) {
          stream.node.mtime = stream.node.ctime = Date.now();
        }
        return i;
      },
    });
    return FS.mkdev(path, mode, dev);
  },
  forceLoadFile(obj) {
    if (obj.isDevice || obj.isFolder || obj.link || obj.contents) return true;
    if (globalThis.XMLHttpRequest) {
      abort(
        "Lazy loading should have been performed (contents set) in createLazyFile, but it was not. Lazy loading only works in web workers. Use --embed-file or --preload-file in emcc on the main thread.",
      );
    } else {
      try {
        obj.contents = readBinary(obj.url);
      } catch (e) {
        throw new FS.ErrnoError(29);
      }
    }
  },
  createLazyFile(parent, name, url, canRead, canWrite) {
    class LazyUint8Array {
      lengthKnown = false;
      chunks = [];
      get(idx) {
        if (idx > this.length - 1 || idx < 0) {
          return undefined;
        }
        var chunkOffset = idx % this.chunkSize;
        var chunkNum = (idx / this.chunkSize) | 0;
        return this.getter(chunkNum)[chunkOffset];
      }
      setDataGetter(getter) {
        this.getter = getter;
      }
      cacheLength() {
        var xhr = new XMLHttpRequest();
        xhr.open("HEAD", url, false);
        xhr.send(null);
        if (!((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304))
          abort("Couldn't load " + url + ". Status: " + xhr.status);
        var datalength = Number(xhr.getResponseHeader("Content-length"));
        var header;
        var hasByteServing =
          (header = xhr.getResponseHeader("Accept-Ranges")) &&
          header === "bytes";
        var usesGzip =
          (header = xhr.getResponseHeader("Content-Encoding")) &&
          header === "gzip";
        var chunkSize = 1024 * 1024;
        if (!hasByteServing) chunkSize = datalength;
        var doXHR = (from, to) => {
          if (from > to)
            abort(`invalid range (${from}, ${to}) or no bytes requested!`);
          if (to > datalength - 1)
            abort(`only ${datalength} bytes available! programmer error!`);
          var xhr = new XMLHttpRequest();
          xhr.open("GET", url, false);
          if (datalength !== chunkSize)
            xhr.setRequestHeader("Range", "bytes=" + from + "-" + to);
          xhr.responseType = "arraybuffer";
          if (xhr.overrideMimeType) {
            xhr.overrideMimeType("text/plain; charset=x-user-defined");
          }
          xhr.send(null);
          if (!((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304))
            abort("Couldn't load " + url + ". Status: " + xhr.status);
          if (xhr.response !== undefined) {
            return new Uint8Array(xhr.response || []);
          }
          return intArrayFromString(xhr.responseText ?? "", true);
        };
        var lazyArray = this;
        lazyArray.setDataGetter((chunkNum) => {
          var start = chunkNum * chunkSize;
          var end = (chunkNum + 1) * chunkSize - 1;
          end = Math.min(end, datalength - 1);
          if (typeof lazyArray.chunks[chunkNum] == "undefined") {
            lazyArray.chunks[chunkNum] = doXHR(start, end);
          }
          if (typeof lazyArray.chunks[chunkNum] == "undefined")
            abort("doXHR failed!");
          return lazyArray.chunks[chunkNum];
        });
        if (usesGzip || !datalength) {
          chunkSize = datalength = 1;
          datalength = this.getter(0).length;
          chunkSize = datalength;
          out(
            "LazyFiles on gzip forces download of the whole file when length is accessed",
          );
        }
        this._length = datalength;
        this._chunkSize = chunkSize;
        this.lengthKnown = true;
      }
      get length() {
        if (!this.lengthKnown) {
          this.cacheLength();
        }
        return this._length;
      }
      get chunkSize() {
        if (!this.lengthKnown) {
          this.cacheLength();
        }
        return this._chunkSize;
      }
    }
    if (globalThis.XMLHttpRequest) {
      if (!ENVIRONMENT_IS_WORKER)
        abort(
          "Cannot do synchronous binary XHRs outside webworkers in modern browsers. Use --embed-file or --preload-file in emcc",
        );
      var lazyArray = new LazyUint8Array();
      var properties = { isDevice: false, contents: lazyArray };
    } else {
      var properties = { isDevice: false, url };
    }
    var node = FS.createFile(parent, name, properties, canRead, canWrite);
    if (properties.contents) {
      node.contents = properties.contents;
    } else if (properties.url) {
      node.contents = null;
      node.url = properties.url;
    }
    Object.defineProperties(node, {
      usedBytes: {
        get: function () {
          return this.contents.length;
        },
      },
    });
    var stream_ops = {};
    for (const [key, fn] of Object.entries(node.stream_ops)) {
      stream_ops[key] = (...args) => {
        FS.forceLoadFile(node);
        return fn(...args);
      };
    }
    function writeChunks(stream, buffer, offset, length, position) {
      var contents = stream.node.contents;
      if (position >= contents.length) return 0;
      var size = Math.min(contents.length - position, length);
      if (contents.slice) {
        for (var i = 0; i < size; i++) {
          buffer[offset + i] = contents[position + i];
        }
      } else {
        for (var i = 0; i < size; i++) {
          buffer[offset + i] = contents.get(position + i);
        }
      }
      return size;
    }
    stream_ops.read = (stream, buffer, offset, length, position) => {
      FS.forceLoadFile(node);
      return writeChunks(stream, buffer, offset, length, position);
    };
    stream_ops.mmap = (stream, length, position, prot, flags) => {
      FS.forceLoadFile(node);
      var ptr = mmapAlloc(length);
      if (!ptr) {
        throw new FS.ErrnoError(48);
      }
      writeChunks(stream, HEAP8, ptr, length, position);
      return { ptr, allocated: true };
    };
    node.stream_ops = stream_ops;
    return node;
  },
};
var SYSCALLS = {
  currentUmask: 18,
  calculateAt(dirfd, path, allowEmpty) {
    if (PATH.isAbs(path)) {
      return path;
    }
    var dir;
    if (dirfd === -100) {
      dir = FS.cwd();
    } else {
      var dirstream = SYSCALLS.getStreamFromFD(dirfd);
      dir = dirstream.path;
    }
    if (path.length == 0) {
      if (!allowEmpty) {
        throw new FS.ErrnoError(44);
      }
      return dir;
    }
    return dir + "/" + path;
  },
  writeStat(buf, stat) {
    HEAPU32[buf >> 2] = stat.dev;
    HEAPU32[(buf + 4) >> 2] = stat.mode;
    HEAPU32[(buf + 8) >> 2] = stat.nlink;
    HEAPU32[(buf + 12) >> 2] = stat.uid;
    HEAPU32[(buf + 16) >> 2] = stat.gid;
    HEAPU32[(buf + 20) >> 2] = stat.rdev;
    HEAP64[(buf + 24) >> 3] = BigInt(stat.size);
    HEAP32[(buf + 32) >> 2] = 4096;
    HEAP32[(buf + 36) >> 2] = stat.blocks;
    var atime = stat.atime.getTime();
    var mtime = stat.mtime.getTime();
    var ctime = stat.ctime.getTime();
    HEAP64[(buf + 40) >> 3] = BigInt(Math.floor(atime / 1e3));
    HEAPU32[(buf + 48) >> 2] = (atime % 1e3) * 1e3 * 1e3;
    HEAP64[(buf + 56) >> 3] = BigInt(Math.floor(mtime / 1e3));
    HEAPU32[(buf + 64) >> 2] = (mtime % 1e3) * 1e3 * 1e3;
    HEAP64[(buf + 72) >> 3] = BigInt(Math.floor(ctime / 1e3));
    HEAPU32[(buf + 80) >> 2] = (ctime % 1e3) * 1e3 * 1e3;
    HEAP64[(buf + 88) >> 3] = BigInt(stat.ino);
    return 0;
  },
  writeStatFs(buf, stats) {
    HEAPU32[(buf + 4) >> 2] = stats.bsize;
    HEAPU32[(buf + 60) >> 2] = stats.bsize;
    HEAP64[(buf + 8) >> 3] = BigInt(stats.blocks);
    HEAP64[(buf + 16) >> 3] = BigInt(stats.bfree);
    HEAP64[(buf + 24) >> 3] = BigInt(stats.bavail);
    HEAP64[(buf + 32) >> 3] = BigInt(stats.files);
    HEAP64[(buf + 40) >> 3] = BigInt(stats.ffree);
    HEAPU32[(buf + 48) >> 2] = stats.fsid;
    HEAPU32[(buf + 64) >> 2] = stats.flags;
    HEAPU32[(buf + 56) >> 2] = stats.namelen;
  },
  doMsync(addr, stream, len, flags, offset) {
    if (!FS.isFile(stream.node.mode)) {
      throw new FS.ErrnoError(43);
    }
    if (flags & 2) {
      return 0;
    }
    var buffer = HEAPU8.subarray(addr, addr + len);
    FS.msync(stream, buffer, offset, len, flags);
  },
  getStreamFromFD(fd) {
    var stream = FS.getStreamChecked(fd);
    return stream;
  },
  varargs: undefined,
  getStr(ptr) {
    var ret = UTF8ToString(ptr);
    return ret;
  },
};
function ___syscall_chdir(path) {
  try {
    path = SYSCALLS.getStr(path);
    FS.chdir(path);
    return 0;
  } catch (e) {
    if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
    return -e.errno;
  }
}
var syscallGetVarargI = () => {
  var ret = HEAP32[+SYSCALLS.varargs >> 2];
  SYSCALLS.varargs += 4;
  return ret;
};
var syscallGetVarargP = syscallGetVarargI;
function ___syscall_fcntl64(fd, cmd, varargs) {
  SYSCALLS.varargs = varargs;
  try {
    var stream = SYSCALLS.getStreamFromFD(fd);
    switch (cmd) {
      case 0: {
        var arg = syscallGetVarargI();
        if (arg < 0) {
          return -28;
        }
        while (FS.streams[arg]) {
          arg++;
        }
        var newStream;
        newStream = FS.dupStream(stream, arg);
        return newStream.fd;
      }
      case 1:
      case 2:
        return 0;
      case 3:
        return stream.flags;
      case 4: {
        var arg = syscallGetVarargI();
        var mask = 289792;
        stream.flags = (stream.flags & ~mask) | (arg & mask);
        return 0;
      }
      case 12: {
        var arg = syscallGetVarargP();
        var offset = 0;
        HEAP16[(arg + offset) >> 1] = 2;
        return 0;
      }
      case 13:
      case 14:
        return 0;
    }
    return -28;
  } catch (e) {
    if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
    return -e.errno;
  }
}
function ___syscall_fstat64(fd, buf) {
  try {
    return SYSCALLS.writeStat(buf, FS.fstat(fd));
  } catch (e) {
    if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
    return -e.errno;
  }
}
var stringToUTF8 = (str, outPtr, maxBytesToWrite) =>
  stringToUTF8Array(str, HEAPU8, outPtr, maxBytesToWrite);
function ___syscall_getcwd(buf, size) {
  try {
    if (size === 0) return -28;
    var cwd = FS.cwd();
    var cwdLengthInBytes = lengthBytesUTF8(cwd) + 1;
    if (size < cwdLengthInBytes) return -68;
    stringToUTF8(cwd, buf, size);
    return cwdLengthInBytes;
  } catch (e) {
    if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
    return -e.errno;
  }
}
function ___syscall_getdents64(fd, dirp, count) {
  try {
    var stream = SYSCALLS.getStreamFromFD(fd);
    stream.getdents ||= FS.readdir(stream.path);
    var struct_size = 280;
    var pos = 0;
    var off = FS.llseek(stream, 0, 1);
    var startIdx = Math.floor(off / struct_size);
    var endIdx = Math.min(
      stream.getdents.length,
      startIdx + Math.floor(count / struct_size),
    );
    for (var idx = startIdx; idx < endIdx; idx++) {
      var id;
      var type;
      var name = stream.getdents[idx];
      if (name === ".") {
        id = stream.node.id;
        type = 4;
      } else if (name === "..") {
        var lookup = FS.lookupPath(stream.path, { parent: true });
        id = lookup.node.id;
        type = 4;
      } else {
        var child;
        try {
          child = FS.lookupNode(stream.node, name);
        } catch (e) {
          if (e?.errno === 28) {
            continue;
          }
          throw e;
        }
        id = child.id;
        type = FS.isChrdev(child.mode)
          ? 2
          : FS.isDir(child.mode)
            ? 4
            : FS.isLink(child.mode)
              ? 10
              : 8;
      }
      HEAP64[(dirp + pos) >> 3] = BigInt(id);
      HEAP64[(dirp + pos + 8) >> 3] = BigInt((idx + 1) * struct_size);
      HEAP16[(dirp + pos + 16) >> 1] = 280;
      HEAP8[dirp + pos + 18] = type;
      stringToUTF8(name, dirp + pos + 19, 256);
      pos += struct_size;
    }
    FS.llseek(stream, idx * struct_size, 0);
    return pos;
  } catch (e) {
    if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
    return -e.errno;
  }
}
function ___syscall_ioctl(fd, op, varargs) {
  SYSCALLS.varargs = varargs;
  try {
    var stream = SYSCALLS.getStreamFromFD(fd);
    switch (op) {
      case 21509: {
        if (!stream.tty) return -59;
        return 0;
      }
      case 21505: {
        if (!stream.tty) return -59;
        if (stream.tty.ops.ioctl_tcgets) {
          var termios = stream.tty.ops.ioctl_tcgets(stream);
          var argp = syscallGetVarargP();
          HEAP32[argp >> 2] = termios.c_iflag || 0;
          HEAP32[(argp + 4) >> 2] = termios.c_oflag || 0;
          HEAP32[(argp + 8) >> 2] = termios.c_cflag || 0;
          HEAP32[(argp + 12) >> 2] = termios.c_lflag || 0;
          for (var i = 0; i < 32; i++) {
            HEAP8[argp + i + 17] = termios.c_cc[i] || 0;
          }
          return 0;
        }
        return 0;
      }
      case 21510:
      case 21511:
      case 21512: {
        if (!stream.tty) return -59;
        return 0;
      }
      case 21506:
      case 21507:
      case 21508: {
        if (!stream.tty) return -59;
        if (stream.tty.ops.ioctl_tcsets) {
          var argp = syscallGetVarargP();
          var c_iflag = HEAP32[argp >> 2];
          var c_oflag = HEAP32[(argp + 4) >> 2];
          var c_cflag = HEAP32[(argp + 8) >> 2];
          var c_lflag = HEAP32[(argp + 12) >> 2];
          var c_cc = [];
          for (var i = 0; i < 32; i++) {
            c_cc.push(HEAP8[argp + i + 17]);
          }
          return stream.tty.ops.ioctl_tcsets(stream.tty, op, {
            c_iflag,
            c_oflag,
            c_cflag,
            c_lflag,
            c_cc,
          });
        }
        return 0;
      }
      case 21519: {
        if (!stream.tty) return -59;
        var argp = syscallGetVarargP();
        HEAP32[argp >> 2] = 0;
        return 0;
      }
      case 21520: {
        if (!stream.tty) return -59;
        return -28;
      }
      case 21537:
      case 21531: {
        var argp = syscallGetVarargP();
        return FS.ioctl(stream, op, argp);
      }
      case 21523: {
        if (!stream.tty) return -59;
        if (stream.tty.ops.ioctl_tiocgwinsz) {
          var winsize = stream.tty.ops.ioctl_tiocgwinsz(stream.tty);
          var argp = syscallGetVarargP();
          HEAP16[argp >> 1] = winsize[0];
          HEAP16[(argp + 2) >> 1] = winsize[1];
        }
        return 0;
      }
      case 21524: {
        if (!stream.tty) return -59;
        return 0;
      }
      case 21515: {
        if (!stream.tty) return -59;
        return 0;
      }
      default:
        return -28;
    }
  } catch (e) {
    if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
    return -e.errno;
  }
}
function ___syscall_lstat64(path, buf) {
  try {
    path = SYSCALLS.getStr(path);
    return SYSCALLS.writeStat(buf, FS.lstat(path));
  } catch (e) {
    if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
    return -e.errno;
  }
}
function ___syscall_mkdirat(dirfd, path, mode) {
  try {
    path = SYSCALLS.getStr(path);
    path = SYSCALLS.calculateAt(dirfd, path);
    mode &= ~SYSCALLS.currentUmask;
    FS.mkdir(path, mode, 0);
    return 0;
  } catch (e) {
    if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
    return -e.errno;
  }
}
function ___syscall_newfstatat(dirfd, path, buf, flags) {
  try {
    path = SYSCALLS.getStr(path);
    var nofollow = flags & 256;
    var allowEmpty = flags & 4096;
    flags = flags & ~6400;
    path = SYSCALLS.calculateAt(dirfd, path, allowEmpty);
    return SYSCALLS.writeStat(buf, nofollow ? FS.lstat(path) : FS.stat(path));
  } catch (e) {
    if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
    return -e.errno;
  }
}
function ___syscall_openat(dirfd, path, flags, varargs) {
  SYSCALLS.varargs = varargs;
  try {
    path = SYSCALLS.getStr(path);
    path = SYSCALLS.calculateAt(dirfd, path);
    var mode = varargs ? syscallGetVarargI() : 0;
    if (flags & 64) {
      mode &= ~SYSCALLS.currentUmask;
    }
    return FS.open(path, flags, mode).fd;
  } catch (e) {
    if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
    return -e.errno;
  }
}
function ___syscall_readlinkat(dirfd, path, buf, bufsize) {
  try {
    path = SYSCALLS.getStr(path);
    path = SYSCALLS.calculateAt(dirfd, path);
    if (bufsize <= 0) return -28;
    var ret = FS.readlink(path);
    var len = Math.min(bufsize, lengthBytesUTF8(ret));
    var endChar = HEAP8[buf + len];
    stringToUTF8(ret, buf, bufsize + 1);
    HEAP8[buf + len] = endChar;
    return len;
  } catch (e) {
    if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
    return -e.errno;
  }
}
function ___syscall_renameat(olddirfd, oldpath, newdirfd, newpath) {
  try {
    oldpath = SYSCALLS.getStr(oldpath);
    newpath = SYSCALLS.getStr(newpath);
    oldpath = SYSCALLS.calculateAt(olddirfd, oldpath);
    newpath = SYSCALLS.calculateAt(newdirfd, newpath);
    FS.rename(oldpath, newpath);
    return 0;
  } catch (e) {
    if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
    return -e.errno;
  }
}
function ___syscall_rmdir(path) {
  try {
    path = SYSCALLS.getStr(path);
    FS.rmdir(path);
    return 0;
  } catch (e) {
    if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
    return -e.errno;
  }
}
function ___syscall_stat64(path, buf) {
  try {
    path = SYSCALLS.getStr(path);
    return SYSCALLS.writeStat(buf, FS.stat(path));
  } catch (e) {
    if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
    return -e.errno;
  }
}
function ___syscall_unlinkat(dirfd, path, flags) {
  try {
    path = SYSCALLS.getStr(path);
    path = SYSCALLS.calculateAt(dirfd, path);
    if (!flags) {
      FS.unlink(path);
    } else if (flags === 512) {
      FS.rmdir(path);
    } else {
      return -28;
    }
    return 0;
  } catch (e) {
    if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
    return -e.errno;
  }
}
var __abort_js = () => abort("");
var __emscripten_throw_longjmp = () => {
  throw new EmscriptenSjLj();
};
var isLeapYear = (year) =>
  year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
var MONTH_DAYS_LEAP_CUMULATIVE = [
  0, 31, 60, 91, 121, 152, 182, 213, 244, 274, 305, 335,
];
var MONTH_DAYS_REGULAR_CUMULATIVE = [
  0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334,
];
var ydayFromDate = (date) => {
  var leap = isLeapYear(date.getFullYear());
  var monthDaysCumulative = leap
    ? MONTH_DAYS_LEAP_CUMULATIVE
    : MONTH_DAYS_REGULAR_CUMULATIVE;
  var yday = monthDaysCumulative[date.getMonth()] + date.getDate() - 1;
  return yday;
};
var INT53_MAX = 9007199254740992;
var INT53_MIN = -9007199254740992;
var bigintToI53Checked = (num) =>
  num < INT53_MIN || num > INT53_MAX ? NaN : Number(num);
function __localtime_js(time, tmPtr) {
  time = bigintToI53Checked(time);
  var date = new Date(time * 1e3);
  if (isNaN(date.getTime())) {
    return 1;
  }
  HEAP32[tmPtr >> 2] = date.getSeconds();
  HEAP32[(tmPtr + 4) >> 2] = date.getMinutes();
  HEAP32[(tmPtr + 8) >> 2] = date.getHours();
  HEAP32[(tmPtr + 12) >> 2] = date.getDate();
  HEAP32[(tmPtr + 16) >> 2] = date.getMonth();
  HEAP32[(tmPtr + 20) >> 2] = date.getFullYear() - 1900;
  HEAP32[(tmPtr + 24) >> 2] = date.getDay();
  var yday = ydayFromDate(date) | 0;
  HEAP32[(tmPtr + 28) >> 2] = yday;
  HEAP32[(tmPtr + 36) >> 2] = -(date.getTimezoneOffset() * 60);
  var start = new Date(date.getFullYear(), 0, 1);
  var summerOffset = new Date(date.getFullYear(), 6, 1).getTimezoneOffset();
  var winterOffset = start.getTimezoneOffset();
  var dst =
    (summerOffset != winterOffset &&
      date.getTimezoneOffset() == Math.min(winterOffset, summerOffset)) | 0;
  HEAP32[(tmPtr + 32) >> 2] = dst;
  return 0;
}
function __mmap_js(len, prot, flags, fd, offset, allocated, addr) {
  offset = bigintToI53Checked(offset);
  try {
    var stream = SYSCALLS.getStreamFromFD(fd);
    var res = FS.mmap(stream, len, offset, prot, flags);
    var ptr = res.ptr;
    HEAP32[allocated >> 2] = res.allocated;
    HEAPU32[addr >> 2] = ptr;
    return 0;
  } catch (e) {
    if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
    return -e.errno;
  }
}
function __munmap_js(addr, len, prot, flags, fd, offset) {
  offset = bigintToI53Checked(offset);
  try {
    var stream = SYSCALLS.getStreamFromFD(fd);
    if (prot & 2) {
      SYSCALLS.doMsync(addr, stream, len, flags, offset);
    }
  } catch (e) {
    if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
    return -e.errno;
  }
}
var __tzset_js = (timezone, daylight, std_name, dst_name) => {
  var currentYear = new Date().getFullYear();
  var winter = new Date(currentYear, 0, 1);
  var summer = new Date(currentYear, 6, 1);
  var winterOffset = winter.getTimezoneOffset();
  var summerOffset = summer.getTimezoneOffset();
  var stdTimezoneOffset = Math.max(winterOffset, summerOffset);
  HEAPU32[timezone >> 2] = stdTimezoneOffset * 60;
  HEAP32[daylight >> 2] = Number(winterOffset != summerOffset);
  var extractZone = (timezoneOffset) => {
    var sign = timezoneOffset >= 0 ? "-" : "+";
    var absOffset = Math.abs(timezoneOffset);
    var hours = String(Math.floor(absOffset / 60)).padStart(2, "0");
    var minutes = String(absOffset % 60).padStart(2, "0");
    return `UTC${sign}${hours}${minutes}`;
  };
  var winterName = extractZone(winterOffset);
  var summerName = extractZone(summerOffset);
  if (summerOffset < winterOffset) {
    stringToUTF8(winterName, std_name, 17);
    stringToUTF8(summerName, dst_name, 17);
  } else {
    stringToUTF8(winterName, dst_name, 17);
    stringToUTF8(summerName, std_name, 17);
  }
};
var _emscripten_set_main_loop_timing = (mode, value) => {
  MainLoop.timingMode = mode;
  MainLoop.timingValue = value;
  if (!MainLoop.func) {
    return 1;
  }
  if (!MainLoop.running) {
    MainLoop.running = true;
  }
  if (mode == 0) {
    MainLoop.scheduler = function MainLoop_scheduler_setTimeout() {
      var timeUntilNextTick =
        Math.max(0, MainLoop.tickStartTime + value - _emscripten_get_now()) | 0;
      setTimeout(MainLoop.runner, timeUntilNextTick);
    };
  } else if (mode == 1) {
    MainLoop.scheduler = function MainLoop_scheduler_rAF() {
      MainLoop.requestAnimationFrame(MainLoop.runner);
    };
  } else {
    if (!MainLoop.setImmediate) {
      if (globalThis.scheduler) {
        MainLoop.setImmediate = scheduler.postTask.bind(scheduler);
      } else if (globalThis.setImmediate) {
        MainLoop.setImmediate = setImmediate;
      } else {
        var setImmediates = [];
        var emscriptenMainLoopMessageId = "setimmediate";
        var MainLoop_setImmediate_messageHandler = (event) => {
          if (event.data === emscriptenMainLoopMessageId) {
            event.stopPropagation();
            setImmediates.shift()();
          }
        };
        addEventListener("message", MainLoop_setImmediate_messageHandler, true);
        MainLoop.setImmediate = (func) => {
          setImmediates.push(func);
          if (ENVIRONMENT_IS_WORKER) {
            postMessage(emscriptenMainLoopMessageId);
          } else {
            postMessage(emscriptenMainLoopMessageId, "*");
          }
        };
      }
    }
    MainLoop.scheduler = function MainLoop_scheduler_setImmediate() {
      MainLoop.setImmediate(MainLoop.runner);
    };
  }
  return 0;
};
var _emscripten_get_now = () => performance.now();
var runtimeKeepaliveCounter = 0;
var keepRuntimeAlive = () => noExitRuntime || runtimeKeepaliveCounter > 0;
var _proc_exit = (code) => {
  EXITSTATUS = code;
  if (!keepRuntimeAlive()) {
    Module["onExit"]?.(code);
    ABORT = true;
  }
  quit_(code, new ExitStatus(code));
};
var exitJS = (status, implicit) => {
  EXITSTATUS = status;
  _proc_exit(status);
};
var _exit = exitJS;
var handleException = (e) => {
  if (e instanceof ExitStatus || e == "unwind") {
    return EXITSTATUS;
  }
  quit_(1, e);
};
var maybeExit = () => {
  if (!keepRuntimeAlive()) {
    try {
      _exit(EXITSTATUS);
    } catch (e) {
      handleException(e);
    }
  }
};
var setMainLoop = (iterFunc, fps, simulateInfiniteLoop, arg, noSetTiming) => {
  MainLoop.func = iterFunc;
  MainLoop.arg = arg;
  var thisMainLoopId = MainLoop.currentlyRunningMainloop;
  function checkIsRunning() {
    if (thisMainLoopId < MainLoop.currentlyRunningMainloop) {
      maybeExit();
      return false;
    }
    return true;
  }
  MainLoop.running = false;
  MainLoop.runner = function MainLoop_runner() {
    if (ABORT) return;
    if (MainLoop.queue.length > 0) {
      var start = Date.now();
      var blocker = MainLoop.queue.shift();
      blocker.func(blocker.arg);
      if (MainLoop.remainingBlockers) {
        var remaining = MainLoop.remainingBlockers;
        var next = remaining % 1 == 0 ? remaining - 1 : Math.floor(remaining);
        if (blocker.counted) {
          MainLoop.remainingBlockers = next;
        } else {
          next = next + 0.5;
          MainLoop.remainingBlockers = (8 * remaining + next) / 9;
        }
      }
      MainLoop.updateStatus();
      if (!checkIsRunning()) return;
      setTimeout(MainLoop.runner, 0);
      return;
    }
    if (!checkIsRunning()) return;
    MainLoop.currentFrameNumber = (MainLoop.currentFrameNumber + 1) | 0;
    if (
      MainLoop.timingMode == 1 &&
      MainLoop.timingValue > 1 &&
      MainLoop.currentFrameNumber % MainLoop.timingValue != 0
    ) {
      MainLoop.scheduler();
      return;
    } else if (MainLoop.timingMode == 0) {
      MainLoop.tickStartTime = _emscripten_get_now();
    }
    MainLoop.runIter(iterFunc);
    if (!checkIsRunning()) return;
    MainLoop.scheduler();
  };
  if (!noSetTiming) {
    if (fps > 0) {
      _emscripten_set_main_loop_timing(0, 1e3 / fps);
    } else {
      _emscripten_set_main_loop_timing(1, 1);
    }
    MainLoop.scheduler();
  }
  if (simulateInfiniteLoop) {
    throw "unwind";
  }
};
var callUserCallback = (func) => {
  if (ABORT) {
    return;
  }
  try {
    return func();
  } catch (e) {
    handleException(e);
  } finally {
    maybeExit();
  }
};
var MainLoop = {
  running: false,
  scheduler: null,
  currentlyRunningMainloop: 0,
  func: null,
  arg: 0,
  timingMode: 0,
  timingValue: 0,
  currentFrameNumber: 0,
  queue: [],
  preMainLoop: [],
  postMainLoop: [],
  pause() {
    MainLoop.scheduler = null;
    MainLoop.currentlyRunningMainloop++;
  },
  resume() {
    MainLoop.currentlyRunningMainloop++;
    var timingMode = MainLoop.timingMode;
    var timingValue = MainLoop.timingValue;
    var func = MainLoop.func;
    MainLoop.func = null;
    setMainLoop(func, 0, false, MainLoop.arg, true);
    _emscripten_set_main_loop_timing(timingMode, timingValue);
    MainLoop.scheduler();
  },
  updateStatus() {
    if (Module["setStatus"]) {
      var message = Module["statusMessage"] || "Please wait...";
      var remaining = MainLoop.remainingBlockers ?? 0;
      var expected = MainLoop.expectedBlockers ?? 0;
      if (remaining) {
        if (remaining < expected) {
          Module["setStatus"](`{message} ({expected - remaining}/{expected})`);
        } else {
          Module["setStatus"](message);
        }
      } else {
        Module["setStatus"]("");
      }
    }
  },
  init() {},
  runIter(func) {
    if (ABORT) return;
    for (var pre of MainLoop.preMainLoop) {
      if (pre() === false) {
        return;
      }
    }
    callUserCallback(func);
    for (var post of MainLoop.postMainLoop) {
      post();
    }
  },
  nextRAF: 0,
  fakeRequestAnimationFrame(func) {
    var now = Date.now();
    if (MainLoop.nextRAF === 0) {
      MainLoop.nextRAF = now + 1e3 / 60;
    } else {
      while (now + 2 >= MainLoop.nextRAF) {
        MainLoop.nextRAF += 1e3 / 60;
      }
    }
    var delay = Math.max(MainLoop.nextRAF - now, 0);
    setTimeout(func, delay);
  },
  requestAnimationFrame(func) {
    if (globalThis.requestAnimationFrame) {
      requestAnimationFrame(func);
    } else {
      MainLoop.fakeRequestAnimationFrame(func);
    }
  },
};
var AL = {
  QUEUE_INTERVAL: 25,
  QUEUE_LOOKAHEAD: 0.1,
  DEVICE_NAME: "Emscripten OpenAL",
  CAPTURE_DEVICE_NAME: "Emscripten OpenAL capture",
  ALC_EXTENSIONS: {
    ALC_EXT_capture: true,
    ALC_SOFT_pause_device: true,
    ALC_SOFT_HRTF: true,
  },
  AL_EXTENSIONS: {
    AL_EXT_float32: true,
    AL_SOFT_loop_points: true,
    AL_SOFT_source_length: true,
    AL_EXT_source_distance_model: true,
    AL_SOFT_source_spatialize: true,
  },
  _alcErr: 0,
  alcErr: 0,
  deviceRefCounts: {},
  alcStringCache: {},
  paused: false,
  stringCache: {},
  contexts: {},
  currentCtx: null,
  buffers: {
    0: {
      id: 0,
      refCount: 0,
      audioBuf: null,
      frequency: 0,
      bytesPerSample: 2,
      channels: 1,
      length: 0,
    },
  },
  paramArray: [],
  _nextId: 1,
  newId: () => (AL.freeIds.length > 0 ? AL.freeIds.pop() : AL._nextId++),
  freeIds: [],
  scheduleContextAudio: (ctx) => {
    if (MainLoop.timingMode === 1 && document["visibilityState"] != "visible") {
      return;
    }
    for (var i in ctx.sources) {
      AL.scheduleSourceAudio(ctx.sources[i]);
    }
  },
  scheduleSourceAudio: (src, lookahead) => {
    if (MainLoop.timingMode === 1 && document["visibilityState"] != "visible") {
      return;
    }
    if (src.state !== 4114) {
      return;
    }
    var currentTime = AL.updateSourceTime(src);
    var startTime = src.bufStartTime;
    var startOffset = src.bufOffset;
    var bufCursor = src.bufsProcessed;
    for (var i = 0; i < src.audioQueue.length; i++) {
      var audioSrc = src.audioQueue[i];
      startTime = audioSrc._startTime + audioSrc._duration;
      startOffset = 0;
      bufCursor += audioSrc._skipCount + 1;
    }
    if (!lookahead) {
      lookahead = AL.QUEUE_LOOKAHEAD;
    }
    var lookaheadTime = currentTime + lookahead;
    var skipCount = 0;
    while (startTime < lookaheadTime) {
      if (bufCursor >= src.bufQueue.length) {
        if (src.looping) {
          bufCursor %= src.bufQueue.length;
        } else {
          break;
        }
      }
      var buf = src.bufQueue[bufCursor % src.bufQueue.length];
      if (buf.length === 0) {
        skipCount++;
        if (skipCount === src.bufQueue.length) {
          break;
        }
      } else {
        var audioSrc = src.context.audioCtx.createBufferSource();
        audioSrc.buffer = buf.audioBuf;
        audioSrc.playbackRate.value = src.playbackRate;
        if (buf.audioBuf._loopStart || buf.audioBuf._loopEnd) {
          audioSrc.loopStart = buf.audioBuf._loopStart;
          audioSrc.loopEnd = buf.audioBuf._loopEnd;
        }
        var duration = 0;
        if (src.type === 4136 && src.looping) {
          duration = Number.POSITIVE_INFINITY;
          audioSrc.loop = true;
          if (buf.audioBuf._loopStart) {
            audioSrc.loopStart = buf.audioBuf._loopStart;
          }
          if (buf.audioBuf._loopEnd) {
            audioSrc.loopEnd = buf.audioBuf._loopEnd;
          }
        } else {
          duration = (buf.audioBuf.duration - startOffset) / src.playbackRate;
        }
        audioSrc._startOffset = startOffset;
        audioSrc._duration = duration;
        audioSrc._skipCount = skipCount;
        skipCount = 0;
        audioSrc.connect(src.gain);
        if (typeof audioSrc.start != "undefined") {
          startTime = Math.max(startTime, src.context.audioCtx.currentTime);
          audioSrc.start(startTime, startOffset);
        } else if (typeof audioSrc.noteOn != "undefined") {
          startTime = Math.max(startTime, src.context.audioCtx.currentTime);
          audioSrc.noteOn(startTime);
        }
        audioSrc._startTime = startTime;
        src.audioQueue.push(audioSrc);
        startTime += duration;
      }
      startOffset = 0;
      bufCursor++;
    }
  },
  updateSourceTime: (src) => {
    var currentTime = src.context.audioCtx.currentTime;
    if (src.state !== 4114) {
      return currentTime;
    }
    if (!isFinite(src.bufStartTime)) {
      src.bufStartTime = currentTime - src.bufOffset / src.playbackRate;
      src.bufOffset = 0;
    }
    var nextStartTime = 0;
    while (src.audioQueue.length) {
      var audioSrc = src.audioQueue[0];
      src.bufsProcessed += audioSrc._skipCount;
      nextStartTime = audioSrc._startTime + audioSrc._duration;
      if (currentTime < nextStartTime) {
        break;
      }
      src.audioQueue.shift();
      src.bufStartTime = nextStartTime;
      src.bufOffset = 0;
      src.bufsProcessed++;
    }
    if (src.bufsProcessed >= src.bufQueue.length && !src.looping) {
      AL.setSourceState(src, 4116);
    } else if (src.type === 4136 && src.looping) {
      var buf = src.bufQueue[0];
      if (buf.length === 0) {
        src.bufOffset = 0;
      } else {
        var delta = (currentTime - src.bufStartTime) * src.playbackRate;
        var loopStart = buf.audioBuf._loopStart ?? 0;
        var loopEnd = buf.audioBuf._loopEnd ?? buf.audioBuf.duration;
        if (loopEnd <= loopStart) {
          loopEnd = buf.audioBuf.duration;
        }
        if (delta < loopEnd) {
          src.bufOffset = delta;
        } else {
          src.bufOffset =
            loopStart + ((delta - loopStart) % (loopEnd - loopStart));
        }
      }
    } else if (src.audioQueue[0]) {
      src.bufOffset =
        (currentTime - src.audioQueue[0]._startTime) * src.playbackRate;
    } else {
      if (src.type !== 4136 && src.looping) {
        var srcDuration = AL.sourceDuration(src) / src.playbackRate;
        if (srcDuration > 0) {
          src.bufStartTime +=
            Math.floor((currentTime - src.bufStartTime) / srcDuration) *
            srcDuration;
        }
      }
      for (var i = 0; i < src.bufQueue.length; i++) {
        if (src.bufsProcessed >= src.bufQueue.length) {
          if (src.looping) {
            src.bufsProcessed %= src.bufQueue.length;
          } else {
            AL.setSourceState(src, 4116);
            break;
          }
        }
        var buf = src.bufQueue[src.bufsProcessed];
        if (buf.length > 0) {
          nextStartTime =
            src.bufStartTime + buf.audioBuf.duration / src.playbackRate;
          if (currentTime < nextStartTime) {
            src.bufOffset = (currentTime - src.bufStartTime) * src.playbackRate;
            break;
          }
          src.bufStartTime = nextStartTime;
        }
        src.bufOffset = 0;
        src.bufsProcessed++;
      }
    }
    return currentTime;
  },
  cancelPendingSourceAudio: (src) => {
    AL.updateSourceTime(src);
    for (var i = 1; i < src.audioQueue.length; i++) {
      var audioSrc = src.audioQueue[i];
      audioSrc.stop();
    }
    if (src.audioQueue.length > 1) {
      src.audioQueue.length = 1;
    }
  },
  stopSourceAudio: (src) => {
    for (var i = 0; i < src.audioQueue.length; i++) {
      src.audioQueue[i].stop();
    }
    src.audioQueue.length = 0;
  },
  setSourceState: (src, state) => {
    if (state === 4114) {
      if (src.state === 4114 || src.state == 4116) {
        src.bufsProcessed = 0;
        src.bufOffset = 0;
      } else {
      }
      AL.stopSourceAudio(src);
      src.state = 4114;
      src.bufStartTime = Number.NEGATIVE_INFINITY;
      AL.scheduleSourceAudio(src);
    } else if (state === 4115) {
      if (src.state === 4114) {
        AL.updateSourceTime(src);
        AL.stopSourceAudio(src);
        src.state = 4115;
      }
    } else if (state === 4116) {
      if (src.state !== 4113) {
        src.state = 4116;
        src.bufsProcessed = src.bufQueue.length;
        src.bufStartTime = Number.NEGATIVE_INFINITY;
        src.bufOffset = 0;
        AL.stopSourceAudio(src);
      }
    } else if (state === 4113) {
      if (src.state !== 4113) {
        src.state = 4113;
        src.bufsProcessed = 0;
        src.bufStartTime = Number.NEGATIVE_INFINITY;
        src.bufOffset = 0;
        AL.stopSourceAudio(src);
      }
    }
  },
  initSourcePanner: (src) => {
    if (src.type === 4144) {
      return;
    }
    var templateBuf = AL.buffers[0];
    for (var i = 0; i < src.bufQueue.length; i++) {
      if (src.bufQueue[i].id !== 0) {
        templateBuf = src.bufQueue[i];
        break;
      }
    }
    if (
      src.spatialize === 1 ||
      (src.spatialize === 2 && templateBuf.channels === 1)
    ) {
      if (src.panner) {
        return;
      }
      src.panner = src.context.audioCtx.createPanner();
      AL.updateSourceGlobal(src);
      AL.updateSourceSpace(src);
      src.panner.connect(src.context.gain);
      src.gain.disconnect();
      src.gain.connect(src.panner);
    } else {
      if (!src.panner) {
        return;
      }
      src.panner.disconnect();
      src.gain.disconnect();
      src.gain.connect(src.context.gain);
      src.panner = null;
    }
  },
  updateContextGlobal: (ctx) => {
    for (var i in ctx.sources) {
      AL.updateSourceGlobal(ctx.sources[i]);
    }
  },
  updateSourceGlobal: (src) => {
    var panner = src.panner;
    if (!panner) {
      return;
    }
    panner.refDistance = src.refDistance;
    panner.maxDistance = src.maxDistance;
    panner.rolloffFactor = src.rolloffFactor;
    panner.panningModel = src.context.hrtf ? "HRTF" : "equalpower";
    var distanceModel = src.context.sourceDistanceModel
      ? src.distanceModel
      : src.context.distanceModel;
    switch (distanceModel) {
      case 0:
        panner.distanceModel = "inverse";
        panner.refDistance = 340282e33;
        break;
      case 53249:
      case 53250:
        panner.distanceModel = "inverse";
        break;
      case 53251:
      case 53252:
        panner.distanceModel = "linear";
        break;
      case 53253:
      case 53254:
        panner.distanceModel = "exponential";
        break;
    }
  },
  updateListenerSpace: (ctx) => {
    var listener = ctx.audioCtx.listener;
    if (listener.positionX) {
      listener.positionX.value = ctx.listener.position[0];
      listener.positionY.value = ctx.listener.position[1];
      listener.positionZ.value = ctx.listener.position[2];
    } else {
      listener.setPosition(
        ctx.listener.position[0],
        ctx.listener.position[1],
        ctx.listener.position[2],
      );
    }
    if (listener.forwardX) {
      listener.forwardX.value = ctx.listener.direction[0];
      listener.forwardY.value = ctx.listener.direction[1];
      listener.forwardZ.value = ctx.listener.direction[2];
      listener.upX.value = ctx.listener.up[0];
      listener.upY.value = ctx.listener.up[1];
      listener.upZ.value = ctx.listener.up[2];
    } else {
      listener.setOrientation(
        ctx.listener.direction[0],
        ctx.listener.direction[1],
        ctx.listener.direction[2],
        ctx.listener.up[0],
        ctx.listener.up[1],
        ctx.listener.up[2],
      );
    }
    for (var i in ctx.sources) {
      AL.updateSourceSpace(ctx.sources[i]);
    }
  },
  updateSourceSpace: (src) => {
    if (!src.panner) {
      return;
    }
    var panner = src.panner;
    var posX = src.position[0];
    var posY = src.position[1];
    var posZ = src.position[2];
    var dirX = src.direction[0];
    var dirY = src.direction[1];
    var dirZ = src.direction[2];
    var listener = src.context.listener;
    var lPosX = listener.position[0];
    var lPosY = listener.position[1];
    var lPosZ = listener.position[2];
    if (src.relative) {
      var lBackX = -listener.direction[0];
      var lBackY = -listener.direction[1];
      var lBackZ = -listener.direction[2];
      var lUpX = listener.up[0];
      var lUpY = listener.up[1];
      var lUpZ = listener.up[2];
      var inverseMagnitude = (x, y, z) => {
        var length = Math.sqrt(x * x + y * y + z * z);
        if (length < Number.EPSILON) {
          return 0;
        }
        return 1 / length;
      };
      var invMag = inverseMagnitude(lBackX, lBackY, lBackZ);
      lBackX *= invMag;
      lBackY *= invMag;
      lBackZ *= invMag;
      invMag = inverseMagnitude(lUpX, lUpY, lUpZ);
      lUpX *= invMag;
      lUpY *= invMag;
      lUpZ *= invMag;
      var lRightX = lUpY * lBackZ - lUpZ * lBackY;
      var lRightY = lUpZ * lBackX - lUpX * lBackZ;
      var lRightZ = lUpX * lBackY - lUpY * lBackX;
      invMag = inverseMagnitude(lRightX, lRightY, lRightZ);
      lRightX *= invMag;
      lRightY *= invMag;
      lRightZ *= invMag;
      lUpX = lBackY * lRightZ - lBackZ * lRightY;
      lUpY = lBackZ * lRightX - lBackX * lRightZ;
      lUpZ = lBackX * lRightY - lBackY * lRightX;
      var oldX = dirX;
      var oldY = dirY;
      var oldZ = dirZ;
      dirX = oldX * lRightX + oldY * lUpX + oldZ * lBackX;
      dirY = oldX * lRightY + oldY * lUpY + oldZ * lBackY;
      dirZ = oldX * lRightZ + oldY * lUpZ + oldZ * lBackZ;
      oldX = posX;
      oldY = posY;
      oldZ = posZ;
      posX = oldX * lRightX + oldY * lUpX + oldZ * lBackX;
      posY = oldX * lRightY + oldY * lUpY + oldZ * lBackY;
      posZ = oldX * lRightZ + oldY * lUpZ + oldZ * lBackZ;
      posX += lPosX;
      posY += lPosY;
      posZ += lPosZ;
    }
    if (panner.positionX) {
      if (posX != panner.positionX.value) panner.positionX.value = posX;
      if (posY != panner.positionY.value) panner.positionY.value = posY;
      if (posZ != panner.positionZ.value) panner.positionZ.value = posZ;
    } else {
      panner.setPosition(posX, posY, posZ);
    }
    if (panner.orientationX) {
      if (dirX != panner.orientationX.value) panner.orientationX.value = dirX;
      if (dirY != panner.orientationY.value) panner.orientationY.value = dirY;
      if (dirZ != panner.orientationZ.value) panner.orientationZ.value = dirZ;
    } else {
      panner.setOrientation(dirX, dirY, dirZ);
    }
    var oldShift = src.dopplerShift;
    var velX = src.velocity[0];
    var velY = src.velocity[1];
    var velZ = src.velocity[2];
    var lVelX = listener.velocity[0];
    var lVelY = listener.velocity[1];
    var lVelZ = listener.velocity[2];
    if (
      (posX === lPosX && posY === lPosY && posZ === lPosZ) ||
      (velX === lVelX && velY === lVelY && velZ === lVelZ)
    ) {
      src.dopplerShift = 1;
    } else {
      var speedOfSound = src.context.speedOfSound;
      var dopplerFactor = src.context.dopplerFactor;
      var slX = lPosX - posX;
      var slY = lPosY - posY;
      var slZ = lPosZ - posZ;
      var magSl = Math.sqrt(slX * slX + slY * slY + slZ * slZ);
      var vls = (slX * lVelX + slY * lVelY + slZ * lVelZ) / magSl;
      var vss = (slX * velX + slY * velY + slZ * velZ) / magSl;
      vls = Math.min(vls, speedOfSound / dopplerFactor);
      vss = Math.min(vss, speedOfSound / dopplerFactor);
      src.dopplerShift =
        (speedOfSound - dopplerFactor * vls) /
        (speedOfSound - dopplerFactor * vss);
    }
    if (src.dopplerShift !== oldShift) {
      AL.updateSourceRate(src);
    }
  },
  updateSourceRate: (src) => {
    if (src.state === 4114) {
      AL.cancelPendingSourceAudio(src);
      var audioSrc = src.audioQueue[0];
      if (!audioSrc) {
        return;
      }
      var duration;
      if (src.type === 4136 && src.looping) {
        duration = Number.POSITIVE_INFINITY;
      } else {
        duration =
          (audioSrc.buffer.duration - audioSrc._startOffset) / src.playbackRate;
      }
      audioSrc._duration = duration;
      audioSrc.playbackRate.value = src.playbackRate;
      AL.scheduleSourceAudio(src);
    }
  },
  sourceDuration: (src) => {
    var length = 0;
    for (var i = 0; i < src.bufQueue.length; i++) {
      var audioBuf = src.bufQueue[i].audioBuf;
      length += audioBuf ? audioBuf.duration : 0;
    }
    return length;
  },
  sourceTell: (src) => {
    AL.updateSourceTime(src);
    var offset = 0;
    for (var i = 0; i < src.bufsProcessed; i++) {
      if (src.bufQueue[i].audioBuf) {
        offset += src.bufQueue[i].audioBuf.duration;
      }
    }
    offset += src.bufOffset;
    return offset;
  },
  sourceSeek: (src, offset) => {
    var playing = src.state == 4114;
    if (playing) {
      AL.setSourceState(src, 4113);
    }
    if (src.bufQueue[src.bufsProcessed].audioBuf !== null) {
      src.bufsProcessed = 0;
      while (offset > src.bufQueue[src.bufsProcessed].audioBuf.duration) {
        offset -= src.bufQueue[src.bufsProcessed].audioBuf.duration;
        src.bufsProcessed++;
      }
      src.bufOffset = offset;
    }
    if (playing) {
      AL.setSourceState(src, 4114);
    }
  },
  getGlobalParam: (funcname, param) => {
    if (!AL.currentCtx) {
      return null;
    }
    switch (param) {
      case 49152:
        return AL.currentCtx.dopplerFactor;
      case 49155:
        return AL.currentCtx.speedOfSound;
      case 53248:
        return AL.currentCtx.distanceModel;
      default:
        AL.currentCtx.err = 40962;
        return null;
    }
  },
  setGlobalParam: (funcname, param, value) => {
    if (!AL.currentCtx) {
      return;
    }
    switch (param) {
      case 49152:
        if (!Number.isFinite(value) || value < 0) {
          AL.currentCtx.err = 40963;
          return;
        }
        AL.currentCtx.dopplerFactor = value;
        AL.updateListenerSpace(AL.currentCtx);
        break;
      case 49155:
        if (!Number.isFinite(value) || value <= 0) {
          AL.currentCtx.err = 40963;
          return;
        }
        AL.currentCtx.speedOfSound = value;
        AL.updateListenerSpace(AL.currentCtx);
        break;
      case 53248:
        switch (value) {
          case 0:
          case 53249:
          case 53250:
          case 53251:
          case 53252:
          case 53253:
          case 53254:
            AL.currentCtx.distanceModel = value;
            AL.updateContextGlobal(AL.currentCtx);
            break;
          default:
            AL.currentCtx.err = 40963;
            return;
        }
        break;
      default:
        AL.currentCtx.err = 40962;
        return;
    }
  },
  getListenerParam: (funcname, param) => {
    if (!AL.currentCtx) {
      return null;
    }
    switch (param) {
      case 4100:
        return AL.currentCtx.listener.position;
      case 4102:
        return AL.currentCtx.listener.velocity;
      case 4111:
        return AL.currentCtx.listener.direction.concat(
          AL.currentCtx.listener.up,
        );
      case 4106:
        return AL.currentCtx.gain.gain.value;
      default:
        AL.currentCtx.err = 40962;
        return null;
    }
  },
  setListenerParam: (funcname, param, value) => {
    if (!AL.currentCtx) {
      return;
    }
    if (value === null) {
      AL.currentCtx.err = 40962;
      return;
    }
    var listener = AL.currentCtx.listener;
    switch (param) {
      case 4100:
        if (
          !Number.isFinite(value[0]) ||
          !Number.isFinite(value[1]) ||
          !Number.isFinite(value[2])
        ) {
          AL.currentCtx.err = 40963;
          return;
        }
        listener.position[0] = value[0];
        listener.position[1] = value[1];
        listener.position[2] = value[2];
        AL.updateListenerSpace(AL.currentCtx);
        break;
      case 4102:
        if (
          !Number.isFinite(value[0]) ||
          !Number.isFinite(value[1]) ||
          !Number.isFinite(value[2])
        ) {
          AL.currentCtx.err = 40963;
          return;
        }
        listener.velocity[0] = value[0];
        listener.velocity[1] = value[1];
        listener.velocity[2] = value[2];
        AL.updateListenerSpace(AL.currentCtx);
        break;
      case 4106:
        if (!Number.isFinite(value) || value < 0) {
          AL.currentCtx.err = 40963;
          return;
        }
        AL.currentCtx.gain.gain.value = value;
        break;
      case 4111:
        if (
          !Number.isFinite(value[0]) ||
          !Number.isFinite(value[1]) ||
          !Number.isFinite(value[2]) ||
          !Number.isFinite(value[3]) ||
          !Number.isFinite(value[4]) ||
          !Number.isFinite(value[5])
        ) {
          AL.currentCtx.err = 40963;
          return;
        }
        listener.direction[0] = value[0];
        listener.direction[1] = value[1];
        listener.direction[2] = value[2];
        listener.up[0] = value[3];
        listener.up[1] = value[4];
        listener.up[2] = value[5];
        AL.updateListenerSpace(AL.currentCtx);
        break;
      default:
        AL.currentCtx.err = 40962;
        return;
    }
  },
  getBufferParam: (funcname, bufferId, param) => {
    if (!AL.currentCtx) {
      return;
    }
    var buf = AL.buffers[bufferId];
    if (!buf || bufferId === 0) {
      AL.currentCtx.err = 40961;
      return;
    }
    switch (param) {
      case 8193:
        return buf.frequency;
      case 8194:
        return buf.bytesPerSample * 8;
      case 8195:
        return buf.channels;
      case 8196:
        return buf.length * buf.bytesPerSample * buf.channels;
      case 8213:
        if (buf.length === 0) {
          return [0, 0];
        }
        return [
          (buf.audioBuf._loopStart ?? 0) * buf.frequency,
          (buf.audioBuf._loopEnd ?? buf.length) * buf.frequency,
        ];
      default:
        AL.currentCtx.err = 40962;
        return null;
    }
  },
  setBufferParam: (funcname, bufferId, param, value) => {
    if (!AL.currentCtx) {
      return;
    }
    var buf = AL.buffers[bufferId];
    if (!buf || bufferId === 0) {
      AL.currentCtx.err = 40961;
      return;
    }
    if (value === null) {
      AL.currentCtx.err = 40962;
      return;
    }
    switch (param) {
      case 8196:
        if (value !== 0) {
          AL.currentCtx.err = 40963;
          return;
        }
        break;
      case 8213:
        if (
          value[0] < 0 ||
          value[0] > buf.length ||
          value[1] < 0 ||
          value[1] > buf.Length ||
          value[0] >= value[1]
        ) {
          AL.currentCtx.err = 40963;
          return;
        }
        if (buf.refCount > 0) {
          AL.currentCtx.err = 40964;
          return;
        }
        if (buf.audioBuf) {
          buf.audioBuf._loopStart = value[0] / buf.frequency;
          buf.audioBuf._loopEnd = value[1] / buf.frequency;
        }
        break;
      default:
        AL.currentCtx.err = 40962;
        return;
    }
  },
  getSourceParam: (funcname, sourceId, param) => {
    if (!AL.currentCtx) {
      return null;
    }
    var src = AL.currentCtx.sources[sourceId];
    if (!src) {
      AL.currentCtx.err = 40961;
      return null;
    }
    switch (param) {
      case 514:
        return src.relative;
      case 4097:
        return src.coneInnerAngle;
      case 4098:
        return src.coneOuterAngle;
      case 4099:
        return src.pitch;
      case 4100:
        return src.position;
      case 4101:
        return src.direction;
      case 4102:
        return src.velocity;
      case 4103:
        return src.looping;
      case 4105:
        if (src.type === 4136) {
          return src.bufQueue[0].id;
        }
        return 0;
      case 4106:
        return src.gain.gain.value;
      case 4109:
        return src.minGain;
      case 4110:
        return src.maxGain;
      case 4112:
        return src.state;
      case 4117:
        if (src.bufQueue.length === 1 && src.bufQueue[0].id === 0) {
          return 0;
        }
        return src.bufQueue.length;
      case 4118:
        if (
          (src.bufQueue.length === 1 && src.bufQueue[0].id === 0) ||
          src.looping
        ) {
          return 0;
        }
        return src.bufsProcessed;
      case 4128:
        return src.refDistance;
      case 4129:
        return src.rolloffFactor;
      case 4130:
        return src.coneOuterGain;
      case 4131:
        return src.maxDistance;
      case 4132:
        return AL.sourceTell(src);
      case 4133:
        var offset = AL.sourceTell(src);
        if (offset > 0) {
          offset *= src.bufQueue[0].frequency;
        }
        return offset;
      case 4134:
        var offset = AL.sourceTell(src);
        if (offset > 0) {
          offset *= src.bufQueue[0].frequency * src.bufQueue[0].bytesPerSample;
        }
        return offset;
      case 4135:
        return src.type;
      case 4628:
        return src.spatialize;
      case 8201:
        var length = 0;
        var bytesPerFrame = 0;
        for (var i = 0; i < src.bufQueue.length; i++) {
          length += src.bufQueue[i].length;
          if (src.bufQueue[i].id !== 0) {
            bytesPerFrame =
              src.bufQueue[i].bytesPerSample * src.bufQueue[i].channels;
          }
        }
        return length * bytesPerFrame;
      case 8202:
        var length = 0;
        for (var i = 0; i < src.bufQueue.length; i++) {
          length += src.bufQueue[i].length;
        }
        return length;
      case 8203:
        return AL.sourceDuration(src);
      case 53248:
        return src.distanceModel;
      default:
        AL.currentCtx.err = 40962;
        return null;
    }
  },
  setSourceParam: (funcname, sourceId, param, value) => {
    if (!AL.currentCtx) {
      return;
    }
    var src = AL.currentCtx.sources[sourceId];
    if (!src) {
      AL.currentCtx.err = 40961;
      return;
    }
    if (value === null) {
      AL.currentCtx.err = 40962;
      return;
    }
    switch (param) {
      case 514:
        if (value === 1) {
          src.relative = true;
          AL.updateSourceSpace(src);
        } else if (value === 0) {
          src.relative = false;
          AL.updateSourceSpace(src);
        } else {
          AL.currentCtx.err = 40963;
          return;
        }
        break;
      case 4097:
        if (!Number.isFinite(value)) {
          AL.currentCtx.err = 40963;
          return;
        }
        src.coneInnerAngle = value;
        if (src.panner) {
          src.panner.coneInnerAngle = value % 360;
        }
        break;
      case 4098:
        if (!Number.isFinite(value)) {
          AL.currentCtx.err = 40963;
          return;
        }
        src.coneOuterAngle = value;
        if (src.panner) {
          src.panner.coneOuterAngle = value % 360;
        }
        break;
      case 4099:
        if (!Number.isFinite(value) || value <= 0) {
          AL.currentCtx.err = 40963;
          return;
        }
        if (src.pitch === value) {
          break;
        }
        src.pitch = value;
        AL.updateSourceRate(src);
        break;
      case 4100:
        if (
          !Number.isFinite(value[0]) ||
          !Number.isFinite(value[1]) ||
          !Number.isFinite(value[2])
        ) {
          AL.currentCtx.err = 40963;
          return;
        }
        src.position[0] = value[0];
        src.position[1] = value[1];
        src.position[2] = value[2];
        AL.updateSourceSpace(src);
        break;
      case 4101:
        if (
          !Number.isFinite(value[0]) ||
          !Number.isFinite(value[1]) ||
          !Number.isFinite(value[2])
        ) {
          AL.currentCtx.err = 40963;
          return;
        }
        src.direction[0] = value[0];
        src.direction[1] = value[1];
        src.direction[2] = value[2];
        AL.updateSourceSpace(src);
        break;
      case 4102:
        if (
          !Number.isFinite(value[0]) ||
          !Number.isFinite(value[1]) ||
          !Number.isFinite(value[2])
        ) {
          AL.currentCtx.err = 40963;
          return;
        }
        src.velocity[0] = value[0];
        src.velocity[1] = value[1];
        src.velocity[2] = value[2];
        AL.updateSourceSpace(src);
        break;
      case 4103:
        if (value === 1) {
          src.looping = true;
          AL.updateSourceTime(src);
          if (src.type === 4136 && src.audioQueue.length > 0) {
            var audioSrc = src.audioQueue[0];
            audioSrc.loop = true;
            audioSrc._duration = Number.POSITIVE_INFINITY;
          }
        } else if (value === 0) {
          src.looping = false;
          var currentTime = AL.updateSourceTime(src);
          if (src.type === 4136 && src.audioQueue.length > 0) {
            var audioSrc = src.audioQueue[0];
            audioSrc.loop = false;
            audioSrc._duration =
              src.bufQueue[0].audioBuf.duration / src.playbackRate;
            audioSrc._startTime =
              currentTime - src.bufOffset / src.playbackRate;
          }
        } else {
          AL.currentCtx.err = 40963;
          return;
        }
        break;
      case 4105:
        if (src.state === 4114 || src.state === 4115) {
          AL.currentCtx.err = 40964;
          return;
        }
        if (value === 0) {
          for (var i in src.bufQueue) {
            src.bufQueue[i].refCount--;
          }
          src.bufQueue.length = 1;
          src.bufQueue[0] = AL.buffers[0];
          src.bufsProcessed = 0;
          src.type = 4144;
        } else {
          var buf = AL.buffers[value];
          if (!buf) {
            AL.currentCtx.err = 40963;
            return;
          }
          for (var i in src.bufQueue) {
            src.bufQueue[i].refCount--;
          }
          src.bufQueue.length = 0;
          buf.refCount++;
          src.bufQueue = [buf];
          src.bufsProcessed = 0;
          src.type = 4136;
        }
        AL.initSourcePanner(src);
        AL.scheduleSourceAudio(src);
        break;
      case 4106:
        if (!Number.isFinite(value) || value < 0) {
          AL.currentCtx.err = 40963;
          return;
        }
        src.gain.gain.value = value;
        break;
      case 4109:
        if (
          !Number.isFinite(value) ||
          value < 0 ||
          value > Math.min(src.maxGain, 1)
        ) {
          AL.currentCtx.err = 40963;
          return;
        }
        src.minGain = value;
        break;
      case 4110:
        if (
          !Number.isFinite(value) ||
          value < Math.max(0, src.minGain) ||
          value > 1
        ) {
          AL.currentCtx.err = 40963;
          return;
        }
        src.maxGain = value;
        break;
      case 4128:
        if (!Number.isFinite(value) || value < 0) {
          AL.currentCtx.err = 40963;
          return;
        }
        src.refDistance = value;
        if (src.panner) {
          src.panner.refDistance = value;
        }
        break;
      case 4129:
        if (!Number.isFinite(value) || value < 0) {
          AL.currentCtx.err = 40963;
          return;
        }
        src.rolloffFactor = value;
        if (src.panner) {
          src.panner.rolloffFactor = value;
        }
        break;
      case 4130:
        if (!Number.isFinite(value) || value < 0 || value > 1) {
          AL.currentCtx.err = 40963;
          return;
        }
        src.coneOuterGain = value;
        if (src.panner) {
          src.panner.coneOuterGain = value;
        }
        break;
      case 4131:
        if (!Number.isFinite(value) || value < 0) {
          AL.currentCtx.err = 40963;
          return;
        }
        src.maxDistance = value;
        if (src.panner) {
          src.panner.maxDistance = value;
        }
        break;
      case 4132:
        if (value < 0 || value > AL.sourceDuration(src)) {
          AL.currentCtx.err = 40963;
          return;
        }
        AL.sourceSeek(src, value);
        break;
      case 4133:
        var srcLen = AL.sourceDuration(src);
        if (srcLen > 0) {
          var frequency;
          for (var bufId in src.bufQueue) {
            if (bufId) {
              frequency = src.bufQueue[bufId].frequency;
              break;
            }
          }
          value /= frequency;
        }
        if (value < 0 || value > srcLen) {
          AL.currentCtx.err = 40963;
          return;
        }
        AL.sourceSeek(src, value);
        break;
      case 4134:
        var srcLen = AL.sourceDuration(src);
        if (srcLen > 0) {
          var bytesPerSec;
          for (var bufId in src.bufQueue) {
            if (bufId) {
              var buf = src.bufQueue[bufId];
              bytesPerSec = buf.frequency * buf.bytesPerSample * buf.channels;
              break;
            }
          }
          value /= bytesPerSec;
        }
        if (value < 0 || value > srcLen) {
          AL.currentCtx.err = 40963;
          return;
        }
        AL.sourceSeek(src, value);
        break;
      case 4628:
        if (value !== 0 && value !== 1 && value !== 2) {
          AL.currentCtx.err = 40963;
          return;
        }
        src.spatialize = value;
        AL.initSourcePanner(src);
        break;
      case 8201:
      case 8202:
      case 8203:
        AL.currentCtx.err = 40964;
        break;
      case 53248:
        switch (value) {
          case 0:
          case 53249:
          case 53250:
          case 53251:
          case 53252:
          case 53253:
          case 53254:
            src.distanceModel = value;
            if (AL.currentCtx.sourceDistanceModel) {
              AL.updateContextGlobal(AL.currentCtx);
            }
            break;
          default:
            AL.currentCtx.err = 40963;
            return;
        }
        break;
      default:
        AL.currentCtx.err = 40962;
        return;
    }
  },
  captures: {},
  sharedCaptureAudioCtx: null,
  requireValidCaptureDevice: (deviceId, funcname) => {
    if (deviceId === 0) {
      AL.alcErr = 40961;
      return null;
    }
    var c = AL.captures[deviceId];
    if (!c) {
      AL.alcErr = 40961;
      return null;
    }
    var err = c.mediaStreamError;
    if (err) {
      AL.alcErr = 40961;
      return null;
    }
    return c;
  },
};
var _alBufferData = (bufferId, format, pData, size, freq) => {
  if (!AL.currentCtx) {
    return;
  }
  var buf = AL.buffers[bufferId];
  if (!buf) {
    AL.currentCtx.err = 40963;
    return;
  }
  if (freq <= 0) {
    AL.currentCtx.err = 40963;
    return;
  }
  var audioBuf = null;
  try {
    switch (format) {
      case 4352:
        if (size > 0) {
          audioBuf = AL.currentCtx.audioCtx.createBuffer(1, size, freq);
          var channel0 = audioBuf.getChannelData(0);
          for (var i = 0; i < size; ++i) {
            channel0[i] = HEAPU8[pData++] * 0.0078125 - 1;
          }
        }
        buf.bytesPerSample = 1;
        buf.channels = 1;
        buf.length = size;
        break;
      case 4353:
        if (size > 0) {
          audioBuf = AL.currentCtx.audioCtx.createBuffer(1, size >> 1, freq);
          var channel0 = audioBuf.getChannelData(0);
          pData >>= 1;
          for (var i = 0; i < size >> 1; ++i) {
            channel0[i] = HEAP16[pData++] * 30517578125e-15;
          }
        }
        buf.bytesPerSample = 2;
        buf.channels = 1;
        buf.length = size >> 1;
        break;
      case 4354:
        if (size > 0) {
          audioBuf = AL.currentCtx.audioCtx.createBuffer(2, size >> 1, freq);
          var channel0 = audioBuf.getChannelData(0);
          var channel1 = audioBuf.getChannelData(1);
          for (var i = 0; i < size >> 1; ++i) {
            channel0[i] = HEAPU8[pData++] * 0.0078125 - 1;
            channel1[i] = HEAPU8[pData++] * 0.0078125 - 1;
          }
        }
        buf.bytesPerSample = 1;
        buf.channels = 2;
        buf.length = size >> 1;
        break;
      case 4355:
        if (size > 0) {
          audioBuf = AL.currentCtx.audioCtx.createBuffer(2, size >> 2, freq);
          var channel0 = audioBuf.getChannelData(0);
          var channel1 = audioBuf.getChannelData(1);
          pData >>= 1;
          for (var i = 0; i < size >> 2; ++i) {
            channel0[i] = HEAP16[pData++] * 30517578125e-15;
            channel1[i] = HEAP16[pData++] * 30517578125e-15;
          }
        }
        buf.bytesPerSample = 2;
        buf.channels = 2;
        buf.length = size >> 2;
        break;
      case 65552:
        if (size > 0) {
          audioBuf = AL.currentCtx.audioCtx.createBuffer(1, size >> 2, freq);
          var channel0 = audioBuf.getChannelData(0);
          pData >>= 2;
          for (var i = 0; i < size >> 2; ++i) {
            channel0[i] = HEAPF32[pData++];
          }
        }
        buf.bytesPerSample = 4;
        buf.channels = 1;
        buf.length = size >> 2;
        break;
      case 65553:
        if (size > 0) {
          audioBuf = AL.currentCtx.audioCtx.createBuffer(2, size >> 3, freq);
          var channel0 = audioBuf.getChannelData(0);
          var channel1 = audioBuf.getChannelData(1);
          pData >>= 2;
          for (var i = 0; i < size >> 3; ++i) {
            channel0[i] = HEAPF32[pData++];
            channel1[i] = HEAPF32[pData++];
          }
        }
        buf.bytesPerSample = 4;
        buf.channels = 2;
        buf.length = size >> 3;
        break;
      default:
        AL.currentCtx.err = 40963;
        return;
    }
    buf.frequency = freq;
    buf.audioBuf = audioBuf;
  } catch (e) {
    AL.currentCtx.err = 40963;
    return;
  }
};
var _alDeleteBuffers = (count, pBufferIds) => {
  if (!AL.currentCtx) {
    return;
  }
  for (var i = 0; i < count; ++i) {
    var bufId = HEAP32[(pBufferIds + i * 4) >> 2];
    if (bufId === 0) {
      continue;
    }
    if (!AL.buffers[bufId]) {
      AL.currentCtx.err = 40961;
      return;
    }
    if (AL.buffers[bufId].refCount) {
      AL.currentCtx.err = 40964;
      return;
    }
  }
  for (var i = 0; i < count; ++i) {
    var bufId = HEAP32[(pBufferIds + i * 4) >> 2];
    if (bufId === 0) {
      continue;
    }
    AL.deviceRefCounts[AL.buffers[bufId].deviceId]--;
    delete AL.buffers[bufId];
    AL.freeIds.push(bufId);
  }
};
var _alSourcei = (sourceId, param, value) => {
  switch (param) {
    case 514:
    case 4097:
    case 4098:
    case 4103:
    case 4105:
    case 4128:
    case 4129:
    case 4131:
    case 4132:
    case 4133:
    case 4134:
    case 4628:
    case 8201:
    case 8202:
    case 53248:
      AL.setSourceParam("alSourcei", sourceId, param, value);
      break;
    default:
      AL.setSourceParam("alSourcei", sourceId, param, null);
      break;
  }
};
var _alDeleteSources = (count, pSourceIds) => {
  if (!AL.currentCtx) {
    return;
  }
  for (var i = 0; i < count; ++i) {
    var srcId = HEAP32[(pSourceIds + i * 4) >> 2];
    if (!AL.currentCtx.sources[srcId]) {
      AL.currentCtx.err = 40961;
      return;
    }
  }
  for (var i = 0; i < count; ++i) {
    var srcId = HEAP32[(pSourceIds + i * 4) >> 2];
    AL.setSourceState(AL.currentCtx.sources[srcId], 4116);
    _alSourcei(srcId, 4105, 0);
    delete AL.currentCtx.sources[srcId];
    AL.freeIds.push(srcId);
  }
};
var _alDistanceModel = (model) => {
  AL.setGlobalParam("alDistanceModel", 53248, model);
};
var _alDopplerFactor = (value) => {
  AL.setGlobalParam("alDopplerFactor", 49152, value);
};
var _alGenBuffers = (count, pBufferIds) => {
  if (!AL.currentCtx) {
    return;
  }
  for (var i = 0; i < count; ++i) {
    var buf = {
      deviceId: AL.currentCtx.deviceId,
      id: AL.newId(),
      refCount: 0,
      audioBuf: null,
      frequency: 0,
      bytesPerSample: 2,
      channels: 1,
      length: 0,
    };
    AL.deviceRefCounts[buf.deviceId]++;
    AL.buffers[buf.id] = buf;
    HEAP32[(pBufferIds + i * 4) >> 2] = buf.id;
  }
};
var _alGenSources = (count, pSourceIds) => {
  if (!AL.currentCtx) {
    return;
  }
  for (var i = 0; i < count; ++i) {
    var gain = AL.currentCtx.audioCtx.createGain();
    gain.connect(AL.currentCtx.gain);
    var src = {
      context: AL.currentCtx,
      id: AL.newId(),
      type: 4144,
      state: 4113,
      bufQueue: [AL.buffers[0]],
      audioQueue: [],
      looping: false,
      pitch: 1,
      dopplerShift: 1,
      gain,
      minGain: 0,
      maxGain: 1,
      panner: null,
      bufsProcessed: 0,
      bufStartTime: Number.NEGATIVE_INFINITY,
      bufOffset: 0,
      relative: false,
      refDistance: 1,
      maxDistance: 340282e33,
      rolloffFactor: 1,
      position: [0, 0, 0],
      velocity: [0, 0, 0],
      direction: [0, 0, 0],
      coneOuterGain: 0,
      coneInnerAngle: 360,
      coneOuterAngle: 360,
      distanceModel: 53250,
      spatialize: 2,
      get playbackRate() {
        return this.pitch * this.dopplerShift;
      },
    };
    AL.currentCtx.sources[src.id] = src;
    HEAP32[(pSourceIds + i * 4) >> 2] = src.id;
  }
};
var _alGetError = () => {
  if (!AL.currentCtx) {
    return 40964;
  }
  var err = AL.currentCtx.err;
  AL.currentCtx.err = 0;
  return err;
};
var _alGetSourcei = (sourceId, param, pValue) => {
  var val = AL.getSourceParam("alGetSourcei", sourceId, param);
  if (val === null) {
    return;
  }
  if (!pValue) {
    AL.currentCtx.err = 40963;
    return;
  }
  switch (param) {
    case 514:
    case 4097:
    case 4098:
    case 4103:
    case 4105:
    case 4112:
    case 4117:
    case 4118:
    case 4128:
    case 4129:
    case 4131:
    case 4132:
    case 4133:
    case 4134:
    case 4135:
    case 4628:
    case 8201:
    case 8202:
    case 53248:
      HEAP32[pValue >> 2] = val;
      break;
    default:
      AL.currentCtx.err = 40962;
      return;
  }
};
var _alListenerfv = (param, pValues) => {
  if (!AL.currentCtx) {
    return;
  }
  if (!pValues) {
    AL.currentCtx.err = 40963;
    return;
  }
  switch (param) {
    case 4100:
    case 4102:
      AL.paramArray[0] = HEAPF32[pValues >> 2];
      AL.paramArray[1] = HEAPF32[(pValues + 4) >> 2];
      AL.paramArray[2] = HEAPF32[(pValues + 8) >> 2];
      AL.setListenerParam("alListenerfv", param, AL.paramArray);
      break;
    case 4111:
      AL.paramArray[0] = HEAPF32[pValues >> 2];
      AL.paramArray[1] = HEAPF32[(pValues + 4) >> 2];
      AL.paramArray[2] = HEAPF32[(pValues + 8) >> 2];
      AL.paramArray[3] = HEAPF32[(pValues + 12) >> 2];
      AL.paramArray[4] = HEAPF32[(pValues + 16) >> 2];
      AL.paramArray[5] = HEAPF32[(pValues + 20) >> 2];
      AL.setListenerParam("alListenerfv", param, AL.paramArray);
      break;
    default:
      AL.setListenerParam("alListenerfv", param, null);
      break;
  }
};
var _alSource3f = (sourceId, param, value0, value1, value2) => {
  switch (param) {
    case 4100:
    case 4101:
    case 4102:
      AL.paramArray[0] = value0;
      AL.paramArray[1] = value1;
      AL.paramArray[2] = value2;
      AL.setSourceParam("alSource3f", sourceId, param, AL.paramArray);
      break;
    default:
      AL.setSourceParam("alSource3f", sourceId, param, null);
      break;
  }
};
var _alSourcePause = (sourceId) => {
  if (!AL.currentCtx) {
    return;
  }
  var src = AL.currentCtx.sources[sourceId];
  if (!src) {
    AL.currentCtx.err = 40961;
    return;
  }
  AL.setSourceState(src, 4115);
};
var _alSourcePlay = (sourceId) => {
  if (!AL.currentCtx) {
    return;
  }
  var src = AL.currentCtx.sources[sourceId];
  if (!src) {
    AL.currentCtx.err = 40961;
    return;
  }
  AL.setSourceState(src, 4114);
};
var _alSourceQueueBuffers = (sourceId, count, pBufferIds) => {
  if (!AL.currentCtx) {
    return;
  }
  var src = AL.currentCtx.sources[sourceId];
  if (!src) {
    AL.currentCtx.err = 40961;
    return;
  }
  if (src.type === 4136) {
    AL.currentCtx.err = 40964;
    return;
  }
  if (count === 0) {
    return;
  }
  var templateBuf = AL.buffers[0];
  for (var buf of src.bufQueue) {
    if (buf.id !== 0) {
      templateBuf = buf;
      break;
    }
  }
  for (var i = 0; i < count; ++i) {
    var bufId = HEAP32[(pBufferIds + i * 4) >> 2];
    var buf = AL.buffers[bufId];
    if (!buf) {
      AL.currentCtx.err = 40961;
      return;
    }
    if (
      templateBuf.id !== 0 &&
      (buf.frequency !== templateBuf.frequency ||
        buf.bytesPerSample !== templateBuf.bytesPerSample ||
        buf.channels !== templateBuf.channels)
    ) {
      AL.currentCtx.err = 40964;
    }
  }
  if (src.bufQueue.length === 1 && src.bufQueue[0].id === 0) {
    src.bufQueue.length = 0;
  }
  src.type = 4137;
  for (var i = 0; i < count; ++i) {
    var bufId = HEAP32[(pBufferIds + i * 4) >> 2];
    var buf = AL.buffers[bufId];
    buf.refCount++;
    src.bufQueue.push(buf);
  }
  if (src.looping) {
    AL.cancelPendingSourceAudio(src);
  }
  AL.initSourcePanner(src);
  AL.scheduleSourceAudio(src);
};
var _alSourceStop = (sourceId) => {
  if (!AL.currentCtx) {
    return;
  }
  var src = AL.currentCtx.sources[sourceId];
  if (!src) {
    AL.currentCtx.err = 40961;
    return;
  }
  AL.setSourceState(src, 4116);
};
var _alSourceUnqueueBuffers = (sourceId, count, pBufferIds) => {
  if (!AL.currentCtx) {
    return;
  }
  var src = AL.currentCtx.sources[sourceId];
  if (!src) {
    AL.currentCtx.err = 40961;
    return;
  }
  if (
    count >
    (src.bufQueue.length === 1 && src.bufQueue[0].id === 0
      ? 0
      : src.bufsProcessed)
  ) {
    AL.currentCtx.err = 40963;
    return;
  }
  if (count === 0) {
    return;
  }
  for (var i = 0; i < count; i++) {
    var buf = src.bufQueue.shift();
    buf.refCount--;
    HEAP32[(pBufferIds + i * 4) >> 2] = buf.id;
    src.bufsProcessed--;
  }
  if (src.bufQueue.length === 0) {
    src.bufQueue.push(AL.buffers[0]);
  }
  AL.initSourcePanner(src);
  AL.scheduleSourceAudio(src);
};
var _alSourcef = (sourceId, param, value) => {
  switch (param) {
    case 4097:
    case 4098:
    case 4099:
    case 4106:
    case 4109:
    case 4110:
    case 4128:
    case 4129:
    case 4130:
    case 4131:
    case 4132:
    case 4133:
    case 4134:
    case 8203:
      AL.setSourceParam("alSourcef", sourceId, param, value);
      break;
    default:
      AL.setSourceParam("alSourcef", sourceId, param, null);
      break;
  }
};
var _alSourcefv = (sourceId, param, pValues) => {
  if (!AL.currentCtx) {
    return;
  }
  if (!pValues) {
    AL.currentCtx.err = 40963;
    return;
  }
  switch (param) {
    case 4097:
    case 4098:
    case 4099:
    case 4106:
    case 4109:
    case 4110:
    case 4128:
    case 4129:
    case 4130:
    case 4131:
    case 4132:
    case 4133:
    case 4134:
    case 8203:
      var val = HEAPF32[pValues >> 2];
      AL.setSourceParam("alSourcefv", sourceId, param, val);
      break;
    case 4100:
    case 4101:
    case 4102:
      AL.paramArray[0] = HEAPF32[pValues >> 2];
      AL.paramArray[1] = HEAPF32[(pValues + 4) >> 2];
      AL.paramArray[2] = HEAPF32[(pValues + 8) >> 2];
      AL.setSourceParam("alSourcefv", sourceId, param, AL.paramArray);
      break;
    default:
      AL.setSourceParam("alSourcefv", sourceId, param, null);
      break;
  }
};
var _alcCloseDevice = (deviceId) => {
  if (!(deviceId in AL.deviceRefCounts) || AL.deviceRefCounts[deviceId] > 0) {
    return 0;
  }
  delete AL.deviceRefCounts[deviceId];
  AL.freeIds.push(deviceId);
  return 1;
};
var autoResumeAudioContext = (ctx) => {
  for (var event of ["keydown", "mousedown", "touchstart"]) {
    for (var element of [document, document.getElementById("canvas")]) {
      element?.addEventListener(
        event,
        () => {
          if (ctx.state === "suspended") ctx.resume();
        },
        { once: true },
      );
    }
  }
};
var _alcCreateContext = (deviceId, pAttrList) => {
  if (!(deviceId in AL.deviceRefCounts)) {
    AL.alcErr = 40961;
    return 0;
  }
  var options = null;
  var attrs = [];
  var hrtf = null;
  pAttrList >>= 2;
  if (pAttrList) {
    var attr = 0;
    var val = 0;
    while (true) {
      attr = HEAP32[pAttrList++];
      attrs.push(attr);
      if (attr === 0) {
        break;
      }
      val = HEAP32[pAttrList++];
      attrs.push(val);
      switch (attr) {
        case 4103:
          if (!options) {
            options = {};
          }
          options.sampleRate = val;
          break;
        case 4112:
        case 4113:
          break;
        case 6546:
          switch (val) {
            case 0:
              hrtf = false;
              break;
            case 1:
              hrtf = true;
              break;
            case 2:
              break;
            default:
              AL.alcErr = 40964;
              return 0;
          }
          break;
        case 6550:
          if (val !== 0) {
            AL.alcErr = 40964;
            return 0;
          }
          break;
        default:
          AL.alcErr = 40964;
          return 0;
      }
    }
  }
  var AudioContext = window.AudioContext || window.webkitAudioContext;
  var ac = null;
  try {
    if (options) {
      ac = new AudioContext(options);
    } else {
      ac = new AudioContext();
    }
  } catch (e) {
    if (e.name === "NotSupportedError") {
      AL.alcErr = 40964;
    } else {
      AL.alcErr = 40961;
    }
    return 0;
  }
  autoResumeAudioContext(ac);
  if (typeof ac.createGain == "undefined") {
    ac.createGain = ac.createGainNode;
  }
  var gain = ac.createGain();
  gain.connect(ac.destination);
  var ctx = {
    deviceId,
    id: AL.newId(),
    attrs,
    audioCtx: ac,
    listener: {
      position: [0, 0, 0],
      velocity: [0, 0, 0],
      direction: [0, 0, 0],
      up: [0, 0, 0],
    },
    sources: [],
    interval: setInterval(
      () => AL.scheduleContextAudio(ctx),
      AL.QUEUE_INTERVAL,
    ),
    gain,
    distanceModel: 53250,
    speedOfSound: 343.3,
    dopplerFactor: 1,
    sourceDistanceModel: false,
    hrtf: hrtf || false,
    _err: 0,
    get err() {
      return this._err;
    },
    set err(val) {
      if (this._err === 0 || val === 0) {
        this._err = val;
      }
    },
  };
  AL.deviceRefCounts[deviceId]++;
  AL.contexts[ctx.id] = ctx;
  if (hrtf !== null) {
    for (var ctxId in AL.contexts) {
      var c = AL.contexts[ctxId];
      if (c.deviceId === deviceId) {
        c.hrtf = hrtf;
        AL.updateContextGlobal(c);
      }
    }
  }
  return ctx.id;
};
var _alcDestroyContext = (contextId) => {
  var ctx = AL.contexts[contextId];
  if (AL.currentCtx === ctx) {
    AL.alcErr = 40962;
    return;
  }
  if (AL.contexts[contextId].interval) {
    clearInterval(AL.contexts[contextId].interval);
  }
  AL.deviceRefCounts[ctx.deviceId]--;
  delete AL.contexts[contextId];
  AL.freeIds.push(contextId);
};
var _alcMakeContextCurrent = (contextId) => {
  if (contextId === 0) {
    AL.currentCtx = null;
  } else {
    AL.currentCtx = AL.contexts[contextId];
  }
  return 1;
};
var _alcOpenDevice = (pDeviceName) => {
  if (pDeviceName) {
    var name = UTF8ToString(pDeviceName);
    if (name !== AL.DEVICE_NAME) {
      return 0;
    }
  }
  if (globalThis.AudioContext || globalThis.webkitAudioContext) {
    var deviceId = AL.newId();
    AL.deviceRefCounts[deviceId] = 0;
    return deviceId;
  }
  return 0;
};
var _emscripten_date_now = () => Date.now();
function getFullscreenElement() {
  return (
    document.fullscreenElement ||
    document.mozFullScreenElement ||
    document.webkitFullscreenElement ||
    document.webkitCurrentFullScreenElement ||
    document.msFullscreenElement
  );
}
var safeSetTimeout = (func, timeout) =>
  setTimeout(() => {
    callUserCallback(func);
  }, timeout);
var warnOnce = (text) => {
  warnOnce.shown ||= {};
  if (!warnOnce.shown[text]) {
    warnOnce.shown[text] = 1;
    if (ENVIRONMENT_IS_NODE) text = "warning: " + text;
    err(text);
  }
};
var Browser = {
  useWebGL: false,
  isFullscreen: false,
  pointerLock: false,
  moduleContextCreatedCallbacks: [],
  preloadedImages: {},
  preloadedAudios: {},
  getCanvas: () => Module["canvas"],
  init() {
    if (Browser.initted) return;
    Browser.initted = true;
    var imagePlugin = {};
    imagePlugin["canHandle"] = (name) =>
      !Module["noImageDecoding"] && /\.(jpg|jpeg|png|bmp|webp)$/i.test(name);
    imagePlugin["handle"] = async (byteArray, name) => {
      var b = new Blob([byteArray], { type: Browser.getMimetype(name) });
      if (b.size !== byteArray.length) {
        b = new Blob([new Uint8Array(byteArray).buffer], {
          type: Browser.getMimetype(name),
        });
      }
      var url = URL.createObjectURL(b);
      return new Promise((resolve, reject) => {
        var img = new Image();
        img.onload = () => {
          var canvas = document.createElement("canvas");
          canvas.width = img.width;
          canvas.height = img.height;
          var ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0);
          Browser.preloadedImages[name] = canvas;
          URL.revokeObjectURL(url);
          resolve(byteArray);
        };
        img.onerror = (event) => {
          err(`Image ${url} could not be decoded`);
          reject();
        };
        img.src = url;
      });
    };
    preloadPlugins.push(imagePlugin);
    var audioPlugin = {};
    audioPlugin["canHandle"] = (name) =>
      !Module["noAudioDecoding"] &&
      name.slice(-4) in { ".ogg": 1, ".wav": 1, ".mp3": 1 };
    audioPlugin["handle"] = async (byteArray, name) =>
      new Promise((resolve, reject) => {
        var done = false;
        function finish(audio) {
          if (done) return;
          done = true;
          Browser.preloadedAudios[name] = audio;
          resolve(byteArray);
        }
        var b = new Blob([byteArray], { type: Browser.getMimetype(name) });
        var url = URL.createObjectURL(b);
        var audio = new Audio();
        audio.addEventListener("canplaythrough", () => finish(audio));
        audio.onerror = (event) => {
          if (done) return;
          err(
            `warning: browser could not fully decode audio ${name}, trying slower base64 approach`,
          );
          function encode64(data) {
            var BASE =
              "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
            var PAD = "=";
            var ret = "";
            var leftchar = 0;
            var leftbits = 0;
            for (var i = 0; i < data.length; i++) {
              leftchar = (leftchar << 8) | data[i];
              leftbits += 8;
              while (leftbits >= 6) {
                var curr = (leftchar >> (leftbits - 6)) & 63;
                leftbits -= 6;
                ret += BASE[curr];
              }
            }
            if (leftbits == 2) {
              ret += BASE[(leftchar & 3) << 4];
              ret += PAD + PAD;
            } else if (leftbits == 4) {
              ret += BASE[(leftchar & 15) << 2];
              ret += PAD;
            }
            return ret;
          }
          audio.src =
            "data:audio/x-" + name.slice(-3) + ";base64," + encode64(byteArray);
          finish(audio);
        };
        audio.src = url;
        safeSetTimeout(() => {
          finish(audio);
        }, 1e4);
      });
    preloadPlugins.push(audioPlugin);
    function pointerLockChange() {
      var canvas = Browser.getCanvas();
      Browser.pointerLock = document.pointerLockElement === canvas;
    }
    var canvas = Browser.getCanvas();
    if (canvas) {
      document.addEventListener("pointerlockchange", pointerLockChange);
      if (Module["elementPointerLock"]) {
        canvas.addEventListener("click", (ev) => {
          if (!Browser.pointerLock && Browser.getCanvas().requestPointerLock) {
            Browser.getCanvas().requestPointerLock();
            ev.preventDefault();
          }
        });
      }
    }
  },
  createContext(canvas, useWebGL, setInModule, webGLContextAttributes) {
    if (useWebGL && Module["ctx"] && canvas == Browser.getCanvas())
      return Module["ctx"];
    var ctx;
    var contextHandle;
    if (useWebGL) {
      var contextAttributes = {
        antialias: false,
        alpha: false,
        majorVersion: 1,
      };
      if (webGLContextAttributes) {
        for (var attribute in webGLContextAttributes) {
          contextAttributes[attribute] = webGLContextAttributes[attribute];
        }
      }
      if (typeof GL != "undefined") {
        contextHandle = GL.createContext(canvas, contextAttributes);
        if (contextHandle) {
          ctx = GL.getContext(contextHandle).GLctx;
        }
      }
    } else {
      ctx = canvas.getContext("2d");
    }
    if (!ctx) return null;
    if (setInModule) {
      Module["ctx"] = ctx;
      if (useWebGL) GL.makeContextCurrent(contextHandle);
      Browser.useWebGL = useWebGL;
      Browser.moduleContextCreatedCallbacks.forEach((callback) => callback());
      Browser.init();
    }
    return ctx;
  },
  fullscreenHandlersInstalled: false,
  lockPointer: undefined,
  resizeCanvas: undefined,
  requestFullscreen(lockPointer, resizeCanvas) {
    Browser.lockPointer = lockPointer;
    Browser.resizeCanvas = resizeCanvas;
    if (typeof Browser.lockPointer == "undefined") Browser.lockPointer = true;
    if (typeof Browser.resizeCanvas == "undefined")
      Browser.resizeCanvas = false;
    var canvas = Browser.getCanvas();
    function fullscreenChange() {
      Browser.isFullscreen = false;
      var canvasContainer = canvas.parentNode;
      if (getFullscreenElement() === canvasContainer) {
        canvas.exitFullscreen = Browser.exitFullscreen;
        if (Browser.lockPointer) canvas.requestPointerLock();
        Browser.isFullscreen = true;
        if (Browser.resizeCanvas) {
          Browser.setFullscreenCanvasSize();
        } else {
          Browser.updateCanvasDimensions(canvas);
        }
      } else {
        canvasContainer.parentNode.insertBefore(canvas, canvasContainer);
        canvasContainer.parentNode.removeChild(canvasContainer);
        if (Browser.resizeCanvas) {
          Browser.setWindowedCanvasSize();
        } else {
          Browser.updateCanvasDimensions(canvas);
        }
      }
    }
    if (!Browser.fullscreenHandlersInstalled) {
      Browser.fullscreenHandlersInstalled = true;
      document.addEventListener("fullscreenchange", fullscreenChange);
      document.addEventListener("mozfullscreenchange", fullscreenChange);
      document.addEventListener("webkitfullscreenchange", fullscreenChange);
      document.addEventListener("MSFullscreenChange", fullscreenChange);
    }
    var canvasContainer = document.createElement("div");
    canvas.parentNode.insertBefore(canvasContainer, canvas);
    canvasContainer.appendChild(canvas);
    canvasContainer.requestFullscreen =
      canvasContainer["requestFullscreen"] ||
      canvasContainer["mozRequestFullScreen"] ||
      canvasContainer["msRequestFullscreen"] ||
      (canvasContainer["webkitRequestFullscreen"]
        ? () =>
            canvasContainer["webkitRequestFullscreen"](
              Element["ALLOW_KEYBOARD_INPUT"],
            )
        : null) ||
      (canvasContainer["webkitRequestFullScreen"]
        ? () =>
            canvasContainer["webkitRequestFullScreen"](
              Element["ALLOW_KEYBOARD_INPUT"],
            )
        : null);
    canvasContainer.requestFullscreen();
  },
  exitFullscreen() {
    if (!Browser.isFullscreen) {
      return false;
    }
    var CFS =
      document["exitFullscreen"] ||
      document["cancelFullScreen"] ||
      document["mozCancelFullScreen"] ||
      document["msExitFullscreen"] ||
      document["webkitCancelFullScreen"] ||
      (() => {});
    CFS.apply(document, []);
    return true;
  },
  safeSetTimeout(func, timeout) {
    return safeSetTimeout(func, timeout);
  },
  getMimetype(name) {
    return {
      jpg: "image/jpeg",
      jpeg: "image/jpeg",
      png: "image/png",
      bmp: "image/bmp",
      ogg: "audio/ogg",
      wav: "audio/wav",
      mp3: "audio/mpeg",
    }[name.slice(name.lastIndexOf(".") + 1)];
  },
  getUserMedia(func) {
    window.getUserMedia ||=
      navigator["getUserMedia"] || navigator["mozGetUserMedia"];
    window.getUserMedia(func);
  },
  getMovementX(event) {
    return (
      event["movementX"] ||
      event["mozMovementX"] ||
      event["webkitMovementX"] ||
      0
    );
  },
  getMovementY(event) {
    return (
      event["movementY"] ||
      event["mozMovementY"] ||
      event["webkitMovementY"] ||
      0
    );
  },
  getMouseWheelDelta(event) {
    var delta = 0;
    switch (event.type) {
      case "DOMMouseScroll":
        delta = event.detail / 3;
        break;
      case "mousewheel":
        delta = event.wheelDelta / 120;
        break;
      case "wheel":
        delta = event.deltaY;
        switch (event.deltaMode) {
          case 0:
            delta /= 100;
            break;
          case 1:
            delta /= 3;
            break;
          case 2:
            delta *= 80;
            break;
          default:
            abort("unrecognized mouse wheel delta mode: " + event.deltaMode);
        }
        break;
      default:
        abort("unrecognized mouse wheel event: " + event.type);
    }
    return delta;
  },
  mouseX: 0,
  mouseY: 0,
  mouseMovementX: 0,
  mouseMovementY: 0,
  touches: {},
  lastTouches: {},
  calculateMouseCoords(pageX, pageY) {
    var canvas = Browser.getCanvas();
    var rect = canvas.getBoundingClientRect();
    var adjustedX = pageX - (window.scrollX + rect.left);
    var adjustedY = pageY - (window.scrollY + rect.top);
    adjustedX = adjustedX * (canvas.width / rect.width);
    adjustedY = adjustedY * (canvas.height / rect.height);
    return { x: adjustedX, y: adjustedY };
  },
  setMouseCoords(pageX, pageY) {
    const { x, y } = Browser.calculateMouseCoords(pageX, pageY);
    Browser.mouseMovementX = x - Browser.mouseX;
    Browser.mouseMovementY = y - Browser.mouseY;
    Browser.mouseX = x;
    Browser.mouseY = y;
  },
  calculateMouseEvent(event) {
    if (Browser.pointerLock) {
      if (event.type != "mousemove" && "mozMovementX" in event) {
        Browser.mouseMovementX = Browser.mouseMovementY = 0;
      } else {
        Browser.mouseMovementX = Browser.getMovementX(event);
        Browser.mouseMovementY = Browser.getMovementY(event);
      }
      Browser.mouseX += Browser.mouseMovementX;
      Browser.mouseY += Browser.mouseMovementY;
    } else {
      if (
        event.type === "touchstart" ||
        event.type === "touchend" ||
        event.type === "touchmove"
      ) {
        var touch = event.touch;
        if (touch === undefined) {
          return;
        }
        var coords = Browser.calculateMouseCoords(touch.pageX, touch.pageY);
        if (event.type === "touchstart") {
          Browser.lastTouches[touch.identifier] = coords;
          Browser.touches[touch.identifier] = coords;
        } else if (event.type === "touchend" || event.type === "touchmove") {
          var last = Browser.touches[touch.identifier];
          last ||= coords;
          Browser.lastTouches[touch.identifier] = last;
          Browser.touches[touch.identifier] = coords;
        }
        return;
      }
      Browser.setMouseCoords(event.pageX, event.pageY);
    }
  },
  resizeListeners: [],
  updateResizeListeners() {
    var canvas = Browser.getCanvas();
    Browser.resizeListeners.forEach((listener) =>
      listener(canvas.width, canvas.height),
    );
  },
  setCanvasSize(width, height, noUpdates) {
    var canvas = Browser.getCanvas();
    Browser.updateCanvasDimensions(canvas, width, height);
    if (!noUpdates) Browser.updateResizeListeners();
  },
  windowedWidth: 0,
  windowedHeight: 0,
  setFullscreenCanvasSize() {
    if (typeof SDL != "undefined") {
      var flags = HEAPU32[SDL.screen >> 2];
      flags = flags | 8388608;
      HEAP32[SDL.screen >> 2] = flags;
    }
    Browser.updateCanvasDimensions(Browser.getCanvas());
    Browser.updateResizeListeners();
  },
  setWindowedCanvasSize() {
    if (typeof SDL != "undefined") {
      var flags = HEAPU32[SDL.screen >> 2];
      flags = flags & ~8388608;
      HEAP32[SDL.screen >> 2] = flags;
    }
    Browser.updateCanvasDimensions(Browser.getCanvas());
    Browser.updateResizeListeners();
  },
  updateCanvasDimensions(canvas, wNative, hNative) {
    if (wNative && hNative) {
      canvas.widthNative = wNative;
      canvas.heightNative = hNative;
    } else {
      wNative = canvas.widthNative;
      hNative = canvas.heightNative;
    }
    var w = wNative;
    var h = hNative;
    if (
      getFullscreenElement() === canvas.parentNode &&
      typeof screen != "undefined"
    ) {
      var factor = Math.min(screen.width / w, screen.height / h);
      w = Math.round(w * factor);
      h = Math.round(h * factor);
    }
    if (Browser.resizeCanvas) {
      if (canvas.width != w) canvas.width = w;
      if (canvas.height != h) canvas.height = h;
      if (typeof canvas.style != "undefined") {
        canvas.style.removeProperty("width");
        canvas.style.removeProperty("height");
      }
    } else {
      if (canvas.width != wNative) canvas.width = wNative;
      if (canvas.height != hNative) canvas.height = hNative;
      if (typeof canvas.style != "undefined") {
        if (w != wNative || h != hNative) {
          canvas.style.setProperty("width", w + "px", "important");
          canvas.style.setProperty("height", h + "px", "important");
        } else {
          canvas.style.removeProperty("width");
          canvas.style.removeProperty("height");
        }
      }
    }
  },
};
var EGL = {
  errorCode: 12288,
  defaultDisplayInitialized: false,
  currentContext: 0,
  currentReadSurface: 0,
  currentDrawSurface: 0,
  contextAttributes: {
    alpha: false,
    depth: false,
    stencil: false,
    antialias: false,
  },
  stringCache: {},
  setErrorCode(code) {
    EGL.errorCode = code;
  },
  chooseConfig(display, attribList, config, config_size, numConfigs) {
    if (display != 62e3) {
      EGL.setErrorCode(12296);
      return 0;
    }
    if (attribList) {
      for (;;) {
        var param = HEAP32[attribList >> 2];
        if (param == 12321) {
          var alphaSize = HEAP32[(attribList + 4) >> 2];
          EGL.contextAttributes.alpha = alphaSize > 0;
        } else if (param == 12325) {
          var depthSize = HEAP32[(attribList + 4) >> 2];
          EGL.contextAttributes.depth = depthSize > 0;
        } else if (param == 12326) {
          var stencilSize = HEAP32[(attribList + 4) >> 2];
          EGL.contextAttributes.stencil = stencilSize > 0;
        } else if (param == 12337) {
          var samples = HEAP32[(attribList + 4) >> 2];
          EGL.contextAttributes.antialias = samples > 0;
        } else if (param == 12338) {
          var samples = HEAP32[(attribList + 4) >> 2];
          EGL.contextAttributes.antialias = samples == 1;
        } else if (param == 12544) {
          var requestedPriority = HEAP32[(attribList + 4) >> 2];
          EGL.contextAttributes.lowLatency = requestedPriority != 12547;
        } else if (param == 12344) {
          break;
        }
        attribList += 8;
      }
    }
    if ((!config || !config_size) && !numConfigs) {
      EGL.setErrorCode(12300);
      return 0;
    }
    if (numConfigs) {
      HEAP32[numConfigs >> 2] = 1;
    }
    if (config && config_size > 0) {
      HEAPU32[config >> 2] = 62002;
    }
    EGL.setErrorCode(12288);
    return 1;
  },
};
var _eglBindAPI = (api) => {
  if (api == 12448) {
    EGL.setErrorCode(12288);
    return 1;
  }
  EGL.setErrorCode(12300);
  return 0;
};
var _eglChooseConfig = (
  display,
  attrib_list,
  configs,
  config_size,
  numConfigs,
) => EGL.chooseConfig(display, attrib_list, configs, config_size, numConfigs);
var GLctx;
var webgl_enable_ANGLE_instanced_arrays = (ctx) => {
  var ext = ctx.getExtension("ANGLE_instanced_arrays");
  if (ext) {
    ctx["vertexAttribDivisor"] = (index, divisor) =>
      ext["vertexAttribDivisorANGLE"](index, divisor);
    ctx["drawArraysInstanced"] = (mode, first, count, primcount) =>
      ext["drawArraysInstancedANGLE"](mode, first, count, primcount);
    ctx["drawElementsInstanced"] = (mode, count, type, indices, primcount) =>
      ext["drawElementsInstancedANGLE"](mode, count, type, indices, primcount);
    return 1;
  }
};
var webgl_enable_OES_vertex_array_object = (ctx) => {
  var ext = ctx.getExtension("OES_vertex_array_object");
  if (ext) {
    ctx["createVertexArray"] = () => ext["createVertexArrayOES"]();
    ctx["deleteVertexArray"] = (vao) => ext["deleteVertexArrayOES"](vao);
    ctx["bindVertexArray"] = (vao) => ext["bindVertexArrayOES"](vao);
    ctx["isVertexArray"] = (vao) => ext["isVertexArrayOES"](vao);
    return 1;
  }
};
var webgl_enable_WEBGL_draw_buffers = (ctx) => {
  var ext = ctx.getExtension("WEBGL_draw_buffers");
  if (ext) {
    ctx["drawBuffers"] = (n, bufs) => ext["drawBuffersWEBGL"](n, bufs);
    return 1;
  }
};
var webgl_enable_EXT_polygon_offset_clamp = (ctx) =>
  !!(ctx.extPolygonOffsetClamp = ctx.getExtension("EXT_polygon_offset_clamp"));
var webgl_enable_EXT_clip_control = (ctx) =>
  !!(ctx.extClipControl = ctx.getExtension("EXT_clip_control"));
var webgl_enable_WEBGL_polygon_mode = (ctx) =>
  !!(ctx.webglPolygonMode = ctx.getExtension("WEBGL_polygon_mode"));
var webgl_enable_WEBGL_multi_draw = (ctx) =>
  !!(ctx.multiDrawWebgl = ctx.getExtension("WEBGL_multi_draw"));
var getEmscriptenSupportedExtensions = (ctx) => {
  var supportedExtensions = [
    "ANGLE_instanced_arrays",
    "EXT_blend_minmax",
    "EXT_disjoint_timer_query",
    "EXT_frag_depth",
    "EXT_shader_texture_lod",
    "EXT_sRGB",
    "OES_element_index_uint",
    "OES_fbo_render_mipmap",
    "OES_standard_derivatives",
    "OES_texture_float",
    "OES_texture_half_float",
    "OES_texture_half_float_linear",
    "OES_vertex_array_object",
    "WEBGL_color_buffer_float",
    "WEBGL_depth_texture",
    "WEBGL_draw_buffers",
    "EXT_clip_control",
    "EXT_color_buffer_half_float",
    "EXT_depth_clamp",
    "EXT_float_blend",
    "EXT_polygon_offset_clamp",
    "EXT_texture_compression_bptc",
    "EXT_texture_compression_rgtc",
    "EXT_texture_filter_anisotropic",
    "KHR_parallel_shader_compile",
    "OES_texture_float_linear",
    "WEBGL_blend_func_extended",
    "WEBGL_compressed_texture_astc",
    "WEBGL_compressed_texture_etc",
    "WEBGL_compressed_texture_etc1",
    "WEBGL_compressed_texture_s3tc",
    "WEBGL_compressed_texture_s3tc_srgb",
    "WEBGL_debug_renderer_info",
    "WEBGL_debug_shaders",
    "WEBGL_lose_context",
    "WEBGL_multi_draw",
    "WEBGL_polygon_mode",
  ];
  return (
    ctx
      .getSupportedExtensions()
      ?.filter((ext) => supportedExtensions.includes(ext)) ?? []
  );
};
var GL = {
  counter: 1,
  buffers: [],
  programs: [],
  framebuffers: [],
  renderbuffers: [],
  textures: [],
  shaders: [],
  vaos: [],
  contexts: [],
  offscreenCanvases: {},
  queries: [],
  stringCache: {},
  unpackAlignment: 4,
  unpackRowLength: 0,
  recordError: (errorCode) => {},
  getNewId: (table) => {
    var ret = GL.counter++;
    for (var i = table.length; i < ret; i++) {
      table[i] = null;
    }
    return ret;
  },
  genObject: (n, buffers, createFunction, objectTable) => {
    for (var i = 0; i < n; i++) {
      var buffer = GLctx[createFunction]();
      var id = buffer && GL.getNewId(objectTable);
      if (buffer) {
        buffer.name = id;
        objectTable[id] = buffer;
      } else {
        GL.recordError(1282);
      }
      HEAP32[(buffers + i * 4) >> 2] = id;
    }
  },
  getSource: (shader, count, string, length) => {
    var source = "";
    for (var i = 0; i < count; ++i) {
      var len = length ? HEAPU32[(length + i * 4) >> 2] : undefined;
      source += UTF8ToString(HEAPU32[(string + i * 4) >> 2], len);
    }
    return source;
  },
  createContext: (canvas, webGLContextAttributes) => {
    if (!canvas.getContextSafariWebGL2Fixed) {
      canvas.getContextSafariWebGL2Fixed = canvas.getContext;
      function fixedGetContext(ver, attrs) {
        var gl = canvas.getContextSafariWebGL2Fixed(ver, attrs);
        return (ver == "webgl") == gl instanceof WebGLRenderingContext
          ? gl
          : null;
      }
      canvas.getContext = fixedGetContext;
    }
    var ctx = canvas.getContext("webgl", webGLContextAttributes);
    if (!ctx) return 0;
    var handle = GL.registerContext(ctx, webGLContextAttributes);
    return handle;
  },
  registerContext: (ctx, webGLContextAttributes) => {
    var handle = GL.getNewId(GL.contexts);
    var context = {
      handle,
      attributes: webGLContextAttributes,
      version: webGLContextAttributes.majorVersion,
      GLctx: ctx,
    };
    if (ctx.canvas) ctx.canvas.GLctxObject = context;
    GL.contexts[handle] = context;
    if (
      typeof webGLContextAttributes.enableExtensionsByDefault == "undefined" ||
      webGLContextAttributes.enableExtensionsByDefault
    ) {
      GL.initExtensions(context);
    }
    return handle;
  },
  makeContextCurrent: (contextHandle) => {
    GL.currentContext = GL.contexts[contextHandle];
    Module["ctx"] = GLctx = GL.currentContext?.GLctx;
    return !(contextHandle && !GLctx);
  },
  getContext: (contextHandle) => GL.contexts[contextHandle],
  deleteContext: (contextHandle) => {
    if (GL.currentContext === GL.contexts[contextHandle]) {
      GL.currentContext = null;
    }
    if (typeof JSEvents == "object") {
      JSEvents.removeAllHandlersOnTarget(
        GL.contexts[contextHandle].GLctx.canvas,
      );
    }
    if (GL.contexts[contextHandle]?.GLctx.canvas) {
      GL.contexts[contextHandle].GLctx.canvas.GLctxObject = undefined;
    }
    GL.contexts[contextHandle] = null;
  },
  initExtensions: (context) => {
    context ||= GL.currentContext;
    if (context.initExtensionsDone) return;
    context.initExtensionsDone = true;
    var GLctx = context.GLctx;
    webgl_enable_WEBGL_multi_draw(GLctx);
    webgl_enable_EXT_polygon_offset_clamp(GLctx);
    webgl_enable_EXT_clip_control(GLctx);
    webgl_enable_WEBGL_polygon_mode(GLctx);
    webgl_enable_ANGLE_instanced_arrays(GLctx);
    webgl_enable_OES_vertex_array_object(GLctx);
    webgl_enable_WEBGL_draw_buffers(GLctx);
    {
      GLctx.disjointTimerQueryExt = GLctx.getExtension(
        "EXT_disjoint_timer_query",
      );
    }
    for (var ext of getEmscriptenSupportedExtensions(GLctx)) {
      if (!ext.includes("lose_context") && !ext.includes("debug")) {
        GLctx.getExtension(ext);
      }
    }
  },
};
var _eglCreateContext = (display, config, hmm, contextAttribs) => {
  if (display != 62e3) {
    EGL.setErrorCode(12296);
    return 0;
  }
  var glesContextVersion = 1;
  for (;;) {
    var param = HEAP32[contextAttribs >> 2];
    if (param == 12440) {
      glesContextVersion = HEAP32[(contextAttribs + 4) >> 2];
    } else if (param == 12344) {
      break;
    } else {
      EGL.setErrorCode(12292);
      return 0;
    }
    contextAttribs += 8;
  }
  if (glesContextVersion != 2) {
    EGL.setErrorCode(12293);
    return 0;
  }
  EGL.contextAttributes.majorVersion = glesContextVersion - 1;
  EGL.contextAttributes.minorVersion = 0;
  EGL.context = GL.createContext(Browser.getCanvas(), EGL.contextAttributes);
  if (EGL.context != 0) {
    EGL.setErrorCode(12288);
    GL.makeContextCurrent(EGL.context);
    Browser.useWebGL = true;
    Browser.moduleContextCreatedCallbacks.forEach((callback) => callback());
    GL.makeContextCurrent(null);
    return 62004;
  } else {
    EGL.setErrorCode(12297);
    return 0;
  }
};
var _eglCreateWindowSurface = (display, config, win, attrib_list) => {
  if (display != 62e3) {
    EGL.setErrorCode(12296);
    return 0;
  }
  if (config != 62002) {
    EGL.setErrorCode(12293);
    return 0;
  }
  EGL.setErrorCode(12288);
  return 62006;
};
var _eglDestroyContext = (display, context) => {
  if (display != 62e3) {
    EGL.setErrorCode(12296);
    return 0;
  }
  if (context != 62004) {
    EGL.setErrorCode(12294);
    return 0;
  }
  GL.deleteContext(EGL.context);
  EGL.setErrorCode(12288);
  if (EGL.currentContext == context) {
    EGL.currentContext = 0;
  }
  return 1;
};
var _eglDestroySurface = (display, surface) => {
  if (display != 62e3) {
    EGL.setErrorCode(12296);
    return 0;
  }
  if (surface != 62006) {
    EGL.setErrorCode(12301);
    return 1;
  }
  if (EGL.currentReadSurface == surface) {
    EGL.currentReadSurface = 0;
  }
  if (EGL.currentDrawSurface == surface) {
    EGL.currentDrawSurface = 0;
  }
  EGL.setErrorCode(12288);
  return 1;
};
var _eglGetConfigAttrib = (display, config, attribute, value) => {
  if (display != 62e3) {
    EGL.setErrorCode(12296);
    return 0;
  }
  if (config != 62002) {
    EGL.setErrorCode(12293);
    return 0;
  }
  if (!value) {
    EGL.setErrorCode(12300);
    return 0;
  }
  EGL.setErrorCode(12288);
  switch (attribute) {
    case 12320:
      HEAP32[value >> 2] = EGL.contextAttributes.alpha ? 32 : 24;
      return 1;
    case 12321:
      HEAP32[value >> 2] = EGL.contextAttributes.alpha ? 8 : 0;
      return 1;
    case 12322:
      HEAP32[value >> 2] = 8;
      return 1;
    case 12323:
      HEAP32[value >> 2] = 8;
      return 1;
    case 12324:
      HEAP32[value >> 2] = 8;
      return 1;
    case 12325:
      HEAP32[value >> 2] = EGL.contextAttributes.depth ? 24 : 0;
      return 1;
    case 12326:
      HEAP32[value >> 2] = EGL.contextAttributes.stencil ? 8 : 0;
      return 1;
    case 12327:
      HEAP32[value >> 2] = 12344;
      return 1;
    case 12328:
      HEAP32[value >> 2] = 62002;
      return 1;
    case 12329:
      HEAP32[value >> 2] = 0;
      return 1;
    case 12330:
      HEAP32[value >> 2] = 4096;
      return 1;
    case 12331:
      HEAP32[value >> 2] = 16777216;
      return 1;
    case 12332:
      HEAP32[value >> 2] = 4096;
      return 1;
    case 12333:
      HEAP32[value >> 2] = 0;
      return 1;
    case 12334:
      HEAP32[value >> 2] = 0;
      return 1;
    case 12335:
      HEAP32[value >> 2] = 12344;
      return 1;
    case 12337:
      HEAP32[value >> 2] = EGL.contextAttributes.antialias ? 4 : 0;
      return 1;
    case 12338:
      HEAP32[value >> 2] = EGL.contextAttributes.antialias ? 1 : 0;
      return 1;
    case 12339:
      HEAP32[value >> 2] = 4;
      return 1;
    case 12340:
      HEAP32[value >> 2] = 12344;
      return 1;
    case 12341:
    case 12342:
    case 12343:
      HEAP32[value >> 2] = -1;
      return 1;
    case 12345:
    case 12346:
      HEAP32[value >> 2] = 0;
      return 1;
    case 12347:
      HEAP32[value >> 2] = 0;
      return 1;
    case 12348:
      HEAP32[value >> 2] = 1;
      return 1;
    case 12349:
    case 12350:
      HEAP32[value >> 2] = 0;
      return 1;
    case 12351:
      HEAP32[value >> 2] = 12430;
      return 1;
    case 12352:
      HEAP32[value >> 2] = 4;
      return 1;
    case 12354:
      HEAP32[value >> 2] = 0;
      return 1;
    default:
      EGL.setErrorCode(12292);
      return 0;
  }
};
var _eglGetDisplay = (nativeDisplayType) => {
  EGL.setErrorCode(12288);
  if (nativeDisplayType != 0 && nativeDisplayType != 1) {
    return 0;
  }
  return 62e3;
};
var _eglGetError = () => EGL.errorCode;
var _eglInitialize = (display, majorVersion, minorVersion) => {
  if (display != 62e3) {
    EGL.setErrorCode(12296);
    return 0;
  }
  if (majorVersion) {
    HEAP32[majorVersion >> 2] = 1;
  }
  if (minorVersion) {
    HEAP32[minorVersion >> 2] = 4;
  }
  EGL.defaultDisplayInitialized = true;
  EGL.setErrorCode(12288);
  return 1;
};
var _eglMakeCurrent = (display, draw, read, context) => {
  if (display != 62e3) {
    EGL.setErrorCode(12296);
    return 0;
  }
  if (context != 0 && context != 62004) {
    EGL.setErrorCode(12294);
    return 0;
  }
  if ((read != 0 && read != 62006) || (draw != 0 && draw != 62006)) {
    EGL.setErrorCode(12301);
    return 0;
  }
  GL.makeContextCurrent(context ? EGL.context : null);
  EGL.currentContext = context;
  EGL.currentDrawSurface = draw;
  EGL.currentReadSurface = read;
  EGL.setErrorCode(12288);
  return 1;
};
var stringToNewUTF8 = (str) => {
  var size = lengthBytesUTF8(str) + 1;
  var ret = _malloc(size);
  if (ret) stringToUTF8(str, ret, size);
  return ret;
};
var _eglQueryString = (display, name) => {
  if (display != 62e3) {
    EGL.setErrorCode(12296);
    return 0;
  }
  EGL.setErrorCode(12288);
  if (EGL.stringCache[name]) return EGL.stringCache[name];
  var ret;
  switch (name) {
    case 12371:
      ret = stringToNewUTF8("Emscripten");
      break;
    case 12372:
      ret = stringToNewUTF8("1.4 Emscripten EGL");
      break;
    case 12373:
      ret = stringToNewUTF8("");
      break;
    case 12429:
      ret = stringToNewUTF8("OpenGL_ES");
      break;
    default:
      EGL.setErrorCode(12300);
      return 0;
  }
  EGL.stringCache[name] = ret;
  return ret;
};
var _eglSwapBuffers = (dpy, surface) => {
  if (!EGL.defaultDisplayInitialized) {
    EGL.setErrorCode(12289);
  } else if (!GLctx) {
    EGL.setErrorCode(12290);
  } else if (GLctx.isContextLost()) {
    EGL.setErrorCode(12302);
  } else {
    EGL.setErrorCode(12288);
    return 1;
  }
  return 0;
};
var _eglSwapInterval = (display, interval) => {
  if (display != 62e3) {
    EGL.setErrorCode(12296);
    return 0;
  }
  if (interval == 0) _emscripten_set_main_loop_timing(0, 0);
  else _emscripten_set_main_loop_timing(1, interval);
  EGL.setErrorCode(12288);
  return 1;
};
var _eglTerminate = (display) => {
  if (display != 62e3) {
    EGL.setErrorCode(12296);
    return 0;
  }
  EGL.currentContext = 0;
  EGL.currentReadSurface = 0;
  EGL.currentDrawSurface = 0;
  EGL.defaultDisplayInitialized = false;
  EGL.setErrorCode(12288);
  return 1;
};
var _eglWaitClient = () => {
  EGL.setErrorCode(12288);
  return 1;
};
var _eglWaitGL = _eglWaitClient;
var _eglWaitNative = (nativeEngineId) => {
  EGL.setErrorCode(12288);
  return 1;
};
var readEmAsmArgsArray = [];
var readEmAsmArgs = (sigPtr, buf) => {
  readEmAsmArgsArray.length = 0;
  var ch;
  while ((ch = HEAPU8[sigPtr++])) {
    var wide = ch != 105;
    wide &= ch != 112;
    buf += wide && buf % 8 ? 4 : 0;
    readEmAsmArgsArray.push(
      ch == 112
        ? HEAPU32[buf >> 2]
        : ch == 106
          ? HEAP64[buf >> 3]
          : ch == 105
            ? HEAP32[buf >> 2]
            : HEAPF64[buf >> 3],
    );
    buf += wide ? 8 : 4;
  }
  return readEmAsmArgsArray;
};
var runEmAsmFunction = (code, sigPtr, argbuf) => {
  var args = readEmAsmArgs(sigPtr, argbuf);
  return ASM_CONSTS[code](...args);
};
var _emscripten_asm_const_int = (code, sigPtr, argbuf) =>
  runEmAsmFunction(code, sigPtr, argbuf);
var runMainThreadEmAsm = (emAsmAddr, sigPtr, argbuf, sync) => {
  var args = readEmAsmArgs(sigPtr, argbuf);
  return ASM_CONSTS[emAsmAddr](...args);
};
var _emscripten_asm_const_int_sync_on_main_thread = (
  emAsmAddr,
  sigPtr,
  argbuf,
) => runMainThreadEmAsm(emAsmAddr, sigPtr, argbuf, 1);
var safeRequestAnimationFrame = (func) =>
  MainLoop.requestAnimationFrame(() => {
    callUserCallback(func);
  });
var _emscripten_async_call = (func, arg, millis) => {
  var wrapper = () => ((a1) => dynCall_vi(func, a1))(arg);
  if (millis >= 0 || ENVIRONMENT_IS_NODE) {
    safeSetTimeout(wrapper, millis);
  } else {
    safeRequestAnimationFrame(wrapper);
  }
};
var JSEvents = {
  removeAllEventListeners() {
    while (JSEvents.eventHandlers.length) {
      JSEvents._removeHandler(JSEvents.eventHandlers.length - 1);
    }
    JSEvents.deferredCalls = [];
  },
  inEventHandler: 0,
  deferredCalls: [],
  deferCall(targetFunction, precedence, argsList) {
    function arraysHaveEqualContent(arrA, arrB) {
      if (arrA.length != arrB.length) return false;
      for (var i in arrA) {
        if (arrA[i] != arrB[i]) return false;
      }
      return true;
    }
    for (var call of JSEvents.deferredCalls) {
      if (
        call.targetFunction == targetFunction &&
        arraysHaveEqualContent(call.argsList, argsList)
      ) {
        return;
      }
    }
    JSEvents.deferredCalls.push({ targetFunction, precedence, argsList });
    JSEvents.deferredCalls.sort((x, y) => x.precedence - y.precedence);
  },
  removeDeferredCalls(targetFunction) {
    JSEvents.deferredCalls = JSEvents.deferredCalls.filter(
      (call) => call.targetFunction != targetFunction,
    );
  },
  canPerformEventHandlerRequests() {
    if (navigator.userActivation) {
      return navigator.userActivation.isActive;
    }
    return (
      JSEvents.inEventHandler &&
      JSEvents.currentEventHandler.allowsDeferredCalls
    );
  },
  runDeferredCalls() {
    if (!JSEvents.canPerformEventHandlerRequests()) {
      return;
    }
    var deferredCalls = JSEvents.deferredCalls;
    JSEvents.deferredCalls = [];
    for (var call of deferredCalls) {
      call.targetFunction(...call.argsList);
    }
  },
  eventHandlers: [],
  removeAllHandlersOnTarget: (target, eventTypeString) => {
    for (var i = 0; i < JSEvents.eventHandlers.length; ++i) {
      if (
        JSEvents.eventHandlers[i].target == target &&
        (!eventTypeString ||
          eventTypeString == JSEvents.eventHandlers[i].eventTypeString)
      ) {
        JSEvents._removeHandler(i--);
      }
    }
  },
  _removeHandler(i) {
    var h = JSEvents.eventHandlers[i];
    h.target.removeEventListener(
      h.eventTypeString,
      h.eventListenerFunc,
      h.useCapture,
    );
    JSEvents.eventHandlers.splice(i, 1);
  },
  registerOrRemoveHandler(eventHandler) {
    if (!eventHandler.target) {
      return -4;
    }
    if (eventHandler.callbackfunc) {
      eventHandler.eventListenerFunc = function (event) {
        ++JSEvents.inEventHandler;
        JSEvents.currentEventHandler = eventHandler;
        JSEvents.runDeferredCalls();
        eventHandler.handlerFunc(event);
        JSEvents.runDeferredCalls();
        --JSEvents.inEventHandler;
      };
      eventHandler.target.addEventListener(
        eventHandler.eventTypeString,
        eventHandler.eventListenerFunc,
        eventHandler.useCapture,
      );
      JSEvents.eventHandlers.push(eventHandler);
    } else {
      for (var i = 0; i < JSEvents.eventHandlers.length; ++i) {
        if (
          JSEvents.eventHandlers[i].target == eventHandler.target &&
          JSEvents.eventHandlers[i].eventTypeString ==
            eventHandler.eventTypeString
        ) {
          JSEvents._removeHandler(i--);
        }
      }
    }
    return 0;
  },
  removeSingleHandler(eventHandler) {
    let success = false;
    for (let i = 0; i < JSEvents.eventHandlers.length; ++i) {
      const handler = JSEvents.eventHandlers[i];
      if (
        handler.target === eventHandler.target &&
        handler.eventTypeId === eventHandler.eventTypeId &&
        handler.callbackfunc === eventHandler.callbackfunc &&
        handler.userData === eventHandler.userData
      ) {
        JSEvents._removeHandler(i--);
        success = true;
      }
    }
    return success ? 0 : -5;
  },
  getNodeNameForTarget(target) {
    if (target == window) return "#window";
    if (target == screen) return "#screen";
    return target?.nodeName ?? "";
  },
  fullscreenEnabled() {
    return document.fullscreenEnabled || document.webkitFullscreenEnabled;
  },
};
var specialHTMLTargets = [0, globalThis.document ?? 0, globalThis.window ?? 0];
var maybeCStringToJsString = (cString) =>
  cString > 2 ? UTF8ToString(cString) : cString;
var findEventTarget = (target) => {
  target = maybeCStringToJsString(target);
  var domElement =
    specialHTMLTargets[target] || globalThis.document?.querySelector(target);
  return domElement;
};
var findCanvasEventTarget = findEventTarget;
var _emscripten_get_canvas_element_size = (target, width, height) => {
  var canvas = findCanvasEventTarget(target);
  if (!canvas) return -4;
  HEAP32[width >> 2] = canvas.width;
  HEAP32[height >> 2] = canvas.height;
};
var stackAlloc = (sz) => __emscripten_stack_alloc(sz);
var stringToUTF8OnStack = (str) => {
  var size = lengthBytesUTF8(str) + 1;
  var ret = stackAlloc(size);
  stringToUTF8(str, ret, size);
  return ret;
};
var getCanvasElementSize = (target) => {
  var sp = stackSave();
  var w = stackAlloc(8);
  var h = w + 4;
  var targetInt = stringToUTF8OnStack(target.id);
  var ret = _emscripten_get_canvas_element_size(targetInt, w, h);
  var size = [HEAP32[w >> 2], HEAP32[h >> 2]];
  stackRestore(sp);
  return size;
};
var _emscripten_set_canvas_element_size = (target, width, height) => {
  var canvas = findCanvasEventTarget(target);
  if (!canvas) return -4;
  canvas.width = width;
  canvas.height = height;
  return 0;
};
var setCanvasElementSize = (target, width, height) => {
  if (!target.controlTransferredOffscreen) {
    target.width = width;
    target.height = height;
  } else {
    var sp = stackSave();
    var targetInt = stringToUTF8OnStack(target.id);
    _emscripten_set_canvas_element_size(targetInt, width, height);
    stackRestore(sp);
  }
};
var currentFullscreenStrategy = {};
var registerRestoreOldStyle = (canvas) => {
  var canvasSize = getCanvasElementSize(canvas);
  var oldWidth = canvasSize[0];
  var oldHeight = canvasSize[1];
  var oldCssWidth = canvas.style.width;
  var oldCssHeight = canvas.style.height;
  var oldBackgroundColor = canvas.style.backgroundColor;
  var oldDocumentBackgroundColor = document.body.style.backgroundColor;
  var oldPaddingLeft = canvas.style.paddingLeft;
  var oldPaddingRight = canvas.style.paddingRight;
  var oldPaddingTop = canvas.style.paddingTop;
  var oldPaddingBottom = canvas.style.paddingBottom;
  var oldMarginLeft = canvas.style.marginLeft;
  var oldMarginRight = canvas.style.marginRight;
  var oldMarginTop = canvas.style.marginTop;
  var oldMarginBottom = canvas.style.marginBottom;
  var oldDocumentBodyMargin = document.body.style.margin;
  var oldDocumentOverflow = document.documentElement.style.overflow;
  var oldDocumentScroll = document.body.scroll;
  var oldImageRendering = canvas.style.imageRendering;
  function restoreOldStyle() {
    if (!getFullscreenElement()) {
      document.removeEventListener("fullscreenchange", restoreOldStyle);
      document.removeEventListener("webkitfullscreenchange", restoreOldStyle);
      setCanvasElementSize(canvas, oldWidth, oldHeight);
      canvas.style.width = oldCssWidth;
      canvas.style.height = oldCssHeight;
      canvas.style.backgroundColor = oldBackgroundColor;
      if (!oldDocumentBackgroundColor)
        document.body.style.backgroundColor = "white";
      document.body.style.backgroundColor = oldDocumentBackgroundColor;
      canvas.style.paddingLeft = oldPaddingLeft;
      canvas.style.paddingRight = oldPaddingRight;
      canvas.style.paddingTop = oldPaddingTop;
      canvas.style.paddingBottom = oldPaddingBottom;
      canvas.style.marginLeft = oldMarginLeft;
      canvas.style.marginRight = oldMarginRight;
      canvas.style.marginTop = oldMarginTop;
      canvas.style.marginBottom = oldMarginBottom;
      document.body.style.margin = oldDocumentBodyMargin;
      document.documentElement.style.overflow = oldDocumentOverflow;
      document.body.scroll = oldDocumentScroll;
      canvas.style.imageRendering = oldImageRendering;
      if (canvas.GLctxObject)
        canvas.GLctxObject.GLctx.viewport(0, 0, oldWidth, oldHeight);
      if (currentFullscreenStrategy.canvasResizedCallback) {
        ((a1, a2, a3) =>
          dynCall_iiii(
            currentFullscreenStrategy.canvasResizedCallback,
            a1,
            a2,
            a3,
          ))(37, 0, currentFullscreenStrategy.canvasResizedCallbackUserData);
      }
    }
  }
  document.addEventListener("fullscreenchange", restoreOldStyle);
  document.addEventListener("webkitfullscreenchange", restoreOldStyle);
  return restoreOldStyle;
};
var setLetterbox = (element, topBottom, leftRight) => {
  element.style.paddingLeft = element.style.paddingRight = leftRight + "px";
  element.style.paddingTop = element.style.paddingBottom = topBottom + "px";
};
var getBoundingClientRect = (e) =>
  specialHTMLTargets.indexOf(e) < 0
    ? e.getBoundingClientRect()
    : { left: 0, top: 0 };
var JSEvents_resizeCanvasForFullscreen = (target, strategy) => {
  var restoreOldStyle = registerRestoreOldStyle(target);
  var cssWidth = strategy.softFullscreen ? innerWidth : screen.width;
  var cssHeight = strategy.softFullscreen ? innerHeight : screen.height;
  var rect = getBoundingClientRect(target);
  var windowedCssWidth = rect.width;
  var windowedCssHeight = rect.height;
  var canvasSize = getCanvasElementSize(target);
  var windowedRttWidth = canvasSize[0];
  var windowedRttHeight = canvasSize[1];
  if (strategy.scaleMode == 3) {
    setLetterbox(
      target,
      (cssHeight - windowedCssHeight) / 2,
      (cssWidth - windowedCssWidth) / 2,
    );
    cssWidth = windowedCssWidth;
    cssHeight = windowedCssHeight;
  } else if (strategy.scaleMode == 2) {
    if (cssWidth * windowedRttHeight < windowedRttWidth * cssHeight) {
      var desiredCssHeight = (windowedRttHeight * cssWidth) / windowedRttWidth;
      setLetterbox(target, (cssHeight - desiredCssHeight) / 2, 0);
      cssHeight = desiredCssHeight;
    } else {
      var desiredCssWidth = (windowedRttWidth * cssHeight) / windowedRttHeight;
      setLetterbox(target, 0, (cssWidth - desiredCssWidth) / 2);
      cssWidth = desiredCssWidth;
    }
  }
  target.style.backgroundColor ||= "black";
  document.body.style.backgroundColor ||= "black";
  target.style.width = cssWidth + "px";
  target.style.height = cssHeight + "px";
  if (strategy.filteringMode == 1) {
    target.style.imageRendering = "optimizeSpeed";
    target.style.imageRendering = "-moz-crisp-edges";
    target.style.imageRendering = "-o-crisp-edges";
    target.style.imageRendering = "-webkit-optimize-contrast";
    target.style.imageRendering = "optimize-contrast";
    target.style.imageRendering = "crisp-edges";
    target.style.imageRendering = "pixelated";
  }
  var dpiScale = strategy.canvasResolutionScaleMode == 2 ? devicePixelRatio : 1;
  if (strategy.canvasResolutionScaleMode != 0) {
    var newWidth = (cssWidth * dpiScale) | 0;
    var newHeight = (cssHeight * dpiScale) | 0;
    setCanvasElementSize(target, newWidth, newHeight);
    if (target.GLctxObject)
      target.GLctxObject.GLctx.viewport(0, 0, newWidth, newHeight);
  }
  return restoreOldStyle;
};
var JSEvents_requestFullscreen = (target, strategy) => {
  if (strategy.scaleMode != 0 || strategy.canvasResolutionScaleMode != 0) {
    JSEvents_resizeCanvasForFullscreen(target, strategy);
  }
  if (target.requestFullscreen) {
    target.requestFullscreen();
  } else if (target.webkitRequestFullscreen) {
    target.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
  } else {
    return JSEvents.fullscreenEnabled() ? -3 : -1;
  }
  currentFullscreenStrategy = strategy;
  if (strategy.canvasResizedCallback) {
    ((a1, a2, a3) => dynCall_iiii(strategy.canvasResizedCallback, a1, a2, a3))(
      37,
      0,
      strategy.canvasResizedCallbackUserData,
    );
  }
  return 0;
};
var _emscripten_exit_fullscreen = () => {
  if (!JSEvents.fullscreenEnabled()) return -1;
  JSEvents.removeDeferredCalls(JSEvents_requestFullscreen);
  var d = specialHTMLTargets[1];
  if (d.exitFullscreen) {
    d.fullscreenElement && d.exitFullscreen();
  } else if (d.webkitExitFullscreen) {
    d.webkitFullscreenElement && d.webkitExitFullscreen();
  } else {
    return -1;
  }
  return 0;
};
var requestPointerLock = (target) => {
  if (target.requestPointerLock) {
    target.requestPointerLock();
  } else {
    if (document.body.requestPointerLock) {
      return -3;
    }
    return -1;
  }
  return 0;
};
var _emscripten_exit_pointerlock = () => {
  JSEvents.removeDeferredCalls(requestPointerLock);
  if (!document.exitPointerLock) return -1;
  document.exitPointerLock();
  return 0;
};
var _emscripten_get_device_pixel_ratio = () => globalThis.devicePixelRatio ?? 1;
var _emscripten_get_element_css_size = (target, width, height) => {
  target = findEventTarget(target);
  if (!target) return -4;
  var rect = getBoundingClientRect(target);
  HEAPF64[width >> 3] = rect.width;
  HEAPF64[height >> 3] = rect.height;
  return 0;
};
var fillGamepadEventData = (eventStruct, e) => {
  HEAPF64[eventStruct >> 3] = e.timestamp;
  for (var i = 0; i < e.axes.length; ++i) {
    HEAPF64[(eventStruct + i * 8 + 16) >> 3] = e.axes[i];
  }
  for (var i = 0; i < e.buttons.length; ++i) {
    if (typeof e.buttons[i] == "object") {
      HEAPF64[(eventStruct + i * 8 + 528) >> 3] = e.buttons[i].value;
    } else {
      HEAPF64[(eventStruct + i * 8 + 528) >> 3] = e.buttons[i];
    }
  }
  for (var i = 0; i < e.buttons.length; ++i) {
    if (typeof e.buttons[i] == "object") {
      HEAP8[eventStruct + i + 1040] = e.buttons[i].pressed;
    } else {
      HEAP8[eventStruct + i + 1040] = e.buttons[i] == 1;
    }
  }
  HEAP8[eventStruct + 1104] = e.connected;
  HEAP32[(eventStruct + 1108) >> 2] = e.index;
  HEAP32[(eventStruct + 8) >> 2] = e.axes.length;
  HEAP32[(eventStruct + 12) >> 2] = e.buttons.length;
  stringToUTF8(e.id, eventStruct + 1112, 64);
  stringToUTF8(e.mapping, eventStruct + 1176, 64);
};
var _emscripten_get_gamepad_status = (index, gamepadState) => {
  if (index < 0 || index >= JSEvents.lastGamepadState.length) return -5;
  if (!JSEvents.lastGamepadState[index]) return -7;
  fillGamepadEventData(gamepadState, JSEvents.lastGamepadState[index]);
  return 0;
};
var _emscripten_get_num_gamepads = () => JSEvents.lastGamepadState.length;
var _emscripten_get_screen_size = (width, height) => {
  HEAP32[width >> 2] = screen.width;
  HEAP32[height >> 2] = screen.height;
};
var _emscripten_glActiveTexture = (x0) => GLctx.activeTexture(x0);
var _emscripten_glAttachShader = (program, shader) => {
  GLctx.attachShader(GL.programs[program], GL.shaders[shader]);
};
var _emscripten_glBeginQueryEXT = (target, id) => {
  GLctx.disjointTimerQueryExt["beginQueryEXT"](target, GL.queries[id]);
};
var _emscripten_glBindAttribLocation = (program, index, name) => {
  GLctx.bindAttribLocation(GL.programs[program], index, UTF8ToString(name));
};
var _emscripten_glBindBuffer = (target, buffer) => {
  GLctx.bindBuffer(target, GL.buffers[buffer]);
};
var _emscripten_glBindFramebuffer = (target, framebuffer) => {
  GLctx.bindFramebuffer(target, GL.framebuffers[framebuffer]);
};
var _emscripten_glBindRenderbuffer = (target, renderbuffer) => {
  GLctx.bindRenderbuffer(target, GL.renderbuffers[renderbuffer]);
};
var _emscripten_glBindTexture = (target, texture) => {
  GLctx.bindTexture(target, GL.textures[texture]);
};
var _emscripten_glBindVertexArray = (vao) => {
  GLctx.bindVertexArray(GL.vaos[vao]);
};
var _glBindVertexArray = _emscripten_glBindVertexArray;
var _emscripten_glBindVertexArrayOES = _glBindVertexArray;
var _emscripten_glBlendColor = (x0, x1, x2, x3) =>
  GLctx.blendColor(x0, x1, x2, x3);
var _emscripten_glBlendEquation = (x0) => GLctx.blendEquation(x0);
var _emscripten_glBlendEquationSeparate = (x0, x1) =>
  GLctx.blendEquationSeparate(x0, x1);
var _emscripten_glBlendFunc = (x0, x1) => GLctx.blendFunc(x0, x1);
var _emscripten_glBlendFuncSeparate = (x0, x1, x2, x3) =>
  GLctx.blendFuncSeparate(x0, x1, x2, x3);
var _emscripten_glBufferData = (target, size, data, usage) => {
  GLctx.bufferData(
    target,
    data ? HEAPU8.subarray(data, data + size) : size,
    usage,
  );
};
var webglBufferSubData = (target, offset, size, data, src = HEAPU8) => {
  GLctx.bufferSubData(target, offset, src.subarray(data, data + size));
};
var _emscripten_glBufferSubData = (target, offset, size, data) =>
  webglBufferSubData(target, offset, size, data);
var _emscripten_glCheckFramebufferStatus = (x0) =>
  GLctx.checkFramebufferStatus(x0);
var _emscripten_glClear = (x0) => GLctx.clear(x0);
var _emscripten_glClearColor = (x0, x1, x2, x3) =>
  GLctx.clearColor(x0, x1, x2, x3);
var _emscripten_glClearDepthf = (x0) => GLctx.clearDepth(x0);
var _emscripten_glClearStencil = (x0) => GLctx.clearStencil(x0);
var _emscripten_glClipControlEXT = (origin, depth) => {
  GLctx.extClipControl["clipControlEXT"](origin, depth);
};
var _emscripten_glColorMask = (red, green, blue, alpha) => {
  GLctx.colorMask(!!red, !!green, !!blue, !!alpha);
};
var _emscripten_glCompileShader = (shader) => {
  GLctx.compileShader(GL.shaders[shader]);
};
var _emscripten_glCompressedTexImage2D = (
  target,
  level,
  internalFormat,
  width,
  height,
  border,
  imageSize,
  data,
) => {
  GLctx.compressedTexImage2D(
    target,
    level,
    internalFormat,
    width,
    height,
    border,
    HEAPU8.subarray(data, data + imageSize),
  );
};
var _emscripten_glCompressedTexSubImage2D = (
  target,
  level,
  xoffset,
  yoffset,
  width,
  height,
  format,
  imageSize,
  data,
) => {
  GLctx.compressedTexSubImage2D(
    target,
    level,
    xoffset,
    yoffset,
    width,
    height,
    format,
    HEAPU8.subarray(data, data + imageSize),
  );
};
var _emscripten_glCopyTexImage2D = (x0, x1, x2, x3, x4, x5, x6, x7) =>
  GLctx.copyTexImage2D(x0, x1, x2, x3, x4, x5, x6, x7);
var _emscripten_glCopyTexSubImage2D = (x0, x1, x2, x3, x4, x5, x6, x7) =>
  GLctx.copyTexSubImage2D(x0, x1, x2, x3, x4, x5, x6, x7);
var _emscripten_glCreateProgram = () => {
  var id = GL.getNewId(GL.programs);
  var program = GLctx.createProgram();
  program.name = id;
  program.maxUniformLength =
    program.maxAttributeLength =
    program.maxUniformBlockNameLength =
      0;
  program.uniformIdCounter = 1;
  GL.programs[id] = program;
  return id;
};
var _emscripten_glCreateShader = (shaderType) => {
  var id = GL.getNewId(GL.shaders);
  GL.shaders[id] = GLctx.createShader(shaderType);
  return id;
};
var _emscripten_glCullFace = (x0) => GLctx.cullFace(x0);
var _emscripten_glDeleteBuffers = (n, buffers) => {
  for (var i = 0; i < n; i++) {
    var id = HEAP32[(buffers + i * 4) >> 2];
    var buffer = GL.buffers[id];
    if (!buffer) continue;
    GLctx.deleteBuffer(buffer);
    buffer.name = 0;
    GL.buffers[id] = null;
  }
};
var _emscripten_glDeleteFramebuffers = (n, framebuffers) => {
  for (var i = 0; i < n; ++i) {
    var id = HEAP32[(framebuffers + i * 4) >> 2];
    var framebuffer = GL.framebuffers[id];
    if (!framebuffer) continue;
    GLctx.deleteFramebuffer(framebuffer);
    framebuffer.name = 0;
    GL.framebuffers[id] = null;
  }
};
var _emscripten_glDeleteProgram = (id) => {
  if (!id) return;
  var program = GL.programs[id];
  if (!program) {
    GL.recordError(1281);
    return;
  }
  GLctx.deleteProgram(program);
  program.name = 0;
  GL.programs[id] = null;
};
var _emscripten_glDeleteQueriesEXT = (n, ids) => {
  for (var i = 0; i < n; i++) {
    var id = HEAP32[(ids + i * 4) >> 2];
    var query = GL.queries[id];
    if (!query) continue;
    GLctx.disjointTimerQueryExt["deleteQueryEXT"](query);
    GL.queries[id] = null;
  }
};
var _emscripten_glDeleteRenderbuffers = (n, renderbuffers) => {
  for (var i = 0; i < n; i++) {
    var id = HEAP32[(renderbuffers + i * 4) >> 2];
    var renderbuffer = GL.renderbuffers[id];
    if (!renderbuffer) continue;
    GLctx.deleteRenderbuffer(renderbuffer);
    renderbuffer.name = 0;
    GL.renderbuffers[id] = null;
  }
};
var _emscripten_glDeleteShader = (id) => {
  if (!id) return;
  var shader = GL.shaders[id];
  if (!shader) {
    GL.recordError(1281);
    return;
  }
  GLctx.deleteShader(shader);
  GL.shaders[id] = null;
};
var _emscripten_glDeleteTextures = (n, textures) => {
  for (var i = 0; i < n; i++) {
    var id = HEAP32[(textures + i * 4) >> 2];
    var texture = GL.textures[id];
    if (!texture) continue;
    GLctx.deleteTexture(texture);
    texture.name = 0;
    GL.textures[id] = null;
  }
};
var _emscripten_glDeleteVertexArrays = (n, vaos) => {
  for (var i = 0; i < n; i++) {
    var id = HEAP32[(vaos + i * 4) >> 2];
    GLctx.deleteVertexArray(GL.vaos[id]);
    GL.vaos[id] = null;
  }
};
var _glDeleteVertexArrays = _emscripten_glDeleteVertexArrays;
var _emscripten_glDeleteVertexArraysOES = _glDeleteVertexArrays;
var _emscripten_glDepthFunc = (x0) => GLctx.depthFunc(x0);
var _emscripten_glDepthMask = (flag) => {
  GLctx.depthMask(!!flag);
};
var _emscripten_glDepthRangef = (x0, x1) => GLctx.depthRange(x0, x1);
var _emscripten_glDetachShader = (program, shader) => {
  GLctx.detachShader(GL.programs[program], GL.shaders[shader]);
};
var _emscripten_glDisable = (x0) => GLctx.disable(x0);
var _emscripten_glDisableVertexAttribArray = (index) => {
  GLctx.disableVertexAttribArray(index);
};
var _emscripten_glDrawArrays = (mode, first, count) => {
  GLctx.drawArrays(mode, first, count);
};
var _emscripten_glDrawArraysInstanced = (mode, first, count, primcount) => {
  GLctx.drawArraysInstanced(mode, first, count, primcount);
};
var _glDrawArraysInstanced = _emscripten_glDrawArraysInstanced;
var _emscripten_glDrawArraysInstancedANGLE = _glDrawArraysInstanced;
var tempFixedLengthArray = [];
var _emscripten_glDrawBuffers = (n, bufs) => {
  var bufArray = tempFixedLengthArray[n];
  for (var i = 0; i < n; i++) {
    bufArray[i] = HEAP32[(bufs + i * 4) >> 2];
  }
  GLctx.drawBuffers(bufArray);
};
var _glDrawBuffers = _emscripten_glDrawBuffers;
var _emscripten_glDrawBuffersWEBGL = _glDrawBuffers;
var _emscripten_glDrawElements = (mode, count, type, indices) => {
  GLctx.drawElements(mode, count, type, indices);
};
var _emscripten_glDrawElementsInstanced = (
  mode,
  count,
  type,
  indices,
  primcount,
) => {
  GLctx.drawElementsInstanced(mode, count, type, indices, primcount);
};
var _glDrawElementsInstanced = _emscripten_glDrawElementsInstanced;
var _emscripten_glDrawElementsInstancedANGLE = _glDrawElementsInstanced;
var _emscripten_glEnable = (x0) => GLctx.enable(x0);
var _emscripten_glEnableVertexAttribArray = (index) => {
  GLctx.enableVertexAttribArray(index);
};
var _emscripten_glEndQueryEXT = (target) => {
  GLctx.disjointTimerQueryExt["endQueryEXT"](target);
};
var _emscripten_glFinish = () => GLctx.finish();
var _emscripten_glFlush = () => GLctx.flush();
var _emscripten_glFramebufferRenderbuffer = (
  target,
  attachment,
  renderbuffertarget,
  renderbuffer,
) => {
  GLctx.framebufferRenderbuffer(
    target,
    attachment,
    renderbuffertarget,
    GL.renderbuffers[renderbuffer],
  );
};
var _emscripten_glFramebufferTexture2D = (
  target,
  attachment,
  textarget,
  texture,
  level,
) => {
  GLctx.framebufferTexture2D(
    target,
    attachment,
    textarget,
    GL.textures[texture],
    level,
  );
};
var _emscripten_glFrontFace = (x0) => GLctx.frontFace(x0);
var _emscripten_glGenBuffers = (n, buffers) => {
  GL.genObject(n, buffers, "createBuffer", GL.buffers);
};
var _emscripten_glGenFramebuffers = (n, ids) => {
  GL.genObject(n, ids, "createFramebuffer", GL.framebuffers);
};
var _emscripten_glGenQueriesEXT = (n, ids) => {
  for (var i = 0; i < n; i++) {
    var query = GLctx.disjointTimerQueryExt["createQueryEXT"]();
    if (!query) {
      GL.recordError(1282);
      while (i < n) HEAP32[(ids + i++ * 4) >> 2] = 0;
      return;
    }
    var id = GL.getNewId(GL.queries);
    query.name = id;
    GL.queries[id] = query;
    HEAP32[(ids + i * 4) >> 2] = id;
  }
};
var _emscripten_glGenRenderbuffers = (n, renderbuffers) => {
  GL.genObject(n, renderbuffers, "createRenderbuffer", GL.renderbuffers);
};
var _emscripten_glGenTextures = (n, textures) => {
  GL.genObject(n, textures, "createTexture", GL.textures);
};
var _emscripten_glGenVertexArrays = (n, arrays) => {
  GL.genObject(n, arrays, "createVertexArray", GL.vaos);
};
var _glGenVertexArrays = _emscripten_glGenVertexArrays;
var _emscripten_glGenVertexArraysOES = _glGenVertexArrays;
var _emscripten_glGenerateMipmap = (x0) => GLctx.generateMipmap(x0);
var __glGetActiveAttribOrUniform = (
  funcName,
  program,
  index,
  bufSize,
  length,
  size,
  type,
  name,
) => {
  program = GL.programs[program];
  var info = GLctx[funcName](program, index);
  if (info) {
    var numBytesWrittenExclNull =
      name && stringToUTF8(info.name, name, bufSize);
    if (length) HEAP32[length >> 2] = numBytesWrittenExclNull;
    if (size) HEAP32[size >> 2] = info.size;
    if (type) HEAP32[type >> 2] = info.type;
  }
};
var _emscripten_glGetActiveAttrib = (
  program,
  index,
  bufSize,
  length,
  size,
  type,
  name,
) =>
  __glGetActiveAttribOrUniform(
    "getActiveAttrib",
    program,
    index,
    bufSize,
    length,
    size,
    type,
    name,
  );
var _emscripten_glGetActiveUniform = (
  program,
  index,
  bufSize,
  length,
  size,
  type,
  name,
) =>
  __glGetActiveAttribOrUniform(
    "getActiveUniform",
    program,
    index,
    bufSize,
    length,
    size,
    type,
    name,
  );
var _emscripten_glGetAttachedShaders = (program, maxCount, count, shaders) => {
  var result = GLctx.getAttachedShaders(GL.programs[program]);
  var len = result.length;
  if (len > maxCount) {
    len = maxCount;
  }
  HEAP32[count >> 2] = len;
  for (var i = 0; i < len; ++i) {
    var id = GL.shaders.indexOf(result[i]);
    HEAP32[(shaders + i * 4) >> 2] = id;
  }
};
var _emscripten_glGetAttribLocation = (program, name) =>
  GLctx.getAttribLocation(GL.programs[program], UTF8ToString(name));
var writeI53ToI64 = (ptr, num) => {
  HEAPU32[ptr >> 2] = num;
  var lower = HEAPU32[ptr >> 2];
  HEAPU32[(ptr + 4) >> 2] = (num - lower) / 4294967296;
};
var emscriptenWebGLGet = (name_, p, type) => {
  if (!p) {
    GL.recordError(1281);
    return;
  }
  var ret = undefined;
  switch (name_) {
    case 36346:
      ret = 1;
      break;
    case 36344:
      return;
    case 36345:
      ret = 0;
      break;
    case 34466:
      var formats = GLctx.getParameter(34467);
      ret = formats ? formats.length : 0;
      break;
  }
  if (ret === undefined) {
    var result = GLctx.getParameter(name_);
    switch (typeof result) {
      case "number":
        ret = result;
        break;
      case "boolean":
        ret = result ? 1 : 0;
        break;
      case "string":
        GL.recordError(1280);
        return;
      case "object":
        if (result === null) {
          switch (name_) {
            case 34964:
            case 35725:
            case 34965:
            case 36006:
            case 36007:
            case 32873:
            case 34229:
            case 34068: {
              ret = 0;
              break;
            }
            default: {
              GL.recordError(1280);
              return;
            }
          }
        } else if (
          result instanceof Float32Array ||
          result instanceof Uint32Array ||
          result instanceof Int32Array ||
          result instanceof Array
        ) {
          for (var i = 0; i < result.length; ++i) {
            switch (type) {
              case 0:
                HEAP32[(p + i * 4) >> 2] = result[i];
                break;
              case 2:
                HEAPF32[(p + i * 4) >> 2] = result[i];
                break;
              case 4:
                HEAP8[p + i] = result[i] ? 1 : 0;
                break;
            }
          }
          return;
        } else {
          ret = result.name | 0;
        }
        break;
    }
  }
  switch (type) {
    case 1:
      writeI53ToI64(p, ret);
      break;
    case 0:
      HEAP32[p >> 2] = ret;
      break;
    case 2:
      HEAPF32[p >> 2] = ret;
      break;
    case 4:
      HEAP8[p] = ret ? 1 : 0;
      break;
  }
};
var _emscripten_glGetBooleanv = (name_, p) => emscriptenWebGLGet(name_, p, 4);
var _emscripten_glGetBufferParameteriv = (target, value, data) => {
  if (!data) {
    GL.recordError(1281);
    return;
  }
  HEAP32[data >> 2] = GLctx.getBufferParameter(target, value);
};
var _emscripten_glGetError = () => GLctx.getError();
var _emscripten_glGetFloatv = (name_, p) => emscriptenWebGLGet(name_, p, 2);
var _emscripten_glGetFramebufferAttachmentParameteriv = (
  target,
  attachment,
  pname,
  params,
) => {
  var result = GLctx.getFramebufferAttachmentParameter(
    target,
    attachment,
    pname,
  );
  if (result instanceof WebGLRenderbuffer || result instanceof WebGLTexture) {
    result = result.name | 0;
  }
  HEAP32[params >> 2] = result;
};
var _emscripten_glGetIntegerv = (name_, p) => emscriptenWebGLGet(name_, p, 0);
var _emscripten_glGetProgramInfoLog = (program, maxLength, length, infoLog) => {
  var log = GLctx.getProgramInfoLog(GL.programs[program]);
  var numBytesWrittenExclNull =
    maxLength > 0 && infoLog ? stringToUTF8(log, infoLog, maxLength) : 0;
  if (length) HEAP32[length >> 2] = numBytesWrittenExclNull;
};
var _emscripten_glGetProgramiv = (program, pname, p) => {
  if (!p) {
    GL.recordError(1281);
    return;
  }
  if (program >= GL.counter) {
    GL.recordError(1281);
    return;
  }
  program = GL.programs[program];
  if (pname == 35716) {
    var log = GLctx.getProgramInfoLog(program);
    HEAP32[p >> 2] = log.length + 1;
  } else if (pname == 35719) {
    if (!program.maxUniformLength) {
      var numActiveUniforms = GLctx.getProgramParameter(program, 35718);
      for (var i = 0; i < numActiveUniforms; ++i) {
        program.maxUniformLength = Math.max(
          program.maxUniformLength,
          GLctx.getActiveUniform(program, i).name.length + 1,
        );
      }
    }
    HEAP32[p >> 2] = program.maxUniformLength;
  } else if (pname == 35722) {
    if (!program.maxAttributeLength) {
      var numActiveAttributes = GLctx.getProgramParameter(program, 35721);
      for (var i = 0; i < numActiveAttributes; ++i) {
        program.maxAttributeLength = Math.max(
          program.maxAttributeLength,
          GLctx.getActiveAttrib(program, i).name.length + 1,
        );
      }
    }
    HEAP32[p >> 2] = program.maxAttributeLength;
  } else if (pname == 35381) {
    if (!program.maxUniformBlockNameLength) {
      var numActiveUniformBlocks = GLctx.getProgramParameter(program, 35382);
      for (var i = 0; i < numActiveUniformBlocks; ++i) {
        program.maxUniformBlockNameLength = Math.max(
          program.maxUniformBlockNameLength,
          GLctx.getActiveUniformBlockName(program, i).length + 1,
        );
      }
    }
    HEAP32[p >> 2] = program.maxUniformBlockNameLength;
  } else {
    HEAP32[p >> 2] = GLctx.getProgramParameter(program, pname);
  }
};
var _emscripten_glGetQueryObjecti64vEXT = (id, pname, params) => {
  if (!params) {
    GL.recordError(1281);
    return;
  }
  var query = GL.queries[id];
  var param;
  {
    param = GLctx.disjointTimerQueryExt["getQueryObjectEXT"](query, pname);
  }
  var ret;
  if (typeof param == "boolean") {
    ret = param ? 1 : 0;
  } else {
    ret = param;
  }
  writeI53ToI64(params, ret);
};
var _emscripten_glGetQueryObjectivEXT = (id, pname, params) => {
  if (!params) {
    GL.recordError(1281);
    return;
  }
  var query = GL.queries[id];
  var param = GLctx.disjointTimerQueryExt["getQueryObjectEXT"](query, pname);
  var ret;
  if (typeof param == "boolean") {
    ret = param ? 1 : 0;
  } else {
    ret = param;
  }
  HEAP32[params >> 2] = ret;
};
var _glGetQueryObjecti64vEXT = _emscripten_glGetQueryObjecti64vEXT;
var _emscripten_glGetQueryObjectui64vEXT = _glGetQueryObjecti64vEXT;
var _glGetQueryObjectivEXT = _emscripten_glGetQueryObjectivEXT;
var _emscripten_glGetQueryObjectuivEXT = _glGetQueryObjectivEXT;
var _emscripten_glGetQueryivEXT = (target, pname, params) => {
  if (!params) {
    GL.recordError(1281);
    return;
  }
  HEAP32[params >> 2] = GLctx.disjointTimerQueryExt["getQueryEXT"](
    target,
    pname,
  );
};
var _emscripten_glGetRenderbufferParameteriv = (target, pname, params) => {
  if (!params) {
    GL.recordError(1281);
    return;
  }
  HEAP32[params >> 2] = GLctx.getRenderbufferParameter(target, pname);
};
var _emscripten_glGetShaderInfoLog = (shader, maxLength, length, infoLog) => {
  var log = GLctx.getShaderInfoLog(GL.shaders[shader]);
  var numBytesWrittenExclNull =
    maxLength > 0 && infoLog ? stringToUTF8(log, infoLog, maxLength) : 0;
  if (length) HEAP32[length >> 2] = numBytesWrittenExclNull;
};
var _emscripten_glGetShaderPrecisionFormat = (
  shaderType,
  precisionType,
  range,
  precision,
) => {
  var result = GLctx.getShaderPrecisionFormat(shaderType, precisionType);
  HEAP32[range >> 2] = result.rangeMin;
  HEAP32[(range + 4) >> 2] = result.rangeMax;
  HEAP32[precision >> 2] = result.precision;
};
var _emscripten_glGetShaderSource = (shader, bufSize, length, source) => {
  var result = GLctx.getShaderSource(GL.shaders[shader]);
  if (!result) return;
  var numBytesWrittenExclNull =
    bufSize > 0 && source ? stringToUTF8(result, source, bufSize) : 0;
  if (length) HEAP32[length >> 2] = numBytesWrittenExclNull;
};
var _emscripten_glGetShaderiv = (shader, pname, p) => {
  if (!p) {
    GL.recordError(1281);
    return;
  }
  if (pname == 35716) {
    var log = GLctx.getShaderInfoLog(GL.shaders[shader]);
    var logLength = log ? log.length + 1 : 0;
    HEAP32[p >> 2] = logLength;
  } else if (pname == 35720) {
    var source = GLctx.getShaderSource(GL.shaders[shader]);
    var sourceLength = source ? source.length + 1 : 0;
    HEAP32[p >> 2] = sourceLength;
  } else {
    HEAP32[p >> 2] = GLctx.getShaderParameter(GL.shaders[shader], pname);
  }
};
var webglGetExtensions = () => {
  var exts = getEmscriptenSupportedExtensions(GLctx);
  exts = exts.concat(exts.map((e) => "GL_" + e));
  return exts;
};
var _emscripten_glGetString = (name_) => {
  var ret = GL.stringCache[name_];
  if (!ret) {
    switch (name_) {
      case 7939:
        ret = stringToNewUTF8(webglGetExtensions().join(" "));
        break;
      case 7936:
      case 7937:
      case 37445:
      case 37446:
        var s = GLctx.getParameter(name_);
        ret = s ? stringToNewUTF8(s) : 0;
        break;
      case 7938:
        var webGLVersion = GLctx.getParameter(7938);
        var glVersion = `OpenGL ES 2.0 (${webGLVersion})`;
        ret = stringToNewUTF8(glVersion);
        break;
      case 35724:
        var glslVersion = GLctx.getParameter(35724);
        var ver_re = /^WebGL GLSL ES ([0-9]\.[0-9][0-9]?)(?:$| .*)/;
        var ver_num = glslVersion.match(ver_re);
        if (ver_num !== null) {
          if (ver_num[1].length == 3) ver_num[1] = ver_num[1] + "0";
          glslVersion = `OpenGL ES GLSL ES ${ver_num[1]} (${glslVersion})`;
        }
        ret = stringToNewUTF8(glslVersion);
        break;
    }
    GL.stringCache[name_] = ret;
  }
  return ret;
};
var _emscripten_glGetTexParameterfv = (target, pname, params) => {
  if (!params) {
    GL.recordError(1281);
    return;
  }
  HEAPF32[params >> 2] = GLctx.getTexParameter(target, pname);
};
var _emscripten_glGetTexParameteriv = (target, pname, params) => {
  if (!params) {
    GL.recordError(1281);
    return;
  }
  HEAP32[params >> 2] = GLctx.getTexParameter(target, pname);
};
var jstoi_q = (str) => parseInt(str);
var webglGetLeftBracePos = (name) =>
  name.slice(-1) == "]" && name.lastIndexOf("[");
var webglPrepareUniformLocationsBeforeFirstUse = (program) => {
  var uniformLocsById = program.uniformLocsById,
    uniformSizeAndIdsByName = program.uniformSizeAndIdsByName,
    i,
    j;
  if (!uniformLocsById) {
    program.uniformLocsById = uniformLocsById = {};
    program.uniformArrayNamesById = {};
    var numActiveUniforms = GLctx.getProgramParameter(program, 35718);
    for (i = 0; i < numActiveUniforms; ++i) {
      var u = GLctx.getActiveUniform(program, i);
      var nm = u.name;
      var sz = u.size;
      var lb = webglGetLeftBracePos(nm);
      var arrayName = lb > 0 ? nm.slice(0, lb) : nm;
      var id = program.uniformIdCounter;
      program.uniformIdCounter += sz;
      uniformSizeAndIdsByName[arrayName] = [sz, id];
      for (j = 0; j < sz; ++j) {
        uniformLocsById[id] = j;
        program.uniformArrayNamesById[id++] = arrayName;
      }
    }
  }
};
var _emscripten_glGetUniformLocation = (program, name) => {
  name = UTF8ToString(name);
  if ((program = GL.programs[program])) {
    webglPrepareUniformLocationsBeforeFirstUse(program);
    var uniformLocsById = program.uniformLocsById;
    var arrayIndex = 0;
    var uniformBaseName = name;
    var leftBrace = webglGetLeftBracePos(name);
    if (leftBrace > 0) {
      arrayIndex = jstoi_q(name.slice(leftBrace + 1)) >>> 0;
      uniformBaseName = name.slice(0, leftBrace);
    }
    var sizeAndId = program.uniformSizeAndIdsByName[uniformBaseName];
    if (sizeAndId && arrayIndex < sizeAndId[0]) {
      arrayIndex += sizeAndId[1];
      if (
        (uniformLocsById[arrayIndex] =
          uniformLocsById[arrayIndex] ||
          GLctx.getUniformLocation(program, name))
      ) {
        return arrayIndex;
      }
    }
  }
  return -1;
};
var webglGetProgramUniformLocation = (program, location) => {
  var webglLoc = program.uniformLocsById[location];
  if (typeof webglLoc == "number") {
    program.uniformLocsById[location] = webglLoc = GLctx.getUniformLocation(
      program,
      program.uniformArrayNamesById[location] +
        (webglLoc > 0 ? `[${webglLoc}]` : ""),
    );
  }
  return webglLoc;
};
var emscriptenWebGLGetUniform = (program, location, params, type) => {
  if (!params) {
    GL.recordError(1281);
    return;
  }
  program = GL.programs[program];
  webglPrepareUniformLocationsBeforeFirstUse(program);
  var data = GLctx.getUniform(
    program,
    webglGetProgramUniformLocation(program, location),
  );
  if (typeof data == "number" || typeof data == "boolean") {
    switch (type) {
      case 0:
        HEAP32[params >> 2] = data;
        break;
      case 2:
        HEAPF32[params >> 2] = data;
        break;
    }
  } else {
    for (var i = 0; i < data.length; i++) {
      switch (type) {
        case 0:
          HEAP32[(params + i * 4) >> 2] = data[i];
          break;
        case 2:
          HEAPF32[(params + i * 4) >> 2] = data[i];
          break;
      }
    }
  }
};
var _emscripten_glGetUniformfv = (program, location, params) => {
  emscriptenWebGLGetUniform(program, location, params, 2);
};
var _emscripten_glGetUniformiv = (program, location, params) => {
  emscriptenWebGLGetUniform(program, location, params, 0);
};
var _emscripten_glGetVertexAttribPointerv = (index, pname, pointer) => {
  if (!pointer) {
    GL.recordError(1281);
    return;
  }
  HEAP32[pointer >> 2] = GLctx.getVertexAttribOffset(index, pname);
};
var emscriptenWebGLGetVertexAttrib = (index, pname, params, type) => {
  if (!params) {
    GL.recordError(1281);
    return;
  }
  var data = GLctx.getVertexAttrib(index, pname);
  if (pname == 34975) {
    HEAP32[params >> 2] = data && data["name"];
  } else if (typeof data == "number" || typeof data == "boolean") {
    switch (type) {
      case 0:
        HEAP32[params >> 2] = data;
        break;
      case 2:
        HEAPF32[params >> 2] = data;
        break;
      case 5:
        HEAP32[params >> 2] = Math.fround(data);
        break;
    }
  } else {
    for (var i = 0; i < data.length; i++) {
      switch (type) {
        case 0:
          HEAP32[(params + i * 4) >> 2] = data[i];
          break;
        case 2:
          HEAPF32[(params + i * 4) >> 2] = data[i];
          break;
        case 5:
          HEAP32[(params + i * 4) >> 2] = Math.fround(data[i]);
          break;
      }
    }
  }
};
var _emscripten_glGetVertexAttribfv = (index, pname, params) => {
  emscriptenWebGLGetVertexAttrib(index, pname, params, 2);
};
var _emscripten_glGetVertexAttribiv = (index, pname, params) => {
  emscriptenWebGLGetVertexAttrib(index, pname, params, 5);
};
var _emscripten_glHint = (x0, x1) => GLctx.hint(x0, x1);
var _emscripten_glIsBuffer = (buffer) => {
  var b = GL.buffers[buffer];
  if (!b) return 0;
  return GLctx.isBuffer(b);
};
var _emscripten_glIsEnabled = (x0) => GLctx.isEnabled(x0);
var _emscripten_glIsFramebuffer = (framebuffer) => {
  var fb = GL.framebuffers[framebuffer];
  if (!fb) return 0;
  return GLctx.isFramebuffer(fb);
};
var _emscripten_glIsProgram = (program) => {
  program = GL.programs[program];
  if (!program) return 0;
  return GLctx.isProgram(program);
};
var _emscripten_glIsQueryEXT = (id) => {
  var query = GL.queries[id];
  if (!query) return 0;
  return GLctx.disjointTimerQueryExt["isQueryEXT"](query);
};
var _emscripten_glIsRenderbuffer = (renderbuffer) => {
  var rb = GL.renderbuffers[renderbuffer];
  if (!rb) return 0;
  return GLctx.isRenderbuffer(rb);
};
var _emscripten_glIsShader = (shader) => {
  var s = GL.shaders[shader];
  if (!s) return 0;
  return GLctx.isShader(s);
};
var _emscripten_glIsTexture = (id) => {
  var texture = GL.textures[id];
  if (!texture) return 0;
  return GLctx.isTexture(texture);
};
var _emscripten_glIsVertexArray = (array) => {
  var vao = GL.vaos[array];
  if (!vao) return 0;
  return GLctx.isVertexArray(vao);
};
var _glIsVertexArray = _emscripten_glIsVertexArray;
var _emscripten_glIsVertexArrayOES = _glIsVertexArray;
var _emscripten_glLineWidth = (x0) => GLctx.lineWidth(x0);
var _emscripten_glLinkProgram = (program) => {
  program = GL.programs[program];
  GLctx.linkProgram(program);
  program.uniformLocsById = 0;
  program.uniformSizeAndIdsByName = {};
};
var _emscripten_glPixelStorei = (pname, param) => {
  if (pname == 3317) {
    GL.unpackAlignment = param;
  } else if (pname == 3314) {
    GL.unpackRowLength = param;
  }
  GLctx.pixelStorei(pname, param);
};
var _emscripten_glPolygonModeWEBGL = (face, mode) => {
  GLctx.webglPolygonMode["polygonModeWEBGL"](face, mode);
};
var _emscripten_glPolygonOffset = (x0, x1) => GLctx.polygonOffset(x0, x1);
var _emscripten_glPolygonOffsetClampEXT = (factor, units, clamp) => {
  GLctx.extPolygonOffsetClamp["polygonOffsetClampEXT"](factor, units, clamp);
};
var _emscripten_glQueryCounterEXT = (id, target) => {
  GLctx.disjointTimerQueryExt["queryCounterEXT"](GL.queries[id], target);
};
var computeUnpackAlignedImageSize = (width, height, sizePerPixel) => {
  function roundedToNextMultipleOf(x, y) {
    return (x + y - 1) & -y;
  }
  var plainRowSize = (GL.unpackRowLength || width) * sizePerPixel;
  var alignedRowSize = roundedToNextMultipleOf(
    plainRowSize,
    GL.unpackAlignment,
  );
  return height * alignedRowSize;
};
var colorChannelsInGlTextureFormat = (format) => {
  var colorChannels = { 5: 3, 6: 4, 8: 2, 29502: 3, 29504: 4 };
  return colorChannels[format - 6402] || 1;
};
var heapObjectForWebGLType = (type) => {
  type -= 5120;
  if (type == 1) return HEAPU8;
  if (type == 4) return HEAP32;
  if (type == 6) return HEAPF32;
  if (type == 5 || type == 28922) return HEAPU32;
  return HEAPU16;
};
var toTypedArrayIndex = (pointer, heap) =>
  pointer >>> (31 - Math.clz32(heap.BYTES_PER_ELEMENT));
var emscriptenWebGLGetTexPixelData = (type, format, width, height, pixels) => {
  var heap = heapObjectForWebGLType(type);
  var sizePerPixel =
    colorChannelsInGlTextureFormat(format) * heap.BYTES_PER_ELEMENT;
  var bytes = computeUnpackAlignedImageSize(width, height, sizePerPixel);
  return heap.subarray(
    toTypedArrayIndex(pixels, heap),
    toTypedArrayIndex(pixels + bytes, heap),
  );
};
var _emscripten_glReadPixels = (x, y, width, height, format, type, pixels) => {
  var pixelData = emscriptenWebGLGetTexPixelData(
    type,
    format,
    width,
    height,
    pixels,
  );
  if (!pixelData) {
    GL.recordError(1280);
    return;
  }
  GLctx.readPixels(x, y, width, height, format, type, pixelData);
};
var _emscripten_glReleaseShaderCompiler = () => {};
var _emscripten_glRenderbufferStorage = (x0, x1, x2, x3) =>
  GLctx.renderbufferStorage(x0, x1, x2, x3);
var _emscripten_glSampleCoverage = (value, invert) => {
  GLctx.sampleCoverage(value, !!invert);
};
var _emscripten_glScissor = (x0, x1, x2, x3) => GLctx.scissor(x0, x1, x2, x3);
var _emscripten_glShaderBinary = (
  count,
  shaders,
  binaryformat,
  binary,
  length,
) => {
  GL.recordError(1280);
};
var _emscripten_glShaderSource = (shader, count, string, length) => {
  var source = GL.getSource(shader, count, string, length);
  GLctx.shaderSource(GL.shaders[shader], source);
};
var _emscripten_glStencilFunc = (x0, x1, x2) => GLctx.stencilFunc(x0, x1, x2);
var _emscripten_glStencilFuncSeparate = (x0, x1, x2, x3) =>
  GLctx.stencilFuncSeparate(x0, x1, x2, x3);
var _emscripten_glStencilMask = (x0) => GLctx.stencilMask(x0);
var _emscripten_glStencilMaskSeparate = (x0, x1) =>
  GLctx.stencilMaskSeparate(x0, x1);
var _emscripten_glStencilOp = (x0, x1, x2) => GLctx.stencilOp(x0, x1, x2);
var _emscripten_glStencilOpSeparate = (x0, x1, x2, x3) =>
  GLctx.stencilOpSeparate(x0, x1, x2, x3);
var _emscripten_glTexImage2D = (
  target,
  level,
  internalFormat,
  width,
  height,
  border,
  format,
  type,
  pixels,
) => {
  var pixelData = pixels
    ? emscriptenWebGLGetTexPixelData(type, format, width, height, pixels)
    : null;
  GLctx.texImage2D(
    target,
    level,
    internalFormat,
    width,
    height,
    border,
    format,
    type,
    pixelData,
  );
};
var _emscripten_glTexParameterf = (x0, x1, x2) =>
  GLctx.texParameterf(x0, x1, x2);
var _emscripten_glTexParameterfv = (target, pname, params) => {
  var param = HEAPF32[params >> 2];
  GLctx.texParameterf(target, pname, param);
};
var _emscripten_glTexParameteri = (x0, x1, x2) =>
  GLctx.texParameteri(x0, x1, x2);
var _emscripten_glTexParameteriv = (target, pname, params) => {
  var param = HEAP32[params >> 2];
  GLctx.texParameteri(target, pname, param);
};
var _emscripten_glTexSubImage2D = (
  target,
  level,
  xoffset,
  yoffset,
  width,
  height,
  format,
  type,
  pixels,
) => {
  var pixelData = pixels
    ? emscriptenWebGLGetTexPixelData(type, format, width, height, pixels)
    : null;
  GLctx.texSubImage2D(
    target,
    level,
    xoffset,
    yoffset,
    width,
    height,
    format,
    type,
    pixelData,
  );
};
var webglGetUniformLocation = (location) =>
  webglGetProgramUniformLocation(GLctx.currentProgram, location);
var _emscripten_glUniform1f = (location, v0) => {
  GLctx.uniform1f(webglGetUniformLocation(location), v0);
};
var miniTempWebGLFloatBuffers = [];
var _emscripten_glUniform1fv = (location, count, value) => {
  if (count <= 288) {
    var view = miniTempWebGLFloatBuffers[count];
    for (var i = 0; i < count; ++i) {
      view[i] = HEAPF32[(value + 4 * i) >> 2];
    }
  } else {
    var view = HEAPF32.subarray(value >> 2, (value + count * 4) >> 2);
  }
  GLctx.uniform1fv(webglGetUniformLocation(location), view);
};
var _emscripten_glUniform1i = (location, v0) => {
  GLctx.uniform1i(webglGetUniformLocation(location), v0);
};
var miniTempWebGLIntBuffers = [];
var _emscripten_glUniform1iv = (location, count, value) => {
  if (count <= 288) {
    var view = miniTempWebGLIntBuffers[count];
    for (var i = 0; i < count; ++i) {
      view[i] = HEAP32[(value + 4 * i) >> 2];
    }
  } else {
    var view = HEAP32.subarray(value >> 2, (value + count * 4) >> 2);
  }
  GLctx.uniform1iv(webglGetUniformLocation(location), view);
};
var _emscripten_glUniform2f = (location, v0, v1) => {
  GLctx.uniform2f(webglGetUniformLocation(location), v0, v1);
};
var _emscripten_glUniform2fv = (location, count, value) => {
  if (count <= 144) {
    count *= 2;
    var view = miniTempWebGLFloatBuffers[count];
    for (var i = 0; i < count; i += 2) {
      view[i] = HEAPF32[(value + 4 * i) >> 2];
      view[i + 1] = HEAPF32[(value + (4 * i + 4)) >> 2];
    }
  } else {
    var view = HEAPF32.subarray(value >> 2, (value + count * 8) >> 2);
  }
  GLctx.uniform2fv(webglGetUniformLocation(location), view);
};
var _emscripten_glUniform2i = (location, v0, v1) => {
  GLctx.uniform2i(webglGetUniformLocation(location), v0, v1);
};
var _emscripten_glUniform2iv = (location, count, value) => {
  if (count <= 144) {
    count *= 2;
    var view = miniTempWebGLIntBuffers[count];
    for (var i = 0; i < count; i += 2) {
      view[i] = HEAP32[(value + 4 * i) >> 2];
      view[i + 1] = HEAP32[(value + (4 * i + 4)) >> 2];
    }
  } else {
    var view = HEAP32.subarray(value >> 2, (value + count * 8) >> 2);
  }
  GLctx.uniform2iv(webglGetUniformLocation(location), view);
};
var _emscripten_glUniform3f = (location, v0, v1, v2) => {
  GLctx.uniform3f(webglGetUniformLocation(location), v0, v1, v2);
};
var _emscripten_glUniform3fv = (location, count, value) => {
  if (count <= 96) {
    count *= 3;
    var view = miniTempWebGLFloatBuffers[count];
    for (var i = 0; i < count; i += 3) {
      view[i] = HEAPF32[(value + 4 * i) >> 2];
      view[i + 1] = HEAPF32[(value + (4 * i + 4)) >> 2];
      view[i + 2] = HEAPF32[(value + (4 * i + 8)) >> 2];
    }
  } else {
    var view = HEAPF32.subarray(value >> 2, (value + count * 12) >> 2);
  }
  GLctx.uniform3fv(webglGetUniformLocation(location), view);
};
var _emscripten_glUniform3i = (location, v0, v1, v2) => {
  GLctx.uniform3i(webglGetUniformLocation(location), v0, v1, v2);
};
var _emscripten_glUniform3iv = (location, count, value) => {
  if (count <= 96) {
    count *= 3;
    var view = miniTempWebGLIntBuffers[count];
    for (var i = 0; i < count; i += 3) {
      view[i] = HEAP32[(value + 4 * i) >> 2];
      view[i + 1] = HEAP32[(value + (4 * i + 4)) >> 2];
      view[i + 2] = HEAP32[(value + (4 * i + 8)) >> 2];
    }
  } else {
    var view = HEAP32.subarray(value >> 2, (value + count * 12) >> 2);
  }
  GLctx.uniform3iv(webglGetUniformLocation(location), view);
};
var _emscripten_glUniform4f = (location, v0, v1, v2, v3) => {
  GLctx.uniform4f(webglGetUniformLocation(location), v0, v1, v2, v3);
};
var _emscripten_glUniform4fv = (location, count, value) => {
  if (count <= 72) {
    var view = miniTempWebGLFloatBuffers[4 * count];
    var heap = HEAPF32;
    value = value >> 2;
    count *= 4;
    for (var i = 0; i < count; i += 4) {
      var dst = value + i;
      view[i] = heap[dst];
      view[i + 1] = heap[dst + 1];
      view[i + 2] = heap[dst + 2];
      view[i + 3] = heap[dst + 3];
    }
  } else {
    var view = HEAPF32.subarray(value >> 2, (value + count * 16) >> 2);
  }
  GLctx.uniform4fv(webglGetUniformLocation(location), view);
};
var _emscripten_glUniform4i = (location, v0, v1, v2, v3) => {
  GLctx.uniform4i(webglGetUniformLocation(location), v0, v1, v2, v3);
};
var _emscripten_glUniform4iv = (location, count, value) => {
  if (count <= 72) {
    count *= 4;
    var view = miniTempWebGLIntBuffers[count];
    for (var i = 0; i < count; i += 4) {
      view[i] = HEAP32[(value + 4 * i) >> 2];
      view[i + 1] = HEAP32[(value + (4 * i + 4)) >> 2];
      view[i + 2] = HEAP32[(value + (4 * i + 8)) >> 2];
      view[i + 3] = HEAP32[(value + (4 * i + 12)) >> 2];
    }
  } else {
    var view = HEAP32.subarray(value >> 2, (value + count * 16) >> 2);
  }
  GLctx.uniform4iv(webglGetUniformLocation(location), view);
};
var _emscripten_glUniformMatrix2fv = (location, count, transpose, value) => {
  if (count <= 72) {
    count *= 4;
    var view = miniTempWebGLFloatBuffers[count];
    for (var i = 0; i < count; i += 4) {
      view[i] = HEAPF32[(value + 4 * i) >> 2];
      view[i + 1] = HEAPF32[(value + (4 * i + 4)) >> 2];
      view[i + 2] = HEAPF32[(value + (4 * i + 8)) >> 2];
      view[i + 3] = HEAPF32[(value + (4 * i + 12)) >> 2];
    }
  } else {
    var view = HEAPF32.subarray(value >> 2, (value + count * 16) >> 2);
  }
  GLctx.uniformMatrix2fv(webglGetUniformLocation(location), !!transpose, view);
};
var _emscripten_glUniformMatrix3fv = (location, count, transpose, value) => {
  if (count <= 32) {
    count *= 9;
    var view = miniTempWebGLFloatBuffers[count];
    for (var i = 0; i < count; i += 9) {
      view[i] = HEAPF32[(value + 4 * i) >> 2];
      view[i + 1] = HEAPF32[(value + (4 * i + 4)) >> 2];
      view[i + 2] = HEAPF32[(value + (4 * i + 8)) >> 2];
      view[i + 3] = HEAPF32[(value + (4 * i + 12)) >> 2];
      view[i + 4] = HEAPF32[(value + (4 * i + 16)) >> 2];
      view[i + 5] = HEAPF32[(value + (4 * i + 20)) >> 2];
      view[i + 6] = HEAPF32[(value + (4 * i + 24)) >> 2];
      view[i + 7] = HEAPF32[(value + (4 * i + 28)) >> 2];
      view[i + 8] = HEAPF32[(value + (4 * i + 32)) >> 2];
    }
  } else {
    var view = HEAPF32.subarray(value >> 2, (value + count * 36) >> 2);
  }
  GLctx.uniformMatrix3fv(webglGetUniformLocation(location), !!transpose, view);
};
var _emscripten_glUniformMatrix4fv = (location, count, transpose, value) => {
  if (count <= 18) {
    var view = miniTempWebGLFloatBuffers[16 * count];
    var heap = HEAPF32;
    value = value >> 2;
    count *= 16;
    for (var i = 0; i < count; i += 16) {
      var dst = value + i;
      view[i] = heap[dst];
      view[i + 1] = heap[dst + 1];
      view[i + 2] = heap[dst + 2];
      view[i + 3] = heap[dst + 3];
      view[i + 4] = heap[dst + 4];
      view[i + 5] = heap[dst + 5];
      view[i + 6] = heap[dst + 6];
      view[i + 7] = heap[dst + 7];
      view[i + 8] = heap[dst + 8];
      view[i + 9] = heap[dst + 9];
      view[i + 10] = heap[dst + 10];
      view[i + 11] = heap[dst + 11];
      view[i + 12] = heap[dst + 12];
      view[i + 13] = heap[dst + 13];
      view[i + 14] = heap[dst + 14];
      view[i + 15] = heap[dst + 15];
    }
  } else {
    var view = HEAPF32.subarray(value >> 2, (value + count * 64) >> 2);
  }
  GLctx.uniformMatrix4fv(webglGetUniformLocation(location), !!transpose, view);
};
var _emscripten_glUseProgram = (program) => {
  program = GL.programs[program];
  GLctx.useProgram(program);
  GLctx.currentProgram = program;
};
var _emscripten_glValidateProgram = (program) => {
  GLctx.validateProgram(GL.programs[program]);
};
var _emscripten_glVertexAttrib1f = (x0, x1) => GLctx.vertexAttrib1f(x0, x1);
var _emscripten_glVertexAttrib1fv = (index, v) => {
  GLctx.vertexAttrib1f(index, HEAPF32[v >> 2]);
};
var _emscripten_glVertexAttrib2f = (x0, x1, x2) =>
  GLctx.vertexAttrib2f(x0, x1, x2);
var _emscripten_glVertexAttrib2fv = (index, v) => {
  GLctx.vertexAttrib2f(index, HEAPF32[v >> 2], HEAPF32[(v + 4) >> 2]);
};
var _emscripten_glVertexAttrib3f = (x0, x1, x2, x3) =>
  GLctx.vertexAttrib3f(x0, x1, x2, x3);
var _emscripten_glVertexAttrib3fv = (index, v) => {
  GLctx.vertexAttrib3f(
    index,
    HEAPF32[v >> 2],
    HEAPF32[(v + 4) >> 2],
    HEAPF32[(v + 8) >> 2],
  );
};
var _emscripten_glVertexAttrib4f = (x0, x1, x2, x3, x4) =>
  GLctx.vertexAttrib4f(x0, x1, x2, x3, x4);
var _emscripten_glVertexAttrib4fv = (index, v) => {
  GLctx.vertexAttrib4f(
    index,
    HEAPF32[v >> 2],
    HEAPF32[(v + 4) >> 2],
    HEAPF32[(v + 8) >> 2],
    HEAPF32[(v + 12) >> 2],
  );
};
var _emscripten_glVertexAttribDivisor = (index, divisor) => {
  GLctx.vertexAttribDivisor(index, divisor);
};
var _glVertexAttribDivisor = _emscripten_glVertexAttribDivisor;
var _emscripten_glVertexAttribDivisorANGLE = _glVertexAttribDivisor;
var _emscripten_glVertexAttribPointer = (
  index,
  size,
  type,
  normalized,
  stride,
  ptr,
) => {
  GLctx.vertexAttribPointer(index, size, type, !!normalized, stride, ptr);
};
var _emscripten_glViewport = (x0, x1, x2, x3) => GLctx.viewport(x0, x1, x2, x3);
var _emscripten_has_asyncify = () => 1;
var doRequestFullscreen = (target, strategy) => {
  if (!JSEvents.fullscreenEnabled()) return -1;
  target = findEventTarget(target);
  if (!target) return -4;
  if (!target.requestFullscreen && !target.webkitRequestFullscreen) {
    return -3;
  }
  if (!JSEvents.canPerformEventHandlerRequests()) {
    if (strategy.deferUntilInEventHandler) {
      JSEvents.deferCall(JSEvents_requestFullscreen, 1, [target, strategy]);
      return 1;
    }
    return -2;
  }
  return JSEvents_requestFullscreen(target, strategy);
};
var _emscripten_request_fullscreen_strategy = (
  target,
  deferUntilInEventHandler,
  fullscreenStrategy,
) => {
  var strategy = {
    scaleMode: HEAP32[fullscreenStrategy >> 2],
    canvasResolutionScaleMode: HEAP32[(fullscreenStrategy + 4) >> 2],
    filteringMode: HEAP32[(fullscreenStrategy + 8) >> 2],
    deferUntilInEventHandler,
    canvasResizedCallback: HEAP32[(fullscreenStrategy + 12) >> 2],
    canvasResizedCallbackUserData: HEAP32[(fullscreenStrategy + 16) >> 2],
  };
  return doRequestFullscreen(target, strategy);
};
var _emscripten_request_pointerlock = (target, deferUntilInEventHandler) => {
  target = findEventTarget(target);
  if (!target) return -4;
  if (!target.requestPointerLock) {
    return -1;
  }
  if (!JSEvents.canPerformEventHandlerRequests()) {
    if (deferUntilInEventHandler) {
      JSEvents.deferCall(requestPointerLock, 2, [target]);
      return 1;
    }
    return -2;
  }
  return requestPointerLock(target);
};
var getHeapMax = () => 2147483648;
var growMemory = (size) => {
  var oldHeapSize = wasmMemory.buffer.byteLength;
  var pages = ((size - oldHeapSize + 65535) / 65536) | 0;
  try {
    wasmMemory.grow(pages);
    updateMemoryViews();
    return 1;
  } catch (e) {}
};
var _emscripten_resize_heap = (requestedSize) => {
  var oldSize = HEAPU8.length;
  requestedSize >>>= 0;
  var maxHeapSize = getHeapMax();
  if (requestedSize > maxHeapSize) {
    return false;
  }
  for (var cutDown = 1; cutDown <= 4; cutDown *= 2) {
    var overGrownHeapSize = oldSize * (1 + 0.2 / cutDown);
    overGrownHeapSize = Math.min(overGrownHeapSize, requestedSize + 100663296);
    var newSize = Math.min(
      maxHeapSize,
      alignMemory(Math.max(requestedSize, overGrownHeapSize), 65536),
    );
    var replacement = growMemory(newSize);
    if (replacement) {
      return true;
    }
  }
  return false;
};
var _emscripten_sample_gamepad_data = () => {
  try {
    if (navigator.getGamepads)
      return (JSEvents.lastGamepadState = navigator.getGamepads()) ? 0 : -1;
  } catch (e) {
    navigator.getGamepads = null;
  }
  return -1;
};
var registerBeforeUnloadEventCallback = (
  target,
  userData,
  useCapture,
  callbackfunc,
  eventTypeId,
  eventTypeString,
) => {
  var beforeUnloadEventHandlerFunc = (e) => {
    var confirmationMessage = ((a1, a2, a3) =>
      dynCall_iiii(callbackfunc, a1, a2, a3))(eventTypeId, 0, userData);
    if (confirmationMessage) {
      confirmationMessage = UTF8ToString(confirmationMessage);
    }
    if (confirmationMessage) {
      e.preventDefault();
      e.returnValue = confirmationMessage;
      return confirmationMessage;
    }
  };
  var eventHandler = {
    target: findEventTarget(target),
    eventTypeString,
    eventTypeId,
    userData,
    callbackfunc,
    handlerFunc: beforeUnloadEventHandlerFunc,
    useCapture,
  };
  return JSEvents.registerOrRemoveHandler(eventHandler);
};
var _emscripten_set_beforeunload_callback_on_thread = (
  userData,
  callbackfunc,
  targetThread,
) => {
  if (typeof onbeforeunload == "undefined") return -1;
  if (targetThread !== 1) return -5;
  return registerBeforeUnloadEventCallback(
    2,
    userData,
    true,
    callbackfunc,
    28,
    "beforeunload",
  );
};
var registerFocusEventCallback = (
  target,
  userData,
  useCapture,
  callbackfunc,
  eventTypeId,
  eventTypeString,
  targetThread,
) => {
  var eventSize = 256;
  JSEvents.focusEvent ||= _malloc(eventSize);
  var focusEventHandlerFunc = (e) => {
    var nodeName = JSEvents.getNodeNameForTarget(e.target);
    var id = e.target.id ?? "";
    var focusEvent = JSEvents.focusEvent;
    stringToUTF8(nodeName, focusEvent + 0, 128);
    stringToUTF8(id, focusEvent + 128, 128);
    if (
      ((a1, a2, a3) => dynCall_iiii(callbackfunc, a1, a2, a3))(
        eventTypeId,
        focusEvent,
        userData,
      )
    )
      e.preventDefault();
  };
  var eventHandler = {
    target: findEventTarget(target),
    eventTypeString,
    eventTypeId,
    userData,
    callbackfunc,
    handlerFunc: focusEventHandlerFunc,
    useCapture,
  };
  return JSEvents.registerOrRemoveHandler(eventHandler);
};
var _emscripten_set_blur_callback_on_thread = (
  target,
  userData,
  useCapture,
  callbackfunc,
  targetThread,
) =>
  registerFocusEventCallback(
    target,
    userData,
    useCapture,
    callbackfunc,
    12,
    "blur",
    targetThread,
  );
var _emscripten_set_element_css_size = (target, width, height) => {
  target = findEventTarget(target);
  if (!target) return -4;
  target.style.width = width + "px";
  target.style.height = height + "px";
  return 0;
};
var _emscripten_set_focus_callback_on_thread = (
  target,
  userData,
  useCapture,
  callbackfunc,
  targetThread,
) =>
  registerFocusEventCallback(
    target,
    userData,
    useCapture,
    callbackfunc,
    13,
    "focus",
    targetThread,
  );
var fillFullscreenChangeEventData = (eventStruct) => {
  var fullscreenElement = getFullscreenElement();
  var isFullscreen = !!fullscreenElement;
  HEAP8[eventStruct] = isFullscreen;
  HEAP8[eventStruct + 1] = JSEvents.fullscreenEnabled();
  var reportedElement = isFullscreen
    ? fullscreenElement
    : JSEvents.previousFullscreenElement;
  var nodeName = JSEvents.getNodeNameForTarget(reportedElement);
  var id = reportedElement?.id ?? "";
  stringToUTF8(nodeName, eventStruct + 2, 128);
  stringToUTF8(id, eventStruct + 130, 128);
  HEAP32[(eventStruct + 260) >> 2] = reportedElement?.clientWidth ?? 0;
  HEAP32[(eventStruct + 264) >> 2] = reportedElement?.clientHeight ?? 0;
  HEAP32[(eventStruct + 268) >> 2] = screen.width;
  HEAP32[(eventStruct + 272) >> 2] = screen.height;
  if (isFullscreen) {
    JSEvents.previousFullscreenElement = fullscreenElement;
  }
};
var registerFullscreenChangeEventCallback = (
  target,
  userData,
  useCapture,
  callbackfunc,
  eventTypeId,
  eventTypeString,
  targetThread,
) => {
  var eventSize = 276;
  JSEvents.fullscreenChangeEvent ||= _malloc(eventSize);
  var fullscreenChangeEventHandlerFunc = (e) => {
    var fullscreenChangeEvent = JSEvents.fullscreenChangeEvent;
    fillFullscreenChangeEventData(fullscreenChangeEvent);
    if (
      ((a1, a2, a3) => dynCall_iiii(callbackfunc, a1, a2, a3))(
        eventTypeId,
        fullscreenChangeEvent,
        userData,
      )
    )
      e.preventDefault();
  };
  var eventHandler = {
    target,
    eventTypeString,
    eventTypeId,
    userData,
    callbackfunc,
    handlerFunc: fullscreenChangeEventHandlerFunc,
    useCapture,
  };
  return JSEvents.registerOrRemoveHandler(eventHandler);
};
var _emscripten_set_fullscreenchange_callback_on_thread = (
  target,
  userData,
  useCapture,
  callbackfunc,
  targetThread,
) => {
  if (!JSEvents.fullscreenEnabled()) return -1;
  target = findEventTarget(target);
  if (!target) return -4;
  registerFullscreenChangeEventCallback(
    target,
    userData,
    useCapture,
    callbackfunc,
    19,
    "webkitfullscreenchange",
    targetThread,
  );
  return registerFullscreenChangeEventCallback(
    target,
    userData,
    useCapture,
    callbackfunc,
    19,
    "fullscreenchange",
    targetThread,
  );
};
var registerGamepadEventCallback = (
  target,
  userData,
  useCapture,
  callbackfunc,
  eventTypeId,
  eventTypeString,
  targetThread,
) => {
  var eventSize = 1240;
  JSEvents.gamepadEvent ||= _malloc(eventSize);
  var gamepadEventHandlerFunc = (e) => {
    var gamepadEvent = JSEvents.gamepadEvent;
    fillGamepadEventData(gamepadEvent, e["gamepad"]);
    if (
      ((a1, a2, a3) => dynCall_iiii(callbackfunc, a1, a2, a3))(
        eventTypeId,
        gamepadEvent,
        userData,
      )
    )
      e.preventDefault();
  };
  var eventHandler = {
    target: findEventTarget(target),
    allowsDeferredCalls: true,
    eventTypeString,
    eventTypeId,
    userData,
    callbackfunc,
    handlerFunc: gamepadEventHandlerFunc,
    useCapture,
  };
  return JSEvents.registerOrRemoveHandler(eventHandler);
};
var _emscripten_set_gamepadconnected_callback_on_thread = (
  userData,
  useCapture,
  callbackfunc,
  targetThread,
) => {
  if (_emscripten_sample_gamepad_data()) return -1;
  return registerGamepadEventCallback(
    2,
    userData,
    useCapture,
    callbackfunc,
    26,
    "gamepadconnected",
    targetThread,
  );
};
var _emscripten_set_gamepaddisconnected_callback_on_thread = (
  userData,
  useCapture,
  callbackfunc,
  targetThread,
) => {
  if (_emscripten_sample_gamepad_data()) return -1;
  return registerGamepadEventCallback(
    2,
    userData,
    useCapture,
    callbackfunc,
    27,
    "gamepaddisconnected",
    targetThread,
  );
};
var registerKeyEventCallback = (
  target,
  userData,
  useCapture,
  callbackfunc,
  eventTypeId,
  eventTypeString,
  targetThread,
) => {
  var eventSize = 160;
  JSEvents.keyEvent ||= _malloc(eventSize);
  var keyEventHandlerFunc = (e) => {
    var keyEventData = JSEvents.keyEvent;
    HEAPF64[keyEventData >> 3] = e.timeStamp;
    var idx = keyEventData >> 2;
    HEAP32[idx + 2] = e.location;
    HEAP8[keyEventData + 12] = e.ctrlKey;
    HEAP8[keyEventData + 13] = e.shiftKey;
    HEAP8[keyEventData + 14] = e.altKey;
    HEAP8[keyEventData + 15] = e.metaKey;
    HEAP8[keyEventData + 16] = e.repeat;
    HEAP32[idx + 5] = e.charCode;
    HEAP32[idx + 6] = e.keyCode;
    HEAP32[idx + 7] = e.which;
    stringToUTF8(e.key ?? "", keyEventData + 32, 32);
    stringToUTF8(e.code ?? "", keyEventData + 64, 32);
    stringToUTF8(e.char ?? "", keyEventData + 96, 32);
    stringToUTF8(e.locale ?? "", keyEventData + 128, 32);
    if (
      ((a1, a2, a3) => dynCall_iiii(callbackfunc, a1, a2, a3))(
        eventTypeId,
        keyEventData,
        userData,
      )
    )
      e.preventDefault();
  };
  var eventHandler = {
    target: findEventTarget(target),
    eventTypeString,
    eventTypeId,
    userData,
    callbackfunc,
    handlerFunc: keyEventHandlerFunc,
    useCapture,
  };
  return JSEvents.registerOrRemoveHandler(eventHandler);
};
var _emscripten_set_keydown_callback_on_thread = (
  target,
  userData,
  useCapture,
  callbackfunc,
  targetThread,
) =>
  registerKeyEventCallback(
    target,
    userData,
    useCapture,
    callbackfunc,
    2,
    "keydown",
    targetThread,
  );
var _emscripten_set_keypress_callback_on_thread = (
  target,
  userData,
  useCapture,
  callbackfunc,
  targetThread,
) =>
  registerKeyEventCallback(
    target,
    userData,
    useCapture,
    callbackfunc,
    1,
    "keypress",
    targetThread,
  );
var _emscripten_set_keyup_callback_on_thread = (
  target,
  userData,
  useCapture,
  callbackfunc,
  targetThread,
) =>
  registerKeyEventCallback(
    target,
    userData,
    useCapture,
    callbackfunc,
    3,
    "keyup",
    targetThread,
  );
var fillMouseEventData = (eventStruct, e, target) => {
  HEAPF64[eventStruct >> 3] = e.timeStamp;
  var idx = eventStruct >> 2;
  HEAP32[idx + 2] = e.screenX;
  HEAP32[idx + 3] = e.screenY;
  HEAP32[idx + 4] = e.clientX;
  HEAP32[idx + 5] = e.clientY;
  HEAP8[eventStruct + 24] = e.ctrlKey;
  HEAP8[eventStruct + 25] = e.shiftKey;
  HEAP8[eventStruct + 26] = e.altKey;
  HEAP8[eventStruct + 27] = e.metaKey;
  HEAP16[idx * 2 + 14] = e.button;
  HEAP16[idx * 2 + 15] = e.buttons;
  HEAP32[idx + 8] = e["movementX"];
  HEAP32[idx + 9] = e["movementY"];
  var rect = getBoundingClientRect(target);
  HEAP32[idx + 10] = e.clientX - (rect.left | 0);
  HEAP32[idx + 11] = e.clientY - (rect.top | 0);
};
var registerMouseEventCallback = (
  target,
  userData,
  useCapture,
  callbackfunc,
  eventTypeId,
  eventTypeString,
  targetThread,
) => {
  var eventSize = 64;
  JSEvents.mouseEvent ||= _malloc(eventSize);
  target = findEventTarget(target);
  var mouseEventHandlerFunc = (e) => {
    fillMouseEventData(JSEvents.mouseEvent, e, target);
    if (
      ((a1, a2, a3) => dynCall_iiii(callbackfunc, a1, a2, a3))(
        eventTypeId,
        JSEvents.mouseEvent,
        userData,
      )
    )
      e.preventDefault();
  };
  var eventHandler = {
    target,
    allowsDeferredCalls:
      eventTypeString != "mousemove" &&
      eventTypeString != "mouseenter" &&
      eventTypeString != "mouseleave",
    eventTypeString,
    eventTypeId,
    userData,
    callbackfunc,
    handlerFunc: mouseEventHandlerFunc,
    useCapture,
  };
  return JSEvents.registerOrRemoveHandler(eventHandler);
};
var _emscripten_set_mousedown_callback_on_thread = (
  target,
  userData,
  useCapture,
  callbackfunc,
  targetThread,
) =>
  registerMouseEventCallback(
    target,
    userData,
    useCapture,
    callbackfunc,
    5,
    "mousedown",
    targetThread,
  );
var _emscripten_set_mouseenter_callback_on_thread = (
  target,
  userData,
  useCapture,
  callbackfunc,
  targetThread,
) =>
  registerMouseEventCallback(
    target,
    userData,
    useCapture,
    callbackfunc,
    33,
    "mouseenter",
    targetThread,
  );
var _emscripten_set_mouseleave_callback_on_thread = (
  target,
  userData,
  useCapture,
  callbackfunc,
  targetThread,
) =>
  registerMouseEventCallback(
    target,
    userData,
    useCapture,
    callbackfunc,
    34,
    "mouseleave",
    targetThread,
  );
var _emscripten_set_mousemove_callback_on_thread = (
  target,
  userData,
  useCapture,
  callbackfunc,
  targetThread,
) =>
  registerMouseEventCallback(
    target,
    userData,
    useCapture,
    callbackfunc,
    8,
    "mousemove",
    targetThread,
  );
var _emscripten_set_mouseup_callback_on_thread = (
  target,
  userData,
  useCapture,
  callbackfunc,
  targetThread,
) =>
  registerMouseEventCallback(
    target,
    userData,
    useCapture,
    callbackfunc,
    6,
    "mouseup",
    targetThread,
  );
var fillPointerlockChangeEventData = (eventStruct) => {
  var pointerLockElement = document.pointerLockElement;
  var isPointerlocked = !!pointerLockElement;
  HEAP8[eventStruct] = isPointerlocked;
  var nodeName = JSEvents.getNodeNameForTarget(pointerLockElement);
  var id = pointerLockElement?.id ?? "";
  stringToUTF8(nodeName, eventStruct + 1, 128);
  stringToUTF8(id, eventStruct + 129, 128);
};
var registerPointerlockChangeEventCallback = (
  target,
  userData,
  useCapture,
  callbackfunc,
  eventTypeId,
  eventTypeString,
  targetThread,
) => {
  var eventSize = 257;
  JSEvents.pointerlockChangeEvent ||= _malloc(eventSize);
  var pointerlockChangeEventHandlerFunc = (e) => {
    var pointerlockChangeEvent = JSEvents.pointerlockChangeEvent;
    fillPointerlockChangeEventData(pointerlockChangeEvent);
    if (
      ((a1, a2, a3) => dynCall_iiii(callbackfunc, a1, a2, a3))(
        eventTypeId,
        pointerlockChangeEvent,
        userData,
      )
    )
      e.preventDefault();
  };
  var eventHandler = {
    target,
    eventTypeString,
    eventTypeId,
    userData,
    callbackfunc,
    handlerFunc: pointerlockChangeEventHandlerFunc,
    useCapture,
  };
  return JSEvents.registerOrRemoveHandler(eventHandler);
};
var _emscripten_set_pointerlockchange_callback_on_thread = (
  target,
  userData,
  useCapture,
  callbackfunc,
  targetThread,
) => {
  if (!document.body?.requestPointerLock) {
    return -1;
  }
  target = findEventTarget(target);
  if (!target) return -4;
  return registerPointerlockChangeEventCallback(
    target,
    userData,
    useCapture,
    callbackfunc,
    20,
    "pointerlockchange",
    targetThread,
  );
};
var registerUiEventCallback = (
  target,
  userData,
  useCapture,
  callbackfunc,
  eventTypeId,
  eventTypeString,
  targetThread,
) => {
  var eventSize = 36;
  JSEvents.uiEvent ||= _malloc(eventSize);
  target = findEventTarget(target);
  var uiEventHandlerFunc = (e) => {
    if (e.target != target) {
      return;
    }
    var b = document.body;
    if (!b) {
      return;
    }
    var uiEvent = JSEvents.uiEvent;
    HEAP32[uiEvent >> 2] = 0;
    HEAP32[(uiEvent + 4) >> 2] = b.clientWidth;
    HEAP32[(uiEvent + 8) >> 2] = b.clientHeight;
    HEAP32[(uiEvent + 12) >> 2] = innerWidth;
    HEAP32[(uiEvent + 16) >> 2] = innerHeight;
    HEAP32[(uiEvent + 20) >> 2] = outerWidth;
    HEAP32[(uiEvent + 24) >> 2] = outerHeight;
    HEAP32[(uiEvent + 28) >> 2] = pageXOffset | 0;
    HEAP32[(uiEvent + 32) >> 2] = pageYOffset | 0;
    if (
      ((a1, a2, a3) => dynCall_iiii(callbackfunc, a1, a2, a3))(
        eventTypeId,
        uiEvent,
        userData,
      )
    )
      e.preventDefault();
  };
  var eventHandler = {
    target,
    eventTypeString,
    eventTypeId,
    userData,
    callbackfunc,
    handlerFunc: uiEventHandlerFunc,
    useCapture,
  };
  return JSEvents.registerOrRemoveHandler(eventHandler);
};
var _emscripten_set_resize_callback_on_thread = (
  target,
  userData,
  useCapture,
  callbackfunc,
  targetThread,
) =>
  registerUiEventCallback(
    target,
    userData,
    useCapture,
    callbackfunc,
    10,
    "resize",
    targetThread,
  );
var registerTouchEventCallback = (
  target,
  userData,
  useCapture,
  callbackfunc,
  eventTypeId,
  eventTypeString,
  targetThread,
) => {
  var eventSize = 1552;
  JSEvents.touchEvent ||= _malloc(eventSize);
  target = findEventTarget(target);
  var touchEventHandlerFunc = (e) => {
    var t,
      touches = {},
      et = e.touches;
    for (let t of et) {
      t.isChanged = t.onTarget = 0;
      touches[t.identifier] = t;
    }
    for (let t of e.changedTouches) {
      t.isChanged = 1;
      touches[t.identifier] = t;
    }
    for (let t of e.targetTouches) {
      touches[t.identifier].onTarget = 1;
    }
    var touchEvent = JSEvents.touchEvent;
    HEAPF64[touchEvent >> 3] = e.timeStamp;
    HEAP8[touchEvent + 12] = e.ctrlKey;
    HEAP8[touchEvent + 13] = e.shiftKey;
    HEAP8[touchEvent + 14] = e.altKey;
    HEAP8[touchEvent + 15] = e.metaKey;
    var idx = touchEvent + 16;
    var targetRect = getBoundingClientRect(target);
    var numTouches = 0;
    for (let t of Object.values(touches)) {
      var idx32 = idx >> 2;
      HEAP32[idx32 + 0] = t.identifier;
      HEAP32[idx32 + 1] = t.screenX;
      HEAP32[idx32 + 2] = t.screenY;
      HEAP32[idx32 + 3] = t.clientX;
      HEAP32[idx32 + 4] = t.clientY;
      HEAP32[idx32 + 5] = t.pageX;
      HEAP32[idx32 + 6] = t.pageY;
      HEAP8[idx + 28] = t.isChanged;
      HEAP8[idx + 29] = t.onTarget;
      HEAP32[idx32 + 8] = t.clientX - (targetRect.left | 0);
      HEAP32[idx32 + 9] = t.clientY - (targetRect.top | 0);
      idx += 48;
      if (++numTouches > 31) {
        break;
      }
    }
    HEAP32[(touchEvent + 8) >> 2] = numTouches;
    if (
      ((a1, a2, a3) => dynCall_iiii(callbackfunc, a1, a2, a3))(
        eventTypeId,
        touchEvent,
        userData,
      )
    )
      e.preventDefault();
  };
  var eventHandler = {
    target,
    allowsDeferredCalls:
      eventTypeString == "touchstart" || eventTypeString == "touchend",
    eventTypeString,
    eventTypeId,
    userData,
    callbackfunc,
    handlerFunc: touchEventHandlerFunc,
    useCapture,
  };
  return JSEvents.registerOrRemoveHandler(eventHandler);
};
var _emscripten_set_touchcancel_callback_on_thread = (
  target,
  userData,
  useCapture,
  callbackfunc,
  targetThread,
) =>
  registerTouchEventCallback(
    target,
    userData,
    useCapture,
    callbackfunc,
    25,
    "touchcancel",
    targetThread,
  );
var _emscripten_set_touchend_callback_on_thread = (
  target,
  userData,
  useCapture,
  callbackfunc,
  targetThread,
) =>
  registerTouchEventCallback(
    target,
    userData,
    useCapture,
    callbackfunc,
    23,
    "touchend",
    targetThread,
  );
var _emscripten_set_touchmove_callback_on_thread = (
  target,
  userData,
  useCapture,
  callbackfunc,
  targetThread,
) =>
  registerTouchEventCallback(
    target,
    userData,
    useCapture,
    callbackfunc,
    24,
    "touchmove",
    targetThread,
  );
var _emscripten_set_touchstart_callback_on_thread = (
  target,
  userData,
  useCapture,
  callbackfunc,
  targetThread,
) =>
  registerTouchEventCallback(
    target,
    userData,
    useCapture,
    callbackfunc,
    22,
    "touchstart",
    targetThread,
  );
var fillVisibilityChangeEventData = (eventStruct) => {
  var visibilityStates = ["hidden", "visible", "prerender", "unloaded"];
  var visibilityState = visibilityStates.indexOf(document.visibilityState);
  HEAP8[eventStruct] = document.hidden;
  HEAP32[(eventStruct + 4) >> 2] = visibilityState;
};
var registerVisibilityChangeEventCallback = (
  target,
  userData,
  useCapture,
  callbackfunc,
  eventTypeId,
  eventTypeString,
  targetThread,
) => {
  var eventSize = 8;
  JSEvents.visibilityChangeEvent ||= _malloc(eventSize);
  var visibilityChangeEventHandlerFunc = (e) => {
    var visibilityChangeEvent = JSEvents.visibilityChangeEvent;
    fillVisibilityChangeEventData(visibilityChangeEvent);
    if (
      ((a1, a2, a3) => dynCall_iiii(callbackfunc, a1, a2, a3))(
        eventTypeId,
        visibilityChangeEvent,
        userData,
      )
    )
      e.preventDefault();
  };
  var eventHandler = {
    target,
    eventTypeString,
    eventTypeId,
    userData,
    callbackfunc,
    handlerFunc: visibilityChangeEventHandlerFunc,
    useCapture,
  };
  return JSEvents.registerOrRemoveHandler(eventHandler);
};
var _emscripten_set_visibilitychange_callback_on_thread = (
  userData,
  useCapture,
  callbackfunc,
  targetThread,
) => {
  if (!specialHTMLTargets[1]) {
    return -4;
  }
  return registerVisibilityChangeEventCallback(
    specialHTMLTargets[1],
    userData,
    useCapture,
    callbackfunc,
    21,
    "visibilitychange",
    targetThread,
  );
};
var registerWheelEventCallback = (
  target,
  userData,
  useCapture,
  callbackfunc,
  eventTypeId,
  eventTypeString,
  targetThread,
) => {
  var eventSize = 96;
  JSEvents.wheelEvent ||= _malloc(eventSize);
  var wheelHandlerFunc = (e) => {
    var wheelEvent = JSEvents.wheelEvent;
    fillMouseEventData(wheelEvent, e, target);
    HEAPF64[(wheelEvent + 64) >> 3] = e["deltaX"];
    HEAPF64[(wheelEvent + 72) >> 3] = e["deltaY"];
    HEAPF64[(wheelEvent + 80) >> 3] = e["deltaZ"];
    HEAP32[(wheelEvent + 88) >> 2] = e["deltaMode"];
    if (
      ((a1, a2, a3) => dynCall_iiii(callbackfunc, a1, a2, a3))(
        eventTypeId,
        wheelEvent,
        userData,
      )
    )
      e.preventDefault();
  };
  var eventHandler = {
    target,
    allowsDeferredCalls: true,
    eventTypeString,
    eventTypeId,
    userData,
    callbackfunc,
    handlerFunc: wheelHandlerFunc,
    useCapture,
  };
  return JSEvents.registerOrRemoveHandler(eventHandler);
};
var _emscripten_set_wheel_callback_on_thread = (
  target,
  userData,
  useCapture,
  callbackfunc,
  targetThread,
) => {
  target = findEventTarget(target);
  if (!target) return -4;
  if (typeof target.onwheel != "undefined") {
    return registerWheelEventCallback(
      target,
      userData,
      useCapture,
      callbackfunc,
      9,
      "wheel",
      targetThread,
    );
  } else {
    return -1;
  }
};
var _emscripten_set_window_title = (title) =>
  (document.title = UTF8ToString(title));
var _emscripten_sleep = function (ms) {
  let innerFunc = () => new Promise((resolve) => setTimeout(resolve, ms));
  return Asyncify.handleAsync(innerFunc);
};
_emscripten_sleep.isAsync = true;
var readI53FromI64 = (ptr) =>
  HEAPU32[ptr >> 2] + HEAP32[(ptr + 4) >> 2] * 4294967296;
var WebGPU = {
  Internals: {
    jsObjects: [],
    jsObjectInsert: (ptr, jsObject) => {
      ptr >>>= 0;
      WebGPU.Internals.jsObjects[ptr] = jsObject;
    },
    bufferOnUnmaps: [],
    futures: [],
    futureInsert: (futureId, promise) => {
      WebGPU.Internals.futures[futureId] = new Promise((resolve) =>
        promise.finally(() => resolve(futureId)),
      );
    },
  },
  getJsObject: (ptr) => {
    if (!ptr) return undefined;
    ptr >>>= 0;
    return WebGPU.Internals.jsObjects[ptr];
  },
  importJsAdapter: (obj, parentPtr = 0) => {
    var ptr = _emwgpuCreateAdapter(parentPtr);
    WebGPU.Internals.jsObjects[ptr] = obj;
    return ptr;
  },
  importJsBindGroup: (obj, parentPtr = 0) => {
    var ptr = _emwgpuCreateBindGroup(parentPtr);
    WebGPU.Internals.jsObjects[ptr] = obj;
    return ptr;
  },
  importJsBindGroupLayout: (obj, parentPtr = 0) => {
    var ptr = _emwgpuCreateBindGroupLayout(parentPtr);
    WebGPU.Internals.jsObjects[ptr] = obj;
    return ptr;
  },
  importJsBuffer: (buffer, parentPtr = 0) => {
    assert(buffer.mapState === "unmapped");
    var bufferPtr = _emwgpuImportBuffer(parentPtr);
    WebGPU.Internals.jsObjectInsert(bufferPtr, buffer);
    return bufferPtr;
  },
  importJsCommandBuffer: (obj, parentPtr = 0) => {
    var ptr = _emwgpuCreateCommandBuffer(parentPtr);
    WebGPU.Internals.jsObjects[ptr] = obj;
    return ptr;
  },
  importJsCommandEncoder: (obj, parentPtr = 0) => {
    var ptr = _emwgpuCreateCommandEncoder(parentPtr);
    WebGPU.Internals.jsObjects[ptr] = obj;
    return ptr;
  },
  importJsComputePassEncoder: (obj, parentPtr = 0) => {
    var ptr = _emwgpuCreateComputePassEncoder(parentPtr);
    WebGPU.Internals.jsObjects[ptr] = obj;
    return ptr;
  },
  importJsComputePipeline: (obj, parentPtr = 0) => {
    var ptr = _emwgpuCreateComputePipeline(parentPtr);
    WebGPU.Internals.jsObjects[ptr] = obj;
    return ptr;
  },
  importJsDevice: (device, parentPtr = 0) => {
    var queuePtr = _emwgpuCreateQueue(parentPtr);
    var devicePtr = _emwgpuCreateDevice(parentPtr, queuePtr);
    WebGPU.Internals.jsObjectInsert(queuePtr, device.queue);
    WebGPU.Internals.jsObjectInsert(devicePtr, device);
    return devicePtr;
  },
  importJsExternalTexture: (obj, parentPtr = 0) => {
    var ptr = _emwgpuCreateExternalTexture(parentPtr);
    WebGPU.Internals.jsObjects[ptr] = obj;
    return ptr;
  },
  importJsPipelineLayout: (obj, parentPtr = 0) => {
    var ptr = _emwgpuCreatePipelineLayout(parentPtr);
    WebGPU.Internals.jsObjects[ptr] = obj;
    return ptr;
  },
  importJsQuerySet: (obj, parentPtr = 0) => {
    var ptr = _emwgpuCreateQuerySet(parentPtr);
    WebGPU.Internals.jsObjects[ptr] = obj;
    return ptr;
  },
  importJsQueue: (obj, parentPtr = 0) => {
    var ptr = _emwgpuCreateQueue(parentPtr);
    WebGPU.Internals.jsObjects[ptr] = obj;
    return ptr;
  },
  importJsRenderBundle: (obj, parentPtr = 0) => {
    var ptr = _emwgpuCreateRenderBundle(parentPtr);
    WebGPU.Internals.jsObjects[ptr] = obj;
    return ptr;
  },
  importJsRenderBundleEncoder: (obj, parentPtr = 0) => {
    var ptr = _emwgpuCreateRenderBundleEncoder(parentPtr);
    WebGPU.Internals.jsObjects[ptr] = obj;
    return ptr;
  },
  importJsRenderPassEncoder: (obj, parentPtr = 0) => {
    var ptr = _emwgpuCreateRenderPassEncoder(parentPtr);
    WebGPU.Internals.jsObjects[ptr] = obj;
    return ptr;
  },
  importJsRenderPipeline: (obj, parentPtr = 0) => {
    var ptr = _emwgpuCreateRenderPipeline(parentPtr);
    WebGPU.Internals.jsObjects[ptr] = obj;
    return ptr;
  },
  importJsSampler: (obj, parentPtr = 0) => {
    var ptr = _emwgpuCreateSampler(parentPtr);
    WebGPU.Internals.jsObjects[ptr] = obj;
    return ptr;
  },
  importJsShaderModule: (obj, parentPtr = 0) => {
    var ptr = _emwgpuCreateShaderModule(parentPtr);
    WebGPU.Internals.jsObjects[ptr] = obj;
    return ptr;
  },
  importJsSurface: (obj, parentPtr = 0) => {
    var ptr = _emwgpuCreateSurface(parentPtr);
    WebGPU.Internals.jsObjects[ptr] = obj;
    return ptr;
  },
  importJsTexture: (obj, parentPtr = 0) => {
    var ptr = _emwgpuCreateTexture(parentPtr);
    WebGPU.Internals.jsObjects[ptr] = obj;
    return ptr;
  },
  importJsTextureView: (obj, parentPtr = 0) => {
    var ptr = _emwgpuCreateTextureView(parentPtr);
    WebGPU.Internals.jsObjects[ptr] = obj;
    return ptr;
  },
  errorCallback: (callback, type, message, userdata) => {
    var sp = stackSave();
    var messagePtr = stringToUTF8OnStack(message);
    ((a1, a2, a3) => dynCall_viii(callback, a1, a2, a3))(
      type,
      messagePtr,
      userdata,
    );
    stackRestore(sp);
  },
  iterateExtensions: (root, handlers) => {
    for (var ptr = HEAPU32[root >> 2]; ptr; ptr = HEAPU32[ptr >> 2]) {
      var sType = HEAP32[(ptr + 4) >> 2];
      var handler = handlers[sType](ptr);
    }
  },
  setStringView: (ptr, data, length) => {
    HEAPU32[ptr >> 2] = data;
    HEAPU32[(ptr + 4) >> 2] = length;
  },
  makeStringFromStringView: (stringViewPtr) => {
    var ptr = HEAPU32[stringViewPtr >> 2];
    var length = HEAPU32[(stringViewPtr + 4) >> 2];
    return UTF8ToString(ptr, length);
  },
  makeStringFromOptionalStringView: (stringViewPtr) => {
    var ptr = HEAPU32[stringViewPtr >> 2];
    var length = HEAPU32[(stringViewPtr + 4) >> 2];
    if (!ptr) {
      if (length === 0) {
        return "";
      }
      return undefined;
    }
    return UTF8ToString(ptr, length);
  },
  makeColor: (ptr) => ({
    r: HEAPF64[ptr >> 3],
    g: HEAPF64[(ptr + 8) >> 3],
    b: HEAPF64[(ptr + 16) >> 3],
    a: HEAPF64[(ptr + 24) >> 3],
  }),
  makeExtent3D: (ptr) => ({
    width: HEAPU32[ptr >> 2],
    height: HEAPU32[(ptr + 4) >> 2],
    depthOrArrayLayers: HEAPU32[(ptr + 8) >> 2],
  }),
  makeOrigin3D: (ptr) => ({
    x: HEAPU32[ptr >> 2],
    y: HEAPU32[(ptr + 4) >> 2],
    z: HEAPU32[(ptr + 8) >> 2],
  }),
  makeTexelCopyTextureInfo: (ptr) => ({
    texture: WebGPU.getJsObject(HEAPU32[ptr >> 2]),
    mipLevel: HEAPU32[(ptr + 4) >> 2],
    origin: WebGPU.makeOrigin3D(ptr + 8),
    aspect: WebGPU.TextureAspect[HEAP32[(ptr + 20) >> 2]],
  }),
  makeTexelCopyBufferLayout: (ptr) => {
    var bytesPerRow = HEAPU32[(ptr + 8) >> 2];
    var rowsPerImage = HEAPU32[(ptr + 12) >> 2];
    return {
      offset: readI53FromI64(ptr),
      bytesPerRow: bytesPerRow === 4294967295 ? undefined : bytesPerRow,
      rowsPerImage: rowsPerImage === 4294967295 ? undefined : rowsPerImage,
    };
  },
  makeTexelCopyBufferInfo: (ptr) => {
    var layoutPtr = ptr + 0;
    var bufferCopyView = WebGPU.makeTexelCopyBufferLayout(layoutPtr);
    bufferCopyView["buffer"] = WebGPU.getJsObject(HEAPU32[(ptr + 16) >> 2]);
    return bufferCopyView;
  },
  makePassTimestampWrites: (ptr) => {
    if (ptr === 0) return undefined;
    return {
      querySet: WebGPU.getJsObject(HEAPU32[(ptr + 4) >> 2]),
      beginningOfPassWriteIndex: HEAPU32[(ptr + 8) >> 2],
      endOfPassWriteIndex: HEAPU32[(ptr + 12) >> 2],
    };
  },
  makePipelineConstants: (constantCount, constantsPtr) => {
    if (!constantCount) return;
    var constants = {};
    for (var i = 0; i < constantCount; ++i) {
      var entryPtr = constantsPtr + 24 * i;
      var key = WebGPU.makeStringFromStringView(entryPtr + 4);
      constants[key] = HEAPF64[(entryPtr + 16) >> 3];
    }
    return constants;
  },
  makePipelineLayout: (layoutPtr) => {
    if (!layoutPtr) return "auto";
    return WebGPU.getJsObject(layoutPtr);
  },
  makeComputeState: (ptr) => {
    if (!ptr) return undefined;
    var desc = {
      module: WebGPU.getJsObject(HEAPU32[(ptr + 4) >> 2]),
      constants: WebGPU.makePipelineConstants(
        HEAPU32[(ptr + 16) >> 2],
        HEAPU32[(ptr + 20) >> 2],
      ),
      entryPoint: WebGPU.makeStringFromOptionalStringView(ptr + 8),
    };
    return desc;
  },
  makeComputePipelineDesc: (descriptor) => {
    var desc = {
      label: WebGPU.makeStringFromOptionalStringView(descriptor + 4),
      layout: WebGPU.makePipelineLayout(HEAPU32[(descriptor + 12) >> 2]),
      compute: WebGPU.makeComputeState(descriptor + 16),
    };
    return desc;
  },
  makeRenderPipelineDesc: (descriptor) => {
    function makePrimitiveState(psPtr) {
      if (!psPtr) return undefined;
      return {
        topology: WebGPU.PrimitiveTopology[HEAP32[(psPtr + 4) >> 2]],
        stripIndexFormat: WebGPU.IndexFormat[HEAP32[(psPtr + 8) >> 2]],
        frontFace: WebGPU.FrontFace[HEAP32[(psPtr + 12) >> 2]],
        cullMode: WebGPU.CullMode[HEAP32[(psPtr + 16) >> 2]],
        unclippedDepth: !!HEAPU32[(psPtr + 20) >> 2],
      };
    }
    function makeBlendComponent(bdPtr) {
      if (!bdPtr) return undefined;
      return {
        operation: WebGPU.BlendOperation[HEAP32[bdPtr >> 2]],
        srcFactor: WebGPU.BlendFactor[HEAP32[(bdPtr + 4) >> 2]],
        dstFactor: WebGPU.BlendFactor[HEAP32[(bdPtr + 8) >> 2]],
      };
    }
    function makeBlendState(bsPtr) {
      if (!bsPtr) return undefined;
      return {
        alpha: makeBlendComponent(bsPtr + 12),
        color: makeBlendComponent(bsPtr + 0),
      };
    }
    function makeColorState(csPtr) {
      var format = WebGPU.TextureFormat[HEAP32[(csPtr + 4) >> 2]];
      return format
        ? {
            format,
            blend: makeBlendState(HEAPU32[(csPtr + 8) >> 2]),
            writeMask: HEAPU32[(csPtr + 16) >> 2],
          }
        : undefined;
    }
    function makeColorStates(count, csArrayPtr) {
      var states = [];
      for (var i = 0; i < count; ++i) {
        states.push(makeColorState(csArrayPtr + 24 * i));
      }
      return states;
    }
    function makeStencilStateFace(ssfPtr) {
      return {
        compare: WebGPU.CompareFunction[HEAP32[ssfPtr >> 2]],
        failOp: WebGPU.StencilOperation[HEAP32[(ssfPtr + 4) >> 2]],
        depthFailOp: WebGPU.StencilOperation[HEAP32[(ssfPtr + 8) >> 2]],
        passOp: WebGPU.StencilOperation[HEAP32[(ssfPtr + 12) >> 2]],
      };
    }
    function makeDepthStencilState(dssPtr) {
      if (!dssPtr) return undefined;
      return {
        format: WebGPU.TextureFormat[HEAP32[(dssPtr + 4) >> 2]],
        depthWriteEnabled: !!HEAPU32[(dssPtr + 8) >> 2],
        depthCompare: WebGPU.CompareFunction[HEAP32[(dssPtr + 12) >> 2]],
        stencilFront: makeStencilStateFace(dssPtr + 16),
        stencilBack: makeStencilStateFace(dssPtr + 32),
        stencilReadMask: HEAPU32[(dssPtr + 48) >> 2],
        stencilWriteMask: HEAPU32[(dssPtr + 52) >> 2],
        depthBias: HEAP32[(dssPtr + 56) >> 2],
        depthBiasSlopeScale: HEAPF32[(dssPtr + 60) >> 2],
        depthBiasClamp: HEAPF32[(dssPtr + 64) >> 2],
      };
    }
    function makeVertexAttribute(vaPtr) {
      return {
        format: WebGPU.VertexFormat[HEAP32[(vaPtr + 4) >> 2]],
        offset: readI53FromI64(vaPtr + 8),
        shaderLocation: HEAPU32[(vaPtr + 16) >> 2],
      };
    }
    function makeVertexAttributes(count, vaArrayPtr) {
      var vas = [];
      for (var i = 0; i < count; ++i) {
        vas.push(makeVertexAttribute(vaArrayPtr + i * 24));
      }
      return vas;
    }
    function makeVertexBuffer(vbPtr) {
      if (!vbPtr) return undefined;
      var stepMode = WebGPU.VertexStepMode[HEAP32[(vbPtr + 4) >> 2]];
      var attributeCount = HEAPU32[(vbPtr + 16) >> 2];
      if (!stepMode && !attributeCount) {
        return null;
      }
      return {
        arrayStride: readI53FromI64(vbPtr + 8),
        stepMode,
        attributes: makeVertexAttributes(
          attributeCount,
          HEAPU32[(vbPtr + 20) >> 2],
        ),
      };
    }
    function makeVertexBuffers(count, vbArrayPtr) {
      if (!count) return undefined;
      var vbs = [];
      for (var i = 0; i < count; ++i) {
        vbs.push(makeVertexBuffer(vbArrayPtr + i * 24));
      }
      return vbs;
    }
    function makeVertexState(viPtr) {
      if (!viPtr) return undefined;
      var desc = {
        module: WebGPU.getJsObject(HEAPU32[(viPtr + 4) >> 2]),
        constants: WebGPU.makePipelineConstants(
          HEAPU32[(viPtr + 16) >> 2],
          HEAPU32[(viPtr + 20) >> 2],
        ),
        buffers: makeVertexBuffers(
          HEAPU32[(viPtr + 24) >> 2],
          HEAPU32[(viPtr + 28) >> 2],
        ),
        entryPoint: WebGPU.makeStringFromOptionalStringView(viPtr + 8),
      };
      return desc;
    }
    function makeMultisampleState(msPtr) {
      if (!msPtr) return undefined;
      return {
        count: HEAPU32[(msPtr + 4) >> 2],
        mask: HEAPU32[(msPtr + 8) >> 2],
        alphaToCoverageEnabled: !!HEAPU32[(msPtr + 12) >> 2],
      };
    }
    function makeFragmentState(fsPtr) {
      if (!fsPtr) return undefined;
      var desc = {
        module: WebGPU.getJsObject(HEAPU32[(fsPtr + 4) >> 2]),
        constants: WebGPU.makePipelineConstants(
          HEAPU32[(fsPtr + 16) >> 2],
          HEAPU32[(fsPtr + 20) >> 2],
        ),
        targets: makeColorStates(
          HEAPU32[(fsPtr + 24) >> 2],
          HEAPU32[(fsPtr + 28) >> 2],
        ),
        entryPoint: WebGPU.makeStringFromOptionalStringView(fsPtr + 8),
      };
      return desc;
    }
    var desc = {
      label: WebGPU.makeStringFromOptionalStringView(descriptor + 4),
      layout: WebGPU.makePipelineLayout(HEAPU32[(descriptor + 12) >> 2]),
      vertex: makeVertexState(descriptor + 16),
      primitive: makePrimitiveState(descriptor + 48),
      depthStencil: makeDepthStencilState(HEAPU32[(descriptor + 72) >> 2]),
      multisample: makeMultisampleState(descriptor + 76),
      fragment: makeFragmentState(HEAPU32[(descriptor + 92) >> 2]),
    };
    return desc;
  },
  fillLimitStruct: (limits, limitsOutPtr) => {
    var nextInChainPtr = HEAPU32[limitsOutPtr >> 2];
    function setLimitValueU32(name, basePtr, limitOffset, fallbackValue = 0) {
      var limitValue = limits[name] ?? fallbackValue;
      HEAPU32[(basePtr + limitOffset) >> 2] = limitValue;
    }
    function setLimitValueU64(name, basePtr, limitOffset, fallbackValue = 0) {
      var limitValue = limits[name] ?? fallbackValue;
      writeI53ToI64(basePtr + limitOffset, limitValue);
    }
    setLimitValueU32("maxTextureDimension1D", limitsOutPtr, 4);
    setLimitValueU32("maxTextureDimension2D", limitsOutPtr, 8);
    setLimitValueU32("maxTextureDimension3D", limitsOutPtr, 12);
    setLimitValueU32("maxTextureArrayLayers", limitsOutPtr, 16);
    setLimitValueU32("maxBindGroups", limitsOutPtr, 20);
    setLimitValueU32("maxBindGroupsPlusVertexBuffers", limitsOutPtr, 24);
    setLimitValueU32("maxBindingsPerBindGroup", limitsOutPtr, 28);
    setLimitValueU32(
      "maxDynamicUniformBuffersPerPipelineLayout",
      limitsOutPtr,
      32,
    );
    setLimitValueU32(
      "maxDynamicStorageBuffersPerPipelineLayout",
      limitsOutPtr,
      36,
    );
    setLimitValueU32("maxSampledTexturesPerShaderStage", limitsOutPtr, 40);
    setLimitValueU32("maxSamplersPerShaderStage", limitsOutPtr, 44);
    setLimitValueU32("maxStorageBuffersPerShaderStage", limitsOutPtr, 48);
    setLimitValueU32("maxStorageTexturesPerShaderStage", limitsOutPtr, 52);
    setLimitValueU32("maxUniformBuffersPerShaderStage", limitsOutPtr, 56);
    setLimitValueU32("minUniformBufferOffsetAlignment", limitsOutPtr, 80);
    setLimitValueU32("minStorageBufferOffsetAlignment", limitsOutPtr, 84);
    setLimitValueU64("maxUniformBufferBindingSize", limitsOutPtr, 64);
    setLimitValueU64("maxStorageBufferBindingSize", limitsOutPtr, 72);
    setLimitValueU32("maxVertexBuffers", limitsOutPtr, 88);
    setLimitValueU64("maxBufferSize", limitsOutPtr, 96);
    setLimitValueU32("maxVertexAttributes", limitsOutPtr, 104);
    setLimitValueU32("maxVertexBufferArrayStride", limitsOutPtr, 108);
    setLimitValueU32("maxInterStageShaderVariables", limitsOutPtr, 112);
    setLimitValueU32("maxColorAttachments", limitsOutPtr, 116);
    setLimitValueU32("maxColorAttachmentBytesPerSample", limitsOutPtr, 120);
    setLimitValueU32("maxComputeWorkgroupStorageSize", limitsOutPtr, 124);
    setLimitValueU32("maxComputeInvocationsPerWorkgroup", limitsOutPtr, 128);
    setLimitValueU32("maxComputeWorkgroupSizeX", limitsOutPtr, 132);
    setLimitValueU32("maxComputeWorkgroupSizeY", limitsOutPtr, 136);
    setLimitValueU32("maxComputeWorkgroupSizeZ", limitsOutPtr, 140);
    setLimitValueU32("maxComputeWorkgroupsPerDimension", limitsOutPtr, 144);
    setLimitValueU32("maxImmediateSize", limitsOutPtr, 148);
    if (nextInChainPtr !== 0) {
      var sType = HEAP32[(nextInChainPtr + 4) >> 2];
      var compatibilityModeLimitsPtr = nextInChainPtr;
      setLimitValueU32(
        "maxStorageBuffersInVertexStage",
        compatibilityModeLimitsPtr,
        8,
        limits.maxStorageBuffersPerShaderStage,
      );
      setLimitValueU32(
        "maxStorageBuffersInFragmentStage",
        compatibilityModeLimitsPtr,
        16,
        limits.maxStorageBuffersPerShaderStage,
      );
      setLimitValueU32(
        "maxStorageTexturesInVertexStage",
        compatibilityModeLimitsPtr,
        12,
        limits.maxStorageTexturesPerShaderStage,
      );
      setLimitValueU32(
        "maxStorageTexturesInFragmentStage",
        compatibilityModeLimitsPtr,
        20,
        limits.maxStorageTexturesPerShaderStage,
      );
    }
  },
  fillAdapterInfoStruct: (info, infoStruct) => {
    HEAPU32[(infoStruct + 52) >> 2] = info.subgroupMinSize;
    HEAPU32[(infoStruct + 56) >> 2] = info.subgroupMaxSize;
    var strs = info.vendor + info.architecture + info.device + info.description;
    var strPtr = stringToNewUTF8(strs);
    var vendorLen = lengthBytesUTF8(info.vendor);
    WebGPU.setStringView(infoStruct + 4, strPtr, vendorLen);
    strPtr += vendorLen;
    var architectureLen = lengthBytesUTF8(info.architecture);
    WebGPU.setStringView(infoStruct + 12, strPtr, architectureLen);
    strPtr += architectureLen;
    var deviceLen = lengthBytesUTF8(info.device);
    WebGPU.setStringView(infoStruct + 20, strPtr, deviceLen);
    strPtr += deviceLen;
    var descriptionLen = lengthBytesUTF8(info.description);
    WebGPU.setStringView(infoStruct + 28, strPtr, descriptionLen);
    strPtr += descriptionLen;
    HEAP32[(infoStruct + 36) >> 2] = 2;
    var adapterType = info.isFallbackAdapter ? 3 : 4;
    HEAP32[(infoStruct + 40) >> 2] = adapterType;
    HEAPU32[(infoStruct + 44) >> 2] = 0;
    HEAPU32[(infoStruct + 48) >> 2] = 0;
  },
  AddressMode: [, "clamp-to-edge", "repeat", "mirror-repeat"],
  BlendFactor: [
    ,
    "zero",
    "one",
    "src",
    "one-minus-src",
    "src-alpha",
    "one-minus-src-alpha",
    "dst",
    "one-minus-dst",
    "dst-alpha",
    "one-minus-dst-alpha",
    "src-alpha-saturated",
    "constant",
    "one-minus-constant",
    "src1",
    "one-minus-src1",
    "src1-alpha",
    "one-minus-src1-alpha",
  ],
  BlendOperation: [, "add", "subtract", "reverse-subtract", "min", "max"],
  BufferBindingType: [, , "uniform", "storage", "read-only-storage"],
  BufferMapState: [, "unmapped", "pending", "mapped"],
  CompareFunction: [
    ,
    "never",
    "less",
    "equal",
    "less-equal",
    "greater",
    "not-equal",
    "greater-equal",
    "always",
  ],
  CompilationInfoRequestStatus: [, "success", "callback-cancelled"],
  ComponentSwizzle: [, "0", "1", "r", "g", "b", "a"],
  CompositeAlphaMode: [
    ,
    "opaque",
    "premultiplied",
    "unpremultiplied",
    "inherit",
  ],
  CullMode: [, "none", "front", "back"],
  ErrorFilter: [, "validation", "out-of-memory", "internal"],
  FeatureLevel: [, "compatibility", "core"],
  FeatureName: {
    1: "core-features-and-limits",
    2: "depth-clip-control",
    3: "depth32float-stencil8",
    4: "texture-compression-bc",
    5: "texture-compression-bc-sliced-3d",
    6: "texture-compression-etc2",
    7: "texture-compression-astc",
    8: "texture-compression-astc-sliced-3d",
    9: "timestamp-query",
    10: "indirect-first-instance",
    11: "shader-f16",
    12: "rg11b10ufloat-renderable",
    13: "bgra8unorm-storage",
    14: "float32-filterable",
    15: "float32-blendable",
    16: "clip-distances",
    17: "dual-source-blending",
    18: "subgroups",
    19: "texture-formats-tier1",
    20: "texture-formats-tier2",
    21: "primitive-index",
    22: "texture-component-swizzle",
    327692: "chromium-experimental-unorm16-texture-formats",
    327729: "chromium-experimental-multi-draw-indirect",
  },
  FilterMode: [, "nearest", "linear"],
  FrontFace: [, "ccw", "cw"],
  IndexFormat: [, "uint16", "uint32"],
  InstanceFeatureName: [
    ,
    "timed-wait-any",
    "shader-source-spirv",
    "multiple-devices-per-adapter",
  ],
  LoadOp: [, "load", "clear"],
  MipmapFilterMode: [, "nearest", "linear"],
  OptionalBool: ["false", "true"],
  PowerPreference: [, "low-power", "high-performance"],
  PredefinedColorSpace: [, "srgb", "display-p3"],
  PrimitiveTopology: [
    ,
    "point-list",
    "line-list",
    "line-strip",
    "triangle-list",
    "triangle-strip",
  ],
  QueryType: [, "occlusion", "timestamp"],
  SamplerBindingType: [, , "filtering", "non-filtering", "comparison"],
  Status: [, "success", "error"],
  StencilOperation: [
    ,
    "keep",
    "zero",
    "replace",
    "invert",
    "increment-clamp",
    "decrement-clamp",
    "increment-wrap",
    "decrement-wrap",
  ],
  StorageTextureAccess: [, , "write-only", "read-only", "read-write"],
  StoreOp: [, "store", "discard"],
  SurfaceGetCurrentTextureStatus: [
    ,
    "success-optimal",
    "success-suboptimal",
    "timeout",
    "outdated",
    "lost",
    "error",
  ],
  TextureAspect: [, "all", "stencil-only", "depth-only"],
  TextureDimension: [, "1d", "2d", "3d"],
  TextureFormat: [
    ,
    "r8unorm",
    "r8snorm",
    "r8uint",
    "r8sint",
    "r16unorm",
    "r16snorm",
    "r16uint",
    "r16sint",
    "r16float",
    "rg8unorm",
    "rg8snorm",
    "rg8uint",
    "rg8sint",
    "r32float",
    "r32uint",
    "r32sint",
    "rg16unorm",
    "rg16snorm",
    "rg16uint",
    "rg16sint",
    "rg16float",
    "rgba8unorm",
    "rgba8unorm-srgb",
    "rgba8snorm",
    "rgba8uint",
    "rgba8sint",
    "bgra8unorm",
    "bgra8unorm-srgb",
    "rgb10a2uint",
    "rgb10a2unorm",
    "rg11b10ufloat",
    "rgb9e5ufloat",
    "rg32float",
    "rg32uint",
    "rg32sint",
    "rgba16unorm",
    "rgba16snorm",
    "rgba16uint",
    "rgba16sint",
    "rgba16float",
    "rgba32float",
    "rgba32uint",
    "rgba32sint",
    "stencil8",
    "depth16unorm",
    "depth24plus",
    "depth24plus-stencil8",
    "depth32float",
    "depth32float-stencil8",
    "bc1-rgba-unorm",
    "bc1-rgba-unorm-srgb",
    "bc2-rgba-unorm",
    "bc2-rgba-unorm-srgb",
    "bc3-rgba-unorm",
    "bc3-rgba-unorm-srgb",
    "bc4-r-unorm",
    "bc4-r-snorm",
    "bc5-rg-unorm",
    "bc5-rg-snorm",
    "bc6h-rgb-ufloat",
    "bc6h-rgb-float",
    "bc7-rgba-unorm",
    "bc7-rgba-unorm-srgb",
    "etc2-rgb8unorm",
    "etc2-rgb8unorm-srgb",
    "etc2-rgb8a1unorm",
    "etc2-rgb8a1unorm-srgb",
    "etc2-rgba8unorm",
    "etc2-rgba8unorm-srgb",
    "eac-r11unorm",
    "eac-r11snorm",
    "eac-rg11unorm",
    "eac-rg11snorm",
    "astc-4x4-unorm",
    "astc-4x4-unorm-srgb",
    "astc-5x4-unorm",
    "astc-5x4-unorm-srgb",
    "astc-5x5-unorm",
    "astc-5x5-unorm-srgb",
    "astc-6x5-unorm",
    "astc-6x5-unorm-srgb",
    "astc-6x6-unorm",
    "astc-6x6-unorm-srgb",
    "astc-8x5-unorm",
    "astc-8x5-unorm-srgb",
    "astc-8x6-unorm",
    "astc-8x6-unorm-srgb",
    "astc-8x8-unorm",
    "astc-8x8-unorm-srgb",
    "astc-10x5-unorm",
    "astc-10x5-unorm-srgb",
    "astc-10x6-unorm",
    "astc-10x6-unorm-srgb",
    "astc-10x8-unorm",
    "astc-10x8-unorm-srgb",
    "astc-10x10-unorm",
    "astc-10x10-unorm-srgb",
    "astc-12x10-unorm",
    "astc-12x10-unorm-srgb",
    "astc-12x12-unorm",
    "astc-12x12-unorm-srgb",
  ],
  TextureSampleType: [
    ,
    ,
    "float",
    "unfilterable-float",
    "depth",
    "sint",
    "uint",
  ],
  TextureViewDimension: [, "1d", "2d", "2d-array", "cube", "cube-array", "3d"],
  ToneMappingMode: [, "standard", "extended"],
  VertexFormat: [
    ,
    "uint8",
    "uint8x2",
    "uint8x4",
    "sint8",
    "sint8x2",
    "sint8x4",
    "unorm8",
    "unorm8x2",
    "unorm8x4",
    "snorm8",
    "snorm8x2",
    "snorm8x4",
    "uint16",
    "uint16x2",
    "uint16x4",
    "sint16",
    "sint16x2",
    "sint16x4",
    "unorm16",
    "unorm16x2",
    "unorm16x4",
    "snorm16",
    "snorm16x2",
    "snorm16x4",
    "float16",
    "float16x2",
    "float16x4",
    "float32",
    "float32x2",
    "float32x3",
    "float32x4",
    "uint32",
    "uint32x2",
    "uint32x3",
    "uint32x4",
    "sint32",
    "sint32x2",
    "sint32x3",
    "sint32x4",
    "unorm10-10-10-2",
    "unorm8x4-bgra",
  ],
  VertexStepMode: [, "vertex", "instance"],
  WGSLLanguageFeatureName: [
    ,
    "readonly_and_readwrite_storage_textures",
    "packed_4x8_integer_dot_product",
    "unrestricted_pointer_parameters",
    "pointer_composite_access",
    "uniform_buffer_standard_layout",
    "subgroup_id",
    "texture_and_sampler_let",
    "subgroup_uniformity",
    "texture_formats_tier1",
    "linear_indexing",
  ],
};
var emwgpuStringToInt_DeviceLostReason = {
  undefined: 1,
  unknown: 1,
  destroyed: 2,
};
function _emwgpuAdapterRequestDevice(
  adapterPtr,
  futureId,
  deviceLostFutureId,
  devicePtr,
  queuePtr,
  descriptor,
) {
  futureId = bigintToI53Checked(futureId);
  deviceLostFutureId = bigintToI53Checked(deviceLostFutureId);
  var adapter = WebGPU.getJsObject(adapterPtr);
  var desc = {};
  if (descriptor) {
    var requiredFeatureCount = HEAPU32[(descriptor + 12) >> 2];
    if (requiredFeatureCount) {
      var requiredFeaturesPtr = HEAPU32[(descriptor + 16) >> 2];
      desc["requiredFeatures"] = Array.from(
        HEAPU32.subarray(
          requiredFeaturesPtr >> 2,
          (requiredFeaturesPtr + requiredFeatureCount * 4) >> 2,
        ),
        (feature) => WebGPU.FeatureName[feature],
      );
    }
    var limitsPtr = HEAPU32[(descriptor + 20) >> 2];
    if (limitsPtr) {
      var nextInChainPtr = HEAPU32[limitsPtr >> 2];
      var requiredLimits = {};
      function setLimitU32IfDefined(
        name,
        basePtr,
        limitOffset,
        ignoreIfZero = false,
      ) {
        var ptr = basePtr + limitOffset;
        var value = HEAPU32[ptr >> 2];
        if (value != 4294967295 && (!ignoreIfZero || value != 0)) {
          requiredLimits[name] = value;
        }
      }
      function setLimitU64IfDefined(name, basePtr, limitOffset) {
        var ptr = basePtr + limitOffset;
        var limitPart1 = HEAPU32[ptr >> 2];
        var limitPart2 = HEAPU32[(ptr + 4) >> 2];
        if (limitPart1 != 4294967295 || limitPart2 != 4294967295) {
          requiredLimits[name] = readI53FromI64(ptr);
        }
      }
      setLimitU32IfDefined("maxTextureDimension1D", limitsPtr, 4);
      setLimitU32IfDefined("maxTextureDimension2D", limitsPtr, 8);
      setLimitU32IfDefined("maxTextureDimension3D", limitsPtr, 12);
      setLimitU32IfDefined("maxTextureArrayLayers", limitsPtr, 16);
      setLimitU32IfDefined("maxBindGroups", limitsPtr, 20);
      setLimitU32IfDefined("maxBindGroupsPlusVertexBuffers", limitsPtr, 24);
      setLimitU32IfDefined("maxBindingsPerBindGroup", limitsPtr, 28);
      setLimitU32IfDefined(
        "maxDynamicUniformBuffersPerPipelineLayout",
        limitsPtr,
        32,
      );
      setLimitU32IfDefined(
        "maxDynamicStorageBuffersPerPipelineLayout",
        limitsPtr,
        36,
      );
      setLimitU32IfDefined("maxSampledTexturesPerShaderStage", limitsPtr, 40);
      setLimitU32IfDefined("maxSamplersPerShaderStage", limitsPtr, 44);
      setLimitU32IfDefined("maxStorageBuffersPerShaderStage", limitsPtr, 48);
      setLimitU32IfDefined("maxStorageTexturesPerShaderStage", limitsPtr, 52);
      setLimitU32IfDefined("maxUniformBuffersPerShaderStage", limitsPtr, 56);
      setLimitU32IfDefined("minUniformBufferOffsetAlignment", limitsPtr, 80);
      setLimitU32IfDefined("minStorageBufferOffsetAlignment", limitsPtr, 84);
      setLimitU64IfDefined("maxUniformBufferBindingSize", limitsPtr, 64);
      setLimitU64IfDefined("maxStorageBufferBindingSize", limitsPtr, 72);
      setLimitU32IfDefined("maxVertexBuffers", limitsPtr, 88);
      setLimitU64IfDefined("maxBufferSize", limitsPtr, 96);
      setLimitU32IfDefined("maxVertexAttributes", limitsPtr, 104);
      setLimitU32IfDefined("maxVertexBufferArrayStride", limitsPtr, 108);
      setLimitU32IfDefined("maxInterStageShaderVariables", limitsPtr, 112);
      setLimitU32IfDefined("maxColorAttachments", limitsPtr, 116);
      setLimitU32IfDefined("maxColorAttachmentBytesPerSample", limitsPtr, 120);
      setLimitU32IfDefined("maxComputeWorkgroupStorageSize", limitsPtr, 124);
      setLimitU32IfDefined("maxComputeInvocationsPerWorkgroup", limitsPtr, 128);
      setLimitU32IfDefined("maxComputeWorkgroupSizeX", limitsPtr, 132);
      setLimitU32IfDefined("maxComputeWorkgroupSizeY", limitsPtr, 136);
      setLimitU32IfDefined("maxComputeWorkgroupSizeZ", limitsPtr, 140);
      setLimitU32IfDefined("maxComputeWorkgroupsPerDimension", limitsPtr, 144);
      setLimitU32IfDefined("maxImmediateSize", limitsPtr, 148, true);
      if (nextInChainPtr !== 0) {
        var sType = HEAP32[(nextInChainPtr + 4) >> 2];
        var compatibilityModeLimitsPtr = nextInChainPtr;
        if ("maxStorageBuffersInVertexStage" in GPUSupportedLimits.prototype) {
          setLimitU32IfDefined(
            "maxStorageBuffersInVertexStage",
            compatibilityModeLimitsPtr,
            8,
          );
          setLimitU32IfDefined(
            "maxStorageTexturesInVertexStage",
            compatibilityModeLimitsPtr,
            12,
          );
          setLimitU32IfDefined(
            "maxStorageBuffersInFragmentStage",
            compatibilityModeLimitsPtr,
            16,
          );
          setLimitU32IfDefined(
            "maxStorageTexturesInFragmentStage",
            compatibilityModeLimitsPtr,
            20,
          );
        }
      }
      desc["requiredLimits"] = requiredLimits;
    }
    var defaultQueuePtr = HEAPU32[(descriptor + 24) >> 2];
    if (defaultQueuePtr) {
      var defaultQueueDesc = {
        label: WebGPU.makeStringFromOptionalStringView(defaultQueuePtr + 4),
      };
      desc["defaultQueue"] = defaultQueueDesc;
    }
    desc["label"] = WebGPU.makeStringFromOptionalStringView(descriptor + 4);
  }
  WebGPU.Internals.futureInsert(
    futureId,
    adapter.requestDevice(desc).then(
      (device) => {
        callUserCallback(() => {
          WebGPU.Internals.jsObjectInsert(queuePtr, device.queue);
          WebGPU.Internals.jsObjectInsert(devicePtr, device);
          WebGPU.Internals.futureInsert(
            deviceLostFutureId,
            device.lost.then((info) => {
              callUserCallback(() => {
                device.onuncapturederror = (ev) => {};
                var sp = stackSave();
                var messagePtr = stringToUTF8OnStack(info.message);
                _emwgpuOnDeviceLostCompleted(
                  deviceLostFutureId,
                  emwgpuStringToInt_DeviceLostReason[info.reason],
                  messagePtr,
                );
                stackRestore(sp);
              });
            }),
          );
          device.onuncapturederror = (ev) => {
            var type = 5;
            if (ev.error instanceof GPUValidationError) type = 2;
            else if (ev.error instanceof GPUOutOfMemoryError) type = 3;
            else if (ev.error instanceof GPUInternalError) type = 4;
            var sp = stackSave();
            var messagePtr = stringToUTF8OnStack(ev.error.message);
            _emwgpuOnUncapturedError(devicePtr, type, messagePtr);
            stackRestore(sp);
          };
          _emwgpuOnRequestDeviceCompleted(futureId, 1, devicePtr, 0);
        });
      },
      (ex) => {
        callUserCallback(() => {
          var sp = stackSave();
          var messagePtr = stringToUTF8OnStack(ex.message);
          _emwgpuOnRequestDeviceCompleted(futureId, 3, devicePtr, messagePtr);
          if (deviceLostFutureId) {
            _emwgpuOnDeviceLostCompleted(deviceLostFutureId, 4, messagePtr);
          }
          stackRestore(sp);
        });
      },
    ),
  );
}
var _emwgpuBufferGetConstMappedRange = (bufferPtr, offset, size) => {
  var buffer = WebGPU.getJsObject(bufferPtr);
  if (size == -1) size = undefined;
  var mapped;
  try {
    mapped = buffer.getMappedRange(offset, size);
  } catch (ex) {
    return 0;
  }
  var data = _memalign(16, mapped.byteLength);
  HEAPU8.set(new Uint8Array(mapped), data);
  WebGPU.Internals.bufferOnUnmaps[bufferPtr].push(() => _free(data));
  return data;
};
var _emwgpuBufferMapAsync = function (bufferPtr, futureId, mode, offset, size) {
  futureId = bigintToI53Checked(futureId);
  mode = bigintToI53Checked(mode);
  var buffer = WebGPU.getJsObject(bufferPtr);
  WebGPU.Internals.bufferOnUnmaps[bufferPtr] = [];
  if (size == -1) size = undefined;
  WebGPU.Internals.futureInsert(
    futureId,
    buffer.mapAsync(mode, offset, size).then(
      () => {
        callUserCallback(() => {
          _emwgpuOnMapAsyncCompleted(futureId, 1, 0);
        });
      },
      (ex) => {
        callUserCallback(() => {
          var sp = stackSave();
          var messagePtr = stringToUTF8OnStack(ex.message);
          var status =
            ex.name === "AbortError" ? 4 : ex.name === "OperationError" ? 3 : 0;
          _emwgpuOnMapAsyncCompleted(futureId, status, messagePtr);
          delete WebGPU.Internals.bufferOnUnmaps[bufferPtr];
        });
      },
    ),
  );
};
var _emwgpuBufferUnmap = (bufferPtr) => {
  var buffer = WebGPU.getJsObject(bufferPtr);
  var onUnmap = WebGPU.Internals.bufferOnUnmaps[bufferPtr];
  if (!onUnmap) {
    return;
  }
  for (var i = 0; i < onUnmap.length; ++i) {
    onUnmap[i]();
  }
  delete WebGPU.Internals.bufferOnUnmaps[bufferPtr];
  buffer.unmap();
};
var _emwgpuDelete = (ptr) => {
  delete WebGPU.Internals.jsObjects[ptr];
};
var _emwgpuDeviceCreateBuffer = (devicePtr, descriptor, bufferPtr) => {
  var mappedAtCreation = !!HEAPU32[(descriptor + 32) >> 2];
  var desc = {
    label: WebGPU.makeStringFromOptionalStringView(descriptor + 4),
    usage: HEAPU32[(descriptor + 16) >> 2],
    size: readI53FromI64(descriptor + 24),
    mappedAtCreation,
  };
  var device = WebGPU.getJsObject(devicePtr);
  var buffer;
  try {
    buffer = device.createBuffer(desc);
  } catch (ex) {
    return false;
  }
  WebGPU.Internals.jsObjectInsert(bufferPtr, buffer);
  if (mappedAtCreation) {
    WebGPU.Internals.bufferOnUnmaps[bufferPtr] = [];
  }
  return true;
};
var _emwgpuDeviceCreateShaderModule = (
  devicePtr,
  descriptor,
  shaderModulePtr,
) => {
  var nextInChainPtr = HEAPU32[descriptor >> 2];
  var sType = HEAP32[(nextInChainPtr + 4) >> 2];
  var desc = {
    label: WebGPU.makeStringFromOptionalStringView(descriptor + 4),
    code: "",
  };
  switch (sType) {
    case 2: {
      desc["code"] = WebGPU.makeStringFromStringView(nextInChainPtr + 8);
      break;
    }
  }
  var device = WebGPU.getJsObject(devicePtr);
  WebGPU.Internals.jsObjectInsert(
    shaderModulePtr,
    device.createShaderModule(desc),
  );
};
var _emwgpuDeviceDestroy = (devicePtr) => {
  const device = WebGPU.getJsObject(devicePtr);
  device.onuncapturederror = null;
  device.destroy();
};
var emwgpuStringToInt_PreferredFormat = { rgba8unorm: 22, bgra8unorm: 27 };
var _emwgpuGetPreferredFormat = () => {
  var format = navigator.gpu.getPreferredCanvasFormat();
  return emwgpuStringToInt_PreferredFormat[format];
};
function _emwgpuInstanceRequestAdapter(
  instancePtr,
  futureId,
  options,
  adapterPtr,
) {
  futureId = bigintToI53Checked(futureId);
  var opts;
  if (options) {
    opts = {
      featureLevel: WebGPU.FeatureLevel[HEAP32[(options + 4) >> 2]],
      powerPreference: WebGPU.PowerPreference[HEAP32[(options + 8) >> 2]],
      forceFallbackAdapter: !!HEAPU32[(options + 12) >> 2],
    };
    var nextInChainPtr = HEAPU32[options >> 2];
    if (nextInChainPtr !== 0) {
      var sType = HEAP32[(nextInChainPtr + 4) >> 2];
      var webxrOptions = nextInChainPtr;
      opts.xrCompatible = !!HEAPU32[(webxrOptions + 8) >> 2];
    }
  }
  if (!("gpu" in navigator)) {
    var sp = stackSave();
    var messagePtr = stringToUTF8OnStack(
      "WebGPU not available on this browser (navigator.gpu is not available)",
    );
    _emwgpuOnRequestAdapterCompleted(futureId, 3, adapterPtr, messagePtr);
    stackRestore(sp);
    return;
  }
  WebGPU.Internals.futureInsert(
    futureId,
    navigator.gpu.requestAdapter(opts).then(
      (adapter) => {
        callUserCallback(() => {
          if (adapter) {
            WebGPU.Internals.jsObjectInsert(adapterPtr, adapter);
            _emwgpuOnRequestAdapterCompleted(futureId, 1, adapterPtr, 0);
          } else {
            var sp = stackSave();
            var messagePtr = stringToUTF8OnStack(
              "WebGPU not available on this browser (requestAdapter returned null)",
            );
            _emwgpuOnRequestAdapterCompleted(
              futureId,
              3,
              adapterPtr,
              messagePtr,
            );
            stackRestore(sp);
          }
        });
      },
      (ex) => {
        callUserCallback(() => {
          var sp = stackSave();
          var messagePtr = stringToUTF8OnStack(ex.message);
          _emwgpuOnRequestAdapterCompleted(futureId, 4, adapterPtr, messagePtr);
          stackRestore(sp);
        });
      },
    ),
  );
}
var ENV = {};
var getExecutableName = () => thisProgram;
var getEnvStrings = () => {
  if (!getEnvStrings.strings) {
    var lang =
      (globalThis.navigator?.language ?? "C").replace("-", "_") + ".UTF-8";
    var env = {
      USER: "web_user",
      LOGNAME: "web_user",
      PATH: "/",
      PWD: "/",
      HOME: "/home/web_user",
      LANG: lang,
      _: getExecutableName(),
    };
    for (var x in ENV) {
      if (ENV[x] === undefined) delete env[x];
      else env[x] = ENV[x];
    }
    var strings = [];
    for (var x in env) {
      strings.push(`${x}=${env[x]}`);
    }
    getEnvStrings.strings = strings;
  }
  return getEnvStrings.strings;
};
var _environ_get = (__environ, environ_buf) => {
  var bufSize = 0;
  var envp = 0;
  for (var string of getEnvStrings()) {
    var ptr = environ_buf + bufSize;
    HEAPU32[(__environ + envp) >> 2] = ptr;
    bufSize += stringToUTF8(string, ptr, Infinity) + 1;
    envp += 4;
  }
  return 0;
};
var _environ_sizes_get = (penviron_count, penviron_buf_size) => {
  var strings = getEnvStrings();
  HEAPU32[penviron_count >> 2] = strings.length;
  var bufSize = 0;
  for (var string of strings) {
    bufSize += lengthBytesUTF8(string) + 1;
  }
  HEAPU32[penviron_buf_size >> 2] = bufSize;
  return 0;
};
function _fd_close(fd) {
  try {
    var stream = SYSCALLS.getStreamFromFD(fd);
    FS.close(stream);
    return 0;
  } catch (e) {
    if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
    return e.errno;
  }
}
var doReadv = (stream, iov, iovcnt, offset) => {
  var ret = 0;
  for (var i = 0; i < iovcnt; i++) {
    var ptr = HEAPU32[iov >> 2];
    var len = HEAPU32[(iov + 4) >> 2];
    iov += 8;
    var curr = FS.read(stream, HEAP8, ptr, len, offset);
    if (curr < 0) return -1;
    ret += curr;
    if (curr < len) break;
    if (typeof offset != "undefined") {
      offset += curr;
    }
  }
  return ret;
};
function _fd_read(fd, iov, iovcnt, pnum) {
  try {
    var stream = SYSCALLS.getStreamFromFD(fd);
    var num = doReadv(stream, iov, iovcnt);
    HEAPU32[pnum >> 2] = num;
    return 0;
  } catch (e) {
    if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
    return e.errno;
  }
}
function _fd_seek(fd, offset, whence, newOffset) {
  offset = bigintToI53Checked(offset);
  try {
    if (isNaN(offset)) return 22;
    var stream = SYSCALLS.getStreamFromFD(fd);
    FS.llseek(stream, offset, whence);
    HEAP64[newOffset >> 3] = BigInt(stream.position);
    if (stream.getdents && offset === 0 && whence === 0) stream.getdents = null;
    return 0;
  } catch (e) {
    if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
    return e.errno;
  }
}
var doWritev = (stream, iov, iovcnt, offset) => {
  var ret = 0;
  for (var i = 0; i < iovcnt; i++) {
    var ptr = HEAPU32[iov >> 2];
    var len = HEAPU32[(iov + 4) >> 2];
    iov += 8;
    var curr = FS.write(stream, HEAP8, ptr, len, offset);
    if (curr < 0) return -1;
    ret += curr;
    if (curr < len) {
      break;
    }
    if (typeof offset != "undefined") {
      offset += curr;
    }
  }
  return ret;
};
function _fd_write(fd, iov, iovcnt, pnum) {
  try {
    var stream = SYSCALLS.getStreamFromFD(fd);
    var num = doWritev(stream, iov, iovcnt);
    HEAPU32[pnum >> 2] = num;
    return 0;
  } catch (e) {
    if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
    return e.errno;
  }
}
var _llvm_eh_typeid_for = (type) => type;
var _wgpuCommandEncoderBeginRenderPass = (encoderPtr, descriptor) => {
  function makeColorAttachment(caPtr) {
    var viewPtr = HEAPU32[(caPtr + 4) >> 2];
    if (viewPtr === 0) {
      return undefined;
    }
    var depthSlice = HEAPU32[(caPtr + 8) >> 2];
    if (depthSlice == 4294967295) depthSlice = undefined;
    return {
      view: WebGPU.getJsObject(viewPtr),
      depthSlice,
      resolveTarget: WebGPU.getJsObject(HEAPU32[(caPtr + 12) >> 2]),
      clearValue: WebGPU.makeColor(caPtr + 24),
      loadOp: WebGPU.LoadOp[HEAP32[(caPtr + 16) >> 2]],
      storeOp: WebGPU.StoreOp[HEAP32[(caPtr + 20) >> 2]],
    };
  }
  function makeColorAttachments(count, caPtr) {
    var attachments = [];
    for (var i = 0; i < count; ++i) {
      attachments.push(makeColorAttachment(caPtr + 56 * i));
    }
    return attachments;
  }
  function makeDepthStencilAttachment(dsaPtr) {
    if (dsaPtr === 0) return undefined;
    return {
      view: WebGPU.getJsObject(HEAPU32[(dsaPtr + 4) >> 2]),
      depthClearValue: HEAPF32[(dsaPtr + 16) >> 2],
      depthLoadOp: WebGPU.LoadOp[HEAP32[(dsaPtr + 8) >> 2]],
      depthStoreOp: WebGPU.StoreOp[HEAP32[(dsaPtr + 12) >> 2]],
      depthReadOnly: !!HEAPU32[(dsaPtr + 20) >> 2],
      stencilClearValue: HEAPU32[(dsaPtr + 32) >> 2],
      stencilLoadOp: WebGPU.LoadOp[HEAP32[(dsaPtr + 24) >> 2]],
      stencilStoreOp: WebGPU.StoreOp[HEAP32[(dsaPtr + 28) >> 2]],
      stencilReadOnly: !!HEAPU32[(dsaPtr + 36) >> 2],
    };
  }
  function makeRenderPassDescriptor(descriptor) {
    var nextInChainPtr = HEAPU32[descriptor >> 2];
    var maxDrawCount = undefined;
    if (nextInChainPtr !== 0) {
      var sType = HEAP32[(nextInChainPtr + 4) >> 2];
      var renderPassMaxDrawCount = nextInChainPtr;
      maxDrawCount = readI53FromI64(renderPassMaxDrawCount + 8);
    }
    var desc = {
      label: WebGPU.makeStringFromOptionalStringView(descriptor + 4),
      colorAttachments: makeColorAttachments(
        HEAPU32[(descriptor + 12) >> 2],
        HEAPU32[(descriptor + 16) >> 2],
      ),
      depthStencilAttachment: makeDepthStencilAttachment(
        HEAPU32[(descriptor + 20) >> 2],
      ),
      occlusionQuerySet: WebGPU.getJsObject(HEAPU32[(descriptor + 24) >> 2]),
      timestampWrites: WebGPU.makePassTimestampWrites(
        HEAPU32[(descriptor + 28) >> 2],
      ),
      maxDrawCount,
    };
    return desc;
  }
  var desc = makeRenderPassDescriptor(descriptor);
  var commandEncoder = WebGPU.getJsObject(encoderPtr);
  var ptr = _emwgpuCreateRenderPassEncoder(0);
  WebGPU.Internals.jsObjectInsert(ptr, commandEncoder.beginRenderPass(desc));
  return ptr;
};
var _wgpuCommandEncoderCopyTextureToBuffer = (
  encoderPtr,
  srcPtr,
  dstPtr,
  copySizePtr,
) => {
  var commandEncoder = WebGPU.getJsObject(encoderPtr);
  var copySize = WebGPU.makeExtent3D(copySizePtr);
  commandEncoder.copyTextureToBuffer(
    WebGPU.makeTexelCopyTextureInfo(srcPtr),
    WebGPU.makeTexelCopyBufferInfo(dstPtr),
    copySize,
  );
};
var _wgpuCommandEncoderCopyTextureToTexture = (
  encoderPtr,
  srcPtr,
  dstPtr,
  copySizePtr,
) => {
  var commandEncoder = WebGPU.getJsObject(encoderPtr);
  var copySize = WebGPU.makeExtent3D(copySizePtr);
  commandEncoder.copyTextureToTexture(
    WebGPU.makeTexelCopyTextureInfo(srcPtr),
    WebGPU.makeTexelCopyTextureInfo(dstPtr),
    copySize,
  );
};
var _wgpuCommandEncoderFinish = (encoderPtr, descriptor) => {
  var commandEncoder = WebGPU.getJsObject(encoderPtr);
  var ptr = _emwgpuCreateCommandBuffer(0);
  WebGPU.Internals.jsObjectInsert(ptr, commandEncoder.finish());
  return ptr;
};
var _wgpuDeviceCreateBindGroup = (devicePtr, descriptor) => {
  function makeEntry(entryPtr) {
    var bufferPtr = HEAPU32[(entryPtr + 8) >> 2];
    var samplerPtr = HEAPU32[(entryPtr + 32) >> 2];
    var textureViewPtr = HEAPU32[(entryPtr + 36) >> 2];
    var externalTexturePtr = 0;
    WebGPU.iterateExtensions(entryPtr, {
      14: (ptr) => {
        externalTexturePtr = HEAPU32[(ptr + 8) >> 2];
      },
    });
    var resource;
    if (bufferPtr) {
      var size = readI53FromI64(entryPtr + 24);
      if (size == -1) size = undefined;
      resource = {
        buffer: WebGPU.getJsObject(bufferPtr),
        offset: readI53FromI64(entryPtr + 16),
        size,
      };
    } else {
      resource = WebGPU.getJsObject(
        samplerPtr || textureViewPtr || externalTexturePtr,
      );
    }
    return { binding: HEAPU32[(entryPtr + 4) >> 2], resource };
  }
  function makeEntries(count, entriesPtrs) {
    var entries = [];
    for (var i = 0; i < count; ++i) {
      entries.push(makeEntry(entriesPtrs + 40 * i));
    }
    return entries;
  }
  var desc = {
    label: WebGPU.makeStringFromOptionalStringView(descriptor + 4),
    layout: WebGPU.getJsObject(HEAPU32[(descriptor + 12) >> 2]),
    entries: makeEntries(
      HEAPU32[(descriptor + 16) >> 2],
      HEAPU32[(descriptor + 20) >> 2],
    ),
  };
  var device = WebGPU.getJsObject(devicePtr);
  var ptr = _emwgpuCreateBindGroup(0);
  WebGPU.Internals.jsObjectInsert(ptr, device.createBindGroup(desc));
  return ptr;
};
var _wgpuDeviceCreateBindGroupLayout = (devicePtr, descriptor) => {
  function makeBufferEntry(substructPtr) {
    var typeInt = HEAPU32[(substructPtr + 4) >> 2];
    if (!typeInt) return undefined;
    return {
      type: WebGPU.BufferBindingType[typeInt],
      hasDynamicOffset: !!HEAPU32[(substructPtr + 8) >> 2],
      minBindingSize: readI53FromI64(substructPtr + 16),
    };
  }
  function makeSamplerEntry(substructPtr) {
    var typeInt = HEAPU32[(substructPtr + 4) >> 2];
    if (!typeInt) return undefined;
    return { type: WebGPU.SamplerBindingType[typeInt] };
  }
  function makeTextureEntry(substructPtr) {
    var sampleTypeInt = HEAPU32[(substructPtr + 4) >> 2];
    if (!sampleTypeInt) return undefined;
    return {
      sampleType: WebGPU.TextureSampleType[sampleTypeInt],
      viewDimension:
        WebGPU.TextureViewDimension[HEAP32[(substructPtr + 8) >> 2]],
      multisampled: !!HEAPU32[(substructPtr + 12) >> 2],
    };
  }
  function makeStorageTextureEntry(substructPtr) {
    var accessInt = HEAPU32[(substructPtr + 4) >> 2];
    if (!accessInt) return undefined;
    return {
      access: WebGPU.StorageTextureAccess[accessInt],
      format: WebGPU.TextureFormat[HEAP32[(substructPtr + 8) >> 2]],
      viewDimension:
        WebGPU.TextureViewDimension[HEAP32[(substructPtr + 12) >> 2]],
    };
  }
  function makeEntry(entryPtr) {
    var entry = {
      binding: HEAPU32[(entryPtr + 4) >> 2],
      visibility: HEAPU32[(entryPtr + 8) >> 2],
      buffer: makeBufferEntry(entryPtr + 24),
      sampler: makeSamplerEntry(entryPtr + 48),
      texture: makeTextureEntry(entryPtr + 56),
      storageTexture: makeStorageTextureEntry(entryPtr + 72),
    };
    WebGPU.iterateExtensions(entryPtr, {
      13: (ptr) => {
        entry["externalTexture"] = {};
      },
    });
    return entry;
  }
  function makeEntries(count, entriesPtrs) {
    var entries = [];
    for (var i = 0; i < count; ++i) {
      entries.push(makeEntry(entriesPtrs + 88 * i));
    }
    return entries;
  }
  var desc = {
    label: WebGPU.makeStringFromOptionalStringView(descriptor + 4),
    entries: makeEntries(
      HEAPU32[(descriptor + 12) >> 2],
      HEAPU32[(descriptor + 16) >> 2],
    ),
  };
  var device = WebGPU.getJsObject(devicePtr);
  var ptr = _emwgpuCreateBindGroupLayout(0);
  WebGPU.Internals.jsObjectInsert(ptr, device.createBindGroupLayout(desc));
  return ptr;
};
var _wgpuDeviceCreateCommandEncoder = (devicePtr, descriptor) => {
  var desc;
  if (descriptor) {
    desc = { label: WebGPU.makeStringFromOptionalStringView(descriptor + 4) };
  }
  var device = WebGPU.getJsObject(devicePtr);
  var ptr = _emwgpuCreateCommandEncoder(0);
  WebGPU.Internals.jsObjectInsert(ptr, device.createCommandEncoder(desc));
  return ptr;
};
var _wgpuDeviceCreatePipelineLayout = (devicePtr, descriptor) => {
  var bglCount = HEAPU32[(descriptor + 12) >> 2];
  var bglPtr = HEAPU32[(descriptor + 16) >> 2];
  var bgls = [];
  for (var i = 0; i < bglCount; ++i) {
    bgls.push(WebGPU.getJsObject(HEAPU32[(bglPtr + 4 * i) >> 2]));
  }
  var desc = {
    label: WebGPU.makeStringFromOptionalStringView(descriptor + 4),
    bindGroupLayouts: bgls,
  };
  var device = WebGPU.getJsObject(devicePtr);
  var ptr = _emwgpuCreatePipelineLayout(0);
  WebGPU.Internals.jsObjectInsert(ptr, device.createPipelineLayout(desc));
  return ptr;
};
var _wgpuDeviceCreateRenderPipeline = (devicePtr, descriptor) => {
  var desc = WebGPU.makeRenderPipelineDesc(descriptor);
  var device = WebGPU.getJsObject(devicePtr);
  var ptr = _emwgpuCreateRenderPipeline(0);
  WebGPU.Internals.jsObjectInsert(ptr, device.createRenderPipeline(desc));
  return ptr;
};
var _wgpuDeviceCreateSampler = (devicePtr, descriptor) => {
  var desc;
  if (descriptor) {
    desc = {
      label: WebGPU.makeStringFromOptionalStringView(descriptor + 4),
      addressModeU: WebGPU.AddressMode[HEAP32[(descriptor + 12) >> 2]],
      addressModeV: WebGPU.AddressMode[HEAP32[(descriptor + 16) >> 2]],
      addressModeW: WebGPU.AddressMode[HEAP32[(descriptor + 20) >> 2]],
      magFilter: WebGPU.FilterMode[HEAP32[(descriptor + 24) >> 2]],
      minFilter: WebGPU.FilterMode[HEAP32[(descriptor + 28) >> 2]],
      mipmapFilter: WebGPU.MipmapFilterMode[HEAP32[(descriptor + 32) >> 2]],
      lodMinClamp: HEAPF32[(descriptor + 36) >> 2],
      lodMaxClamp: HEAPF32[(descriptor + 40) >> 2],
      compare: WebGPU.CompareFunction[HEAP32[(descriptor + 44) >> 2]],
      maxAnisotropy: HEAPU16[(descriptor + 48) >> 1],
    };
  }
  var device = WebGPU.getJsObject(devicePtr);
  var ptr = _emwgpuCreateSampler(0);
  WebGPU.Internals.jsObjectInsert(ptr, device.createSampler(desc));
  return ptr;
};
var _wgpuDeviceCreateTexture = (devicePtr, descriptor) => {
  var nextInChainPtr = HEAPU32[descriptor >> 2];
  var textureBindingViewDimension;
  if (nextInChainPtr !== 0) {
    var sType = HEAP32[(nextInChainPtr + 4) >> 2];
    var textureBindingViewDimensionDescriptor = nextInChainPtr;
    textureBindingViewDimension =
      WebGPU.TextureViewDimension[
        HEAP32[(textureBindingViewDimensionDescriptor + 8) >> 2]
      ];
  }
  var desc = {
    label: WebGPU.makeStringFromOptionalStringView(descriptor + 4),
    size: WebGPU.makeExtent3D(descriptor + 28),
    mipLevelCount: HEAPU32[(descriptor + 44) >> 2],
    sampleCount: HEAPU32[(descriptor + 48) >> 2],
    dimension: WebGPU.TextureDimension[HEAP32[(descriptor + 24) >> 2]],
    format: WebGPU.TextureFormat[HEAP32[(descriptor + 40) >> 2]],
    usage: HEAPU32[(descriptor + 16) >> 2],
    textureBindingViewDimension,
  };
  var viewFormatCount = HEAPU32[(descriptor + 52) >> 2];
  if (viewFormatCount) {
    var viewFormatsPtr = HEAPU32[(descriptor + 56) >> 2];
    desc["viewFormats"] = Array.from(
      HEAP32.subarray(
        viewFormatsPtr >> 2,
        (viewFormatsPtr + viewFormatCount * 4) >> 2,
      ),
      (format) => WebGPU.TextureFormat[format],
    );
  }
  var device = WebGPU.getJsObject(devicePtr);
  var ptr = _emwgpuCreateTexture(0);
  WebGPU.Internals.jsObjectInsert(ptr, device.createTexture(desc));
  return ptr;
};
var _wgpuInstanceCreateSurface = (instancePtr, descriptor) => {
  var nextInChainPtr = HEAPU32[descriptor >> 2];
  var sourceCanvasHTMLSelector = nextInChainPtr;
  var selectorPtr = HEAPU32[(sourceCanvasHTMLSelector + 8) >> 2];
  var canvas = findCanvasEventTarget(selectorPtr);
  var context = canvas.getContext("webgpu");
  if (!context) return 0;
  context.surfaceLabelWebGPU = WebGPU.makeStringFromOptionalStringView(
    descriptor + 4,
  );
  var ptr = _emwgpuCreateSurface(0);
  WebGPU.Internals.jsObjectInsert(ptr, context);
  return ptr;
};
var _wgpuQueueSubmit = (queuePtr, commandCount, commands) => {
  var queue = WebGPU.getJsObject(queuePtr);
  var cmds = Array.from(
    HEAP32.subarray(commands >> 2, (commands + commandCount * 4) >> 2),
    (id) => WebGPU.getJsObject(id),
  );
  queue.submit(cmds);
};
function _wgpuQueueWriteBuffer(queuePtr, bufferPtr, bufferOffset, data, size) {
  bufferOffset = bigintToI53Checked(bufferOffset);
  var queue = WebGPU.getJsObject(queuePtr);
  var buffer = WebGPU.getJsObject(bufferPtr);
  var subarray = HEAPU8.subarray(data, data + size);
  queue.writeBuffer(buffer, bufferOffset, subarray, 0, size);
}
var _wgpuQueueWriteTexture = (
  queuePtr,
  destinationPtr,
  data,
  dataSize,
  dataLayoutPtr,
  writeSizePtr,
) => {
  var queue = WebGPU.getJsObject(queuePtr);
  var destination = WebGPU.makeTexelCopyTextureInfo(destinationPtr);
  var dataLayout = WebGPU.makeTexelCopyBufferLayout(dataLayoutPtr);
  var writeSize = WebGPU.makeExtent3D(writeSizePtr);
  var subarray = HEAPU8.subarray(data, data + dataSize);
  queue.writeTexture(destination, subarray, dataLayout, writeSize);
};
var _wgpuRenderPassEncoderDraw = (
  passPtr,
  vertexCount,
  instanceCount,
  firstVertex,
  firstInstance,
) => {
  firstVertex >>>= 0;
  firstInstance >>>= 0;
  var pass = WebGPU.getJsObject(passPtr);
  pass.draw(vertexCount, instanceCount, firstVertex, firstInstance);
};
var _wgpuRenderPassEncoderDrawIndexed = (
  passPtr,
  indexCount,
  instanceCount,
  firstIndex,
  baseVertex,
  firstInstance,
) => {
  firstIndex >>>= 0;
  firstInstance >>>= 0;
  var pass = WebGPU.getJsObject(passPtr);
  pass.drawIndexed(
    indexCount,
    instanceCount,
    firstIndex,
    baseVertex,
    firstInstance,
  );
};
var _wgpuRenderPassEncoderEnd = (encoderPtr) => {
  var encoder = WebGPU.getJsObject(encoderPtr);
  encoder.end();
};
var _wgpuRenderPassEncoderSetBindGroup = (
  passPtr,
  groupIndex,
  groupPtr,
  dynamicOffsetCount,
  dynamicOffsetsPtr,
) => {
  var pass = WebGPU.getJsObject(passPtr);
  var group = WebGPU.getJsObject(groupPtr);
  if (dynamicOffsetCount == 0) {
    pass.setBindGroup(groupIndex, group);
  } else {
    pass.setBindGroup(
      groupIndex,
      group,
      HEAPU32,
      dynamicOffsetsPtr >> 2,
      dynamicOffsetCount,
    );
  }
};
function _wgpuRenderPassEncoderSetIndexBuffer(
  passPtr,
  bufferPtr,
  format,
  offset,
  size,
) {
  offset = bigintToI53Checked(offset);
  size = bigintToI53Checked(size);
  var pass = WebGPU.getJsObject(passPtr);
  var buffer = WebGPU.getJsObject(bufferPtr);
  if (size == -1) size = undefined;
  pass.setIndexBuffer(buffer, WebGPU.IndexFormat[format], offset, size);
}
var _wgpuRenderPassEncoderSetPipeline = (passPtr, pipelinePtr) => {
  var pass = WebGPU.getJsObject(passPtr);
  var pipeline = WebGPU.getJsObject(pipelinePtr);
  pass.setPipeline(pipeline);
};
var _wgpuRenderPassEncoderSetScissorRect = (passPtr, x, y, w, h) => {
  var pass = WebGPU.getJsObject(passPtr);
  pass.setScissorRect(x, y, w, h);
};
function _wgpuRenderPassEncoderSetVertexBuffer(
  passPtr,
  slot,
  bufferPtr,
  offset,
  size,
) {
  offset = bigintToI53Checked(offset);
  size = bigintToI53Checked(size);
  var pass = WebGPU.getJsObject(passPtr);
  var buffer = WebGPU.getJsObject(bufferPtr);
  if (size == -1) size = undefined;
  pass.setVertexBuffer(slot, buffer, offset, size);
}
var _wgpuRenderPassEncoderSetViewport = (
  passPtr,
  x,
  y,
  w,
  h,
  minDepth,
  maxDepth,
) => {
  var pass = WebGPU.getJsObject(passPtr);
  pass.setViewport(x, y, w, h, minDepth, maxDepth);
};
var _wgpuSurfaceConfigure = (surfacePtr, config) => {
  var context = WebGPU.getJsObject(surfacePtr);
  var canvasSize = [HEAPU32[(config + 24) >> 2], HEAPU32[(config + 28) >> 2]];
  if (canvasSize[0] !== 0) {
    context["canvas"]["width"] = canvasSize[0];
  }
  if (canvasSize[1] !== 0) {
    context["canvas"]["height"] = canvasSize[1];
  }
  var configuration = {
    device: WebGPU.getJsObject(HEAPU32[(config + 4) >> 2]),
    format: WebGPU.TextureFormat[HEAP32[(config + 8) >> 2]],
    usage: HEAPU32[(config + 16) >> 2],
    alphaMode: WebGPU.CompositeAlphaMode[HEAP32[(config + 40) >> 2]],
  };
  var viewFormatCount = HEAPU32[(config + 32) >> 2];
  if (viewFormatCount) {
    var viewFormatsPtr = HEAPU32[(config + 36) >> 2];
    configuration["viewFormats"] = Array.from(
      HEAP32.subarray(
        viewFormatsPtr >> 2,
        (viewFormatsPtr + viewFormatCount * 4) >> 2,
      ),
      (format) => WebGPU.TextureFormat[format],
    );
  }
  {
    var nextInChainPtr = HEAPU32[config >> 2];
    if (nextInChainPtr !== 0) {
      var sType = HEAP32[(nextInChainPtr + 4) >> 2];
      var surfaceColorManagement = nextInChainPtr;
      configuration.colorSpace =
        WebGPU.PredefinedColorSpace[HEAP32[(surfaceColorManagement + 8) >> 2]];
      configuration.toneMapping = {
        mode: WebGPU.ToneMappingMode[
          HEAP32[(surfaceColorManagement + 12) >> 2]
        ],
      };
    }
  }
  context.configure(configuration);
};
var _wgpuSurfaceGetCurrentTexture = (surfacePtr, surfaceTexturePtr) => {
  var context = WebGPU.getJsObject(surfacePtr);
  try {
    var texturePtr = _emwgpuCreateTexture(0);
    WebGPU.Internals.jsObjectInsert(texturePtr, context.getCurrentTexture());
    HEAPU32[(surfaceTexturePtr + 4) >> 2] = texturePtr;
    HEAP32[(surfaceTexturePtr + 8) >> 2] = 1;
  } catch (ex) {
    HEAPU32[(surfaceTexturePtr + 4) >> 2] = 0;
    HEAP32[(surfaceTexturePtr + 8) >> 2] = 6;
  }
};
var _wgpuSurfaceUnconfigure = (surfacePtr) => {
  var context = WebGPU.getJsObject(surfacePtr);
  context.unconfigure();
};
var _wgpuTextureCreateView = (texturePtr, descriptor) => {
  var desc;
  if (descriptor) {
    var swizzle;
    var nextInChainPtr = HEAPU32[descriptor >> 2];
    if (nextInChainPtr !== 0) {
      var sType = HEAP32[(nextInChainPtr + 4) >> 2];
      var swizzleDescriptor = nextInChainPtr;
      var swizzlePtr = swizzleDescriptor + 8;
      var r = WebGPU.ComponentSwizzle[HEAP32[swizzlePtr >> 2]] || "r";
      var g = WebGPU.ComponentSwizzle[HEAP32[(swizzlePtr + 4) >> 2]] || "g";
      var b = WebGPU.ComponentSwizzle[HEAP32[(swizzlePtr + 8) >> 2]] || "b";
      var a = WebGPU.ComponentSwizzle[HEAP32[(swizzlePtr + 12) >> 2]] || "a";
      swizzle = `${r}${g}${b}${a}`;
    }
    var mipLevelCount = HEAPU32[(descriptor + 24) >> 2];
    var arrayLayerCount = HEAPU32[(descriptor + 32) >> 2];
    desc = {
      label: WebGPU.makeStringFromOptionalStringView(descriptor + 4),
      format: WebGPU.TextureFormat[HEAP32[(descriptor + 12) >> 2]],
      dimension: WebGPU.TextureViewDimension[HEAP32[(descriptor + 16) >> 2]],
      baseMipLevel: HEAPU32[(descriptor + 20) >> 2],
      mipLevelCount: mipLevelCount === 4294967295 ? undefined : mipLevelCount,
      baseArrayLayer: HEAPU32[(descriptor + 28) >> 2],
      arrayLayerCount:
        arrayLayerCount === 4294967295 ? undefined : arrayLayerCount,
      aspect: WebGPU.TextureAspect[HEAP32[(descriptor + 36) >> 2]],
      usage: HEAPU32[(descriptor + 40) >> 2],
      swizzle,
    };
  }
  var texture = WebGPU.getJsObject(texturePtr);
  var ptr = _emwgpuCreateTextureView(0);
  WebGPU.Internals.jsObjectInsert(ptr, texture.createView(desc));
  return ptr;
};
var runAndAbortIfError = (func) => {
  try {
    return func();
  } catch (e) {
    abort(e);
  }
};
var runtimeKeepalivePush = () => {
  runtimeKeepaliveCounter += 1;
};
var runtimeKeepalivePop = () => {
  runtimeKeepaliveCounter -= 1;
};
var Asyncify = {
  instrumentWasmImports(imports) {
    var importPattern = /^(invoke_.*|__asyncjs__.*)$/;
    for (let [x, original] of Object.entries(imports)) {
      if (typeof original == "function") {
        let isAsyncifyImport = original.isAsync || importPattern.test(x);
      }
    }
  },
  instrumentFunction(original) {
    var wrapper = (...args) => {
      Asyncify.exportCallStack.push(original);
      try {
        return original(...args);
      } finally {
        if (!ABORT) {
          var top = Asyncify.exportCallStack.pop();
          Asyncify.maybeStopUnwind();
        }
      }
    };
    Asyncify.funcWrappers.set(original, wrapper);
    return wrapper;
  },
  instrumentWasmExports(exports) {
    var ret = {};
    for (let [x, original] of Object.entries(exports)) {
      if (typeof original == "function") {
        var wrapper = Asyncify.instrumentFunction(original);
        ret[x] = wrapper;
      } else {
        ret[x] = original;
      }
    }
    return ret;
  },
  State: { Normal: 0, Unwinding: 1, Rewinding: 2, Disabled: 3 },
  state: 0,
  StackSize: 1048576,
  currData: null,
  handleSleepReturnValue: 0,
  exportCallStack: [],
  callstackFuncToId: new Map(),
  callStackIdToFunc: new Map(),
  funcWrappers: new Map(),
  callStackId: 0,
  asyncPromiseHandlers: null,
  sleepCallbacks: [],
  getCallStackId(func) {
    if (!Asyncify.callstackFuncToId.has(func)) {
      var id = Asyncify.callStackId++;
      Asyncify.callstackFuncToId.set(func, id);
      Asyncify.callStackIdToFunc.set(id, func);
    }
    return Asyncify.callstackFuncToId.get(func);
  },
  maybeStopUnwind() {
    if (
      Asyncify.currData &&
      Asyncify.state === Asyncify.State.Unwinding &&
      Asyncify.exportCallStack.length === 0
    ) {
      Asyncify.state = Asyncify.State.Normal;
      runAndAbortIfError(_asyncify_stop_unwind);
      if (typeof Fibers != "undefined") {
        Fibers.trampoline();
      }
    }
  },
  whenDone() {
    return new Promise((resolve, reject) => {
      Asyncify.asyncPromiseHandlers = { resolve, reject };
    });
  },
  allocateData() {
    var ptr = _malloc(12 + Asyncify.StackSize);
    Asyncify.setDataHeader(ptr, ptr + 12, Asyncify.StackSize);
    Asyncify.setDataRewindFunc(ptr);
    return ptr;
  },
  setDataHeader(ptr, stack, stackSize) {
    HEAPU32[ptr >> 2] = stack;
    HEAPU32[(ptr + 4) >> 2] = stack + stackSize;
  },
  setDataRewindFunc(ptr) {
    var bottomOfCallStack = Asyncify.exportCallStack[0];
    var rewindId = Asyncify.getCallStackId(bottomOfCallStack);
    HEAP32[(ptr + 8) >> 2] = rewindId;
  },
  getDataRewindFunc(ptr) {
    var id = HEAP32[(ptr + 8) >> 2];
    var func = Asyncify.callStackIdToFunc.get(id);
    return func;
  },
  doRewind(ptr) {
    var original = Asyncify.getDataRewindFunc(ptr);
    var func = Asyncify.funcWrappers.get(original);
    return callUserCallback(func);
  },
  handleSleep(startAsync) {
    if (ABORT) return;
    if (Asyncify.state === Asyncify.State.Normal) {
      var reachedCallback = false;
      var reachedAfterCallback = false;
      startAsync((handleSleepReturnValue = 0) => {
        if (ABORT) return;
        Asyncify.handleSleepReturnValue = handleSleepReturnValue;
        reachedCallback = true;
        if (!reachedAfterCallback) {
          return;
        }
        Asyncify.state = Asyncify.State.Rewinding;
        runAndAbortIfError(() => _asyncify_start_rewind(Asyncify.currData));
        if (typeof MainLoop != "undefined" && MainLoop.func) {
          MainLoop.resume();
        }
        var asyncWasmReturnValue,
          isError = false;
        try {
          asyncWasmReturnValue = Asyncify.doRewind(Asyncify.currData);
        } catch (err) {
          asyncWasmReturnValue = err;
          isError = true;
        }
        var handled = false;
        if (!Asyncify.currData) {
          var asyncPromiseHandlers = Asyncify.asyncPromiseHandlers;
          if (asyncPromiseHandlers) {
            Asyncify.asyncPromiseHandlers = null;
            (isError
              ? asyncPromiseHandlers.reject
              : asyncPromiseHandlers.resolve)(asyncWasmReturnValue);
            handled = true;
          }
        }
        if (isError && !handled) {
          throw asyncWasmReturnValue;
        }
      });
      reachedAfterCallback = true;
      if (!reachedCallback) {
        Asyncify.state = Asyncify.State.Unwinding;
        Asyncify.currData = Asyncify.allocateData();
        if (typeof MainLoop != "undefined" && MainLoop.func) {
          MainLoop.pause();
        }
        runAndAbortIfError(() => _asyncify_start_unwind(Asyncify.currData));
      }
    } else if (Asyncify.state === Asyncify.State.Rewinding) {
      Asyncify.state = Asyncify.State.Normal;
      runAndAbortIfError(_asyncify_stop_rewind);
      _free(Asyncify.currData);
      Asyncify.currData = null;
      Asyncify.sleepCallbacks.forEach(callUserCallback);
    } else {
      abort(`invalid state: ${Asyncify.state}`);
    }
    return Asyncify.handleSleepReturnValue;
  },
  handleAsync: (startAsync) =>
    Asyncify.handleSleep(async (wakeUp) => {
      wakeUp(await startAsync());
    }),
};
var getCFunc = (ident) => {
  var func = Module["_" + ident];
  return func;
};
var writeArrayToMemory = (array, buffer) => {
  HEAP8.set(array, buffer);
};
var ccall = (ident, returnType, argTypes, args, opts) => {
  var toC = {
    string: (str) => {
      var ret = 0;
      if (str !== null && str !== undefined && str !== 0) {
        ret = stringToUTF8OnStack(str);
      }
      return ret;
    },
    array: (arr) => {
      var ret = stackAlloc(arr.length);
      writeArrayToMemory(arr, ret);
      return ret;
    },
  };
  function convertReturnValue(ret) {
    if (returnType === "string") {
      return UTF8ToString(ret);
    }
    if (returnType === "boolean") return Boolean(ret);
    return ret;
  }
  var func = getCFunc(ident);
  var cArgs = [];
  var stack = 0;
  if (args) {
    for (var i = 0; i < args.length; i++) {
      var converter = toC[argTypes[i]];
      if (converter) {
        if (stack === 0) stack = stackSave();
        cArgs[i] = converter(args[i]);
      } else {
        cArgs[i] = args[i];
      }
    }
  }
  var previousAsync = Asyncify.currData;
  var ret = func(...cArgs);
  function onDone(ret) {
    runtimeKeepalivePop();
    if (stack !== 0) stackRestore(stack);
    return convertReturnValue(ret);
  }
  var asyncMode = opts?.async;
  runtimeKeepalivePush();
  if (Asyncify.currData != previousAsync) {
    return Asyncify.whenDone().then(onDone);
  }
  ret = onDone(ret);
  if (asyncMode) return Promise.resolve(ret);
  return ret;
};
var cwrap = (ident, returnType, argTypes, opts) => {
  var numericArgs =
    !argTypes ||
    argTypes.every((type) => type === "number" || type === "boolean");
  var numericRet = returnType !== "string";
  if (numericRet && numericArgs && !opts) {
    return getCFunc(ident);
  }
  return (...args) => ccall(ident, returnType, argTypes, args, opts);
};
var requestFullscreen = Browser.requestFullscreen;
var FS_createPath = (...args) => FS.createPath(...args);
var FS_unlink = (...args) => FS.unlink(...args);
var FS_createLazyFile = (...args) => FS.createLazyFile(...args);
var FS_createDevice = (...args) => FS.createDevice(...args);
FS.createPreloadedFile = FS_createPreloadedFile;
FS.preloadFile = FS_preloadFile;
FS.staticInit();
Module["requestAnimationFrame"] = MainLoop.requestAnimationFrame;
Module["pauseMainLoop"] = MainLoop.pause;
Module["resumeMainLoop"] = MainLoop.resume;
MainLoop.init();
for (let i = 0; i < 32; ++i) tempFixedLengthArray.push(new Array(i));
var miniTempWebGLFloatBuffersStorage = new Float32Array(288);
for (var i = 0; i <= 288; ++i) {
  miniTempWebGLFloatBuffers[i] = miniTempWebGLFloatBuffersStorage.subarray(
    0,
    i,
  );
}
var miniTempWebGLIntBuffersStorage = new Int32Array(288);
for (var i = 0; i <= 288; ++i) {
  miniTempWebGLIntBuffers[i] = miniTempWebGLIntBuffersStorage.subarray(0, i);
}
{
  if (Module["noExitRuntime"]) noExitRuntime = Module["noExitRuntime"];
  if (Module["print"]) out = Module["print"];
  if (Module["printErr"]) err = Module["printErr"];
  if (Module["arguments"]) programArgs = Module["arguments"];
  if (Module["thisProgram"]) thisProgram = Module["thisProgram"];
  var preInit = Module["preInit"];
  if (preInit) {
    if (typeof preInit == "function") Module["preInit"] = preInit = [preInit];
    while (preInit.length > 0) {
      preInit.shift()();
    }
  }
}
Module["callMain"] = callMain;
Module["addRunDependency"] = addRunDependency;
Module["removeRunDependency"] = removeRunDependency;
Module["ccall"] = ccall;
Module["cwrap"] = cwrap;
Module["requestFullscreen"] = requestFullscreen;
Module["FS_preloadFile"] = FS_preloadFile;
Module["FS_unlink"] = FS_unlink;
Module["FS_createPath"] = FS_createPath;
Module["FS_createDevice"] = FS_createDevice;
Module["FS"] = FS;
Module["FS_createDataFile"] = FS_createDataFile;
Module["FS_createLazyFile"] = FS_createLazyFile;
var ASM_CONSTS = {
  323160: () => {
    try {
      if (typeof Module !== "undefined" && Module["SCPCB_DEBUG"]) return 1;
      if (
        typeof location !== "undefined" &&
        /[?&]debug=1/.test(location.search)
      )
        return 1;
    } catch (e) {}
    return 0;
  },
  323347: ($0) => {
    console.log("[bbEx] " + UTF8ToString($0) + "\n" + new Error().stack);
  },
  323417: ($0) => {
    try {
      navigator.clipboard.writeText(UTF8ToString($0));
    } catch (e) {}
  },
  323491: () =>
    typeof window !== "undefined" && window.innerWidth ? window.innerWidth : 0,
  323568: () =>
    typeof window !== "undefined" && window.innerHeight
      ? window.innerHeight
      : 0,
  323647: () =>
    typeof Asyncify !== "undefined" && Asyncify.state !== 0 ? 1 : 0,
  323725: ($0) => {
    var str =
      UTF8ToString($0) + "\n\n" + "Abort/Retry/Ignore/AlwaysIgnore? [ariA] :";
    var reply = window.prompt(str, "i");
    if (reply === null) {
      reply = "i";
    }
    return allocate(intArrayFromString(reply), "i8", ALLOC_NORMAL);
  },
  323950: () => {
    if (typeof AudioContext !== "undefined") {
      return true;
    } else if (typeof webkitAudioContext !== "undefined") {
      return true;
    }
    return false;
  },
  324097: () => {
    if (
      typeof navigator.mediaDevices !== "undefined" &&
      typeof navigator.mediaDevices.getUserMedia !== "undefined"
    ) {
      return true;
    } else if (typeof navigator.webkitGetUserMedia !== "undefined") {
      return true;
    }
    return false;
  },
  324331: ($0) => {
    if (typeof Module["SDL2"] === "undefined") {
      Module["SDL2"] = {};
    }
    var SDL2 = Module["SDL2"];
    if (!$0) {
      SDL2.audio = {};
    } else {
      SDL2.capture = {};
    }
    if (!SDL2.audioContext) {
      if (typeof AudioContext !== "undefined") {
        SDL2.audioContext = new AudioContext();
      } else if (typeof webkitAudioContext !== "undefined") {
        SDL2.audioContext = new webkitAudioContext();
      }
      if (SDL2.audioContext) {
        autoResumeAudioContext(SDL2.audioContext);
      }
    }
    return SDL2.audioContext === undefined ? -1 : 0;
  },
  324824: () => {
    var SDL2 = Module["SDL2"];
    return SDL2.audioContext.sampleRate;
  },
  324892: ($0, $1, $2, $3) => {
    var SDL2 = Module["SDL2"];
    var have_microphone = function (stream) {
      if (SDL2.capture.silenceTimer !== undefined) {
        clearTimeout(SDL2.capture.silenceTimer);
        SDL2.capture.silenceTimer = undefined;
      }
      SDL2.capture.mediaStreamNode =
        SDL2.audioContext.createMediaStreamSource(stream);
      SDL2.capture.scriptProcessorNode =
        SDL2.audioContext.createScriptProcessor($1, $0, 1);
      SDL2.capture.scriptProcessorNode.onaudioprocess = function (
        audioProcessingEvent,
      ) {
        if (SDL2 === undefined || SDL2.capture === undefined) {
          return;
        }
        audioProcessingEvent.outputBuffer.getChannelData(0).fill(0);
        SDL2.capture.currentCaptureBuffer = audioProcessingEvent.inputBuffer;
        dynCall("vi", $2, [$3]);
      };
      SDL2.capture.mediaStreamNode.connect(SDL2.capture.scriptProcessorNode);
      SDL2.capture.scriptProcessorNode.connect(SDL2.audioContext.destination);
      SDL2.capture.stream = stream;
    };
    var no_microphone = function (error) {};
    SDL2.capture.silenceBuffer = SDL2.audioContext.createBuffer(
      $0,
      $1,
      SDL2.audioContext.sampleRate,
    );
    SDL2.capture.silenceBuffer.getChannelData(0).fill(0);
    var silence_callback = function () {
      SDL2.capture.currentCaptureBuffer = SDL2.capture.silenceBuffer;
      dynCall("vi", $2, [$3]);
    };
    SDL2.capture.silenceTimer = setTimeout(
      silence_callback,
      ($1 / SDL2.audioContext.sampleRate) * 1e3,
    );
    if (
      navigator.mediaDevices !== undefined &&
      navigator.mediaDevices.getUserMedia !== undefined
    ) {
      navigator.mediaDevices
        .getUserMedia({ audio: true, video: false })
        .then(have_microphone)
        .catch(no_microphone);
    } else if (navigator.webkitGetUserMedia !== undefined) {
      navigator.webkitGetUserMedia(
        { audio: true, video: false },
        have_microphone,
        no_microphone,
      );
    }
  },
  326544: ($0, $1, $2, $3) => {
    var SDL2 = Module["SDL2"];
    SDL2.audio.scriptProcessorNode = SDL2.audioContext["createScriptProcessor"](
      $1,
      0,
      $0,
    );
    SDL2.audio.scriptProcessorNode["onaudioprocess"] = function (e) {
      if (SDL2 === undefined || SDL2.audio === undefined) {
        return;
      }
      SDL2.audio.currentOutputBuffer = e["outputBuffer"];
      dynCall("vi", $2, [$3]);
    };
    SDL2.audio.scriptProcessorNode["connect"](SDL2.audioContext["destination"]);
  },
  326954: ($0, $1) => {
    var SDL2 = Module["SDL2"];
    var numChannels = SDL2.capture.currentCaptureBuffer.numberOfChannels;
    for (var c = 0; c < numChannels; ++c) {
      var channelData = SDL2.capture.currentCaptureBuffer.getChannelData(c);
      if (channelData.length != $1) {
        throw (
          "Web Audio capture buffer length mismatch! Destination size: " +
          channelData.length +
          " samples vs expected " +
          $1 +
          " samples!"
        );
      }
      if (numChannels == 1) {
        for (var j = 0; j < $1; ++j) {
          setValue($0 + j * 4, channelData[j], "float");
        }
      } else {
        for (var j = 0; j < $1; ++j) {
          setValue($0 + (j * numChannels + c) * 4, channelData[j], "float");
        }
      }
    }
  },
  327559: ($0, $1) => {
    var SDL2 = Module["SDL2"];
    var numChannels = SDL2.audio.currentOutputBuffer["numberOfChannels"];
    for (var c = 0; c < numChannels; ++c) {
      var channelData = SDL2.audio.currentOutputBuffer["getChannelData"](c);
      if (channelData.length != $1) {
        throw (
          "Web Audio output buffer length mismatch! Destination size: " +
          channelData.length +
          " samples vs expected " +
          $1 +
          " samples!"
        );
      }
      for (var j = 0; j < $1; ++j) {
        channelData[j] = HEAPF32[($0 + ((j * numChannels + c) << 2)) >> 2];
      }
    }
  },
  328039: ($0) => {
    var SDL2 = Module["SDL2"];
    if ($0) {
      if (SDL2.capture.silenceTimer !== undefined) {
        clearTimeout(SDL2.capture.silenceTimer);
      }
      if (SDL2.capture.stream !== undefined) {
        var tracks = SDL2.capture.stream.getAudioTracks();
        for (var i = 0; i < tracks.length; i++) {
          SDL2.capture.stream.removeTrack(tracks[i]);
        }
        SDL2.capture.stream = undefined;
      }
      if (SDL2.capture.scriptProcessorNode !== undefined) {
        SDL2.capture.scriptProcessorNode.onaudioprocess = function (
          audioProcessingEvent,
        ) {};
        SDL2.capture.scriptProcessorNode.disconnect();
        SDL2.capture.scriptProcessorNode = undefined;
      }
      if (SDL2.capture.mediaStreamNode !== undefined) {
        SDL2.capture.mediaStreamNode.disconnect();
        SDL2.capture.mediaStreamNode = undefined;
      }
      if (SDL2.capture.silenceBuffer !== undefined) {
        SDL2.capture.silenceBuffer = undefined;
      }
      SDL2.capture = undefined;
    } else {
      if (SDL2.audio.scriptProcessorNode != undefined) {
        SDL2.audio.scriptProcessorNode.disconnect();
        SDL2.audio.scriptProcessorNode = undefined;
      }
      SDL2.audio = undefined;
    }
    if (
      SDL2.audioContext !== undefined &&
      SDL2.audio === undefined &&
      SDL2.capture === undefined
    ) {
      SDL2.audioContext.close();
      SDL2.audioContext = undefined;
    }
  },
  329211: ($0, $1, $2) => {
    var w = $0;
    var h = $1;
    var pixels = $2;
    if (!Module["SDL2"]) Module["SDL2"] = {};
    var SDL2 = Module["SDL2"];
    if (SDL2.ctxCanvas !== Module["canvas"]) {
      SDL2.ctx = Module["createContext"](Module["canvas"], false, true);
      SDL2.ctxCanvas = Module["canvas"];
    }
    if (SDL2.w !== w || SDL2.h !== h || SDL2.imageCtx !== SDL2.ctx) {
      SDL2.image = SDL2.ctx.createImageData(w, h);
      SDL2.w = w;
      SDL2.h = h;
      SDL2.imageCtx = SDL2.ctx;
    }
    var data = SDL2.image.data;
    var src = pixels >> 2;
    var dst = 0;
    var num;
    if (
      typeof CanvasPixelArray !== "undefined" &&
      data instanceof CanvasPixelArray
    ) {
      num = data.length;
      while (dst < num) {
        var val = HEAP32[src];
        data[dst] = val & 255;
        data[dst + 1] = (val >> 8) & 255;
        data[dst + 2] = (val >> 16) & 255;
        data[dst + 3] = 255;
        src++;
        dst += 4;
      }
    } else {
      if (SDL2.data32Data !== data) {
        SDL2.data32 = new Int32Array(data.buffer);
        SDL2.data8 = new Uint8Array(data.buffer);
        SDL2.data32Data = data;
      }
      var data32 = SDL2.data32;
      num = data32.length;
      data32.set(HEAP32.subarray(src, src + num));
      var data8 = SDL2.data8;
      var i = 3;
      var j = i + 4 * num;
      if (num % 8 == 0) {
        while (i < j) {
          data8[i] = 255;
          i = (i + 4) | 0;
          data8[i] = 255;
          i = (i + 4) | 0;
          data8[i] = 255;
          i = (i + 4) | 0;
          data8[i] = 255;
          i = (i + 4) | 0;
          data8[i] = 255;
          i = (i + 4) | 0;
          data8[i] = 255;
          i = (i + 4) | 0;
          data8[i] = 255;
          i = (i + 4) | 0;
          data8[i] = 255;
          i = (i + 4) | 0;
        }
      } else {
        while (i < j) {
          data8[i] = 255;
          i = (i + 4) | 0;
        }
      }
    }
    SDL2.ctx.putImageData(SDL2.image, 0, 0);
  },
  330680: ($0, $1, $2, $3, $4) => {
    var w = $0;
    var h = $1;
    var hot_x = $2;
    var hot_y = $3;
    var pixels = $4;
    var canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    var ctx = canvas.getContext("2d");
    var image = ctx.createImageData(w, h);
    var data = image.data;
    var src = pixels >> 2;
    var dst = 0;
    var num;
    if (
      typeof CanvasPixelArray !== "undefined" &&
      data instanceof CanvasPixelArray
    ) {
      num = data.length;
      while (dst < num) {
        var val = HEAP32[src];
        data[dst] = val & 255;
        data[dst + 1] = (val >> 8) & 255;
        data[dst + 2] = (val >> 16) & 255;
        data[dst + 3] = (val >> 24) & 255;
        src++;
        dst += 4;
      }
    } else {
      var data32 = new Int32Array(data.buffer);
      num = data32.length;
      data32.set(HEAP32.subarray(src, src + num));
    }
    ctx.putImageData(image, 0, 0);
    var url =
      hot_x === 0 && hot_y === 0
        ? "url(" + canvas.toDataURL() + "), auto"
        : "url(" + canvas.toDataURL() + ") " + hot_x + " " + hot_y + ", auto";
    var urlBuf = _malloc(url.length + 1);
    stringToUTF8(url, urlBuf, url.length + 1);
    return urlBuf;
  },
  331669: ($0) => {
    if (Module["canvas"]) {
      Module["canvas"].style["cursor"] = UTF8ToString($0);
    }
  },
  331752: () => {
    if (Module["canvas"]) {
      Module["canvas"].style["cursor"] = "none";
    }
  },
  331821: () => window.innerWidth,
  331851: () => window.innerHeight,
  331882: ($0) => {
    try {
      console.log(
        "[fd] streams=" +
          FS.streams.filter(function (s) {
            return s;
          }).length +
          " cwd=" +
          FS.cwd(),
      );
    } catch (e) {}
    try {
      console.log("[fd] exists=" + FS.analyzePath(UTF8ToString($0)).exists);
    } catch (e) {}
    try {
      var d = FS.readdir("/GFX/NPCs");
      console.log(
        "[fd] dir066=" +
          d
            .filter(function (n) {
              return n.indexOf("066") >= 0;
            })
            .join(","),
      );
    } catch (e) {
      console.log("[fd] readdir fail: " + e);
    }
  },
};
function __asyncjs__bbClipboardReadJS() {
  return Asyncify.handleAsync(async () => {
    try {
      var text = await navigator.clipboard.readText();
      var len = lengthBytesUTF8(text) + 1;
      var ptr = _malloc(len);
      stringToUTF8(text, ptr, len);
      return ptr;
    } catch (e) {
      return 0;
    }
  });
}
function bbgpu_movie_open(data, len) {
  if (!Module.bbMovies) Module.bbMovies = {};
  if (!Module.bbMovieNextId) Module.bbMovieNextId = 1;
  var id = Module.bbMovieNextId++;
  var bytes = HEAPU8.slice(data, data + len);
  var blob = new Blob([bytes], { type: "video/webm" });
  var url = URL.createObjectURL(blob);
  var video = document.createElement("video");
  video.muted = true;
  video.playsInline = true;
  video.preload = "auto";
  video.src = url;
  Module.bbMovies[id] = { video, url, canvas: null, ctx: null };
  return id;
}
function bbgpu_movie_ready(id) {
  var m = Module.bbMovies[id];
  if (!m) return -1;
  if (m.video.error) return -1;
  return m.video.readyState >= 2 ? 1 : 0;
}
function bbgpu_movie_width(id) {
  var m = Module.bbMovies[id];
  return m ? m.video.videoWidth | 0 : 0;
}
function bbgpu_movie_height(id) {
  var m = Module.bbMovies[id];
  return m ? m.video.videoHeight | 0 : 0;
}
function bbgpu_movie_play(id) {
  var m = Module.bbMovies[id];
  if (m) m.video.play().catch(function () {});
}
function bbgpu_movie_ended(id) {
  var m = Module.bbMovies[id];
  if (!m) return 1;
  return m.video.ended || m.video.error ? 1 : 0;
}
function bbgpu_movie_grab(id, dst, w, h) {
  var m = Module.bbMovies[id];
  if (!m) return 0;
  if (!m.canvas) {
    m.canvas = document.createElement("canvas");
    m.canvas.width = w;
    m.canvas.height = h;
    m.ctx = m.canvas.getContext("2d", { willReadFrequently: true });
  }
  try {
    m.ctx.drawImage(m.video, 0, 0, w, h);
  } catch (e) {
    return 0;
  }
  var img = m.ctx.getImageData(0, 0, w, h).data;
  HEAPU8.set(img, dst);
  return 1;
}
function bbgpu_movie_close(id) {
  var m = Module.bbMovies[id];
  if (!m) return;
  m.video.pause();
  m.video.src = "";
  URL.revokeObjectURL(m.url);
  delete Module.bbMovies[id];
}
function __asyncjs__bbWebGPURafYield() {
  return Asyncify.handleAsync(async () => {
    await new Promise(function (r) {
      requestAnimationFrame(r);
    });
  });
}
var _main,
  _free,
  _malloc,
  _emwgpuCreateBindGroup,
  _emwgpuCreateBindGroupLayout,
  _emwgpuCreateCommandBuffer,
  _emwgpuCreateCommandEncoder,
  _emwgpuCreateComputePassEncoder,
  _emwgpuCreateComputePipeline,
  _emwgpuCreateExternalTexture,
  _emwgpuCreatePipelineLayout,
  _emwgpuCreateQuerySet,
  _emwgpuCreateRenderBundle,
  _emwgpuCreateRenderBundleEncoder,
  _emwgpuCreateRenderPassEncoder,
  _emwgpuCreateRenderPipeline,
  _emwgpuCreateSampler,
  _emwgpuCreateSurface,
  _emwgpuCreateTexture,
  _emwgpuCreateTextureView,
  _emwgpuCreateAdapter,
  _emwgpuImportBuffer,
  _emwgpuCreateDevice,
  _emwgpuCreateQueue,
  _emwgpuCreateShaderModule,
  _emwgpuOnDeviceLostCompleted,
  _emwgpuOnMapAsyncCompleted,
  _emwgpuOnRequestAdapterCompleted,
  _emwgpuOnRequestDeviceCompleted,
  _emwgpuOnUncapturedError,
  _emscripten_builtin_memalign,
  _memalign,
  _setThrew,
  __emscripten_tempret_set,
  __emscripten_stack_restore,
  __emscripten_stack_alloc,
  _emscripten_stack_get_current,
  ___cxa_decrement_exception_refcount,
  ___cxa_increment_exception_refcount,
  ___cxa_can_catch,
  ___cxa_get_exception_ptr,
  dynCall_v,
  dynCall_iiiiii,
  dynCall_viiiiii,
  dynCall_viii,
  dynCall_iiii,
  dynCall_ii,
  dynCall_i,
  dynCall_iii,
  dynCall_vi,
  dynCall_vii,
  dynCall_iiiiiii,
  dynCall_viiii,
  dynCall_vif,
  dynCall_idiii,
  dynCall_idii,
  dynCall_iiiii,
  dynCall_iiji,
  dynCall_iiiiiiji,
  dynCall_iji,
  dynCall_dii,
  dynCall_iiiiiiiii,
  dynCall_vifff,
  dynCall_viiiii,
  dynCall_fi,
  dynCall_iiifi,
  dynCall_iiiif,
  dynCall_iiiiiiiiii,
  dynCall_viiiiiiii,
  dynCall_iiiiiiii,
  dynCall_viiiiiiiiii,
  dynCall_fiii,
  dynCall_viiiiiiiiiii,
  dynCall_viiiifff,
  dynCall_viiiiiii,
  dynCall_viff,
  dynCall_viiiiiiiii,
  dynCall_jiji,
  dynCall_ji,
  dynCall_ifff,
  dynCall_iiifii,
  dynCall_iif,
  dynCall_di,
  dynCall_vifi,
  dynCall_iiiifi,
  dynCall_viffffff,
  dynCall_viiffii,
  dynCall_viji,
  dynCall_vffff,
  dynCall_vf,
  dynCall_vff,
  dynCall_vfi,
  dynCall_viif,
  dynCall_viffff,
  dynCall_vfff,
  dynCall_iidiiiii,
  dynCall_viijii,
  dynCall_iiiiiiiiiii,
  dynCall_jiiii,
  dynCall_iiiiiiiiiiiii,
  dynCall_diii,
  dynCall_iiiiiiiiiiii,
  dynCall_viiiiiiiiiiiiiii,
  dynCall_iiiiij,
  dynCall_iiiiid,
  dynCall_iiiiijj,
  dynCall_iiiiiijj,
  _asyncify_start_unwind,
  _asyncify_stop_unwind,
  _asyncify_start_rewind,
  _asyncify_stop_rewind,
  memory,
  __indirect_function_table,
  wasmMemory,
  wasmTable;
function assignWasmExports(wasmExports) {
  _main = Module["_main"] = wasmExports["Uf"];
  _free = wasmExports["Wf"];
  _malloc = wasmExports["Xf"];
  _emwgpuCreateBindGroup = wasmExports["Yf"];
  _emwgpuCreateBindGroupLayout = wasmExports["Zf"];
  _emwgpuCreateCommandBuffer = wasmExports["_f"];
  _emwgpuCreateCommandEncoder = wasmExports["$f"];
  _emwgpuCreateComputePassEncoder = wasmExports["ag"];
  _emwgpuCreateComputePipeline = wasmExports["bg"];
  _emwgpuCreateExternalTexture = wasmExports["cg"];
  _emwgpuCreatePipelineLayout = wasmExports["dg"];
  _emwgpuCreateQuerySet = wasmExports["eg"];
  _emwgpuCreateRenderBundle = wasmExports["fg"];
  _emwgpuCreateRenderBundleEncoder = wasmExports["gg"];
  _emwgpuCreateRenderPassEncoder = wasmExports["hg"];
  _emwgpuCreateRenderPipeline = wasmExports["ig"];
  _emwgpuCreateSampler = wasmExports["jg"];
  _emwgpuCreateSurface = wasmExports["kg"];
  _emwgpuCreateTexture = wasmExports["lg"];
  _emwgpuCreateTextureView = wasmExports["mg"];
  _emwgpuCreateAdapter = wasmExports["ng"];
  _emwgpuImportBuffer = wasmExports["og"];
  _emwgpuCreateDevice = wasmExports["pg"];
  _emwgpuCreateQueue = wasmExports["qg"];
  _emwgpuCreateShaderModule = wasmExports["rg"];
  _emwgpuOnDeviceLostCompleted = wasmExports["sg"];
  _emwgpuOnMapAsyncCompleted = wasmExports["tg"];
  _emwgpuOnRequestAdapterCompleted = wasmExports["ug"];
  _emwgpuOnRequestDeviceCompleted = wasmExports["vg"];
  _emwgpuOnUncapturedError = wasmExports["wg"];
  _emscripten_builtin_memalign = wasmExports["xg"];
  _memalign = wasmExports["yg"];
  _setThrew = wasmExports["zg"];
  __emscripten_tempret_set = wasmExports["Ag"];
  __emscripten_stack_restore = wasmExports["Bg"];
  __emscripten_stack_alloc = wasmExports["Cg"];
  _emscripten_stack_get_current = wasmExports["Dg"];
  ___cxa_decrement_exception_refcount = wasmExports["Eg"];
  ___cxa_increment_exception_refcount = wasmExports["Fg"];
  ___cxa_can_catch = wasmExports["Gg"];
  ___cxa_get_exception_ptr = wasmExports["Hg"];
  dynCall_v = dynCalls["v"] = wasmExports["Ig"];
  dynCall_iiiiii = dynCalls["iiiiii"] = wasmExports["Jg"];
  dynCall_viiiiii = dynCalls["viiiiii"] = wasmExports["Kg"];
  dynCall_viii = dynCalls["viii"] = wasmExports["Lg"];
  dynCall_iiii = dynCalls["iiii"] = wasmExports["Mg"];
  dynCall_ii = dynCalls["ii"] = wasmExports["Ng"];
  dynCall_i = dynCalls["i"] = wasmExports["Og"];
  dynCall_iii = dynCalls["iii"] = wasmExports["Pg"];
  dynCall_vi = dynCalls["vi"] = wasmExports["Qg"];
  dynCall_vii = dynCalls["vii"] = wasmExports["Rg"];
  dynCall_iiiiiii = dynCalls["iiiiiii"] = wasmExports["Sg"];
  dynCall_viiii = dynCalls["viiii"] = wasmExports["Tg"];
  dynCall_vif = dynCalls["vif"] = wasmExports["Ug"];
  dynCall_idiii = dynCalls["idiii"] = wasmExports["Vg"];
  dynCall_idii = dynCalls["idii"] = wasmExports["Wg"];
  dynCall_iiiii = dynCalls["iiiii"] = wasmExports["Xg"];
  dynCall_iiji = dynCalls["iiji"] = wasmExports["Yg"];
  dynCall_iiiiiiji = dynCalls["iiiiiiji"] = wasmExports["Zg"];
  dynCall_iji = dynCalls["iji"] = wasmExports["_g"];
  dynCall_dii = dynCalls["dii"] = wasmExports["$g"];
  dynCall_iiiiiiiii = dynCalls["iiiiiiiii"] = wasmExports["ah"];
  dynCall_vifff = dynCalls["vifff"] = wasmExports["bh"];
  dynCall_viiiii = dynCalls["viiiii"] = wasmExports["ch"];
  dynCall_fi = dynCalls["fi"] = wasmExports["dh"];
  dynCall_iiifi = dynCalls["iiifi"] = wasmExports["eh"];
  dynCall_iiiif = dynCalls["iiiif"] = wasmExports["fh"];
  dynCall_iiiiiiiiii = dynCalls["iiiiiiiiii"] = wasmExports["gh"];
  dynCall_viiiiiiii = dynCalls["viiiiiiii"] = wasmExports["hh"];
  dynCall_iiiiiiii = dynCalls["iiiiiiii"] = wasmExports["ih"];
  dynCall_viiiiiiiiii = dynCalls["viiiiiiiiii"] = wasmExports["jh"];
  dynCall_fiii = dynCalls["fiii"] = wasmExports["kh"];
  dynCall_viiiiiiiiiii = dynCalls["viiiiiiiiiii"] = wasmExports["lh"];
  dynCall_viiiifff = dynCalls["viiiifff"] = wasmExports["mh"];
  dynCall_viiiiiii = dynCalls["viiiiiii"] = wasmExports["nh"];
  dynCall_viff = dynCalls["viff"] = wasmExports["oh"];
  dynCall_viiiiiiiii = dynCalls["viiiiiiiii"] = wasmExports["ph"];
  dynCall_jiji = dynCalls["jiji"] = wasmExports["qh"];
  dynCall_ji = dynCalls["ji"] = wasmExports["rh"];
  dynCall_ifff = dynCalls["ifff"] = wasmExports["sh"];
  dynCall_iiifii = dynCalls["iiifii"] = wasmExports["th"];
  dynCall_iif = dynCalls["iif"] = wasmExports["uh"];
  dynCall_di = dynCalls["di"] = wasmExports["vh"];
  dynCall_vifi = dynCalls["vifi"] = wasmExports["wh"];
  dynCall_iiiifi = dynCalls["iiiifi"] = wasmExports["xh"];
  dynCall_viffffff = dynCalls["viffffff"] = wasmExports["yh"];
  dynCall_viiffii = dynCalls["viiffii"] = wasmExports["zh"];
  dynCall_viji = dynCalls["viji"] = wasmExports["Ah"];
  dynCall_vffff = dynCalls["vffff"] = wasmExports["Bh"];
  dynCall_vf = dynCalls["vf"] = wasmExports["Ch"];
  dynCall_vff = dynCalls["vff"] = wasmExports["Dh"];
  dynCall_vfi = dynCalls["vfi"] = wasmExports["Eh"];
  dynCall_viif = dynCalls["viif"] = wasmExports["Fh"];
  dynCall_viffff = dynCalls["viffff"] = wasmExports["Gh"];
  dynCall_vfff = dynCalls["vfff"] = wasmExports["Hh"];
  dynCall_iidiiiii = dynCalls["iidiiiii"] = wasmExports["Ih"];
  dynCall_viijii = dynCalls["viijii"] = wasmExports["Jh"];
  dynCall_iiiiiiiiiii = dynCalls["iiiiiiiiiii"] = wasmExports["Kh"];
  dynCall_jiiii = dynCalls["jiiii"] = wasmExports["Lh"];
  dynCall_iiiiiiiiiiiii = dynCalls["iiiiiiiiiiiii"] = wasmExports["Mh"];
  dynCall_diii = dynCalls["diii"] = wasmExports["Nh"];
  dynCall_iiiiiiiiiiii = dynCalls["iiiiiiiiiiii"] = wasmExports["Oh"];
  dynCall_viiiiiiiiiiiiiii = dynCalls["viiiiiiiiiiiiiii"] = wasmExports["Ph"];
  dynCall_iiiiij = dynCalls["iiiiij"] = wasmExports["Qh"];
  dynCall_iiiiid = dynCalls["iiiiid"] = wasmExports["Rh"];
  dynCall_iiiiijj = dynCalls["iiiiijj"] = wasmExports["Sh"];
  dynCall_iiiiiijj = dynCalls["iiiiiijj"] = wasmExports["Th"];
  _asyncify_start_unwind = wasmExports["Uh"];
  _asyncify_stop_unwind = wasmExports["Vh"];
  _asyncify_start_rewind = wasmExports["Wh"];
  _asyncify_stop_rewind = wasmExports["Xh"];
  memory = wasmMemory = wasmExports["Sf"];
  __indirect_function_table = wasmTable = wasmExports["Vf"];
}
var wasmImports = {
  u: ___assert_fail,
  gf: __asyncjs__bbClipboardReadJS,
  ff: __asyncjs__bbWebGPURafYield,
  q: ___cxa_begin_catch,
  t: ___cxa_end_catch,
  a: ___cxa_find_matching_catch_2,
  h: ___cxa_find_matching_catch_3,
  Rf: ___cxa_find_matching_catch_5,
  ab: ___cxa_rethrow,
  f: ___cxa_throw,
  Qf: ___cxa_uncaught_exceptions,
  c: ___resumeException,
  Pf: ___syscall_chdir,
  ga: ___syscall_fcntl64,
  Of: ___syscall_fstat64,
  Nf: ___syscall_getcwd,
  Mf: ___syscall_getdents64,
  Lf: ___syscall_ioctl,
  Kf: ___syscall_lstat64,
  Jf: ___syscall_mkdirat,
  If: ___syscall_newfstatat,
  $a: ___syscall_openat,
  Hf: ___syscall_readlinkat,
  Gf: ___syscall_renameat,
  _a: ___syscall_rmdir,
  Ff: ___syscall_stat64,
  Ef: ___syscall_unlinkat,
  Af: __abort_js,
  zf: __emscripten_throw_longjmp,
  yf: __localtime_js,
  xf: __mmap_js,
  wf: __munmap_js,
  vf: __tzset_js,
  uf: _alBufferData,
  tf: _alDeleteBuffers,
  sf: _alDeleteSources,
  rf: _alDistanceModel,
  qf: _alDopplerFactor,
  pf: _alGenBuffers,
  of: _alGenSources,
  A: _alGetError,
  S: _alGetSourcei,
  fa: _alListenerfv,
  Xa: _alSource3f,
  nf: _alSourcePause,
  ea: _alSourcePlay,
  mf: _alSourceQueueBuffers,
  Wa: _alSourceStop,
  Va: _alSourceUnqueueBuffers,
  L: _alSourcef,
  Ua: _alSourcefv,
  da: _alSourcei,
  lf: _alcCloseDevice,
  kf: _alcCreateContext,
  jf: _alcDestroyContext,
  Ta: _alcMakeContextCurrent,
  hf: _alcOpenDevice,
  ef: bbgpu_movie_close,
  Sa: bbgpu_movie_ended,
  df: bbgpu_movie_grab,
  cf: bbgpu_movie_height,
  bf: bbgpu_movie_open,
  af: bbgpu_movie_play,
  $e: bbgpu_movie_ready,
  _e: bbgpu_movie_width,
  Ze: _eglBindAPI,
  Ye: _eglChooseConfig,
  Xe: _eglCreateContext,
  We: _eglCreateWindowSurface,
  Ve: _eglDestroyContext,
  Ue: _eglDestroySurface,
  Te: _eglGetConfigAttrib,
  Se: _eglGetDisplay,
  Re: _eglGetError,
  Qe: _eglInitialize,
  Pe: _eglMakeCurrent,
  Oe: _eglQueryString,
  Ne: _eglSwapBuffers,
  Me: _eglSwapInterval,
  Le: _eglTerminate,
  Ke: _eglWaitGL,
  Je: _eglWaitNative,
  s: _emscripten_asm_const_int,
  v: _emscripten_asm_const_int_sync_on_main_thread,
  ca: _emscripten_async_call,
  Ra: _emscripten_date_now,
  Ie: _emscripten_exit_fullscreen,
  He: _emscripten_exit_pointerlock,
  K: _emscripten_get_device_pixel_ratio,
  C: _emscripten_get_element_css_size,
  Qa: _emscripten_get_gamepad_status,
  R: _emscripten_get_now,
  Ge: _emscripten_get_num_gamepads,
  Fe: _emscripten_get_screen_size,
  Ee: _emscripten_glActiveTexture,
  De: _emscripten_glAttachShader,
  Ce: _emscripten_glBeginQueryEXT,
  Be: _emscripten_glBindAttribLocation,
  Ae: _emscripten_glBindBuffer,
  ze: _emscripten_glBindFramebuffer,
  ye: _emscripten_glBindRenderbuffer,
  xe: _emscripten_glBindTexture,
  we: _emscripten_glBindVertexArrayOES,
  ve: _emscripten_glBlendColor,
  ue: _emscripten_glBlendEquation,
  te: _emscripten_glBlendEquationSeparate,
  se: _emscripten_glBlendFunc,
  re: _emscripten_glBlendFuncSeparate,
  qe: _emscripten_glBufferData,
  pe: _emscripten_glBufferSubData,
  oe: _emscripten_glCheckFramebufferStatus,
  ne: _emscripten_glClear,
  me: _emscripten_glClearColor,
  le: _emscripten_glClearDepthf,
  ke: _emscripten_glClearStencil,
  je: _emscripten_glClipControlEXT,
  ie: _emscripten_glColorMask,
  he: _emscripten_glCompileShader,
  ge: _emscripten_glCompressedTexImage2D,
  fe: _emscripten_glCompressedTexSubImage2D,
  ee: _emscripten_glCopyTexImage2D,
  de: _emscripten_glCopyTexSubImage2D,
  ce: _emscripten_glCreateProgram,
  be: _emscripten_glCreateShader,
  ae: _emscripten_glCullFace,
  $d: _emscripten_glDeleteBuffers,
  _d: _emscripten_glDeleteFramebuffers,
  Zd: _emscripten_glDeleteProgram,
  Yd: _emscripten_glDeleteQueriesEXT,
  Xd: _emscripten_glDeleteRenderbuffers,
  Wd: _emscripten_glDeleteShader,
  Vd: _emscripten_glDeleteTextures,
  Ud: _emscripten_glDeleteVertexArraysOES,
  Td: _emscripten_glDepthFunc,
  Sd: _emscripten_glDepthMask,
  Rd: _emscripten_glDepthRangef,
  Qd: _emscripten_glDetachShader,
  Pd: _emscripten_glDisable,
  Od: _emscripten_glDisableVertexAttribArray,
  Nd: _emscripten_glDrawArrays,
  Md: _emscripten_glDrawArraysInstancedANGLE,
  Ld: _emscripten_glDrawBuffersWEBGL,
  Kd: _emscripten_glDrawElements,
  Jd: _emscripten_glDrawElementsInstancedANGLE,
  Id: _emscripten_glEnable,
  Hd: _emscripten_glEnableVertexAttribArray,
  Gd: _emscripten_glEndQueryEXT,
  Fd: _emscripten_glFinish,
  Ed: _emscripten_glFlush,
  Dd: _emscripten_glFramebufferRenderbuffer,
  Cd: _emscripten_glFramebufferTexture2D,
  Bd: _emscripten_glFrontFace,
  Ad: _emscripten_glGenBuffers,
  zd: _emscripten_glGenFramebuffers,
  yd: _emscripten_glGenQueriesEXT,
  xd: _emscripten_glGenRenderbuffers,
  wd: _emscripten_glGenTextures,
  vd: _emscripten_glGenVertexArraysOES,
  ud: _emscripten_glGenerateMipmap,
  td: _emscripten_glGetActiveAttrib,
  sd: _emscripten_glGetActiveUniform,
  rd: _emscripten_glGetAttachedShaders,
  qd: _emscripten_glGetAttribLocation,
  pd: _emscripten_glGetBooleanv,
  od: _emscripten_glGetBufferParameteriv,
  nd: _emscripten_glGetError,
  md: _emscripten_glGetFloatv,
  ld: _emscripten_glGetFramebufferAttachmentParameteriv,
  kd: _emscripten_glGetIntegerv,
  jd: _emscripten_glGetProgramInfoLog,
  id: _emscripten_glGetProgramiv,
  hd: _emscripten_glGetQueryObjecti64vEXT,
  gd: _emscripten_glGetQueryObjectivEXT,
  fd: _emscripten_glGetQueryObjectui64vEXT,
  ed: _emscripten_glGetQueryObjectuivEXT,
  dd: _emscripten_glGetQueryivEXT,
  cd: _emscripten_glGetRenderbufferParameteriv,
  bd: _emscripten_glGetShaderInfoLog,
  ad: _emscripten_glGetShaderPrecisionFormat,
  $c: _emscripten_glGetShaderSource,
  _c: _emscripten_glGetShaderiv,
  Zc: _emscripten_glGetString,
  Yc: _emscripten_glGetTexParameterfv,
  Xc: _emscripten_glGetTexParameteriv,
  Wc: _emscripten_glGetUniformLocation,
  Vc: _emscripten_glGetUniformfv,
  Uc: _emscripten_glGetUniformiv,
  Tc: _emscripten_glGetVertexAttribPointerv,
  Sc: _emscripten_glGetVertexAttribfv,
  Rc: _emscripten_glGetVertexAttribiv,
  Qc: _emscripten_glHint,
  Pc: _emscripten_glIsBuffer,
  Oc: _emscripten_glIsEnabled,
  Nc: _emscripten_glIsFramebuffer,
  Mc: _emscripten_glIsProgram,
  Lc: _emscripten_glIsQueryEXT,
  Kc: _emscripten_glIsRenderbuffer,
  Jc: _emscripten_glIsShader,
  Ic: _emscripten_glIsTexture,
  Hc: _emscripten_glIsVertexArrayOES,
  Gc: _emscripten_glLineWidth,
  Fc: _emscripten_glLinkProgram,
  Ec: _emscripten_glPixelStorei,
  Dc: _emscripten_glPolygonModeWEBGL,
  Cc: _emscripten_glPolygonOffset,
  Bc: _emscripten_glPolygonOffsetClampEXT,
  Ac: _emscripten_glQueryCounterEXT,
  zc: _emscripten_glReadPixels,
  yc: _emscripten_glReleaseShaderCompiler,
  xc: _emscripten_glRenderbufferStorage,
  wc: _emscripten_glSampleCoverage,
  vc: _emscripten_glScissor,
  uc: _emscripten_glShaderBinary,
  tc: _emscripten_glShaderSource,
  sc: _emscripten_glStencilFunc,
  rc: _emscripten_glStencilFuncSeparate,
  qc: _emscripten_glStencilMask,
  pc: _emscripten_glStencilMaskSeparate,
  oc: _emscripten_glStencilOp,
  nc: _emscripten_glStencilOpSeparate,
  mc: _emscripten_glTexImage2D,
  lc: _emscripten_glTexParameterf,
  kc: _emscripten_glTexParameterfv,
  jc: _emscripten_glTexParameteri,
  ic: _emscripten_glTexParameteriv,
  hc: _emscripten_glTexSubImage2D,
  gc: _emscripten_glUniform1f,
  fc: _emscripten_glUniform1fv,
  ec: _emscripten_glUniform1i,
  dc: _emscripten_glUniform1iv,
  cc: _emscripten_glUniform2f,
  bc: _emscripten_glUniform2fv,
  ac: _emscripten_glUniform2i,
  $b: _emscripten_glUniform2iv,
  _b: _emscripten_glUniform3f,
  Zb: _emscripten_glUniform3fv,
  Yb: _emscripten_glUniform3i,
  Xb: _emscripten_glUniform3iv,
  Wb: _emscripten_glUniform4f,
  Vb: _emscripten_glUniform4fv,
  Ub: _emscripten_glUniform4i,
  Tb: _emscripten_glUniform4iv,
  Sb: _emscripten_glUniformMatrix2fv,
  Rb: _emscripten_glUniformMatrix3fv,
  Qb: _emscripten_glUniformMatrix4fv,
  Pb: _emscripten_glUseProgram,
  Ob: _emscripten_glValidateProgram,
  Nb: _emscripten_glVertexAttrib1f,
  Mb: _emscripten_glVertexAttrib1fv,
  Lb: _emscripten_glVertexAttrib2f,
  Kb: _emscripten_glVertexAttrib2fv,
  Jb: _emscripten_glVertexAttrib3f,
  Ib: _emscripten_glVertexAttrib3fv,
  Hb: _emscripten_glVertexAttrib4f,
  Gb: _emscripten_glVertexAttrib4fv,
  Fb: _emscripten_glVertexAttribDivisorANGLE,
  Eb: _emscripten_glVertexAttribPointer,
  Db: _emscripten_glViewport,
  ba: _emscripten_has_asyncify,
  Cb: _emscripten_request_fullscreen_strategy,
  Pa: _emscripten_request_pointerlock,
  Bb: _emscripten_resize_heap,
  Oa: _emscripten_sample_gamepad_data,
  Na: _emscripten_set_beforeunload_callback_on_thread,
  Ma: _emscripten_set_blur_callback_on_thread,
  J: _emscripten_set_canvas_element_size,
  aa: _emscripten_set_element_css_size,
  La: _emscripten_set_focus_callback_on_thread,
  Ka: _emscripten_set_fullscreenchange_callback_on_thread,
  Ja: _emscripten_set_gamepadconnected_callback_on_thread,
  Ia: _emscripten_set_gamepaddisconnected_callback_on_thread,
  Ha: _emscripten_set_keydown_callback_on_thread,
  Ga: _emscripten_set_keypress_callback_on_thread,
  Fa: _emscripten_set_keyup_callback_on_thread,
  Ea: _emscripten_set_mousedown_callback_on_thread,
  Da: _emscripten_set_mouseenter_callback_on_thread,
  Ca: _emscripten_set_mouseleave_callback_on_thread,
  Ba: _emscripten_set_mousemove_callback_on_thread,
  Aa: _emscripten_set_mouseup_callback_on_thread,
  za: _emscripten_set_pointerlockchange_callback_on_thread,
  ya: _emscripten_set_resize_callback_on_thread,
  xa: _emscripten_set_touchcancel_callback_on_thread,
  wa: _emscripten_set_touchend_callback_on_thread,
  va: _emscripten_set_touchmove_callback_on_thread,
  ua: _emscripten_set_touchstart_callback_on_thread,
  ta: _emscripten_set_visibilitychange_callback_on_thread,
  sa: _emscripten_set_wheel_callback_on_thread,
  Ab: _emscripten_set_window_title,
  F: _emscripten_sleep,
  zb: _emwgpuAdapterRequestDevice,
  yb: _emwgpuBufferGetConstMappedRange,
  xb: _emwgpuBufferMapAsync,
  wb: _emwgpuBufferUnmap,
  o: _emwgpuDelete,
  vb: _emwgpuDeviceCreateBuffer,
  ub: _emwgpuDeviceCreateShaderModule,
  tb: _emwgpuDeviceDestroy,
  sb: _emwgpuGetPreferredFormat,
  rb: _emwgpuInstanceRequestAdapter,
  Df: _environ_get,
  Cf: _environ_sizes_get,
  ra: _exit,
  T: _fd_close,
  Za: _fd_read,
  Bf: _fd_seek,
  Ya: _fd_write,
  qa: invoke_di,
  pa: invoke_diii,
  $: invoke_fiii,
  m: invoke_i,
  qb: invoke_idii,
  pb: invoke_idiii,
  ob: invoke_ifff,
  e: invoke_ii,
  b: invoke_iii,
  oa: invoke_iiifi,
  g: invoke_iiii,
  nb: invoke_iiiif,
  k: invoke_iiiii,
  r: invoke_iiiiii,
  y: invoke_iiiiiii,
  B: invoke_iiiiiiii,
  Q: invoke_iiiiiiiiiiii,
  mb: invoke_iiiiij,
  P: invoke_jiiii,
  l: invoke_v,
  j: invoke_vi,
  I: invoke_vif,
  d: invoke_vii,
  i: invoke_viii,
  n: invoke_viiii,
  p: invoke_viiiiii,
  w: invoke_viiiiiii,
  na: invoke_viiiiiiiii,
  z: invoke_viiiiiiiiii,
  _: invoke_viiiiiiiiiii,
  O: invoke_viiiiiiiiiiiiiii,
  x: invoke_viijii,
  N: _llvm_eh_typeid_for,
  Z: _wgpuCommandEncoderBeginRenderPass,
  lb: _wgpuCommandEncoderCopyTextureToBuffer,
  kb: _wgpuCommandEncoderCopyTextureToTexture,
  ma: _wgpuCommandEncoderFinish,
  Y: _wgpuDeviceCreateBindGroup,
  jb: _wgpuDeviceCreateBindGroupLayout,
  la: _wgpuDeviceCreateCommandEncoder,
  ib: _wgpuDeviceCreatePipelineLayout,
  X: _wgpuDeviceCreateRenderPipeline,
  ka: _wgpuDeviceCreateSampler,
  H: _wgpuDeviceCreateTexture,
  hb: _wgpuInstanceCreateSurface,
  ja: _wgpuQueueSubmit,
  G: _wgpuQueueWriteBuffer,
  gb: _wgpuQueueWriteTexture,
  W: _wgpuRenderPassEncoderDraw,
  fb: _wgpuRenderPassEncoderDrawIndexed,
  V: _wgpuRenderPassEncoderEnd,
  E: _wgpuRenderPassEncoderSetBindGroup,
  eb: _wgpuRenderPassEncoderSetIndexBuffer,
  M: _wgpuRenderPassEncoderSetPipeline,
  ia: _wgpuRenderPassEncoderSetScissorRect,
  U: _wgpuRenderPassEncoderSetVertexBuffer,
  db: _wgpuRenderPassEncoderSetViewport,
  cb: _wgpuSurfaceConfigure,
  ha: _wgpuSurfaceGetCurrentTexture,
  bb: _wgpuSurfaceUnconfigure,
  D: _wgpuTextureCreateView,
};
function invoke_iiii(index, a1, a2, a3) {
  var sp = stackSave();
  try {
    return dynCall_iiii(index, a1, a2, a3);
  } catch (e) {
    stackRestore(sp);
    if (!(e instanceof EmscriptenEH)) throw e;
    _setThrew(1, 0);
  }
}
function invoke_iiiiii(index, a1, a2, a3, a4, a5) {
  var sp = stackSave();
  try {
    return dynCall_iiiiii(index, a1, a2, a3, a4, a5);
  } catch (e) {
    stackRestore(sp);
    if (!(e instanceof EmscriptenEH)) throw e;
    _setThrew(1, 0);
  }
}
function invoke_ii(index, a1) {
  var sp = stackSave();
  try {
    return dynCall_ii(index, a1);
  } catch (e) {
    stackRestore(sp);
    if (!(e instanceof EmscriptenEH)) throw e;
    _setThrew(1, 0);
  }
}
function invoke_i(index) {
  var sp = stackSave();
  try {
    return dynCall_i(index);
  } catch (e) {
    stackRestore(sp);
    if (!(e instanceof EmscriptenEH)) throw e;
    _setThrew(1, 0);
  }
}
function invoke_iii(index, a1, a2) {
  var sp = stackSave();
  try {
    return dynCall_iii(index, a1, a2);
  } catch (e) {
    stackRestore(sp);
    if (!(e instanceof EmscriptenEH)) throw e;
    _setThrew(1, 0);
  }
}
function invoke_viii(index, a1, a2, a3) {
  var sp = stackSave();
  try {
    dynCall_viii(index, a1, a2, a3);
  } catch (e) {
    stackRestore(sp);
    if (!(e instanceof EmscriptenEH)) throw e;
    _setThrew(1, 0);
  }
}
function invoke_v(index) {
  var sp = stackSave();
  try {
    dynCall_v(index);
  } catch (e) {
    stackRestore(sp);
    if (!(e instanceof EmscriptenEH)) throw e;
    _setThrew(1, 0);
  }
}
function invoke_vi(index, a1) {
  var sp = stackSave();
  try {
    dynCall_vi(index, a1);
  } catch (e) {
    stackRestore(sp);
    if (!(e instanceof EmscriptenEH)) throw e;
    _setThrew(1, 0);
  }
}
function invoke_vii(index, a1, a2) {
  var sp = stackSave();
  try {
    dynCall_vii(index, a1, a2);
  } catch (e) {
    stackRestore(sp);
    if (!(e instanceof EmscriptenEH)) throw e;
    _setThrew(1, 0);
  }
}
function invoke_iiiiiii(index, a1, a2, a3, a4, a5, a6) {
  var sp = stackSave();
  try {
    return dynCall_iiiiiii(index, a1, a2, a3, a4, a5, a6);
  } catch (e) {
    stackRestore(sp);
    if (!(e instanceof EmscriptenEH)) throw e;
    _setThrew(1, 0);
  }
}
function invoke_vif(index, a1, a2) {
  var sp = stackSave();
  try {
    dynCall_vif(index, a1, a2);
  } catch (e) {
    stackRestore(sp);
    if (!(e instanceof EmscriptenEH)) throw e;
    _setThrew(1, 0);
  }
}
function invoke_idiii(index, a1, a2, a3, a4) {
  var sp = stackSave();
  try {
    return dynCall_idiii(index, a1, a2, a3, a4);
  } catch (e) {
    stackRestore(sp);
    if (!(e instanceof EmscriptenEH)) throw e;
    _setThrew(1, 0);
  }
}
function invoke_idii(index, a1, a2, a3) {
  var sp = stackSave();
  try {
    return dynCall_idii(index, a1, a2, a3);
  } catch (e) {
    stackRestore(sp);
    if (!(e instanceof EmscriptenEH)) throw e;
    _setThrew(1, 0);
  }
}
function invoke_iiiii(index, a1, a2, a3, a4) {
  var sp = stackSave();
  try {
    return dynCall_iiiii(index, a1, a2, a3, a4);
  } catch (e) {
    stackRestore(sp);
    if (!(e instanceof EmscriptenEH)) throw e;
    _setThrew(1, 0);
  }
}
function invoke_viiiiii(index, a1, a2, a3, a4, a5, a6) {
  var sp = stackSave();
  try {
    dynCall_viiiiii(index, a1, a2, a3, a4, a5, a6);
  } catch (e) {
    stackRestore(sp);
    if (!(e instanceof EmscriptenEH)) throw e;
    _setThrew(1, 0);
  }
}
function invoke_viiii(index, a1, a2, a3, a4) {
  var sp = stackSave();
  try {
    dynCall_viiii(index, a1, a2, a3, a4);
  } catch (e) {
    stackRestore(sp);
    if (!(e instanceof EmscriptenEH)) throw e;
    _setThrew(1, 0);
  }
}
function invoke_viiiiiiiii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9) {
  var sp = stackSave();
  try {
    dynCall_viiiiiiiii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9);
  } catch (e) {
    stackRestore(sp);
    if (!(e instanceof EmscriptenEH)) throw e;
    _setThrew(1, 0);
  }
}
function invoke_iiifi(index, a1, a2, a3, a4) {
  var sp = stackSave();
  try {
    return dynCall_iiifi(index, a1, a2, a3, a4);
  } catch (e) {
    stackRestore(sp);
    if (!(e instanceof EmscriptenEH)) throw e;
    _setThrew(1, 0);
  }
}
function invoke_iiiif(index, a1, a2, a3, a4) {
  var sp = stackSave();
  try {
    return dynCall_iiiif(index, a1, a2, a3, a4);
  } catch (e) {
    stackRestore(sp);
    if (!(e instanceof EmscriptenEH)) throw e;
    _setThrew(1, 0);
  }
}
function invoke_viiiiiiiiii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10) {
  var sp = stackSave();
  try {
    dynCall_viiiiiiiiii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10);
  } catch (e) {
    stackRestore(sp);
    if (!(e instanceof EmscriptenEH)) throw e;
    _setThrew(1, 0);
  }
}
function invoke_fiii(index, a1, a2, a3) {
  var sp = stackSave();
  try {
    return dynCall_fiii(index, a1, a2, a3);
  } catch (e) {
    stackRestore(sp);
    if (!(e instanceof EmscriptenEH)) throw e;
    _setThrew(1, 0);
  }
}
function invoke_viiiiiiiiiii(
  index,
  a1,
  a2,
  a3,
  a4,
  a5,
  a6,
  a7,
  a8,
  a9,
  a10,
  a11,
) {
  var sp = stackSave();
  try {
    dynCall_viiiiiiiiiii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11);
  } catch (e) {
    stackRestore(sp);
    if (!(e instanceof EmscriptenEH)) throw e;
    _setThrew(1, 0);
  }
}
function invoke_iiiiiiii(index, a1, a2, a3, a4, a5, a6, a7) {
  var sp = stackSave();
  try {
    return dynCall_iiiiiiii(index, a1, a2, a3, a4, a5, a6, a7);
  } catch (e) {
    stackRestore(sp);
    if (!(e instanceof EmscriptenEH)) throw e;
    _setThrew(1, 0);
  }
}
function invoke_ifff(index, a1, a2, a3) {
  var sp = stackSave();
  try {
    return dynCall_ifff(index, a1, a2, a3);
  } catch (e) {
    stackRestore(sp);
    if (!(e instanceof EmscriptenEH)) throw e;
    _setThrew(1, 0);
  }
}
function invoke_di(index, a1) {
  var sp = stackSave();
  try {
    return dynCall_di(index, a1);
  } catch (e) {
    stackRestore(sp);
    if (!(e instanceof EmscriptenEH)) throw e;
    _setThrew(1, 0);
  }
}
function invoke_viijii(index, a1, a2, a3, a4, a5) {
  var sp = stackSave();
  try {
    dynCall_viijii(index, a1, a2, a3, a4, a5);
  } catch (e) {
    stackRestore(sp);
    if (!(e instanceof EmscriptenEH)) throw e;
    _setThrew(1, 0);
  }
}
function invoke_iiiiij(index, a1, a2, a3, a4, a5) {
  var sp = stackSave();
  try {
    return dynCall_iiiiij(index, a1, a2, a3, a4, a5);
  } catch (e) {
    stackRestore(sp);
    if (!(e instanceof EmscriptenEH)) throw e;
    _setThrew(1, 0);
  }
}
function invoke_jiiii(index, a1, a2, a3, a4) {
  var sp = stackSave();
  try {
    return dynCall_jiiii(index, a1, a2, a3, a4);
  } catch (e) {
    stackRestore(sp);
    if (!(e instanceof EmscriptenEH)) throw e;
    _setThrew(1, 0);
    return 0n;
  }
}
function invoke_diii(index, a1, a2, a3) {
  var sp = stackSave();
  try {
    return dynCall_diii(index, a1, a2, a3);
  } catch (e) {
    stackRestore(sp);
    if (!(e instanceof EmscriptenEH)) throw e;
    _setThrew(1, 0);
  }
}
function invoke_viiiiiii(index, a1, a2, a3, a4, a5, a6, a7) {
  var sp = stackSave();
  try {
    dynCall_viiiiiii(index, a1, a2, a3, a4, a5, a6, a7);
  } catch (e) {
    stackRestore(sp);
    if (!(e instanceof EmscriptenEH)) throw e;
    _setThrew(1, 0);
  }
}
function invoke_iiiiiiiiiiii(
  index,
  a1,
  a2,
  a3,
  a4,
  a5,
  a6,
  a7,
  a8,
  a9,
  a10,
  a11,
) {
  var sp = stackSave();
  try {
    return dynCall_iiiiiiiiiiii(
      index,
      a1,
      a2,
      a3,
      a4,
      a5,
      a6,
      a7,
      a8,
      a9,
      a10,
      a11,
    );
  } catch (e) {
    stackRestore(sp);
    if (!(e instanceof EmscriptenEH)) throw e;
    _setThrew(1, 0);
  }
}
function invoke_viiiiiiiiiiiiiii(
  index,
  a1,
  a2,
  a3,
  a4,
  a5,
  a6,
  a7,
  a8,
  a9,
  a10,
  a11,
  a12,
  a13,
  a14,
  a15,
) {
  var sp = stackSave();
  try {
    dynCall_viiiiiiiiiiiiiii(
      index,
      a1,
      a2,
      a3,
      a4,
      a5,
      a6,
      a7,
      a8,
      a9,
      a10,
      a11,
      a12,
      a13,
      a14,
      a15,
    );
  } catch (e) {
    stackRestore(sp);
    if (!(e instanceof EmscriptenEH)) throw e;
    _setThrew(1, 0);
  }
}
function callMain(args = []) {
  var entryFunction = _main;
  args.unshift(thisProgram);
  var argc = args.length;
  var argv = stackAlloc((argc + 1) * 4);
  var argv_ptr = argv;
  for (var arg of args) {
    HEAPU32[argv_ptr >> 2] = stringToUTF8OnStack(arg);
    argv_ptr += 4;
  }
  HEAPU32[argv_ptr >> 2] = 0;
  try {
    var ret = entryFunction(argc, argv);
    exitJS(ret, true);
    return ret;
  } catch (e) {
    return handleException(e);
  }
}
async function run(args = programArgs) {
  preRun();
  if (runDependencies) {
    await resolveRunDependencies();
  }
  var setStatus = Module["setStatus"];
  if (setStatus) {
    setStatus("Running...");
    await new Promise((resolve) => setTimeout(resolve, 1));
    setTimeout(setStatus, 1, "");
  }
  if (ABORT) return;
  initRuntime();
  Module["onRuntimeInitialized"]?.();
  var noInitialRun = Module["noInitialRun"] || false;
  if (!noInitialRun) callMain(args);
  postRun();
}
var wasmExports;
createWasm().then(() => run());
