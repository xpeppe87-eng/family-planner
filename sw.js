// Family Planner - Service Worker for Offline & Mobile PWA
const CACHE_NAME = 'family-planner-v3.2';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './style.css',
  './app.js',
  './appwrite.min.js',
  './appwrite-config.js',
  './appwrite-cloud.js',
  './manifest.json',
  './assets/icon-192.png',
  './assets/icon-512.png',
  './assets/logo_gold_gv.png',
  './assets/papa.png',
  './assets/mamma.png',
  './assets/luca.png',
  './assets/sofia.png',
  './assets/avatar_nonno.png',
  './assets/avatar_nonna.png',
  './assets/avatar_ragazzo.png',
  './assets/avatar_ragazza.png',
  './assets/avatar_bebe.png',
  './assets/avatar_pet.png'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      // Caching robusto: aggiunge ogni risorsa senza fallire l'intera installazione se un singolo file e' assente
      return Promise.all(
        ASSETS_TO_CACHE.map((url) => {
          return fetch(url).then((response) => {
            if (response && response.ok) {
              return cache.put(url, response);
            }
          }).catch((err) => {
            console.warn('Install SW cache skip:', url, err);
          });
        })
      );
    }).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  // Solo richieste GET
  if (e.request.method !== 'GET') {
    return;
  }

  const url = new URL(e.request.url);

  // Non intercettare origini esterne (Appwrite Cloud, CDNs, etc.)
  if (url.origin !== self.location.origin) {
    return;
  }

  // API del server locale: sempre da rete senza cache
  if (url.pathname.startsWith('/api/')) {
    e.respondWith(
      fetch(e.request).catch(() => {
        return new Response(JSON.stringify({ offline: true }), {
          headers: { 'Content-Type': 'application/json' }
        });
      })
    );
    return;
  }

  // Navigazione di pagine (HTML)
  if (e.request.mode === 'navigate') {
    e.respondWith(
      fetch(e.request).then((networkResponse) => {
        if (networkResponse && networkResponse.status === 200) {
          const toCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(e.request, toCache));
        }
        return networkResponse;
      }).catch(() => {
        return caches.match('./index.html').then((res) => res || caches.match('./'));
      })
    );
    return;
  }

  // Script, stili e JSON (Network-first con fallback a cache con ignoreSearch)
  const isCoreAsset = url.pathname.endsWith('.js') ||
                      url.pathname.endsWith('.css') ||
                      url.pathname.endsWith('.json') ||
                      url.pathname.endsWith('.html');

  if (isCoreAsset) {
    e.respondWith(
      fetch(e.request).then((networkResponse) => {
        if (networkResponse && networkResponse.status === 200) {
          const toCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(e.request, toCache));
        }
        return networkResponse;
      }).catch(() => {
        return caches.match(e.request, { ignoreSearch: true });
      })
    );
    return;
  }

  // Risorse statiche (immagini, icone, font): Cache-first con fallback a rete
  e.respondWith(
    caches.match(e.request, { ignoreSearch: true }).then((cached) => {
      return cached || fetch(e.request).then((response) => {
        if (response && response.status === 200 && response.type === 'basic') {
          const toCache = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(e.request, toCache));
        }
        return response;
      });
    })
  );
});
