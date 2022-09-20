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
  handlePageChange: (newPage: number) => void;
  userId: number;
  totalTransactionsNumber: number;
};

const TransactionsTable: FC<Props> = ({
  transactions,
  page,
  handlePageChange,
  userId,
  totalTransactionsNumber,
}) => {
  const columns = useMemo<Column<TransactionsTableRow>[]>(() => {
    return getTransactionsColumns();
  }, []);

  const data: TransactionsTableRow[] = getTransactionsRows(
    transactions,
    userId,
  );

  return (
    <div className={styles.table}>
      <Table
        data={data}
        columns={columns}
        currentPage={page}
        onPageChange={handlePageChange}
        pageSize={PaginationDefaultValue.DEFAULT_COUNT}
        totalCount={totalTransactionsNumber}
      />
    </div>
  );
};

export { TransactionsTable };
