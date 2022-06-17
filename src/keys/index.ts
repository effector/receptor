import { createEvent } from "effector";

export const keyup = createEvent<KeyboardEvent>();
export const keydown = createEvent<KeyboardEvent>();
export const keypress = createEvent<KeyboardEvent>();

if (typeof document !== "undefined") {
  document.addEventListener("keyup", (evt) => keyup(evt));
  document.addEventListener("keydown", (evt) => keydown(evt));
  document.addEventListener("keypress", (evt) => keypress(evt));
}
