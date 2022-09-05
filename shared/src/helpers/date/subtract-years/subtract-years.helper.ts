import { subYears } from 'date-fns';

const subtractYears = (date: Date, amount: number): Date => {
  return subYears(date, amount);
};

export { subtractYears };
