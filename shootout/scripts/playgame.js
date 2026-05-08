"use strict";

(function () {
  var gameStarted = false;

  window.PlayGame = {
    init: function () {
      PlayGame.preventPageScrolling();
      // Skip keepAlive (requires server) and frame check - just start the game
      PlayGame.startGame();
    },

    // Last step to load the game, includes required scripts
    startGame: function () {
      if (gameStarted === true) return;

      let promiseArray = [];
      for (let i = 0; i < constructNet_scriptURLs.length; i++) {
        promiseArray.push(PlayGame.addScript(constructNet_scriptURLs[i]));
      }

      Promise.all(promiseArray).then(function (values) {
        if (constructNet_madeInC2) {
          jQuery(document).ready(function () {
            cr_createRuntime("c2canvas");
          });
          document.addEventListener(
            "visibilitychange",
            PlayGame.c2onVisibilityChanged,
            false,
          );
          document.addEventListener(
            "mozvisibilitychange",
            PlayGame.c2onVisibilityChanged,
            false,
          );
          document.addEventListener(
            "webkitvisibilitychange",
            PlayGame.c2onVisibilityChanged,
            false,
          );
          document.addEventListener(
            "msvisibilitychange",
            PlayGame.c2onVisibilityChanged,
            false,
          );
        }

        gameStarted = true;
      });
    },

    c2onVisibilityChanged: function () {
      if (
        document.hidden ||
        document.mozHidden ||
        document.webkitHidden ||
        document.msHidden
      )
        cr_setSuspended(true);
      else cr_setSuspended(false);
    },

    addScript: function (src) {
      return new Promise(function (resolve, reject) {
        const s = document.createElement("script");
        s.setAttribute("src", src);
        s.onload = resolve;
        s.onerror = reject;
        s.async = false;
        document.body.appendChild(s);
      });
    },

    preventPageScrolling: function () {
      document.addEventListener("keydown", function (event) {
        if (
          event.target &&
          event.target.tagName &&
          ["input", "textarea", "datalist", "select"].includes(
            event.target.tagName.toLowerCase(),
          )
        ) {
          return;
        }
        if (
          ["ArrowLeft", "ArrowUp", "ArrowRight", "ArrowDown"].includes(
            event.key,
          )
        ) {
          event.preventDefault();
        }
      });

      document.oncontextmenu = function (event) {
        if (event.preventDefault !== undefined) event.preventDefault();
        if (event.stopPropagation !== undefined) event.stopPropagation();
      };

      document.addEventListener(
        "mousewheel",
        function (event) {
          event.preventDefault();
        },
        { passive: false },
      );
    },
  };

  PlayGame.init();
})();
