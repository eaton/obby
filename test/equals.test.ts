import test from 'ava'
import * as dot from "../src/index.js";
import { comparible, nocompare } from './fixtures/values.js'

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
  t.assert(dot.equals(nocompare.instance, dot.clone(nocompare.instance)));
});

test.failing('url instance', t => {
  t.assert(dot.equals(nocompare.url, dot.clone(nocompare.url)));
});

test.failing('nan', t => {
  t.assert(dot.equals(nocompare.nan, NaN));
});


