// I'd like to support diffing, but ensuring the diff algorithm is in
// sync with the equality-check algorithm will be critical. Some libraries
// under consideration include:
//
// - https://github.com/flitbit/diff (text only)
// - https://github.com/jhchen/fast-diff
// - https://github.com/mattphillips/deep-object-diff (not much control over rules)
// - https://github.com/concordancejs/concordance (no typings available; used by ava)

export * from './clone.js';
export * from './copy.js';
export * from './crud.js';
export * from './empty-options.js';
export * from './empty.js';
export * from './equals.js';
export * from './merge.js';
export * from './move.js';

// Currently unsupported; ts-dot-prop stops at arrays when bulding paths.
// export * from './inspect.js';