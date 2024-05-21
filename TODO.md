# TODO

- [ ] Support diffing, but ensure it's in sync with the equality-check algorithm. Some libraries under consideration include:
  - [diff](https://github.com/flitbit/diff) (text only)
  - [fast-diff](https://github.com/jhchen/fast-diff)
  - [deep-object-diff](https://github.com/mattphillips/deep-object-diff) (not much control over rules)
  - [concordance](https://github.com/concordancejs/concordance) (no typings currently; used by ava)
- [ ] Optinoal deep comparison of array items before merging
- [ ] Examine using wild-wild-utils' own merge function instead of [deepmerge-ts](https://github.com/RebeccaStevens/deepmerge-ts).
  - Support for Records, Sets, and a number of other ugly edge cases is super handy; it'd be a shame to miss it.
