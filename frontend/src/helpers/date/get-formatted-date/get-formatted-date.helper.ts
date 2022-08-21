import { format } from 'date-fns';

const getFormattedDate = (
  dateString: string | null,
  formatToConvert: string,
): string => {
  if (!dateString) {
    return '';
  }
  const date = new Date(dateString);

  return format(date, formatToConvert);
};

export { getFormattedDate };
