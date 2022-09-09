const groupByKey = <
  T extends Record<K, PropertyKey>,
  K extends keyof {
    [P in keyof T as T[P] extends PropertyKey ? P : never]: unknown;
  },
>(
  items: T[],
  key: keyof T,
): Record<T[keyof T], T[]> => {
  return items.reduce((hash, item) => {
    const groupName = item[key];

    if (typeof groupName !== 'string') return hash;

    const group = hash[groupName] ?? [];

    return {
      ...hash,
      [groupName]: group.concat(item),
    };
  }, Object.create(null));
};

export { groupByKey };
