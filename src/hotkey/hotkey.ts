import { Event, guard, sample, Store, Target } from 'effector';

import { keydown, keypress, keyup } from '../keys';
import { validateHotkey } from './validate-hotkey';

const keyEvents = {
  keyup,
  keydown,
  keypress,
};

interface hotkeyT {
  (key: KeyboardEvent['key'], type?: keyof typeof keyEvents): Event<KeyboardEvent>;
  (params: {
    key: KeyboardEvent['key'];
    type?: keyof typeof keyEvents;
    filter?: Store<boolean>;
    target?: Target;
  }): Event<KeyboardEvent>;
}

/** Returns `Event` that gets triggered when a certain key pressed (or keyup/keydown events triggered) */
export const hotkey: hotkeyT = (...args) => {
  const normalizedParams =
    typeof args[0] === 'string'
      ? { key: args[0], type: (args[1] || 'keyup') as keyof typeof keyEvents }
      : {
          key: args[0].key,
          type: args[0].type || 'keyup',
          filter: args[0].filter,
          target: args[0].target,
        };
  let keyTriggered = guard({
    clock: keyEvents[normalizedParams.type],
    filter: validateHotkey(normalizedParams.key),
  }) as Event<KeyboardEvent>;
  if (normalizedParams.filter) {
    keyTriggered = guard({
      clock: keyTriggered,
      filter: normalizedParams.filter as Store<boolean>,
    });
  }
  if (normalizedParams.target) {
    // @ts-expect-error
    sample({
      clock: keyTriggered,
      target: normalizedParams.target,
    });
  }
  return keyTriggered;
};
