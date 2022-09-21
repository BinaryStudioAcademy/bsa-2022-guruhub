import { FC } from 'common/types/types';
import { TransactionsTableRow } from 'components/billing/common/types/types';
import { getFormattedDate } from 'helpers/helpers';
import { CellProps } from 'react-table';

const DateCell: FC<CellProps<TransactionsTableRow>> = ({ value }) => {
  const formattedDate = getFormattedDate(value, 'HH:mm dd.MM.yyyy');

  return <span>{formattedDate}</span>;
};

export { DateCell };
