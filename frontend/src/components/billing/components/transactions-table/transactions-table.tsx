import { PaginationDefaultValue } from 'common/enums/enums';
import { FC, TransactionGetAllItemResponseDto } from 'common/types/types';
import { TransactionsTableRow } from 'components/billing/common/types/types';
import {
  getTransactionsColumns,
  getTransactionsRows,
} from 'components/billing/helpers/helpers';
import { Table } from 'components/common/common';
import { useMemo } from 'hooks/hooks';
import { Column } from 'react-table';

import styles from './styles.module.scss';

type Props = {
  transactions: TransactionGetAllItemResponseDto[];
  page: number;
  onPageChange: (newPage: number) => void;
  userId: number;
  totalTransactionsNumber: number;
};

const TransactionsTable: FC<Props> = ({
  transactions,
  page,
  onPageChange,
  userId,
  totalTransactionsNumber,
}) => {
  const columns = useMemo<Column<TransactionsTableRow>[]>(() => {
    return getTransactionsColumns();
  }, []);

  const data = useMemo<TransactionsTableRow[]>(() => {
    return getTransactionsRows(transactions, userId);
  }, [transactions, userId]);

  return (
    <div className={styles.table}>
      <h1 className={styles.transactionsHeader}>Transactions</h1>
      <Table
        data={data}
        columns={columns}
        currentPage={page}
        onPageChange={onPageChange}
        pageSize={PaginationDefaultValue.DEFAULT_COUNT}
        totalCount={totalTransactionsNumber}
      />
    </div>
  );
};

export { TransactionsTable };
