import { compareAsc, compareDesc } from 'date-fns';

type sortingType = 'desc' | 'asc';

interface ShouldHaveCreatedAtProp {
  createdAt: string;
}

const sortDates = <T extends ShouldHaveCreatedAtProp>(
  items: T[],
  type: sortingType,
): T[] => {
  return items.sort((a, b) =>
    type === 'desc'
      ? compareDesc(new Date(a.createdAt), new Date(b.createdAt))
      : compareAsc(new Date(a.createdAt), new Date(b.createdAt)),
  );
};

export { sortDates };
