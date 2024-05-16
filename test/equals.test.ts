import { URL } from 'node:url';
import test from 'ava'
import * as dot from "../src/index.js";
import { TestClass, comparible, nan } from './fixtures/values.js'

test('cloned values', t => {
  for (const [k, v] of Object.entries(comparible)) {
    t.assert(dot.equals(v, dot.clone(v)), k);
  }
});

test('circular reference', t => {
  const obj1: Record<string, unknown> = { string: 'text', number: 1 };
  obj1.circular = obj1;

  const obj2: Record<string, unknown> = { string: 'text', number: 1 };
  obj2.circular = obj2;

  t.deepEqual(obj1, obj2);
});

test('class instance', t => {
  const a = new TestClass('instance');
  const b = new TestClass('instance');
  const c = new TestClass('other');

  t.assert(dot.equals(a, b));
  t.assert(!dot.equals(a, c));
});

test('regex', t => {
  t.assert(dot.equals(/abc/g, /abc/g));
});

test('nan', t => {
  t.assert(dot.equals(nan, NaN));
});

test.failing('url', t => {
  const a = new URL('http://example.com');
  const b = new URL('http://example.com');
  t.assert(dot.equals(a, b));
});

