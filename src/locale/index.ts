import { createEvent, createStore } from 'effector';

const store = createStore<Array<string>>([...window.navigator.languages]);
const set = createEvent<Array<string>>();
store.on(set, (_, payload) => payload);
window.addEventListener('languagechange', () => {
  set([...window.navigator.languages]);
});

export const navigationLocalesStore = store;
