import test from 'ava'
import * as dot from "../src/index.js";
import { nested, arrays } from './fixtures/values.js'

test('negative array offsets', t => {
  t.deepEqual(dot.get(arrays, 'numbers'), [1, 2, 3, 4]);
  t.is(dot.get(arrays, 'numbers.-1'), 4);
});

test('slice ranges', t => {
  // Select all but the first and last items of the array
  t.deepEqual(dot.getAll(arrays, 'numbers.1:-1'), [2, 3]);
});

test('multiple matches', t => {
  // get returns the first match for a query
  t.deepEqual(dot.get(nested, '.value l1.value l3.value'), [1, 2, 3]);

  // getAll returns an array of all matches
  t.deepEqual(dot.getAll(nested, '.value l1.value l1.l2.value'), [[1, 2, 3], [1, 2, 3], [1, 2, 3]]);
});

test('wildcards', t => {
  t.deepEqual(dot.getAll(nested, '**.array.*.value'), [1, 2]);
});
