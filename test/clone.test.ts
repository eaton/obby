import test from 'ava'
import * as dot from "../src/index.js";
import { cloneable } from './fixtures/values.js'

test('all supported types', t => {
  for (const [, v] of Object.entries(cloneable)) {
    t.deepEqual(v, dot.clone(v));
  }

  t.deepEqual(cloneable, dot.clone(cloneable));
});

test('circular reference', t => {
  const obj: Record<string, unknown> = { string: 'text', number: 1 };
  obj.circular = obj;

  t.notThrows(() => dot.clone(obj));
  t.deepEqual(dot.clone(obj), obj);
});

test('query/path distinction', t => {
  t.is(dot.isPath('foo.bar.0'), true);
  t.is(dot.isPath('foo.*.bar.1:2'), false);
  t.is(dot.isQuery('foo.bar.1:2'), true);
  t.is(dot.isQuery('foo.*.bar.1:2'), true);
})