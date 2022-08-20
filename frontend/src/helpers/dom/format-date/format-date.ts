import { FormatDate } from 'common/types/types';
import { formatDistance } from 'date-fns';

const formatDate = (date: string, format: FormatDate): string => {
  switch (format) {
    case 'distance': {
      return formatDistance(new Date(date), new Date());
    }
  }
};

export { formatDate };
