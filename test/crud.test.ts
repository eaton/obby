import test from 'ava'
import * as dot from "../src/index.js";
import { nested, arrays } from './fixtures/values.js'

test('check properties', t => {
  t.is(dot.has(nested, 'l1.l2.l3.array.0.value'), true);
  t.is(dot.has(nested, 'missing'), false);
  t.is(dot.has(nested, 'l1.value.0'), true);
  t.is(dot.has(nested, 'l1.value.100'), false);
});

test('get properties', t => {
  t.is(dot.get(nested, 'l1.l2.l3.array.0.value'), 1);
  t.is(dot.get(nested, 'missing'), undefined);
  t.is(dot.get(nested, 'l1.value.0'), 1);
  t.deepEqual(dot.get(nested, 'l1.value'), [1, 2, 3]);
  t.is(dot.get(nested, 'l1.value.100'), undefined);
});

test('set properties', t => {
  const cloned = dot.clone(nested);
  t.deepEqual(nested, cloned);
  
  dot.set(cloned, 'l1', 1);
  dot.set(cloned, 'l5', true);
  t.is(dot.get(cloned, 'l1'), 1);
  t.is(dot.get(cloned, 'l5'), true);
  t.not(dot.get(nested, 'l1'), 1);
});

test('unset properties', t => {
  const cloned = dot.clone(nested);
  t.deepEqual(nested, cloned);

  dot.unset(cloned, 'l1');
  t.is(dot.get(cloned, 'l1'), undefined);

  dot.unset(cloned, 'value.0');
  t.deepEqual(dot.get(cloned, 'value'), [undefined, 2, 3]);
});

test('array selection', t => {
  // Simple access
  t.is(dot.get(arrays, 'strings.0'), 'first');
});

test.failing('unset a single array item', t => {
  const clone = dot.clone(arrays);
  dot.unset(clone, 'numbers.0')
  t.deepEqual(dot.get(clone, 'numbers'), [2, 3]);
});
