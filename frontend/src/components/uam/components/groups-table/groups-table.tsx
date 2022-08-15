import { AppRoute } from 'common/enums/enums';
import { FC, GroupsItemResponseDto } from 'common/types/types';
import { Button, Table } from 'components/common/common';
import { Column } from 'react-table';

import styles from './styles.module.scss';

type Props = {
  columns: Column<GroupsItemResponseDto>[];
  data: GroupsItemResponseDto[];
};

const GroupsTable: FC<Props> = ({ columns, data }: Props) => {
  return (
    <div className={styles.groupsTable}>
      <div className={styles.groupTableHeadingPanel}>
        <h1 className={styles.groupsTableHeading}>Groups</h1>
        <Button
          label="Add Group"
          type="button"
          to={AppRoute.UAM_CREATE_GROUP}
        />
      </div>
      <Table data={data} columns={columns} />
    </div>
  );
};

export { GroupsTable };
