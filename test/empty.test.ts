import test from 'ava'
import * as dot from "../src/index.js";
import { empty } from './fixtures/values.js'

test('empty values detected', t => {
  const defaults = Object.values(empty).filter(v => dot.isEmpty(v));
  const onlyUndefined = Object.values(empty).filter(v => dot.isEmpty(v, { none: true }));
  const allEmpty = Object.values(empty).filter(v => dot.isEmpty(v, { all: true }));

  t.is(defaults.length, 3);
  t.is(allEmpty.length, 6);
  t.is(onlyUndefined.length, 1);
})

test('deep empty filtering', t => {
  const test = { fullNumber: 1, fullArray: [1, 2, []], nested: empty, ...empty };
  const emptied = dot.toEmptyDeep(test, { all: true });
  t.deepEqual(emptied, { fullArray: [1, 2], fullNumber: 1 });
});
