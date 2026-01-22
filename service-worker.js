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

/*const CACHE = "ricette-v2.7";

self.addEventListener("install", e => {
  self.skipWaiting();
  e.waitUntil(
    caches.open(CACHE).then(c =>
      c.addAll([".", "index.html", "style.css", "app.js"])
    )
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(names =>
      Promise.all(
        names.filter(n => n !== CACHE).map(n => caches.delete(n))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", e => {
  if (e.request.mode === "navigate") {
    e.respondWith(
      fetch(e.request)
        .then(r => {
          const clone = r.clone();
          caches.open(CACHE).then(c => c.put(e.request, clone));
          return r;
        })
        .catch(() => caches.match(e.request))
    );
    return;
  }

  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request))
  );
});*/


// service-worker.js
const CACHE = "ricette-v2.10"; // 🔑 CAMBIA SEMPRE QUESTO NUMERO

self.addEventListener("install", e => {
  console.log("[SW] Installing:", CACHE);
  self.skipWaiting(); // Non aspettare, attiva subito
  
  e.waitUntil(
    caches.open(CACHE).then(c =>
      c.addAll([
        "./",
        "./index.html",
        "./style.css",
        "./app.js"
      ]).catch(err => console.error("[SW] Cache failed:", err))
    )
  );
});

self.addEventListener("activate", e => {
  console.log("[SW] Activating:", CACHE);
  
  e.waitUntil(
    Promise.all([
      // Elimina TUTTE le vecchie cache
      caches.keys().then(keys =>
        Promise.all(
          keys.filter(k => k !== CACHE).map(k => {
            console.log("[SW] Deleting old cache:", k);
            return caches.delete(k);
          })
        )
      ),
      // Prendi controllo di tutte le pagine
      self.clients.claim()
    ])
  );
});

self.addEventListener("fetch", e => {
  const url = new URL(e.request.url);
  
  // Ignora richieste esterne
  if (url.origin !== location.origin) {
    return;
  }
  
  // ⚡ NETWORK FIRST per tutto (sempre la versione fresca)
  e.respondWith(
    fetch(e.request)
      .then(response => {
        // Salva in cache solo se è una risposta valida
        if (response && response.status === 200) {
          const clone = response.clone();
          caches.open(CACHE).then(c => c.put(e.request, clone));
        }
        return response;
      })
      .catch(() => {
        // Fallback alla cache solo se offline
        return caches.match(e.request);
      })
  );
});

// Ascolta messaggi per forzare l'aggiornamento
self.addEventListener("message", e => {
  if (e.data === "SKIP_WAITING") {
    self.skipWaiting();
  }
});


























