import { ReactElement } from 'react';
import { Column } from 'react-table';
import { Table } from 'components/common/common';
import styles from './styles.module.scss';
import { UsersGetAllItemResponseDto } from 'guruhub-shared';

type Props = {
  columns: Column<UsersGetAllItemResponseDto>[];
  data: readonly UsersGetAllItemResponseDto[];
};

const UsersTable = ({ columns, data }: Props): ReactElement => {
  return (
    <div className={styles.usersTable}>
      <h1 className={styles.usersTableHeading}>Users</h1>
      <Table data={data} columns={columns} />
    </div>
  );
};

export { UsersTable };
