import { createEvent, createStore } from 'effector'

export const online = createEvent<Event>()
export const offline = createEvent<Event>()

export const $isOnline = createStore(navigator.onLine)

$isOnline.on(online, () => true).on(offline, () => false)

if (typeof window !== 'undefined') {
  window.addEventListener('online', online)
  window.addEventListener('offline', offline)
}
