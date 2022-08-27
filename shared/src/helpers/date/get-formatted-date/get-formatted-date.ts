import { format, formatDistance } from 'date-fns';

type FormatDate = 'distance' | 'yyyy-MM-dd' | 'HH:mm, dd.MM';

const getFormattedDate = (date: string, formatDate: FormatDate): string => {
  switch (formatDate) {
    case 'distance': {
      return formatDistance(new Date(date), new Date());
    }
    case 'yyyy-MM-dd': {
      return format(new Date(date), formatDate);
    }
    case 'HH:mm, dd.MM': {
      return format(new Date(date), formatDate);
    }
  }
};

export { getFormattedDate };
