import { FC, GroupItemResponseDto } from 'common/types/types';
import { useAppDispatch, useAppSelector, useEffect } from 'hooks/hooks';
import { Column } from 'react-table';
import { uamActions } from 'store/actions';

import { GroupsTable, UsersTable } from './components/components';
import { getGroupsColumns, getGroupsRows } from './helpers/helpers';
import styles from './styles.module.scss';

const UAM: FC = () => {
  const dispatch = useAppDispatch();
  const { groups } = useAppSelector((state) => state.uam);

  useEffect(() => {
    dispatch(uamActions.getGroups());
  }, []);

  const groupsColumns: Column<GroupItemResponseDto>[] = getGroupsColumns();
  const groupsRows: GroupItemResponseDto[] = getGroupsRows(groups);

  return (
    <div className={styles.uam}>
      <h1 className={styles.pageTitle}>User Access Managment</h1>
      <UsersTable />
      <GroupsTable data={groupsRows} columns={groupsColumns} />
    </div>
  );
};

export { UAM };
