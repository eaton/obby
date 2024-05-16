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
  t.assert(dot.isEmpty([]));
  t.assert(!dot.isEmpty([], { array: false }));
  t.assert(dot.isEmpty([], { all: true }));
  t.assert(!dot.isEmpty([], { none: true }));
});

test('string', t => {
  t.assert(dot.isEmpty(''));
  t.assert(!dot.isEmpty('', { string: false }));
  t.assert(dot.isEmpty('', { all: true }));
  t.assert(!dot.isEmpty('', { none: true }));
});

test('object', t => {
  t.assert(dot.isEmpty({}));
  t.assert(!dot.isEmpty({}, { object: false }));
  t.assert(dot.isEmpty({}, { all: true }));
  t.assert(!dot.isEmpty({}, { none: true }));
});

test('map', t => {
  const val = new Map<string, string>();
  t.assert(dot.isEmpty(val));
  t.assert(!dot.isEmpty(val, { map: false }));
  t.assert(dot.isEmpty(val, { all: true }));
  t.assert(!dot.isEmpty(val, { none: true }));
});

test('set', t => {
  const val = new Set<string>();
  t.assert(dot.isEmpty(val));
  t.assert(!dot.isEmpty(val, { set: false }));
  t.assert(dot.isEmpty(val, { all: true }));
  t.assert(!dot.isEmpty(val, { none: true }));
});

test('buffer', t => {
  const val = Buffer.from('');
  t.assert(dot.isEmpty(val));
  t.assert(!dot.isEmpty(val, { buffer: false }));
  t.assert(dot.isEmpty(val, { all: true }));
  t.assert(!dot.isEmpty(val, { none: true }));
});

test('whitespace', t => {
  t.assert(!dot.isEmpty(' \t\n '));
  t.assert(dot.isEmpty(' \t\n ', { whitespace: true }));
  t.assert(dot.isEmpty(' \t\n ', { all: true }));
  t.assert(!dot.isEmpty(' \t\n ', { none: true }));
});

test('false', t => {
  t.assert(!dot.isEmpty(false));
  t.assert(dot.isEmpty(false, { false: true }));
  t.assert(dot.isEmpty(false, { all: true }));
  t.assert(!dot.isEmpty(false, { none: true }));
});

test('falsy', t => {
  t.assert(!dot.isEmpty(0));
  t.assert(dot.isEmpty(0, { falsy: true }));
  t.assert(dot.isEmpty(0, { all: true }));
  t.assert(!dot.isEmpty(0, { none: true }));
});

test('nan', t => {
  t.assert(!dot.isEmpty(NaN));
  t.assert(dot.isEmpty(NaN, { nan: true }));
  t.assert(dot.isEmpty(NaN, { all: true }));
  t.assert(!dot.isEmpty(NaN, { none: true }));
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
  t.is(defaults.length, 8);
  t.is(onlyUndefined.length, 1);
})

test('deep empty filtering', t => {
  const input = {
    fullNumber: 1,
    fullArray: [1, 2, []],
    fullSet: new Set(['first', '']),
    fullMap: new Map([[1, 'one'], [2, '']]),
    nested: empty,
    ...empty
  };
  const expected = {
    fullArray: [1, 2],
    fullNumber: 1,
    fullSet: new Set(['first']),
    fullMap: new Map([[1, 'one']])
  };

  t.deepEqual(dot.toEmptyDeep(input, { all: true }), expected);
});

test('set filtering', t => {
  const input = new Set(['first', '']);
  const expected = new Set(['first']);
  t.deepEqual(dot.toEmptyDeep(input, { all: true }), expected);
});
