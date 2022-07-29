# Mouse

## What is this?

Wrapped events for mouse

## Methods

#### `mouseup`, `mousedown`, `mousepress`, `click`, `mousewheel`

These events trigger on `document.mouseup/mousedown/mousepress/click/mousewheel`

```ts
import { click, mousedown, mousepress, mouseup, mousewheel } from 'effector-receptor';

mouseup.watch(console.log); // MouseEvent
mousedown.watch(console.log); // MouseEvent
mousepress.watch(console.log); // MouseEvent
click.watch(console.log); // MouseEvent
mousewheel.watch(console.log); // WheelEvent
```

#### `nonGhost` - Filters ghost clicks

> **Ghost-Click** is when you perform `mousedown`, move mouse a little bit and then do `mouseup`.  
> In cases such as drag-and-drop, it's important to prevent ghost clicks for a better UX

```ts
import { click, createRefStore, nonGhost, onTarget } from 'effector-receptor';

const canvasRef = createRefStore<HTMLDivElement>();

const canvasClicked = onTarget({
  clock: nonGhost(click),
  current: canvasRef.$current,
});
```
