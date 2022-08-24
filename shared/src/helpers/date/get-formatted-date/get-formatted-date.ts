import { format, formatDistance } from 'date-fns';

type FormatDate = 'distance' | 'time';

const getFormattedDate = (date: string, dateFormat: FormatDate): string => {
  switch (dateFormat) {
    case 'distance': {
      return formatDistance(new Date(date), new Date());
    }
    case 'time': {
      return format(new Date(date), 'kk:mm, dd/MM/yyyy');
    }
  }
};

export { getFormattedDate };
