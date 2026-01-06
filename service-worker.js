/**
 * Service Worker for Advanced Scientific Calculator
 * Enables offline functionality and caching
 */

const CACHE_NAME = 'scientific-calculator-v1';
const ASSETS_TO_CACHE = [
    '/',
    '/index.html',
    '/calculator.js',
    '/styles.css',
    '/manifest.json'
];

// Install event - cache essential assets
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            console.log('[Service Worker] Caching essential assets');
            return cache.addAll(ASSETS_TO_CACHE).catch(err => {
                console.log('[Service Worker] Cache error:', err);
                // Continue even if some assets fail to cache
                return Promise.resolve();
            });
        })
    );
    self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('[Service Worker] Deleting old cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
    self.clients.claim();
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', event => {
    // Skip non-GET requests
    if (event.request.method !== 'GET') {
        return;
    }

    // Handle HTML pages
    if (event.request.destination === 'document' || 
        event.request.mode === 'navigate' ||
        event.request.url.endsWith('/') ||
        event.request.url.includes('index.html')) {
        
        event.respondWith(
            caches.match(event.request).then(response => {
                // Serve from cache if available
                if (response) {
                    // Try to update cache in background
                    fetch(event.request)
                        .then(freshResponse => {
                            if (freshResponse && freshResponse.status === 200) {
                                caches.open(CACHE_NAME).then(cache => {
                                    cache.put(event.request, freshResponse);
                                });
                            }
                        })
                        .catch(() => {});
                    
                    return response;
                }
                
                // Fallback to network
                return fetch(event.request)
                    .then(networkResponse => {
                        // Cache successful responses
                        if (networkResponse && networkResponse.status === 200) {
                            const responseToCache = networkResponse.clone();
                            caches.open(CACHE_NAME).then(cache => {
                                cache.put(event.request, responseToCache);
                            });
                        }
                        return networkResponse;
                    })
                    .catch(error => {
                        console.log('[Service Worker] Fetch failed:', error);
                        // Return cached version if network fails
                        return caches.match(event.request);
                    });
            })
        );
        return;
    }

    // For CSS, JS, and other assets - cache first
    event.respondWith(
        caches.match(event.request).then(response => {
            if (response) {
                return response;
            }

            return fetch(event.request)
                .then(networkResponse => {
                    // Don't cache non-successful responses
                    if (!networkResponse || networkResponse.status !== 200 || networkResponse.type === 'error') {
                        return networkResponse;
                    }

                    // Cache successful responses
                    const responseToCache = networkResponse.clone();
                    caches.open(CACHE_NAME).then(cache => {
                        cache.put(event.request, responseToCache);
                    });

                    return networkResponse;
                })
                .catch(error => {
                    console.log('[Service Worker] Asset fetch failed:', error);
                    // Return cached version if available
                    return caches.match(event.request);
                });
        })
    );
});

// Background sync (optional - for future enhancement)
self.addEventListener('sync', event => {
    if (event.tag === 'sync-calculations') {
        event.waitUntil(
            // Sync calculations if needed
            Promise.resolve()
        );
    }
});

// Message handler for cache management
self.addEventListener('message', event => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
    
    if (event.data && event.data.type === 'CLEAR_CACHE') {
        caches.delete(CACHE_NAME).then(() => {
            event.ports[0].postMessage({ success: true });
        });
    }
});
