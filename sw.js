const CACHE_NAME = "tc-v1";
const IMAGE_CACHE = "tc-images-v1";
const JSON_CACHE = "tc-json-v1";

// Helper function to check if we're on localhost
const isLocalhost = () => {
  return (
    self.location.hostname === "localhost" ||
    self.location.hostname === "127.0.0.1" ||
    self.location.hostname === "[::1]"
  );
};

// Conditional logging helper
const logIfLocalhost = (...args) => {
  if (isLocalhost()) {
    console.log(...args);
  }
};

const errorIfLocalhost = (...args) => {
  if (isLocalhost()) {
    console.error(...args);
  }
};

// Install event - cache essential files
self.addEventListener("install", () => {
  logIfLocalhost("Service Worker: Install Event");
  self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener("activate", (event) => {
  logIfLocalhost("Service Worker: Activate Event");
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (
            cacheName !== CACHE_NAME &&
            cacheName !== IMAGE_CACHE &&
            cacheName !== JSON_CACHE
          ) {
            logIfLocalhost("Service Worker: Deleting old cache:", cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch event - implement caching strategies
self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Cache images with cache-first strategy
  if (
    request.destination === "image" ||
    /\.(png|webp|svg|ico)$/i.test(url.pathname)
  ) {
    event.respondWith(cacheFirstStrategy(request, IMAGE_CACHE));
    return;
  }

  // Cache JSON files with stale-while-revalidate strategy
  if (
    request.url.includes(".json") ||
    request.headers.get("accept")?.includes("application/json")
  ) {
    event.respondWith(staleWhileRevalidateStrategy(request, JSON_CACHE));
    return;
  }

  // For all other requests, try network first, fallback to cache
  event.respondWith(
    fetch(request).catch(() => {
      return caches.match(request);
    })
  );
});

// Cache-first strategy for images
async function cacheFirstStrategy(request, cacheName) {
  try {
    // Try to get from cache first
    const cache = await caches.open(cacheName);
    const cachedResponse = await cache.match(request);

    if (cachedResponse) {
      logIfLocalhost("Service Worker: Serving from cache:", request.url);
      return cachedResponse;
    }

    // If not in cache, fetch from network and cache it
    logIfLocalhost("Service Worker: Fetching and caching:", request.url);
    const networkResponse = await fetch(request);

    if (networkResponse.ok) {
      const responseClone = networkResponse.clone();
      await cache.put(request, responseClone);
    }

    return networkResponse;
  } catch (error) {
    errorIfLocalhost("Service Worker: Cache-first strategy failed:", error);
    return new Response("Network error", { status: 408 });
  }
}

// Stale-while-revalidate strategy for JSON files
async function staleWhileRevalidateStrategy(request, cacheName) {
  try {
    const cache = await caches.open(cacheName);
    const cachedResponse = await cache.match(request);

    // Start fetching from network (don't await yet)
    const networkResponsePromise = fetch(request).then(async (response) => {
      if (response.ok) {
        const responseClone = response.clone();
        await cache.put(request, responseClone);
        logIfLocalhost("Service Worker: Updated cache for:", request.url);
      }
      return response;
    });

    // Return cached version immediately if available
    if (cachedResponse) {
      logIfLocalhost("Service Worker: Serving stale content:", request.url);
      // Update cache in background
      networkResponsePromise.catch((error) => {
        errorIfLocalhost("Service Worker: Background update failed:", error);
      });
      return cachedResponse;
    }

    // If no cached version, wait for network
    logIfLocalhost(
      "Service Worker: No cache, waiting for network:",
      request.url
    );
    return await networkResponsePromise;
  } catch (error) {
    errorIfLocalhost(
      "Service Worker: Stale-while-revalidate strategy failed:",
      error
    );
    return new Response("Network error", { status: 408 });
  }
}
