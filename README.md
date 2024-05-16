# Obby

A consolidated suite of Typescript-friendly object manipulation tools.

There's very little original code in Obby; its purpose is to make a number of disparate object access, manipulation, and comparison utilities consistent with each other and available in a shared package for my own projects. In particular, the third-party libraries used are preconfigured to work consistently with each other wherever possible.

## Installation

`npm install -s obby`

## Basic Usage

Obby uses the [ts-dot-prop](https://github.com/justinlettau/ts-dot-prop/) library to provide basic access/manipulation of object properties using dot notation. Array items can be accessed by index, and the special `*` index value can be used to reference all items in an array property.

- `has(input: object, path: string)` returns TRUE if a property has been defined on the input object.
- `get(input: object, path: string)` Returns the value of the property at the given path, or `undefined` if it doesn't exist. (Note: This means `has()` is the only way to determine whether a property exists but has an undefined value).
- `set(input: object, path: string, value: unknown)` Mutates the input object, creating the referenced property or overwriting it with the given value. (Note: Setting a property to `undefined` doesn't actually remove the property from the object; `unset()` is necessary for that.)
- `unset(input: object, path: string)` Mutates the input object, deleting the property at the given path.

```ts
import { has, get, set, unset } from 'obby';

const obj = {
  handle: 'Bobby',
  name: { honorific: 'Mr.', first: 'Bob', middle: 'Jones', last: 'Smith', suffix: 'III' },
  ids: [
    { type: 'drivers-license', state: 'ny', number: '12345-6789' },
    { type: 'ssn', number: '000-00-0000' }
  ],
  addresses: {
    home: { street: '1 State Street', city: 'Everyville', state: 'NY', zip: '12345' },
    work: { street: '123 Downtown', city: 'Bigsville', state: 'NY', zip: '12345' },
    vacation: { street: '100 Seaside Blvd.', city: 'Pleasantville', state: 'NY', zip: '0123456' },
  },
};

console.log(has(obj, 'name.honorific')));
// output: `true`

console.log(get(obj, 'name.last'));
// output: 'Smith'

console.log(get(obj, 'ids.[0].type'));
// output: 'drivers-license'

set(obj, 'addresses.[0].city', 'Everytown');
console.log(get(obj, 'addresses.[*].city'));
// output: ["Everytown", "Biggsville", "Pleasantville"]

unset(obj, 'name.honorific');
unset(obj, 'ids');
unset(obj, 'addresses');
console.log(obj);
// output: { handle: 'Bobby', name: { first: 'Bob', last: 'Smith', suffix: 'III' } }
```

## Other Helpful Functions

- Cloning, merging, comparison, etc.
  - `copy(source: object, sourcePath: string, target: object, targetPath?: string)`: copies the value of the property on the source object to the target property of the target object. If no targetPath is given, the sourcePath is used for the target object as well.
  - `move(source: object, sourcePath: string, target: object, targetPath?: string)`: same as the `copy()` function, but the property on the source object is `unset()` after copying.
  - `clone(input: any)`: deep clones the input value using the [fast-copy](https://github.com/planttheidea/fast-copy) library.
  - `merge(...input: object[])`: Merges any number of objects with the [deepmerge-ts](https://github.com/RebeccaStevens/deepmerge-ts) library, respecting arrays, nested object keys, etc. Properties from 'leftmost' objects will be overwritten by same-key properties from 'later' objects in the input set.
  - `equals(a: any, b: any)`: does a deep equality check of two variables using the [fast-equals](https://github.com/planttheidea/fast-equals) library.
- Empty value handling via [emptier](https://github.com/eaton/emptier) and [empty-deep](https://github.com/eaton/empy-deep)
  - `isEmpty(input: any, options?: IsEmptyOptions)`: Checks whether the input value is 'empty' or not, based on configurable logic. Lodash's `_.empty()` logic is followed by default (arrays, zero-length strings, nulls, empty objects, empty Maps and Sets, etc) but specific types and checks can be toggled on and off as needed. In addition, a custom empty-check function can be passed in to handle oddball classes and any other empty-ish datatypes.
  - `emptyDeep(input: any, options?: IsEmptyOptions)`: Recursively walks an input object or array, unsetting any empty properties. If the top-level input is itself empty, undefined is returned.

## TODO

It might make sense to split the dot-path code, emptiness checking, and clone/merge/compare stuff into separate piles. At that point, though, one might as well just use the underlying packages. Obby is here to make all of these relatively common operations easy to use together.

Down the line, though, it might make sense consolidate object comparison and cloning — and add diffing — to ensure their treatment of various data types and handling of edge cases stays in sync. If that happens, Obby's public interface should still remain the same — that's the nice part about being a wrapper layer.
