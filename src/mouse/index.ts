import { getDistance } from "./get-distance";
import { createEvent, createStore, Event, guard, sample } from "effector";

import { setupDocument, setupWindow } from "../lib/setup";

export const $mouseDownPoint = createStore({ x: 0, y: 0 });

export const mousedown = createEvent<MouseEvent>();
export const mouseup = createEvent<MouseEvent>();
export const mousemove = createEvent<MouseEvent>();
export const click = createEvent<MouseEvent>();
export const mousewheel = createEvent<WheelEvent>();

setupDocument("mousedown", mousedown);
setupDocument("mouseup", mouseup);
setupDocument("mousemove", mousemove);
setupDocument("click", click);
setupWindow("mousewheel", mousewheel, { passive: true });

$mouseDownPoint.on(mousedown, (_prev, evt) => ({ x: evt.pageX, y: evt.pageY }));

/**
 * **Ghost-click** is a condition when you `mousedown`, move the cursor and then `mouseup`.
 * This method triggers `clock` only if cursor wasn't moved since the last `mousedown` event
 */
export const nonGhost = <Evt extends Event<MouseEvent>>(params: {
  clock: Evt;
}) => {
  const clickTriggered = guard({
    source: $mouseDownPoint,
    clock: params.clock,
    filter: (point, evt) => {
      return getDistance(point, { x: evt.pageX, y: evt.pageY }) < 10;
    },
  });

  return sample({
    clock: clickTriggered,
    source: params.clock,
  });
};
