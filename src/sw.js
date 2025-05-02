const CACHE_NAME = 'stickynotes-v1';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './app.html',
  './about.html',
  './share.html',
  './css/main.css',
  './css/style.css',
  './css/app.css',
  './js/hello.js',
  './js/app/note.js',
  './js/app/note_options.js',
  './js/app/SETTINGS.js',
  './js/app/SETTINGS_export_notes.js',
  './js/share/share_svg_text_size.js',
  './js/share/share_svg_load_text.js',
  './img/icon.svg',
  './manifest.json'
];

// Install service worker and cache all assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(ASSETS_TO_CACHE))
  );
});

// Activate service worker and clean old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Fetch assets from cache or network
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }

        return fetch(event.request).then(response => {
          // Check if we received a valid response
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }

          const responseToCache = response.clone();
          caches.open(CACHE_NAME)
            .then(cache => {
              cache.put(event.request, responseToCache);
            });

          return response;
        });
      })
  );
});

// Periodic update check (every 24 hours)
setInterval(() => {
  if (navigator.onLine) {
    caches.delete(CACHE_NAME).then(() => {
      caches.open(CACHE_NAME).then(cache => {
        cache.addAll(ASSETS_TO_CACHE);
      });
    });
  }
}, 24 * 60 * 60 * 1000); // 24 hours in milliseconds