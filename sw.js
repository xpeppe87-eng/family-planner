// Family Planner - Service Worker for Offline & Mobile PWA
const CACHE_NAME = 'family-planner-v2.2';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './style.css',
  './app.js',
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
  const url = new URL(e.request.url);

  // Network-first for API requests
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

  // Cache-first, fallback to network for static files
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
    }).catch(() => caches.match('./index.html'))
  );
});
