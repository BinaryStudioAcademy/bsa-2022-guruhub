import { isToday } from 'date-fns';

const isTodayCheck = (date: Date): boolean => {
  return isToday(date);
};

export { isTodayCheck };
