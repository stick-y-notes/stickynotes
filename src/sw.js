const CACHE_NAME = 'stickynotes-v3';
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
      .then(() => self.skipWaiting())
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
    }).then(() => {
      // Check for old service workers and unregister them
      return self.clients.claim();
    })
  );
});

// Fetch assets from cache or network
self.addEventListener('fetch', (event) => {
  // Check if this is a page navigation
  const isPageNavigation = event.request.mode === 'navigate';

  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // For page navigation, always try network first to get fresh content
        if (isPageNavigation) {
          return fetch(event.request)
            .then(networkResponse => {
              // Cache the new response
              const responseToCache = networkResponse.clone();
              caches.open(CACHE_NAME)
                .then(cache => {
                  cache.put(event.request, responseToCache);
                  // Trigger a full cache update
                  if (navigator.onLine) {
                    cache.addAll(ASSETS_TO_CACHE);
                  }
                });
              return networkResponse;
            })
            .catch(() => {
              // If network fails, fall back to cache
              return response || new Response('Offline - No cached version available');
            });
        }

        // For non-navigation requests, use cache-first strategy
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