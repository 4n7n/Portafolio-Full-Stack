const NAVBAR_CACHE = 'navbar-v1';
const NAVBAR_ASSETS = [
    '/components/navbar.html',
    '/components/navbar-loader.html',
    '/assets/css/components/navbar.css',
    '/assets/css/utils/animations.css',
    '/assets/css/utils/responsive.css',
    '/assets/js/components/navbar.js',
    '/assets/js/components/mobile-menu.js',
    '/assets/js/components/scroll-navbar.js',
    '/assets/js/components/theme-switcher.js',
    '/assets/js/utils/dom-helpers.js',
    '/assets/js/utils/scroll-utils.js',
    '/assets/js/config/navigation-config.js'
];

// Install event - cache navbar assets
self.addEventListener('install', event => {
    console.log('🔄 Installing Navbar Service Worker...');
    
    event.waitUntil(
        caches.open(NAVBAR_CACHE)
            .then(cache => {
                console.log('📦 Caching navbar assets');
                return cache.addAll(NAVBAR_ASSETS);
            })
            .then(() => {
                console.log('✅ Navbar assets cached successfully');
                return self.skipWaiting();
            })
            .catch(error => {
                console.error('❌ Failed to cache navbar assets:', error);
            })
    );
});

// Activate event - cleanup old caches
self.addEventListener('activate', event => {
    console.log('🚀 Activating Navbar Service Worker...');
    
    event.waitUntil(
        caches.keys()
            .then(cacheNames => {
                return Promise.all(
                    cacheNames.map(cacheName => {
                        if (cacheName.startsWith('navbar-') && cacheName !== NAVBAR_CACHE) {
                            console.log('🗑️ Deleting old cache:', cacheName);
                            return caches.delete(cacheName);
                        }
                    })
                );
            })
            .then(() => {
                console.log('✅ Navbar Service Worker activated');
                return self.clients.claim();
            })
    );
});

// Fetch event - serve navbar from cache with network fallback
self.addEventListener('fetch', event => {
    const requestUrl = new URL(event.request.url);
    const isNavbarAsset = NAVBAR_ASSETS.some(asset => 
        requestUrl.pathname === asset || requestUrl.pathname.endsWith(asset)
    );
    
    if (isNavbarAsset) {
        event.respondWith(
            caches.match(event.request)
                .then(response => {
                    if (response) {
                        console.log('⚡ Serving navbar from cache:', requestUrl.pathname);
                        return response;
                    }
                    
                    console.log('🌐 Fetching navbar from network:', requestUrl.pathname);
                    return fetch(event.request)
                        .then(networkResponse => {
                            // Cache the network response for future use
                            if (networkResponse.ok) {
                                const responseClone = networkResponse.clone();
                                caches.open(NAVBAR_CACHE)
                                    .then(cache => {
                                        cache.put(event.request, responseClone);
                                    });
                            }
                            return networkResponse;
                        })
                        .catch(error => {
                            console.error('❌ Network fetch failed for:', requestUrl.pathname, error);
                            // Return offline fallback if available
                            return caches.match('/offline.html') || new Response('Offline');
                        });
                })
        );
    }
});

// Message event - handle messages from main thread
self.addEventListener('message', event => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        console.log('🔄 Skipping waiting...');
        self.skipWaiting();
    }
    
    if (event.data && event.data.type === 'GET_CACHE_STATUS') {
        caches.open(NAVBAR_CACHE)
            .then(cache => cache.keys())
            .then(keys => {
                event.ports[0].postMessage({
                    type: 'CACHE_STATUS',
                    cached: keys.length,
                    total: NAVBAR_ASSETS.length
                });
            });
    }
});

// Background sync for navbar updates
self.addEventListener('sync', event => {
    if (event.tag === 'navbar-update') {
        console.log('🔄 Background sync: updating navbar cache');
        
        event.waitUntil(
            caches.open(NAVBAR_CACHE)
                .then(cache => {
                    return Promise.all(
                        NAVBAR_ASSETS.map(asset => {
                            return fetch(asset)
                                .then(response => {
                                    if (response.ok) {
                                        return cache.put(asset, response);
                                    }
                                })
                                .catch(error => {
                                    console.warn('⚠️ Failed to update cache for:', asset, error);
                                });
                        })
                    );
                })
        );
    }
});

// Periodic background sync (if supported)
self.addEventListener('periodicsync', event => {
    if (event.tag === 'navbar-cache-refresh') {
        console.log('🔄 Periodic sync: refreshing navbar cache');
        
        event.waitUntil(
            caches.open(NAVBAR_CACHE)
                .then(cache => {
                    return Promise.all(
                        NAVBAR_ASSETS.map(asset => {
                            return fetch(asset, { cache: 'no-cache' })
                                .then(response => {
                                    if (response.ok) {
                                        return cache.put(asset, response);
                                    }
                                })
                                .catch(error => {
                                    console.warn('⚠️ Periodic refresh failed for:', asset, error);
                                });
                        })
                    );
                })
        );
    }
});