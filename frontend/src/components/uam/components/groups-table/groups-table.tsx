import { FC, GroupsItemResponseDto } from 'common/types/types';
import { Table } from 'components/common/common';
import { Column } from 'react-table';

import styles from './styles.module.scss';

type Props = {
  columns: Column<GroupsItemResponseDto>[];
  data: GroupsItemResponseDto[];
};

const GroupsTable: FC<Props> = ({ columns, data }: Props) => {
  return (
    <div className={styles.groupsTable}>
      <h1 className={styles.groupsTableHeading}>Groups</h1>
      <Table data={data} columns={columns} />
    </div>
  );
};

export { GroupsTable };
