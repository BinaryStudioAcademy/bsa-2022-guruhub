import { AppRoute } from 'common/enums/enums';
import { FC, GroupsItemResponseDto } from 'common/types/types';
import { Button, Table } from 'components/common/common';
import {
  useAppDispatch,
  useAppSelector,
  useEffect,
  useMemo,
} from 'hooks/hooks';
import { Column } from 'react-table';
import { uamActions } from 'store/actions';

import { getGroupsColumns, getGroupsRows } from './helpers/helpers';
import styles from './styles.module.scss';

const GroupsTable: FC = () => {
  const dispatch = useAppDispatch();
  const { groups } = useAppSelector((state) => state.uam);

  useEffect(() => {
    dispatch(uamActions.getGroups());
  }, []);

  const handleGroupDelete = (groupId: number): void => {
    dispatch(uamActions.deleteGroup({ id: groupId }));
  };

  const columns = useMemo<Column<GroupsItemResponseDto>[]>(() => {
    return getGroupsColumns(handleGroupDelete);
  }, []);

  const data: GroupsItemResponseDto[] = getGroupsRows(groups);

  return (
    <div className={styles.groupsTable}>
      <div className={styles.groupTableHeadingPanel}>
        <h1 className={styles.groupsTableHeading}>Groups</h1>
        <Button
          label="Add Group"
          type="button"
          to={AppRoute.UAM_CONFIGURE_GROUP}
        />
      </div>
      <Table data={data} columns={columns} />
    </div>
  );
};

export { GroupsTable };
