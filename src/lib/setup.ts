import { createEvent, Effect, Event, restore, scopeBind } from "effector";

type SetupCallback<T> = (scopedEvent: T) => (scopedEvent: T) => void;

export const start = createEvent();
export const stop = createEvent();

export const setup = <T extends Event<any> | Effect<any, any, any>>(params: {
  event: T;
  cb: SetupCallback<T>;
}) => {
  const initialized = createEvent<{ event: T; destroy: (event: T) => void }>();

  const $scoped = restore(initialized, {
    event: params.event,
    destroy: () => {},
  });

  start.watch(() => {
    let scopedEvent = params.event;
    try {
      // @ts-expect-error
      scopedEvent = scopeBind(params.event);
    } catch {}

    const destroy = params.cb(scopedEvent);

    initialized({
      event: scopedEvent,
      destroy,
    });
  });

  $scoped.watch(stop, ({ event, destroy }) => {
    destroy(event);
  });
};

export const createSubscriber = (getTarget, evtName, extraParams = {}) => {
  return (callback) => {
    let target;
    try {
      target = getTarget();
    } catch {
      return () => {};
    }
    if (target !== undefined)
      target.addEventListener(evtName, callback, extraParams);
    return () => {
      target.removeEventListener(evtName, callback, extraParams);
    };
  };
};

export const subscribe = <T extends Event<any>>(params: {
  type: string;
  event: T;
  target: () => any;
  modifiers?: AddEventListenerOptions;
}) => {
  setup({
    event: params.event,
    setup: createSubscriber(params.target, params.type, params.modifiers ?? {}),
  });
};

export const setupDocument = <T extends Event<any>>(
  type: string,
  event: T,
  modifiers: AddEventListenerOptions = {}
) => {
  return subscribe({ type, event, target: () => document, modifiers });
};

export const setupWindow = <T extends Event<any>>(
  type: string,
  event: T,
  modifiers: AddEventListenerOptions = {}
) => {
  return subscribe({ type, event, target: () => window, modifiers });
};

export const setupNavigator = <T extends Event<any>>(
  type: string,
  event: T,
  modifiers: AddEventListenerOptions = {}
) => {
  return subscribe({ type, event, target: () => navigator, modifiers });
};
