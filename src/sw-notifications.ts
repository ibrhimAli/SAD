self.addEventListener('install', () => self.skipWaiting())
self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim())
})

self.addEventListener('message', (event) => {
  const { type, time } = event.data || {}
  if (type === 'set-reminder' && typeof time === 'string') {
    const [h, m] = time.split(':').map((v) => parseInt(v, 10))
    const now = new Date()
    const next = new Date()
    next.setHours(h, m, 0, 0)
    if (next.getTime() <= now.getTime())
      next.setDate(next.getDate() + 1)
    // @ts-expect-error TimestampTrigger is not yet typed in TS lib
    const Trigger = (self as unknown as {
      TimestampTrigger: new (ts: number) => unknown
    }).TimestampTrigger
    if (Trigger && 'showTrigger' in Notification.prototype) {
      self.registration.showNotification('Daily Check-In', {
        body: "It's time for your daily mood check-in.",
        // @ts-expect-error TimestampTrigger is not yet typed in TS lib
        showTrigger: new Trigger(next.getTime()),
      })
    }
  }
})

self.addEventListener('notificationclick', (event) => {
  event.notification.close()
  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clients) => {
      for (const client of clients) {
        if ('focus' in client) return client.focus()
      }
      if (self.clients.openWindow)
        return self.clients.openWindow('/mood')
    }),
  )
})
