import { getDistance } from "./get-distance";
import { createEvent, createStore, Event, guard, sample } from "effector";

export const $mouseDownPoint = createStore({ x: 0, y: 0 });

export const mousedown = createEvent<MouseEvent>();
export const mouseup = createEvent<MouseEvent>();
export const mousemove = createEvent<MouseEvent>();
export const click = createEvent<MouseEvent>();
export const mousewheel = createEvent<WheelEvent>();

if (typeof document !== "undefined") {
  document.addEventListener("mousedown", (evt) => mousedown(evt));
  document.addEventListener("mouseup", (evt) => mouseup(evt));
  document.addEventListener("mousemove", (evt) => mousemove(evt));
  document.addEventListener("click", (evt) => click(evt));
}
if (typeof window !== "undefined") {
  window.addEventListener(
    "mousewheel",
    (evt) => mousewheel(evt as WheelEvent),
    {
      passive: false,
    }
  );
}

$mouseDownPoint.on(mousedown, (_prev, evt) => ({ x: evt.pageX, y: evt.pageY }));

/**
 * **Ghost-click** is a condition when you `mousedown`, move the cursor and then `mouseup`.
 * This method triggers `clock` only if cursor wasn't moved since the last `mousedown` event
 */
export const nonGhost = <Evt extends Event<MouseEvent>>(params: {
  clock: Evt;
}) => {
  return sample({
    clock: guard({
      source: $mouseDownPoint,
      clock: params.clock,
      filter: (point, evt) => {
        return getDistance(point, { x: evt.pageX, y: evt.pageY }) < 10;
      },
    }),
    source: params.clock,
  });
};
