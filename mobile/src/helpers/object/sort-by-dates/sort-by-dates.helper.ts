import { compareAsc, compareDesc } from 'date-fns';

type sortingType = 'desc' | 'asc';

interface ShouldHaveCreatedAtProp {
  createdAt: string;
}

const sortByDates = <T extends ShouldHaveCreatedAtProp>(
  items: T[],
  type: sortingType,
): T[] => {
  const sortingHelper = type === 'desc' ? compareDesc : compareAsc;

  return items.sort((a, b) =>
    sortingHelper(new Date(a.createdAt), new Date(b.createdAt)),
  );
};

export { sortByDates };
