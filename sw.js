const CACHE_NAME = "tc-v1";

// Install event - cache initial resources
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => {
        console.log("Service Worker: Initial cache created");
      })
      .then(() => {
        // Force the waiting service worker to become the active service worker
        return self.skipWaiting();
      })
  );
});

// Activate event - clean up old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== CACHE_NAME) {
              console.log("Service Worker: Deleting old cache:", cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        // Ensure the service worker takes control of all pages immediately
        return self.clients.claim();
      })
  );
});

// Fetch event - cache-first strategy for JSON and images only
self.addEventListener("fetch", (event) => {
  // Only handle HTTP/HTTPS requests
  if (!event.request.url.startsWith('http://') && !event.request.url.startsWith('https://')) {
    return;
  }

  // Only cache images and JSON files
  const shouldCache = event.request.destination === 'image' || 
                     event.request.url.endsWith('.json');

  if (!shouldCache) {
    // For non-cacheable requests, just fetch normally
    return;
  }

  event.respondWith(
    caches.match(event.request, { ignoreSearch: true }).then((response) => {
      // Return cached version if available
      if (response) {
        console.log("Service Worker: ✅ Serving from cache:", event.request.url);
        return response;
      }

      // Otherwise fetch from network
      console.log("Service Worker: 🌐 Fetching from network:", event.request.url);
      return fetch(event.request)
        .then((response) => {
          // Check if we received a valid response
          if (!response) {
            console.log("Service Worker: ❌ No response for:", event.request.url);
            return response;
          }

          // Accept responses with status 200 OR status 0 (opaque responses from CORS)
          if (response.status !== 200 && response.status !== 0) {
            console.log("Service Worker: ❌ Bad status", response.status, "for:", event.request.url);
            return response;
          }

          console.log("Service Worker: ✅ Valid response for:", event.request.url, "Status:", response.status, "Type:", response.type);

          // Clone the response since it can only be consumed once
          const responseToCache = response.clone();

          // Add to cache with better error handling
          caches.open(CACHE_NAME).then((cache) => {
            return cache.put(event.request, responseToCache);
          }).then(() => {
            console.log("Service Worker: 💾 Successfully cached:", event.request.url);
          }).catch((error) => {
            console.error("Service Worker: ❌ Failed to cache:", event.request.url, error);
          });

          return response;
        })
        .catch((error) => {
          console.error("Service Worker: ❌ Fetch failed:", event.request.url, error);
          throw error;
        });
    })
  );
});

// Message event - for communication with the main thread
self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
  
  // Debug: List all cached URLs
  if (event.data && event.data.type === "LIST_CACHE") {
    caches.open(CACHE_NAME).then((cache) => {
      return cache.keys();
    }).then((requests) => {
      console.log("📦 Service Worker: Cached URLs (" + requests.length + " items):");
      requests.forEach((request, index) => {
        console.log(`  ${index + 1}. ${request.url}`);
      });
      if (requests.length === 0) {
        console.log("  (Cache is empty)");
      }
    });
  }

  // Debug: Clear cache
  if (event.data && event.data.type === "CLEAR_CACHE") {
    caches.delete(CACHE_NAME).then(() => {
      console.log("🗑️ Service Worker: Cache cleared");
    });
  }
});
