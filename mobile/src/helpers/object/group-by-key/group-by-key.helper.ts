const groupByKey = <T>(
  items: T[],
  key: keyof T,
): Array<Record<T[keyof T], T[]>> => {
  return items.reduce((hash, item) => {
    if (item[key] === undefined) return hash;

    return Object.assign(hash, {
      [`${item[key]}`]: (hash[`${item[key]}`] || []).concat(item),
    });
  }, Object.create(null));
};

export { groupByKey };
