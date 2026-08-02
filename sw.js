const CACHE_NAME = "marovski-site-v1";
const CORE_ASSETS = [
    "/",
    "/index.html",
    "/manifest.json",
    "/css/style.css",
    "/css/timeline.css",
    "/css/bootstrap.min.css",
    "/css/animate.css",
    "/js/scripts.js",
    "/img/logo.png",
    "/img/logo-white.png",
    "/img/favicon.ico",
    "/img/emoji/technerd.png",
    "/img/portraitMarovski.webp",
    "/img/portraitMarovski.png",
    "/css/img/rawpixel-com-574841-unsplash.jpg"
];

self.addEventListener("install", function (event) {
    event.waitUntil(
        caches.open(CACHE_NAME).then(function (cache) {
            return cache.addAll(CORE_ASSETS);
        }).then(function () {
            return self.skipWaiting();
        })
    );
});

self.addEventListener("activate", function (event) {
    event.waitUntil(
        caches.keys().then(function (cacheNames) {
            return Promise.all(
                cacheNames
                    .filter(function (cacheName) {
                        return cacheName !== CACHE_NAME;
                    })
                    .map(function (cacheName) {
                        return caches.delete(cacheName);
                    })
            );
        }).then(function () {
            return self.clients.claim();
        })
    );
});

self.addEventListener("fetch", function (event) {
    if (event.request.method !== "GET") {
        return;
    }

    var requestUrl = new URL(event.request.url);

    if (requestUrl.origin !== self.location.origin) {
        return;
    }

    event.respondWith(
        caches.match(event.request).then(function (cachedResponse) {
            if (cachedResponse) {
                return cachedResponse;
            }

            return fetch(event.request).then(function (networkResponse) {
                if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== "basic") {
                    return networkResponse;
                }

                var responseClone = networkResponse.clone();
                caches.open(CACHE_NAME).then(function (cache) {
                    cache.put(event.request, responseClone);
                });

                return networkResponse;
            });
        }).catch(function () {
            return caches.match("/index.html");
        })
    );
});
