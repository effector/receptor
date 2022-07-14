import { createEffect } from 'effector';

export const preventDefault = createEffect((event: Event) => {
  return event.preventDefault();
});

export const stopPropagation = createEffect((event: Event) => {
  return event.stopPropagation();
});
