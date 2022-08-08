import { ReactElement } from 'react';
import { Column } from 'react-table';
import { Table } from '../../common/common';
import styles from './styles.module.scss';

type Props<Data extends Record<string, unknown>> = {
  columns: Column<Data>[];
  data: readonly Data[];
};

const UsersTable = <Data extends Record<string, unknown>>({
  columns,
  data,
}: Props<Data>): ReactElement => {
  return (
    <div className={styles.usersTable}>
      <h1 className={styles.usersTableHeading}>Users</h1>
      <Table data={data} columns={columns} />
      <p className={styles.results}>
        {data.length} {`result${data.length > 1 ? 's' : ''}`}
      </p>
    </div>
  );
};

export { UsersTable };
