import copy from 'fast-copy';
/**
 * Deep clone an Object, Array or Primitive value.
 *
 * @remarks
 *
 * All JSON types (Object, Array, Number, String, and null) are supported, as
 * well as a few other more complex structures (Date, Buffer, TypedArray, Map,
 * Set, and undefined).
 *
 * @see {@link https://github.com/planttheidea/fast-copy}
 */
export const clone = copy;
