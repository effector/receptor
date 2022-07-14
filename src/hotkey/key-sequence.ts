import { createEvent, createStore, Event, is, sample, Store } from 'effector';

export const keySequence = (sequence: Store<string> | string): Event<void> => {
  const keypress = createEvent<KeyboardEvent>();

  const $pressedKeys = createStore<string[]>([], { serialize: 'ignore' });

  sample({
    clock: keypress,
    source: $pressedKeys,
    fn: (oldKeys, event) => [...oldKeys, event.key],
    target: $pressedKeys,
  });

  const $wantedSequence: Store<string> = is.store(sequence)
    ? sequence
    : createStore(sequence as string, { serialize: 'ignore' });

  const typed = sample({
    source: { pressedKeys: $pressedKeys, wantedSequence: $wantedSequence },
    filter: ({ pressedKeys, wantedSequence }) => pressedKeys.join('').includes(wantedSequence),
    fn: () => {},
  });

  sample({ clock: typed, fn: () => [], target: $pressedKeys });

  return typed;
};
