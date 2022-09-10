import { isToday } from 'date-fns';

const checkIsToday = (date: Date): boolean => {
  return isToday(date);
};

export { checkIsToday };
