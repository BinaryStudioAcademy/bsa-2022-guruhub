import { compareAsc, compareDesc } from 'date-fns';

type sortingType = 'desc' | 'asc';

type sortItems<T> = {
  items: T[];
  key: keyof T;
};

const sortByDate = <T>(
  sortItems: sortItems<T>,
  type: sortingType = 'desc',
): T[] => {
  const sortingHelper = type === 'desc' ? compareDesc : compareAsc;
  const sortingKey = sortItems.key;

  return sortItems.items.sort((a, b) =>
    sortingHelper(new Date(`${a[sortingKey]}`), new Date(`${b[sortingKey]}`)),
  );
};

export { sortByDate };
