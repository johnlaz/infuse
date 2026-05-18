// INFUSE Site Injector — Service Worker v4
const CACHE = 'infuse-v4';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icon-192x192.png',
  './icon-512x512.png',
  './infusesiteinjector.ico'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c =>
      Promise.allSettled(ASSETS.map(a => c.add(a)))
    )
  );
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  const url = e.request.url;
  // Pass through cross-origin and API requests
  if (!url.startsWith(self.location.origin) ||
      url.includes('groq.com') ||
      url.includes('googleapis.com') ||
      url.includes('gstatic.com') ||
      url.includes('allorigins') ||
      url.includes('corsproxy') ||
      url.includes('codetabs')) {
    return;
  }
  // Navigation: network first, cache fallback
  if (e.request.mode === 'navigate') {
    e.respondWith(
      fetch(e.request).catch(() => caches.match('./index.html'))
    );
    return;
  }
  // Everything else: cache first
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request))
  );
});
