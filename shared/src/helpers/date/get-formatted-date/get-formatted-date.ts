import { format, formatDistance } from 'date-fns';

type FormatDate = 'distance' | 'yyyy-MM-dd' | 'kk:mm, dd/MM/yyyy';

const getFormattedDate = (date: string, formatDate: FormatDate): string => {
  switch (formatDate) {
    case 'distance': {
      return formatDistance(new Date(date), new Date());
    }
    case 'yyyy-MM-dd': {
      return format(new Date(date), formatDate);
    }
    case 'kk:mm, dd/MM/yyyy': {
      return format(new Date(date), 'kk:mm, dd/MM/yyyy');
    }
  }
};

export { getFormattedDate };
