import { Path, Query } from 'wild-wild-parser';
import { isPath } from './type-guards.js';
import * as wwp from 'wild-wild-path';

export const defaultPathOptions: wwp.Options = {
  inherited: true,
  mutate: true,
  classes: true,
}

/** {@inheritDoc wild-wild-paths#has} */
export function has(target: wwp.Target, path: Path, options?: wwp.Options) {
  if (isPath(path)) return wwp.has(target, path, { ...defaultPathOptions, ...options });
  return false;
}

/** {@inheritDoc wild-wild-paths#get} */
export function get(target: wwp.Target, query: Query, options?: wwp.Options) {
  return wwp.get(target, query, { ...defaultPathOptions, ...options });
}

/** {@inheritDoc wild-wild-paths#list} */
export function getAll(target: wwp.Target, query: Query, options?: wwp.Options) {
  return wwp.list(target, query, { ...defaultPathOptions, ...options });
}

/** {@inheritDoc wild-wild-paths#set} */
export function set(target: wwp.Target, path: Path, value: unknown, options?: wwp.Options) {
  if (isPath(path)) return wwp.set(target, path, value, { ...defaultPathOptions, ...options });
  return target;
}

/** {@inheritDoc wild-wild-paths#remove} */
export function unset(target: wwp.Target, path: Path, options?: wwp.Options) {
  if (isPath(path)) return wwp.remove(target, path, { ...defaultPathOptions, ...options });
  return target;
}
