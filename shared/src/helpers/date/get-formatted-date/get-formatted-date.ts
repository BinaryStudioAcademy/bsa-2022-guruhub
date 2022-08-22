import { format, formatDistance } from 'date-fns';

import { FormatDate } from '~/common/enums/enums';

const getFormattedDate = (date: string, formatDate: FormatDate): string => {
  switch (formatDate) {
    case FormatDate.DISTANCE: {
      return formatDistance(new Date(date), new Date());
    }
    case FormatDate.YYYY_MM_DD: {
      if (date.trim() === '') {
        return '';
      }

      return format(new Date(date), formatDate);
    }
    default: {
      return '';
    }
  }
};

export { getFormattedDate };
