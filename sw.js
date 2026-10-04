/* ============================================================
   Talabat Images Finder — Offline Service Worker
   Keep this file beside index.html so it controls the whole app.
   ============================================================ */

/* Bump this string whenever the app shell changes. */
const VERSION = 'finder-v13';

const CACHE_PREFIX    = 'talabat-image-finder-';
const APP_SHELL_CACHE = `${CACHE_PREFIX}app-shell-${VERSION}`;
const RUNTIME_CACHE   = `${CACHE_PREFIX}runtime-${VERSION}`;

/* Everything needed to boot the app with zero network.
   Relative paths keep it compatible with GitHub Pages subpaths. */
const PRECACHE_URLS = [
  './',
  './index.html',
  './manifest-finder.webmanifest',
  './finder-192.png',
  './finder-512.png',
  './finder-maskable-512.png',
];

/* Internet-only helper hosts are never cached or intercepted. */
const NEVER_CACHE_HOSTS = [
  'corsproxy.io',
  'api.allorigins.win',
  'wsrv.nl',
  'images.weserv.nl',
  'cors.isomorphic-git.org',
  'cleanup.pictures',
];

// ---------------------------------------------------------------
// INSTALL
// ---------------------------------------------------------------
self.addEventListener('install', (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(APP_SHELL_CACHE);

    // addAll() is atomic: one 404 aborts the whole install and you
    // silently get no offline support at all. Cache individually and
    // only treat the two HTML pages as mandatory.
    const results = await Promise.allSettled(
      PRECACHE_URLS.map(async (url) => {
        // cache:'reload' bypasses the HTTP cache so we archive a truly
        // fresh copy, not a stale one from GitHub's max-age=600.
        const res = await fetch(new Request(url, { cache: 'reload' }));
        if (!res.ok) throw new Error(`${url} -> HTTP ${res.status}`);
        await cache.put(url, res);
        return url;
      })
    );

    const failed = results
      .map((r, i) => (r.status === 'rejected' ? PRECACHE_URLS[i] : null))
      .filter(Boolean);
    if (failed.length) console.warn('[sw] precache misses (non-fatal):', failed);

    if (!(await cache.match('./index.html'))) {
      throw new Error('[sw] FATAL: ./index.html could not be precached');
    }

    console.log(`[sw] ${VERSION} installed — offline app ready`);
  })());

  self.skipWaiting();
});

// ---------------------------------------------------------------
// ACTIVATE
// ---------------------------------------------------------------
self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const keep = new Set([APP_SHELL_CACHE, RUNTIME_CACHE]);
    for (const name of await caches.keys()) {
      if (name.startsWith(CACHE_PREFIX) && !keep.has(name)) await caches.delete(name);
    }
    if (self.registration.navigationPreload) {
      await self.registration.navigationPreload.enable();
    }
    await self.clients.claim();
    console.log(`[sw] ${VERSION} active`);
  })());
});

// ---------------------------------------------------------------
// FETCH
// ---------------------------------------------------------------
self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;

  let url;
  try { url = new URL(req.url); } catch { return; }
  if (!url.protocol.startsWith('http')) return;
  if (NEVER_CACHE_HOSTS.some((h) => url.hostname.endsWith(h))) return;

  // ---- Page loads / reloads: network-first, cache fallback ----
  if (req.mode === 'navigate') {
    event.respondWith((async () => {
      const key = './index.html';

      try {
        const preload = await event.preloadResponse;
        if (preload) {
          (await caches.open(APP_SHELL_CACHE)).put(key, preload.clone());
          return preload;
        }
        const fresh = await fetch(req);
        if (fresh && fresh.ok) {
          (await caches.open(APP_SHELL_CACHE)).put(key, fresh.clone());
        }
        return fresh;
      } catch {
        const cached =
          (await caches.match(key)) ||
          (await caches.match(req)) ||
          (key === './index.html' ? await caches.match('./') : null);
        if (cached) return cached;

        return new Response(
          '<!doctype html><meta charset="utf-8"><title>Offline</title>' +
          '<body style="font:16px system-ui;padding:40px;text-align:center">' +
          '<h2>Offline — this page was never cached</h2>' +
          '<p>Open it once while connected, then it will work offline.</p>',
          { status: 503, headers: { 'Content-Type': 'text/html; charset=utf-8' } }
        );
      }
    })());
    return;
  }

  // ---- Same-origin assets (incl. videos on first play): cache-first ----
  if (url.origin === self.location.origin) {
    event.respondWith((async () => {
      const cached = await caches.match(req);
      if (cached) return cached;
      try {
        const fresh = await fetch(req);
        if (fresh && fresh.ok && fresh.type === 'basic') {
          (await caches.open(RUNTIME_CACHE)).put(req, fresh.clone());
        }
        return fresh;
      } catch {
        return cached || Response.error();
      }
    })());
  }
});

// ---------------------------------------------------------------
self.addEventListener('message', (event) => {
  if (event.data === 'SKIP_WAITING') self.skipWaiting();
});
