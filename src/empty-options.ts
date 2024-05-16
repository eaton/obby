/**
 * Controls what values Obby's `isEmpty()`, `empty()`, and `emptyDeep()` functions
 * treats as 'empty'.
 * 
 * @defaultValue: `{ null: true, string: true, array: true, object: true, buffer: true, map: true, set: true }`
 */
export type EmptyOptions = (EmptyOptionsByType | EmptyOptionsAll | EmptyOptionsNone) & EmptyOptionsCustom;

type EmptyOptionsAll = {
  /**
   * Treat every empty-like value as empty. This option option overrides all other options.
   * 
   * @defaultValue `false`
   */
  all?: true
}

type EmptyOptionsNone = {
  /**
   * *Only* treat truly undefined values as empty.
   * 
   * @defaultValue `false`
   */
  none?: true
};

type EmptyOptionsByType = {
  /**
   * Treat `null` as empty.
   * 
   * @defaultValue `true`
   */
  null?: boolean,

  /**
   * Treat zero-length strings as empty.
   * 
   * @defaultValue `true`
   */
  string?: boolean,

  /**
   * Treat zero-length arrays as empty.
   * 
   * @defaultValue `true`
   */
  array?: boolean,

  /**
   * Treat zero-length buffers as empty.
   * 
   * @defaultValue `true`
   */
  buffer?: boolean,

  /**
   * Treat zero-item sets as empty.
   * 
   * @defaultValue `true`
   */
  set?: boolean,

  /**
   * Treat zero-item maps as empty.
   * 
   * @defaultValue `true`
   */
  map?: boolean,

  /**
   * Treat objects with no properties, and zero-length Records, as empty when processing
   * and filtering values.
   * 
   * @defaultValue `true`
   */
  object?: boolean,

  /**
   * Treat strings containing only whitespace as empty.
   * 
   * @defaultValue `false`
   */
  whitespace?: boolean,

  /**
   * Treat boolean `false` as empty.
   * 
   * @defaultValue `false`
   */
  false?: boolean,

  /**
   * Treat any "falsy" values as empty, including `0`, empty strings, the word 'false', etc.
   * 
   * @defaultValue `false`
   */
  falsy?: boolean,

  /**
   * Treat NaN values as empty.
   * 
   * @defaultValue `false`
   */
  nan?: boolean,
}

type EmptyOptionsCustom = {
  /**
   * A custom function to override normal emptiness checking.
   */
  custom?: (input: unknown, options?: EmptyOptions) => boolean
}
