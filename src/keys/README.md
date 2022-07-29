# Keys

## What is this?

Wrapped events for keyboard

## Methods

#### `keyup`, `keydown`, `keypress`

These events trigger on `document.keyup/keydown/keypress`

```ts
import { keydown, keypress, keyup } from 'effector-receptor';

keyup.watch(console.log); // KeyboardEvent
keydown.watch(console.log); // KeyboardEvent
keypress.watch(console.log); // KeyboardEvent
```

### `$isShiftDown`, `$isCtrlDown`, `$isAltDown`

These stores to track if `Shift`/`Ctrl`/`Alt` buttons are held

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
