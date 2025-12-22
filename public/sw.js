// Service Worker for PWA
const CACHE_NAME = 'asset-share-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/home.html',
  '/register.html',
  '/css/style.css',
  '/js/config.js',
  '/js/auth.js',
  '/js/home.js',
  '/js/register.js',
  '/manifest.json'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
