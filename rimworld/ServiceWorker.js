const cachePrefix = "Ludeon Studios-RimWorld by Ludeon Studios";

self.addEventListener('install', function (e) {
    console.log('[Service Worker] Install');
    
    e.waitUntil(self.skipWaiting());
});

self.addEventListener('activate', function (e) {
    e.waitUntil((async function () {
      const cacheKeys = await caches.keys();
      await Promise.all(cacheKeys
        .filter(key => key.startsWith(cachePrefix + "-"))
        .map(key => caches.delete(key)));
      await self.clients.claim();
    })());
});

