const CACHE_NAME = 'solorico-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/index.css',
  '/script.js',
  '/manifest.json',
  '/Image/rural_bg.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});
