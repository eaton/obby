import test from 'ava'
import * as dot from "../src/index.js";
import { empty } from './fixtures/values.js'

test('undefined always empty', t => {
  t.assert(dot.isEmpty(undefined));
  t.assert(dot.isEmpty(undefined, { all: true }));
  t.assert(dot.isEmpty(undefined, { none: true }));
});

test('null', t => {
  t.assert(dot.isEmpty(null));
  t.assert(dot.isEmpty(null, { all: true }));
  t.assert(!dot.isEmpty(null, { null: false }));
  t.assert(!dot.isEmpty(null, { none: true }));
});

test('array', t => {
  t.assert(!dot.isEmpty([]));
  t.assert(dot.isEmpty([], { array: true }));
  t.assert(dot.isEmpty([], { all: true }));
  t.assert(!dot.isEmpty([], { none: true }));
});

test('string', t => {
  t.assert(dot.isEmpty(''));
  t.assert(dot.isEmpty('', { string: true }));
  t.assert(dot.isEmpty('', { all: true }));
  t.assert(!dot.isEmpty('', { none: true }));
});

test('whitespace', t => {
  t.assert(!dot.isEmpty(' \t\n '));
  t.assert(dot.isEmpty(' \t\n ', { whitespace: true }));
  t.assert(dot.isEmpty(' \t\n ', { all: true }));
  t.assert(!dot.isEmpty(' \t\n ', { none: true }));
});

test('object', t => {
  t.assert(!dot.isEmpty({}));
  t.assert(dot.isEmpty({}, { object: true }));
  t.assert(dot.isEmpty({}, { all: true }));
  t.assert(!dot.isEmpty({}, { none: true }));
});

test('map', t => {
  const val = new Map<string, string>();
  t.assert(!dot.isEmpty(val));
  t.assert(dot.isEmpty(val, { object: true }));
  t.assert(dot.isEmpty(val, { all: true }));
  t.assert(!dot.isEmpty(val, { none: true }));
});

test('set', t => {
  const val = new Set<string>();
  t.assert(!dot.isEmpty(val));
  t.assert(dot.isEmpty(val, { object: true }));
  t.assert(dot.isEmpty(val, { all: true }));
  t.assert(!dot.isEmpty(val, { none: true }));
});

test('buffer', t => {
  const val = Buffer.from('');
  t.assert(!dot.isEmpty(val));
  t.assert(dot.isEmpty(val, { object: true }));
  t.assert(dot.isEmpty(val, { all: true }));
  t.assert(!dot.isEmpty(val, { none: true }));
});

test('custom handler', t => {
  t.assert(dot.isEmpty('empty', { custom: v => v === 'empty' }));
  t.assert(!dot.isEmpty('full', { custom: v => v === 'empty' }));
});

test('empty count matches', t => {
  const defaults = Object.values(empty).filter(v => dot.isEmpty(v));
  const onlyUndefined = Object.values(empty).filter(v => dot.isEmpty(v, { none: true }));
  const allEmpty = Object.values(empty).filter(v => dot.isEmpty(v, { all: true }));

  t.is(allEmpty.length, 9);
  t.is(defaults.length, 3);
  t.is(onlyUndefined.length, 1);
})

test('deep empty filtering', t => {
  const test = { fullNumber: 1, fullArray: [1, 2, []], nested: empty, ...empty };
  const expected = { fullArray: [1, 2], fullNumber: 1 };

  t.deepEqual(expected, dot.toEmptyDeep(test, { all: true }));
});
