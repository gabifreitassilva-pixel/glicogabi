const CACHE_NAME = 'glicogabi-v2';
const assets = ['./', './index.html', './manifest.json', './icone.png'];

// Instalação e Cache
self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(assets)));
});

// Ativação e limpeza de cache antigo
self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys().then((keys) => {
    return Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)));
  }));
});

// Responder offline
self.addEventListener('fetch', (e) => {
  e.respondWith(caches.match(e.request).then((res) => res || fetch(e.request)));
});

// ESCUTADOR DE LEMBRETES (Roda mesmo com app fechado)
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SET_REMINDER') {
    const { hora, minuto } = event.data;
    console.log(`Lembrete agendado para ${hora}:${minuto}`);
    
    // Verifica o horário a cada minuto
    setInterval(() => {
      const agora = new Date();
      if (agora.getHours() == hora && agora.getMinutes() == minuto) {
        self.registration.showNotification("🚨 HORA DA MEDICAÇÃO!", {
          body: "GlicoGabi: Verifique sua glicemia agora.",
          icon: "icone.png",
          vibrate: [500, 200, 500],
          tag: 'glicogabi-alerta'
        });
      }
    }, 60000);
  }
});
