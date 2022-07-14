import { createEvent, createStore } from 'effector';

import { setupWindow } from '../lib/setup';

export const online = createEvent<Event>();
export const offline = createEvent<Event>();

export const $isOnline = createStore(navigator.onLine);

$isOnline.on(online, () => true).on(offline, () => false);

setupWindow('online', online);
setupWindow('offline', offline);
