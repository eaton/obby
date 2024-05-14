import test from 'ava'
import * as dot from "../src/index.js";
import { nested } from './fixtures/values.js'

test('object merge', t => {
  const partial = { 
    l1: { 
      value: [ 4 ],
      l2: 'override',
    },
    new: 'text',
  };

  const mergedObject = dot.merge(nested, partial);

  t.deepEqual(dot.get(mergedObject, 'l1.value'), [...nested.l1.value, 4]);
  t.is(dot.get(mergedObject, 'l1.l2'), 'override');
  t.is(dot.get(mergedObject, 'new'), 'text');
});
