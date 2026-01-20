const CACHE = "site-cache-v2";
const ASSETS = [
  "/",
  "/index.html",
  "/styles.css",
  "/script.js",
  "/enhancements.js",
  "/obrigado.html",
  "/img/bghero.webp",
  "/img/logo-320.webp",
  "/img/mm.webp"
];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE).then((c) => c.addAll(ASSETS)));
});

self.addEventListener("fetch", (event) => {
  const req = event.request;

  // Cache-first para imagens
  if (req.destination === "image") {
    event.respondWith(
      caches.match(req).then((cached) => {
        return (
          cached ||
          fetch(req).then((res) => {
            const copy = res.clone();
            caches.open(CACHE).then((c) => c.put(req, copy));
            return res;
          })
        );
      })
    );
  }
});
