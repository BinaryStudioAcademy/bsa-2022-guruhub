import { AppRoute } from 'common/enums/enums';
import { FC, GroupsItemResponseDto } from 'common/types/types';
import { Button, Table } from 'components/common/common';
import { useNavigate } from 'hooks/hooks';
import { Column } from 'react-table';

import styles from './styles.module.scss';

type Props = {
  columns: Column<GroupsItemResponseDto>[];
  data: GroupsItemResponseDto[];
};

const GroupsTable: FC<Props> = ({ columns, data }: Props) => {
  const navigate = useNavigate();

  const handleAddGroupClick = (): void => {
    navigate(AppRoute.UAM_CREATE_GROUP);
  };

  return (
    <div className={styles.groupsTable}>
      <div className={styles.groupTableHeadingPanel}>
        <h1 className={styles.groupsTableHeading}>Groups</h1>
        <Button label="Add Group" type="button" onClick={handleAddGroupClick} />
      </div>
      <Table data={data} columns={columns} />
    </div>
  );
};

export { GroupsTable };
