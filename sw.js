self.addEventListener('install', (event) => {
    console.log('App Cozinha da Gabi instalado com sucesso!');
});

self.addEventListener('fetch', (event) => {
    event.respondWith(fetch(event.request));
});