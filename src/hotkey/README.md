# Hotkey

## What is this?

Hotkeys with Effector made easy

- Supports both Windows/MacOS style hotkeys
- Doesn't break if using with SSR
- Key sequences (someting like Konami code?)

## Usage

```tsx
import { hotkey } from 'effector-receptor';

const copyPressed = hotkey({ key: 'Ctrl+C' });

sample({
  clock: copyPressed,
  source: $formData,
  target: saveFx,
});
```

## Customization

#### Specifying event type

```tsx
import { hotkey } from 'effector-receptor';

const spaceDown = hotkey({ key: 'Space', type: 'keydown' });
const spaceUp = hotkey({ key: 'Space', type: 'keyup' });
const spacePress = hotkey({ key: 'Space', type: 'keypress' });
```

#### Shortcut

```tsx
import { hotkey } from 'effector-receptor';

const copyPressed = hotkey('Ctrl+C');
const spaceDown = hotkey('Space', 'keydown');
```

#### `filter` prop

```tsx
import { createStore } from 'effector';
import { hotkey, isFormElementFocused } from 'effector-receptor';

const $isConfirmModalOpened = createStore(true);

hotkey({
  key: 'Y',
  filter: $isConfirmModalOpened,
  target: removeFx,
});

hotkey({
  key: 'N',
  filter: $isConfirmModalOpened,
  target: closeModal,
});

hotkey({
  key: 'Ctrl+ArrowUp',
  filter: () => !isFormElementFocused(),
  target: triggersOnlyOutsideTextareas,
});
```

#### `target` prop

If you want to just trigger something instead of listening to event, you can use `target` prop:

```tsx
import { sample } from 'effector';
import { hotkey } from 'effector-receptor';

hotkey({
  key: 'Ctrl+C',
  target: copyTextFx,
});
// <=>
sample({
  clock: hotkey('Ctrl+C'),
  target: copyTextFx,
});
```

## Extra

#### `keyup`, `keydown`, `keypress` events

You can use internal wrappers for native events as well

```tsx
import { keyup, keydown, keypress } from 'effector-receptor';

keyup.watch(console.log); // KeyboardEvent
```

#### `$isShiftDown`, `$isCtrlDown`, `$isAltDown`

Stores that track if `Shift`/`Ctrl`/`Alt` buttons are held

Simple use-case: display hotkeys in UI while holding `Ctrl`

```tsx
import { useStore } from 'effector-react';
import { hotkey, $isCtrlDown } from 'effector-receptor';

const SubmitButton = () => {
  const isCtrlDown = useStore($isCtrlDown);

  return <Button onClick={savePressed}>{isCtrlDown ? 'Ctrl+S' : 'Save'}</Button>;
};

const savePressed = createEvent<MouseEvent>();

sample({
  clock: [savePressed, hotkey('Ctrl+S')],
  target: saveFx,
});
```
