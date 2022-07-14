import { createEvent, createStore } from 'effector';

export const createDateStore = (updateIntervalMs: number = 1000) => {
  const store = createStore<Date>(new Date());
  const set = createEvent<Date>();
  store.on(set, (_, payload) => payload);

  window.setInterval(() => set(new Date()), updateIntervalMs);

  return store;
};
