(function () {
  const overlay = document.createElement("div");
  overlay.id = "credits-overlay";
  overlay.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: black;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
    transition: opacity 1s ease-out;
  `;

  const creditsText = document.createElement("div");
  creditsText.textContent = "ported/ripped by sfools";
  creditsText.style.cssText = `
    font-family: 'Comic Sans MS', 'Comic Sans', cursive;
    color: white;
    font-size: 48px;
    text-align: center;
    background-color: transparent;
  `;

  overlay.appendChild(creditsText);
  document.body.appendChild(overlay);

  setTimeout(() => {
    overlay.style.opacity = "0";
    setTimeout(() => {
      overlay.remove();
    }, 1000);
  }, 2000);
})();
