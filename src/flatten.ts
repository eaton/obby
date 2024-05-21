import * as wwp from 'wild-wild-path';
import * as wwu from 'wild-wild-utils';
import { set } from './crud.js';

/**
 * Returns a copy of the input object with all nested properties flattened
 * to dot notation.
 * 
 * @example
 * ```js
 * const obj = {
 *   bool: true,
 *   prop: { number: 1, string: 'text' }
 * }
 * flatten(obj); // { bool: true, 'prop.number': 1, 'prop.string': 'text' }
 * ```
 * 
 * @argument target - Any array or object
 * @argument query - An optional path query with wildcards; only matching properties will be included in the flattened output.
 */
export function flatten(target: wwp.Target, query: string = '*', options?: wwp.Options) {
  return wwu.flatten(wwu.pick(target, query, { classes: true, entries: true, leaves: true, ...options }));
}

/**
 * Returns a copy of the input object with all dot-notation property keys
 * expanded to their full path.
 * 
 * @example
 * ```js
 * const obj = {
 *   bool: true,
 *   'prop.number': 1,
 *   'prop.string': 'text'
 * }
 * unflatten(obj); // { bool: true, prop: { number: 1, string: 'text' } }
 * ```
 */
export function unflatten(target: wwp.Target, options?: wwp.Options) {
  const output = {};
  for (const [k, v] of Object.entries(target)) {
    set(output, k, v, options);
  }
  return output;
}
