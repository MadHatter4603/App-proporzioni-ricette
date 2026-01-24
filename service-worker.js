/*const CACHE = "ricette-v2.7";

self.addEventListener("install", e => {
  e.waitUntil(
    caches.open(CACHE).then(c =>
      c.addAll([".", "index.html", "style.css", "app.js"])
    )
  );
});

self.addEventListener("fetch", e => {
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request))
  );
});*/

const CACHE = "ricette-v2.13"; // Incrementa la versione ad ogni nuova release/modifica
const STATIC_ASSETS = [
  "style.css",
  "app.js"
];

// INSTALL
self.addEventListener("install", event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE).then(cache => {
      return cache.addAll(STATIC_ASSETS);
    })
  );
});

// ACTIVATE
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys
          .filter(key => key !== CACHE)
          .map(key => caches.delete(key))
      );
    }).then(() => {
      // Notifica tutti i client che il nuovo SW è attivo
      return self.clients.matchAll();
    }).then(clients => {
      clients.forEach(client => client.postMessage({ type: "SW_UPDATED" }));
    })
  );
  self.clients.claim();
});

// FETCH
self.addEventListener("fetch", event => {
  // HTML → SEMPRE dalla rete
  if (event.request.mode === "navigate") {
    event.respondWith(
      fetch(event.request, { cache: "no-store" })
        .catch(() => caches.match("index.html"))
    );
    return;
  }
  
  // Service Worker stesso → sempre aggiornato
  if (event.request.url.includes("service-worker.js")) {
    event.respondWith(fetch(event.request, { cache: "no-store" }));
    return;
  }
  
  // Asset statici → cache-first
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});








