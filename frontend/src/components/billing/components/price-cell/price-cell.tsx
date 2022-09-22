import { FC } from 'common/types/types';
import { TransactionsTableRow } from 'components/billing/common/types/types';
import { CellProps } from 'react-table';

const PriceCell: FC<CellProps<TransactionsTableRow>> = ({ value }) => {
  return <span>$ {value}</span>;
};

export { PriceCell };
