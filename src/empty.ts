import is from "@sindresorhus/is";
import { merge } from "./merge.js";
import { get, set, unset } from "./crud.js";
import { EmptyOptions } from "./empty-options.js";

export const defaults: EmptyOptions = {
  null: true,
  string: true,
}

/**
 * Test whether a value is empty or not, based on emptines criteria specified in
 * the options parameter.
 * 
 * By default, `undefined`, `null`, and zero-length strings are treated as empty.
 */
export function isEmpty(input: unknown, options: EmptyOptions = {}) {
  const opt = merge(defaults, options);

  if (is.undefined(input)) return true;

  if (opt.none !== true) {
    if (is.null(input)) return !!opt.all || !!opt.null;
    if (is.whitespaceString(input)) return !!opt.all || !!opt.whitespace;
    if (is.emptyString(input)) return !!opt.all || !!opt.string;
    if (is.emptyObject(input)) return !!opt.all || !!opt.object;
    if (is.emptyArray(input)) return !!opt.all || !!opt.array;
    if (is.falsy(input)) return !!opt.all || !!opt.falsy;
    if (input === false) return !!opt.all || !!opt.false;
    if (is.buffer(input) && input.byteLength === 0) return !!opt.all || !!opt.object;
  }
  
  if (opt.custom) {
    const customResult = opt.custom(input, opt);
    if (customResult) return true;
  }

  return false;
}

/**
 * Returns `undefined` if the input matches the supplied emptinees criteria,
 * or an unmodified copy of the input if it does not.
 */
export function toEmpty<T>(input: T, options: EmptyOptions = {}): T | undefined {
  return isEmpty(input, options) ? undefined : input;
}

/**
 * Recursively walks an object's properties or an array's elements, removing any
 * that fit the supplied emptiness criteria.
 */
export function toEmptyDeep(input: unknown, options?: EmptyOptions) {
  if (isEmpty(input, options)) return undefined;

  if (is.array(input)) {
    return toEmpty(input.filter(i => toEmpty(i, options)));
  }
  
  if (is.object(input)) {
    for (const k in input) {
      const value = toEmptyDeep(get(input, k), options);

      if (isEmpty(value, options)) {
        unset(input, k);
      } else {
        set(input, k, value);
      }
    }
  }

  return toEmpty(input, options);
}