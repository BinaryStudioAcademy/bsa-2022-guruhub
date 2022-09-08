import { FC } from 'common/types/types';
import { InterviewsTableRow } from 'components/interviews/common/types/types';
import { getFormattedDate } from 'helpers/helpers';
import { CellProps } from 'react-table';

const DateCell: FC<CellProps<InterviewsTableRow>> = ({ value }) => {
  const formattedDate = value
    ? getFormattedDate(value, 'HH:mm dd.MM.yyyy')
    : 'Not Set';

  return <span>{formattedDate}</span>;
};

export { DateCell };
