import { createEvent, createStore } from 'effector';

/** Creates single-ref store */
export const createRefStore = <El extends HTMLElement>() => {
  const refAdded = createEvent<El>();
  const refRemoved = createEvent<El>();
  const $current = createStore<El | null>(null);

  $current.on(refAdded, (_prev, next) => next).on(refRemoved, () => null);

  return { $current, refAdded, refRemoved };
};

/** Creates store with array of refs */
export const createRefListStore = <El extends HTMLElement>() => {
  const refAdded = createEvent<El>();
  const refRemoved = createEvent<El>();
  const $current = createStore<El[]>([]);

  $current
    .on(refAdded, (currents, current) => [...currents, current])
    .on(refRemoved, (currents, current) => currents.filter((curCurrent) => curCurrent !== current));

  return { $current, refAdded, refRemoved };
};

/** Creates key-ref store */
export const createRefMapStore = <El extends HTMLElement>() => {
  const refAdded = createEvent<{ key: string; current: El }>();
  const refRemoved = createEvent<string>();
  const $current = createStore<Record<string, El | null>>({});

  $current
    .on(refAdded, (currents, { key, current }) => ({
      ...currents,
      [key]: current,
    }))
    .on(refRemoved, (refs, key) => {
      const { [key]: removedRef, ...nextRefs } = refs;
      return nextRefs;
    });

  return { $current, refAdded, refRemoved };
};
