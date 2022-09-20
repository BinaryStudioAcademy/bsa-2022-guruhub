import { TransactionsTableAccessor } from 'components/billing/common/enums/enums';
import { TransactionsTableRow } from 'components/billing/common/types/types';
import {
  DateCell,
  PriceCell,
  StatusCell,
  TransactionTypeCell,
} from 'components/billing/components/components';
import { Column } from 'react-table';

const getTransactionsColumns = (): Column<TransactionsTableRow>[] => {
  return [
    {
      Header: 'Transaction type',
      accessor: TransactionsTableAccessor.TYPE,
      Cell: TransactionTypeCell,
      width: 160,
      minWidth: 160,
    },
    {
      Header: 'Price',
      accessor: TransactionsTableAccessor.PRICE,
      Cell: PriceCell,
      width: 100,
      minWidth: 100,
    },
    {
      Header: 'Status',
      accessor: TransactionsTableAccessor.STATUS,
      Cell: StatusCell,
      width: 150,
      minWidth: 150,
    },
    {
      Header: 'Date',
      accessor: TransactionsTableAccessor.DATE,
      Cell: DateCell,
      width: 100,
      minWidth: 100,
    },
  ];
};

export { getTransactionsColumns };
