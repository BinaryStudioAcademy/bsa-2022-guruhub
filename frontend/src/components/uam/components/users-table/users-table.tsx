import { FC, UsersGetAllItemResponseDto } from 'common/types/types';
import { Table } from 'components/common/common';
import { Column } from 'react-table';

import styles from './styles.module.scss';

type Props = {
  columns: Column<UsersGetAllItemResponseDto>[];
  data: UsersGetAllItemResponseDto[];
};

const UsersTable: FC<Props> = ({ columns, data }: Props) => {
  return (
    <div className={styles.usersTable}>
      <h1 className={styles.usersTableHeading}>Users</h1>
      <Table data={data} columns={columns} />
    </div>
  );
};

export { UsersTable };
