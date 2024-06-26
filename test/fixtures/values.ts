export class TestClass {
  constructor(private v: string) {};
  protected p = 'protected';
  get accessor() {
    return this.v;
  }
  func() {
    return 'function value'
  }
}

export const date = new Date(1977, 7, 16);

export const map = new Map<string, number>([['first', 1], ['second', 2],['third', 3]]);

export const set = new Set<number>([1, 2, 3]);

export const buffer = Buffer.from('sometext');

export const func = () => 'return value';

export const url = new URL('https://example.com');

export const regex = /[\w]+/gi;

export const nan = NaN;

export const instance = new TestClass('test');

export const empty = {
  undefined: undefined, // Always considered empty
  null: null,         // Considered empty by default
  string: '',         // Considered empty by default
  array: [],
  whitespace: ' \t\n ',
  object: {},
  set: new Set<string>(),
  map: new Map<string, string>(),
  buffer: Buffer.from(''),
};

export const coercible = {
  string: 'text',
  int: '123',
  decimal: '1.233',
  percent: '52.7%',
  true: 'true',
  false: 'false',
  dateSlash: '1977/08/16',
  dateDash: '1977-08-16',
}

export const coerced = {
  int: 123,
  decimal: 1.233,
  percent: .527,
  true: true,
  false: false,
  dateSlash: new Date(1977, 9, 16),
  dateDash: new Date(1977, 9, 16)
}

export const primitives = {
  string: 'string',
  number: 1,
  bool: true,
  true: true,
  false: false,
  unknown: 'value' as unknown,
};

export const falsy = {
  zeroString: '0',
  zero: 0,
  zeroNegative: -0,
  stringEmpty: '',
  null: null,
  undefined: undefined,
}

export const truthy = {
  true: true,
  number: 1,
  negative: -1,
  stringFalse: 'false',
  stringWhitespace: ' ',
  array: [],
  object: {},
}

export const arrays = {
  strings: ['first', 'second', 'third', 'fourth'],
  numbers: [1,2,3,4],
  bools: [true, false],
  dates: [new Date(2024, 1, 1), new Date(2024, 1, 2)],
};

export const nested = {
  l1: {
    value: [1, 2, 3],
    l2: {
      value: [1, 2, 3],
      l3: {
        array: [{ value: 1 }, { value: 2 }]
      }
    },
  },
  value: [1, 2, 3]
}

export const complex = { date, map, set, buffer, func };

export const comparible = { primitives, arrays, nested, complex, empty, truthy, falsy, coercible, nan, instance, regex };

export const cloneable = { primitives, arrays, nested, complex, empty, truthy, falsy, coercible, nan, instance, url, regex };

export const all = { primitives, arrays, nested, complex, empty, truthy, falsy, coercible, coerced };
