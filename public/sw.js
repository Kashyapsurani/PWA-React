this.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open('your-cache-name').then((cache) => {
            return cache.addAll([
                "/App.jsx",
                "/main.jsx",
                "/index.html",
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
    console.log('Fetching:', event.request.url); // Log the URL being fetched
    event.respondWith(
        fetch(event.request)
            .then((response) => {
                // Check if we received a valid response
                if (!response || response.status !== 200 || response.type === 'opaque') {
                    console.error(`Invalid response for ${event.request.url}:`, response);
                }
                return response;
            })
            .catch((error) => {
                console.error('Fetch failed, returning fallback:', error);
            })
    );
});




