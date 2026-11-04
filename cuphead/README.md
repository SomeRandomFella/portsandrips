# CupheadWEb
A web port of [Cuphead](https://store.steampowered.com/app/268910/Cuphead/), made by crackers.
If you use this on your own website/thing pls credit me!

---

# Known Issues
- cant beat the train boss thing
- helicopter size is bugged
- game crashes on run n' gun

---

# Prerequisites
## You need:
- Node.js

## How To Locally Host
1. Clone/download this repo
2. Go to the repo's directory in CMD/terminal
3. Paste in:
```bash
npx serve
```
4. Download the serve node package (if it asks you to) with the (Y) key
5. Open the link it gives you

The page loads 71 `Cuphead.data.partNNN` files and 2 `Cuphead.wasm.partNNN` files from `Build/`. Each part is at most 19,000,000 bytes. Serve the entire `Build/` directory together with `index.html`; no service worker is needed.
