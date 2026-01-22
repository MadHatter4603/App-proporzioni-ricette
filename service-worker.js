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
const CACHE = "ricette-v2.7"; // 🔑 Incrementa SEMPRE questa versione ad ogni modifica

self.addEventListener("install", e => {
  console.log("[SW] Installing new version:", CACHE);
  self.skipWaiting(); // Attiva subito il nuovo SW
  
  e.waitUntil(
    caches.open(CACHE).then(c =>
      c.addAll([
        ".",
        "index.html",
        "style.css",
        "app.js",
        // aggiungi altri file statici se necessario
      ])
    )
  );
});

self.addEventListener("activate", event => {
  console.log("[SW] Activating new version:", CACHE);
  
  event.waitUntil(
    caches.keys().then(names => {
      // Elimina TUTTE le vecchie cache
      return Promise.all(
        names
          .filter(n => n !== CACHE)
          .map(n => {
            console.log("[SW] Deleting old cache:", n);
            return caches.delete(n);
          })
      );
    })
  );
  
  // Prendi controllo di tutte le pagine aperte SUBITO
  return self.clients.claim();
});

self.addEventListener("fetch", e => {
  // Strategia Network-First per la navigazione (HTML)
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
  
  // Strategia Network-First anche per CSS/JS (per avere sempre la versione fresca)
  if (e.request.url.endsWith('.css') || e.request.url.endsWith('.js')) {
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
  
  // Cache-First per il resto (immagini, font, ecc.)
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request))
  );
});
























