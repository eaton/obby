import test from 'ava'
import * as dot from "../src/index.js";
import { cloneable, noclone } from './fixtures/values.js'

test('all supported types', t => {
  const cloned = dot.clone(cloneable);
  t.deepEqual(cloneable, cloned);
});

test('circular reference', t => {
  const obj: Record<string, unknown> = { string: 'text', number: 1 };
  obj.circular = obj;

  t.notThrows(() => dot.clone(obj));
  t.deepEqual(dot.clone(obj), obj);
});

test.failing('class instance', t => {
  t.deepEqual(dot.clone(noclone.instance), noclone.instance);
});

test.failing('url instance', t => {
  t.deepEqual(dot.clone(noclone.url), noclone.url);
});
