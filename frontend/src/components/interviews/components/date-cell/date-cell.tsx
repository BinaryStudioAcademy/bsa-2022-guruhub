import { FC } from 'common/types/types';
import { InterviewsTableRow } from 'components/interviews/common/types/types';
import { getFormattedDate } from 'helpers/helpers';
import { CellProps } from 'react-table';

const DateCell: FC<CellProps<InterviewsTableRow>> = ({ value }) => {
  return <span>{getFormattedDate(value, 'time')}</span>;
};

export { DateCell };
