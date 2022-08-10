import { FC, UsersGetAllItemResponseDto } from 'common/types/types';
import { Table } from 'components/common/common';
import { Column } from 'react-table';

import styles from './styles.module.scss';

type Props = {
  columns: Column<UsersGetAllItemResponseDto>[];
  data: UsersGetAllItemResponseDto[];
  onClick: (userId: string) => void;
};

const UsersTable: FC<Props> = ({ columns, data, onClick }: Props) => {
  return (
    <div className={styles.usersTable}>
      <h1 className={styles.usersTableHeading}>Users</h1>
      <Table data={data} columns={columns} onClick={onClick} />
    </div>
  );
};

export { UsersTable };
