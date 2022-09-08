import { format, formatDistance } from 'date-fns';

type FormatDate =
  | 'distance'
  | 'yyyy-MM-dd'
  | 'dd-MM-yyyy'
  | 'dd.MM.yyyy'
  | 'HH:mm'
  | 'HH:mm, dd.MM'
  | 'kk:mm, dd/MM/yyyy'
  | 'HH:mm dd.MM.yyyy';

const getFormattedDate = (date: string, formatDate: FormatDate): string => {
  switch (formatDate) {
    case 'distance': {
      return formatDistance(new Date(date), new Date());
    }
    case 'HH:mm':
    case 'HH:mm, dd.MM':
    case 'yyyy-MM-dd':
    case 'dd-MM-yyyy':
    case 'dd.MM.yyyy':
    case 'HH:mm dd.MM.yyyy':
    case 'kk:mm, dd/MM/yyyy': {
      return format(new Date(date), formatDate);
    }
  }
};

export { getFormattedDate };
