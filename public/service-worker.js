// service-worker.js

var cacheName = 'afterschoolact-v1';
var cacheFiles = [
    '/index.html',
    '/server.js',
    '/public/school-manifest.webmanifest',
    '/package.json',
    '/server.js',
    '/src/components/styles.css',
    '/Icons/basketballIcon.png',
    '/Icons/culinaryIcon.png',
    '/Icons/dancingIcon.png',
    '/Icons/englishIcon.png',
    '/Icons/footballIcon.png',
    '/Icons/guitarIcon.png',
    '/Icons/karateIcon.png',
    '/Icons/mathIcon.png',
    '/Icons/programmingIcon.jpg',
    '/Icons/sigingIcon.jpg',
    '/schoolLogo.png',
];

self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(cacheName).then(function(cache) {
            return Promise.all(cacheFiles.map(function(url) {
                return fetch(url).then(function(response) {
                    if (!response.ok) {
                        throw new Error('Failed to fetch resource: ' + url);
                    }
                    return cache.put(url, response);
                });
            }));
        })
    );
});

self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request).then(function(response) {
            return response || fetch(event.request);
        })
    );
});
