const groupByKey = <T>(items: T[], key: keyof T): Record<string, T[]> => {
  return items.reduce((hash, item) => {
    const groupName = item[key];

    if (typeof groupName !== 'string') {
      return hash;
    }

    const group = hash[groupName] ?? [];

    return {
      ...hash,
      [groupName]: group.concat(item),
    };
  }, {} as Record<string, T[]>);
};

export { groupByKey };
