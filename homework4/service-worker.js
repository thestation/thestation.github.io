const cache_version = 'app-v1';
const cache_files = [
    'index.html',
    'img/lightgold.jpg',
    'img/lightblue.jpg',
    'style.css'
]

self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open(cache_version)
            .then(function (cache) {
                console.log('opened cache');
                return cache.addAll(cache_files);
            })
    );
});

self.addEventListener('fetch', function (event) {
    console.log('fetching');
    event.respondWith(
        fetch(event.request).catch(() => caches.match(event.request))
    );
});

self.addEventListener('activate', function (event) {
    console.log('activated');
    event.waitUntil(
        caches.keys().then(function (cache_versions) {
            return Promise.all(
                cache_versions.map(function (cache) {
                    if(cache !== cache_version){
                        console.log('clearing cache');
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
});

