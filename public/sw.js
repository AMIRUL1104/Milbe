const CACHE_NAME = "milbe-v2";
const STATIC_ASSETS = [
  "/android-chrome-192x192.png",
  "/android-chrome-512x512.png",
  "/apple-touch-icon.png",
  "/favicon-16x16.png",
  "/favicon-32x32.png",
];

// Determine if a request should be cached and with what strategy
function shouldCache(request) {
  const url = new URL(request.url);

  // 1. Exclude all API routes and dynamic data from caching
  // These routes should always go to the network
  if (url.pathname.startsWith("/api/")) {
    // Specifically exclude auth and user-specific APIs
    if (url.pathname.startsWith("/api/auth/") || url.pathname.startsWith("/api/user/") || url.pathname.startsWith("/api/dashboard/")) {
      return { strategy: "network-only" };
    }
    // You might choose to cache other non-sensitive APIs using stale-while-revalidate or network-first
    // For now, all /api/ calls are network-only to be safe
    return { strategy: "network-only" };
  }

  // 2. HTML Documents: Network-First with Cache Fallback for offline support
  // This ensures users always get the freshest UI if online, but can still access if offline
  if (request.headers.get("Accept").includes("text/html")) {
    // Exclude auth pages from caching to prevent stale forms
    if (url.pathname.startsWith("/auth/")) {
        return { strategy: "network-only" };
    }
    return { strategy: "network-first" };
  }

  // 3. Static Assets: Cache-First, falling back to network if not in cache
  // This includes Next.js build assets and pre-defined static assets
  if (url.pathname.startsWith("/_next/static/") || STATIC_ASSETS.includes(url.pathname)) {
    return { strategy: "cache-first" };
  }

  // For any other GET request not explicitly handled, default to network-only
  return { strategy: "network-only" };
}

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      // Pre-cache essential static assets during installation
      return cache.addAll(STATIC_ASSETS.filter(asset => asset.includes("/")));
    })
  );
  self.skipWaiting(); // Forces the waiting service worker to become the active service worker
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      );
    })
  );
  event.waitUntil(clients.claim()); // Take control of un-controlled clients immediately
});

self.addEventListener("fetch", (event) => {
  const { request } = event;

  if (request.method !== "GET") {
    // For non-GET requests, always go to network
    event.respondWith(fetch(request));
    return;
  }

  const { strategy } = shouldCache(request);

  if (strategy === "network-only") {
    event.respondWith(fetch(request));
    return;
  }

  if (strategy === "network-first") {
    event.respondWith(
      fetch(request)
        .then(async (networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const cache = await caches.open(CACHE_NAME);
            cache.put(request, networkResponse.clone());
          }
          return networkResponse;
        })
        .catch(async () => {
          const cachedResponse = await caches.match(request);
          return cachedResponse || new Response(null, { status: 404, statusText: "Offline" });
        })
    );
    return;
  }

  if (strategy === "cache-first") {
    event.respondWith(
      caches.match(request).then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse;
        }
        return fetch(request).then((networkResponse) => {
          if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== "basic") {
            return networkResponse;
          }
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(request, responseToCache);
          });
          return networkResponse;
        });
      })
    );
    return;
  }

  // Fallback for requests not covered by any strategy (should ideally not be reached)
  event.respondWith(fetch(request));
});