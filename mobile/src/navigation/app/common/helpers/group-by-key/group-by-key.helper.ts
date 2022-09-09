import { DrawerNavigationItem } from '../../types/types';

const groupByKey = (
  items: DrawerNavigationItem[],
  key: keyof DrawerNavigationItem,
): DrawerNavigationItem[][] => {
  return items.reduce((hash, item) => {
    if (item[key] === undefined) return hash;

    if (typeof key === 'string') {
      return Object.assign(hash, {
        [`${item[key]}`]: (hash[`${item[key]}`] || []).concat(item),
      });
    }
  }, Object.create(null));
};

export { groupByKey };
