import * as wwpr from 'wild-wild-parser';

/**
 * Returns `true` if the input is a valid dot-notation query. Queries may
 * include wildcard characters and array index notation, like `2:5`.
 * 
 * @example
 * ```js
 * isQuery('users.0.*')       // true
 * parseQuery('users admins') // true
 * parseQuery('users./[/')    // false: invalid RegExp
 * ```
 * 
 * @remarks
 * When used with the `get()` function, wildcard queries will still only
 * return a single result.
 */
export function isQuery(input: unknown): input is wwpr.QueryString {
  if (typeof input === 'string') {
    try {
      return !!wwpr.parseQuery(input);
    } catch {
      return false;
    }
  }
  return false;
}

/**
 * Returns `true` if the input is a valid dot-notation property path
 * with no wildcard characters or special array index notation.
 * 
 * @example
 * ```js
 * parsePath('users.0')   // true
 * parsePath('*')         // false: this is a valid query but not a path
 * ```
 * 
 */
export function isPath(input: unknown): input is wwpr.PathString {
  if (typeof input === 'string') {
    try {
      return !!wwpr.parsePath(input);
    } catch {
      return false;
    }
  }
  return false;
}
