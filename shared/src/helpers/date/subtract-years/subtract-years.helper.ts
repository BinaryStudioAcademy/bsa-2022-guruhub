import { subYears } from 'date-fns';

const subtractYears = (amount: number, date?: Date): Date => {
  return date ? subYears(date, amount) : subYears(new Date(), amount);
};

export { subtractYears };
