import * as wwp from 'wild-wild-path';

export const defaultPathOptions: wwp.Options = {
  inherited: true,
  mutate: true,
  classes: true,
}

/** {@inheritDoc wild-wild-paths#has} */
export function has(target: wwp.Target, query: wwp.Query, options?: wwp.Options) {
  return wwp.has(target, query, { ...defaultPathOptions, ...options });
}

/** {@inheritDoc wild-wild-paths#get} */
export function get(target: wwp.Target, query: wwp.Query, options?: wwp.Options) {
  return wwp.get(target, query, { ...defaultPathOptions, ...options });
}

/** {@inheritDoc wild-wild-paths#list} */
export function getAll(target: wwp.Target, query: wwp.Query, options?: wwp.Options) {
  return wwp.list(target, query, { ...defaultPathOptions, ...options });
}

/** {@inheritDoc wild-wild-paths#set} */
export function set(target: wwp.Target, query: wwp.Query, value: unknown, options?: wwp.Options) {
  return wwp.set(target, query, value, { ...defaultPathOptions, ...options });
}

/** {@inheritDoc wild-wild-paths#remove} */
export function unset(target: wwp.Target, query: wwp.Query, options?: wwp.Options) {
  return wwp.remove(target, query, { ...defaultPathOptions, ...options });
}
