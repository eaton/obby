# Obby

A consolidated suite of Typescript-friendly object manipulation tools.

There's very little original code in Obby; its purpose is to make a number of disparate object access, manipulation, and comparison utilities consistent with each other and available in a shared package for my own projects. In particular, the third-party libraries used are preconfigured to work consistently with each other wherever possible.

## Installation

`npm install -s obby`

## Basic Usage

Obby uses the [wild-wild-path](https://github.com/ehmicky/wild-wild-path) library, with some pre-populated defaults, to allow selection and modification of deeply nested object properties. The same syntax can be used as a simple query language; `get(myObj, 'foo.bar')` will return the `foo: { bar: ... }` property, for example. `getAll(myObj, '**.bar')` will return an array containing *any* properties stored in a key named 'bar', even if they are nested several layers down.

- `has(input: object, path: string)` returns TRUE if a property has been defined on the input object.
- `get(input: object, path: string)` Returns the value of the property at the given path, or `undefined` if it doesn't exist. (Note: This means `has()` is the only way to determine whether a property exists but has an undefined value).
- `getAll(input: object, path: string)` Returns an array of all property values whose keys match the path query.
- `set(input: object, path: string, value: unknown)` Mutates the input object, creating the referenced property or overwriting it with the given value. (Note: Setting a property to `undefined` doesn't actually remove the property from the object; `unset()` is necessary for that. In addition, if a path query with wildcards is given, *all* matching properties will be modified.)
- `unset(input: object, path: string)` Mutates the input object, deleting the property at the given path. If a path query with wildcards is given, *all* matching properties will be unset.
- `flatten(input: object)` Returns a copy of the input object, with all its deeply nested property paths rendered as first-level string keys. `flatten(foo: ['bar', 'baz'])`, for example, returns `{ 'foo.0': 'bar', 'foo.1: 'baz' }`.
- `unflatten(input: object)` Returns a copy of the input object, with all pathlike property keys expanded to nested properties.

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

console.log(get(obj, 'ids.0.type'));
// output: 'drivers-license'

set(obj, 'addresses.0.city', 'Everytown');
console.log(getAll(obj, 'addresses.*.city'));
// output: ["Everytown", "Biggsville", "Pleasantville"]

unset(obj, 'name.honorific');
unset(obj, 'ids');
unset(obj, 'addresses');
console.log(obj);
// output: { handle: 'Bobby', name: { first: 'Bob', last: 'Smith', suffix: 'III' } }

```

```ts
import { flatten, unflatten } from 'obby';
const myObj = {
  foo: ['bar', 'baz'],
  buzz: 1
};
const flattened = flatten(myObj);
console.log();
// { 'foo.0': 'bar', 'foo.1': 'baz', buzz: 1 }

console.log(unflatten(flattened));
// { foo: ['bar', 'baz'], buzz: 1 }
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

Cloning objects could — in theory — be handled by the `wild-wild-path` code, but `fast-clone` is much, much, MUCH faster when all you need to do is create a clone of an object.

Diffing is on the to-do list, but needs some care to ensure it stays in sync with the equality checking code. Few deep-equality check libraries are performant AND offer diffing.
