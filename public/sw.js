this.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open('your-cache-name').then((cache) => {
            return cache.addAll([
                "/App.jsx",
                "/main.jsx",
                "/index.html", // This will be used as the fallback page
                "/vite.svg",
                "/components/Cart.jsx",
                "/components/Favorites.jsx",
                "/components/Header.jsx",
                "/components/UserConnect.jsx",
                "/assets/1579788831872.jpeg",
            ]);
        })
    );
});

this.addEventListener('fetch', (event) => {
    console.log('Fetching:', event.request.url);

    event.respondWith(
        caches.match(event.request) // Check if the request is cached
            .then((cachedResponse) => {
                if (cachedResponse) {
                    // If found in cache, return it
                    console.log(`Serving ${event.request.url} from cache`);
                    return cachedResponse;
                }

                // Otherwise, try fetching from the network
                return fetch(event.request)
                    .then((networkResponse) => {
                        if (!networkResponse || networkResponse.status !== 200 || networkResponse.type === 'opaque') {
                            console.error(`Invalid response for ${event.request.url}:`, networkResponse);
                            return networkResponse; // Return even if it's invalid
                        }

                        // Clone the response and cache it for future requests
                        const responseClone = networkResponse.clone();
                        caches.open('your-cache-name').then((cache) => {
                            cache.put(event.request, responseClone);
                        });

                        return networkResponse;
                    })
                    .catch((error) => {
                        // Fetch failed, serve a fallback from cache
                        console.error('Fetch failed, returning fallback:', error);

                        // You can serve a fallback cached page (like index.html)
                        return caches.match('/index.html')
                            .then((fallbackResponse) => {
                                if (fallbackResponse) {
                                    return fallbackResponse;
                                } else {
                                    console.error('Fallback resource not found in cache.');
                                    return new Response('Network error and no fallback available.', {
                                        status: 503,
                                        statusText: 'Service Unavailable'
                                    });
                                }
                            });
                    });
            })
    );
});
