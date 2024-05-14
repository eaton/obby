import { deepEqual } from 'fast-equals';

/**
 * Deeply compares objects a and b.
 */
export function equals(a: unknown, b: unknown): boolean {
  return deepEqual(a, b);
}
