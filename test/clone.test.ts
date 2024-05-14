import test from 'ava'
import * as dot from "../src/index.js";
import { nested, arrays, primitives, instance, url } from './fixtures/values.js'

test('all supported types', t => {
  const original = { ...arrays, ...nested, ...primitives };
  const cloned = dot.clone(original);
  t.deepEqual(original, cloned);
});

test('circular reference', t => {
  const obj: Record<string, unknown> = { string: 'text', number: 1 };
  obj.circular = obj;

  t.notThrows(() => dot.clone(obj));
  t.deepEqual(dot.clone(obj), obj);
});

test.failing('class instance', t => {
  t.deepEqual(dot.clone(instance), instance);
});

test.failing('url instance', t => {
  t.deepEqual(dot.clone(url), url);
});
