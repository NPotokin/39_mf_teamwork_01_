const CACHE_NAME = 'cache-version-v1.0.7'
const urlsToCache = [
  '/',
  'https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap',
  'sounds/defeat.mp3',
  'sounds/game.mp3',
  'sounds/gem.mp3',
  'sounds/victory.mp3',
  'android-chrome-192x192.png',
  'android-chrome-512x512.png',
  'apple-touch-icon.png',
  'favicon-16x16.png',
  'favicon-32x32.png',
  'favicon.ico',
  'robots.txt',
  'lowres.webp',
  'offline.html',
]

async function getFilesFromManifest() {
  try {
    const manifestUrl = '/manifest.json'
    const manifestResponse = await fetch(manifestUrl)

    if (!manifestResponse.ok) {
      console.warn(
        'Manifest not found; skipping additional caching from manifest'
      )
      return []
    }

    const manifest = await manifestResponse.json()

    return manifest.assets || Object.values(manifest).map(entry => entry.file)
  } catch (error) {
    console.error('Failed to fetch manifest:', error)
    return []
  }
}

self.addEventListener('install', async event => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE_NAME)
      console.log('Opened cache')
      const filesFromManifest = await getFilesFromManifest()
      const allUrlsToCache = [...urlsToCache, ...filesFromManifest]

      await cache.addAll(allUrlsToCache)
    })()
  )
})

self.addEventListener('fetch', async event => {
  event.respondWith(
    (async () => {
      const { request } = event

      if (request.url.startsWith('chrome-extension')) {
        return fetch(request)
      } else {
        try {
          const networkResponse = await fetch(event.request)
          if (
            networkResponse &&
            networkResponse.status === 200 &&
            networkResponse.type === 'basic'
          ) {
            const cache = await caches.open(CACHE_NAME)
            cache.put(event.request, networkResponse.clone())
          }
          return networkResponse
          // const response = await caches.match(request)
          // if (response) {
          //   return response
          // }
          // const fetchRequest = request.clone()
          // const networkResponse = await fetch(fetchRequest)
          // if (
          //   !networkResponse ||
          //   networkResponse.status !== 200 ||
          //   networkResponse.type !== 'basic'
          // ) {
          //   return networkResponse
          // }
          // const cache = await caches.open(CACHE_NAME)
          // cache.put(request, networkResponse.clone())
          // return networkResponse
        } catch (error) {
          console.error('Fetch failed; returning offline page instead.', error)
          const cache = await caches.open(CACHE_NAME)
          const cachedResponse = await cache.match(event.request)
          return cachedResponse || (await cache.match('offline.html'))
        }
      }
    })()
  )
})

self.addEventListener('activate', async event => {
  const cacheWhitelist = [CACHE_NAME]

  event.waitUntil(
    (async () => {
      const cacheNames = await caches.keys()
      const deletePromises = cacheNames
        .filter(cacheName => cacheName !== CACHE_NAME)
        .map(async cacheName => {
          await caches.delete(cacheName)
        })
      await Promise.all(deletePromises)
    })()
  )
})
