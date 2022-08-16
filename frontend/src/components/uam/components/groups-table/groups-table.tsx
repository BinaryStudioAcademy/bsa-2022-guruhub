import { FC, GroupsItemResponseDto } from 'common/types/types';
import { Table } from 'components/common/common';
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
      <h1 className={styles.groupsTableHeading}>Groups</h1>
      <Table data={data} columns={columns} />
    </div>
  );
};

export { GroupsTable };
