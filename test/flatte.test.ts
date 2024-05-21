import test from 'ava'
import * as dot from "../src/index.js";
import { nested } from './fixtures/values.js'

test('flattened object', t => {
  t.deepEqual(dot.get(nested, 'l1.l2.value'), [1, 2, 3]);
  t.deepEqual(dot.flatten(nested, 'l1.l2.value'), {
    'l1.l2.value.0': 1,
    'l1.l2.value.1': 2,
    'l1.l2.value.2': 3,
  });
});

test('unflatten object', t => {
  const flat = {
    'l1.l2.value.0': 1,
    'l1.l2.value.1': 2,
    'l1.l2.value.2': 3,
  };
  t.deepEqual(dot.unflatten(flat), { l1: { l2: { value: [1, 2, 3] } } });

  t.deepEqual(nested, dot.unflatten(dot.flatten(nested)));
});
