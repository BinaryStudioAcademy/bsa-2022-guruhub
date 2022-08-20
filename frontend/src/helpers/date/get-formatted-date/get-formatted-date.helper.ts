import { formatDistance } from 'date-fns';

type FormatDate = 'distance';

const getFormattedDate = (date: string, format: FormatDate): string => {
  switch (format) {
    case 'distance': {
      return formatDistance(new Date(date), new Date());
    }
  }
};

export { getFormattedDate };
