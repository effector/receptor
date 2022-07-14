#### `preventDefault`

Example below will prevent clicks on a specific target:

```ts
import { click, createRefStore, onTarget, preventDefault } from 'effector-receptor';

const blockRef = createRefStore<HTMLDivElement>();

sample({
  clock: onTarget({
    clock: click,
    current: blockRef.$current,
    deep: true,
  }),
  target: preventDefault,
});
```

#### `stopPropagation`

Example below will stop event propagation from a specific ref

```ts
import { click, createRefStore, onTarget, preventDefault } from 'effector-receptor';

const linkRef = createRefStore<HTMLDivElement>();

sample({
  clock: onTarget({
    clock: click,
    current: linkRef.$current,
  }),
  target: stopPropagation,
});
```
