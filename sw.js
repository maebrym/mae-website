// Offline copy of the site for pitch day.
// Installed by present.html. It saves every file listed in sw-files.json, then serves
// the live site when the network answers quickly and the saved copy when it does not.
// After changing site files, regenerate sw-files.json and bump VERSION.
const VERSION = "mae-v8";

self.addEventListener("install", (e) => {
  e.waitUntil((async () => {
    const cache = await caches.open(VERSION);
    const files = await (await fetch("sw-files.json", { cache: "no-store" })).json();
    // add one by one so a single missing file does not cancel the whole save
    await Promise.all(files.map((f) => cache.add(new Request(f, { cache: "reload" })).catch(() => {})));
    self.skipWaiting();
  })());
});

self.addEventListener("activate", (e) => {
  e.waitUntil((async () => {
    for (const k of await caches.keys()) if (k !== VERSION) await caches.delete(k);
    await self.clients.claim();
  })());
});

self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET" || new URL(req.url).origin !== location.origin) return;
  e.respondWith((async () => {
    const cache = await caches.open(VERSION);
    const saved = await cache.match(req, { ignoreSearch: true });
    try {
      const net = fetch(req).then((r) => { if (r.ok && r.status === 200) cache.put(req, r.clone()); return r; });
      if (!saved) return await net;
      // the network gets 1.5 seconds; after that the saved copy is used
      return await Promise.race([net, new Promise((res) => setTimeout(() => res(saved), 1500))]);
    } catch (err) {
      if (saved) return saved;
      throw err;
    }
  })());
});
