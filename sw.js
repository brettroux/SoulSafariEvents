const CACHE_NAME = "soul-safari-2026-v6";
const CORE_ASSETS = [
  "./",
  "./index.html",
  "./styles.css?v=4",
  "./app.js?v=5",
  "./manifest.json",
  "./assets/soul-safari/logo.png",
  "./assets/soul-safari/icon-192.png",
  "./assets/soul-safari/icon-512.png",
  "./assets/soul-safari/elephant-drive.webp",
  "./assets/soul-safari/sunset-safari.webp",
  "./assets/soul-safari/movement-circle.webp",
  "./assets/soul-safari/ritual-mats.webp",
  "./assets/soul-safari/sensory-table.webp",
  "./assets/soul-safari/bayala-aerial.webp",
  "./assets/soul-safari/christie-holt.webp",
  "./assets/soul-safari/trisha-crookes.webp",
  "./assets/soul-safari/robyn-rose.webp",
  "./assets/soul-safari/despi-forbes.webp"
];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(CORE_ASSETS)));
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key)))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached;
      return fetch(event.request)
        .then((response) => {
          if (response.ok && response.type === "basic") {
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, response.clone()));
          }
          return response;
        })
        .catch(() => caches.match("./index.html"));
    })
  );
});
