import { compareDesc } from 'date-fns';

const sortDatesDesc = (firstDate: string, secondDate: string): number => {
  return compareDesc(new Date(firstDate), new Date(secondDate));
};

export { sortDatesDesc };
