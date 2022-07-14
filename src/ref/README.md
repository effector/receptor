# Refs

## Methods

#### `createRefStore` - store a single ref

```ts
import { createRefStore } from '@effector/receptor';

const inputRef = createRefStore<HTMLInputElement>();

// Store ref (e.g. on component mount)
inputRef.refAdded(document.getElementById('my-input'));

// Remvoe ref (e.g. on component unmount)
inputRef.refRemoved();

// Listen to ref change
inputRef.$current.watch((el) => {
  console.log(el); // HTMLInputElement
});
```

#### `createRefListStore` - store a list of refs

```ts
import { createRefListStore } from '@effector/receptor';

const inputRefs = createRefListStore<HTMLInputElement>();

const el = document.getElementById('my-input');

// Store ref (e.g. on component mount)
inputRefs.refAdded(el);

// Remvoe ref (e.g. on component unmount)
inputRefs.refRemoved(el);

// Listen to refs change
inputRefs.$current.watch((elements) => {
  console.log(elements); // HTMLInputElement[]
});
```

#### `createRefMapStore` - key-ref store

```ts
import { createRefMapStore } from '@effector/receptor';

const inputRefs = createRefMapStore<HTMLInputElement>();

const el = document.getElementById('my-input');

// Store ref (e.g. on component mount)
inputRefs.refAdded({
  key: 'my-input',
  current: el,
});

// Remvoe ref (e.g. on component unmount)
inputRefs.refRemoved('my-input');

// Listen to refs change
inputRefs.$current.watch((elements) => {
  console.log(elements); // { [string]: HTMLInputElement }
});
```
