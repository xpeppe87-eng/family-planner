// Family Planner - Service Worker for Offline & Mobile PWA
const CACHE_NAME = 'family-planner-v3.0';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './style.css',
  './app.js',
  './appwrite-config.js',
  './appwrite-cloud.js',
  './manifest.json',
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
      return cache.addAll(ASSETS_TO_CACHE);
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
  // Only intercept GET requests
  if (e.request.method !== 'GET') {
    return;
  }

  const url = new URL(e.request.url);

  // NEVER intercept external origins (e.g. Appwrite, QR Code generator, Google Fonts, CDNs)
  if (url.origin !== self.location.origin) {
    return;
  }

  // Network-first for local server API requests
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

  // Network-first for application core scripts, HTML, and CSS
  // Ensures mobile devices immediately load the newest version, falling back to cache if offline
  const isCoreAsset = url.pathname.endsWith('.html') ||
                      url.pathname.endsWith('.js') ||
                      url.pathname.endsWith('.css') ||
                      url.pathname.endsWith('.json') ||
                      url.pathname === '/' ||
                      url.pathname.endsWith('/family-planner/') ||
                      url.pathname.endsWith('/family-planner');

  if (isCoreAsset) {
    e.respondWith(
      fetch(e.request).then((networkResponse) => {
        if (networkResponse && networkResponse.status === 200) {
          const toCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(e.request, toCache);
          });
        }
        return networkResponse;
      }).catch(() => {
        return caches.match(e.request).then((cached) => {
          return cached || caches.match('./index.html');
        });
      })
    );
    return;
  }

  // Cache-first for images, fonts and media
  e.respondWith(
    caches.match(e.request).then((cached) => {
      return cached || fetch(e.request).then((response) => {
        if (!response || response.status !== 200 || response.type !== 'basic') {
          return response;
        }
        const toCache = response.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(e.request, toCache);
        });
        return response;
      });
    })
  );
});
