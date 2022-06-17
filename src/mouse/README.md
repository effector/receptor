# Mouse

## Methods

#### `mouseup`, `mousedown`, `mousepress`, `click`, `mousewheel`

```ts
import {
  mouseup,
  mousedown,
  mousepress,
  click,
  mousewheel,
} from "@effector/receptor";

mouseup.watch(console.log);
mousedown.watch(console.log);
mousepress.watch(console.log);
click.watch(console.log);
mousewheel.watch(console.log);
```

#### `nonGhost` - Filters ghost clicks

> **Ghost-Click** is when you perform `mousedown`, move mouse a little bit and then do `mouseup`.  
> In cases such as drag-and-drop, it's important to prevent ghost clicks

```ts
import { click, nonGhost, onTarget, createRefStore } from "@effector/receptor";

const canvasRef = createRefStore<HTMLDivElement>();

const canvasClicked = onTarget({
  clock: nonGhost(click),
  current: canvasRef.$current,
});
```
