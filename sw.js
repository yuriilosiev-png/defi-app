// ═══════════════════════════════════════════════════════════════
// SERVICE WORKER — обработчик Push уведомлений
// Загрузить в корень репозитория defi-app (рядом с index.html)
// ═══════════════════════════════════════════════════════════════

self.addEventListener('install', e => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(clients.claim()));

// ── Получаем Push ──────────────────────────────────────────────
self.addEventListener('push', function(e) {
  if(!e.data) return;

  let data = {};
  try { data = e.data.json(); } catch(err) { data = {title:'DeFi Alert', body: e.data.text()}; }

  const title    = data.title    || 'DeFi Analytics 🔔';
  const body     = data.body     || '';
  const priority = data.priority || 3;

  // Иконка и цвет по приоритету
  const icon  = '/icon-192.png';
  const badge = '/icon-192.png';

  // Вибрация по важности
  const vibrate = priority >= 5 ? [300,100,300,100,300] :  // критично
                  priority >= 4 ? [200,100,200] :            // важно
                  [100];                                       // обычное

  e.waitUntil(
    self.registration.showNotification(title, {
      body,
      icon,
      badge,
      vibrate,
      tag:     'defi-alert-' + priority,
      renotify: true,
      requireInteraction: priority >= 5, // критичные требуют закрытия вручную
      data: { url: self.location.origin }
    })
  );
});

// ── Клик по уведомлению — открываем приложение ─────────────────
self.addEventListener('notificationclick', function(e) {
  e.notification.close();
  e.waitUntil(
    clients.matchAll({type:'window', includeUncontrolled:true}).then(function(list) {
      for(const client of list) {
        if(client.url.includes(self.location.origin) && 'focus' in client) {
          return client.focus();
        }
      }
      return clients.openWindow(e.notification.data?.url || '/');
    })
  );
});
