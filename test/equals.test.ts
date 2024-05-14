import test from 'ava'
import * as dot from "../src/index.js";
import { TestClass, comparible, nan } from './fixtures/values.js'

test('mixed types', t => {
  const cloned = dot.clone(comparible);
  t.assert(dot.equals(comparible, cloned));
});

test('circular reference', t => {
  const obj1: Record<string, unknown> = { string: 'text', number: 1 };
  obj1.circular = obj1;

  const obj2: Record<string, unknown> = { string: 'text', number: 1 };
  obj2.circular = obj2;

  t.deepEqual(obj1, obj2);
});

test('class instance', t => {
  t.assert(dot.equals(new TestClass('instance'), new TestClass('instance')));
  t.assert(!dot.equals(new TestClass('instance'), new TestClass('other')));
});

test.failing('url', t => {
  t.assert(dot.equals(new URL('http://example.com'), new URL('http://example.com')));
});

test('regex', t => {
  t.assert(dot.equals(/abc/g, /abc/g));
});

test('nan', t => {
  t.assert(dot.equals(nan, NaN));
});


