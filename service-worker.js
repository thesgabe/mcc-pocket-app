const CACHE_NAME = "mcc-greens-v1";
const ASSETS = [
  "./",
  "./index.html",
  "./styles.css",
  "./app.js",
  "./holes.js",
  "./manifest.json",
  ...Array.from({ length: 18 }, (_, i) => `./images/hole-${i + 1}.svg`)
];

self.addEventListener("install", event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS)));
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(cached => cached || fetch(event.request))
  );
});
