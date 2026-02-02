self.addEventListener('install', (event) => {
    console.log('App Cozinha da Gabi instalado com sucesso!');
});

self.addEventListener('fetch', (event) => {
    // Mantém o app funcionando online e pronto para cache futuro
    event.respondWith(fetch(event.request));
});