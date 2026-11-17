// Désinstalle le service worker de l'ancien site (Angular PWA).
// Les navigateurs qui l'ont encore récupèrent ce fichier, qui se supprime
// lui-même, vide ses caches et recharge la page sur la nouvelle version.
self.addEventListener('install', () => self.skipWaiting());

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.map((key) => caches.delete(key))))
      .then(() => self.registration.unregister())
      .then(() => self.clients.matchAll({ type: 'window' }))
      .then((clients) => clients.forEach((client) => client.navigate(client.url)))
  );
});
