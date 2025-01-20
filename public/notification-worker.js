self.addEventListener('push', event => {
  const data = event.data.json();
  
  const options = {
    body: data.description,
    icon: '/calendar-icon.png',
    badge: '/badge-icon.png',
    data: {
      eventId: data.eventId,
      url: data.url
    }
  };

  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );
});

self.addEventListener('notificationclick', event => {
  const notification = event.notification;
  const eventId = notification.data.eventId;
  const url = notification.data.url;

  notification.close();
  event.waitUntil(
    clients.openWindow(url)
  );
}); 