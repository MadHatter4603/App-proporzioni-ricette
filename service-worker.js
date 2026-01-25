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

const CACHE = "ricette-v3.1"; // Incrementa
const STATIC_ASSETS = [
  "style.css",
  "app.js"
];

// INSTALL
self.addEventListener("install", event => {
  console.log('[SW] Installing version:', CACHE);
  self.skipWaiting(); // Forza l'attivazione immediata
  event.waitUntil(
    caches.open(CACHE).then(cache => {
      return cache.addAll(STATIC_ASSETS);
    })
  );
});

// ACTIVATE
self.addEventListener("activate", event => {
  console.log('[SW] Activating version:', CACHE);
  event.waitUntil(
    caches.keys().then(keys => {
      // Elimina TUTTE le cache vecchie
      return Promise.all(
        keys.map(key => {
          if (key !== CACHE) {
            console.log('[SW] Deleting old cache:', key);
            return caches.delete(key);
          }
        })
      );
    }).then(() => {
      console.log('[SW] Claiming clients');
      return self.clients.claim();
    }).then(() => {
      // Notifica tutti i client
      return self.clients.matchAll();
    }).then(clients => {
      clients.forEach(client => {
        console.log('[SW] Notifying client');
        client.postMessage({ type: "SW_UPDATED", version: CACHE });
      });
    })
  );
});

// FETCH
self.addEventListener("fetch", event => {
  const url = new URL(event.request.url);
  
  // HTML → SEMPRE dalla rete con no-cache
  if (event.request.mode === "navigate") {
    event.respondWith(
      fetch(event.request, { 
        cache: "no-store",
        headers: { 'Cache-Control': 'no-cache' }
      }).catch(() => caches.match("index.html"))
    );
    return;
  }
  
  // Service Worker stesso → MAI in cache
  if (url.pathname.includes("service-worker.js")) {
    event.respondWith(
      fetch(event.request, { 
        cache: "no-store",
        headers: { 'Cache-Control': 'no-cache' }
      })
    );
    return;
  }
  
  // Asset statici (CSS, JS) → Network-first con cache fallback
  if (url.pathname.endsWith('.css') || url.pathname.endsWith('.js')) {
    event.respondWith(
      fetch(event.request, { cache: "reload" })
        .then(response => {
          // Clona e salva in cache la nuova versione
          const responseClone = response.clone();
          caches.open(CACHE).then(cache => {
            cache.put(event.request, responseClone);
          });
          return response;
        })
        .catch(() => caches.match(event.request))
    );
    return;
  }
  
  // Altri asset → cache-first
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});


















