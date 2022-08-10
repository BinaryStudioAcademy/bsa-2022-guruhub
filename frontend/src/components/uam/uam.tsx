import {
  FC,
  GroupsResponseDto,
  UsersGetAllItemResponseDto,
} from 'common/types/types';
import { useAppDispatch, useAppSelector, useEffect } from 'hooks/hooks';
import { Column } from 'react-table';
import { uamActions } from 'store/actions';

import { GroupsTable, UsersTable } from './components/components';
import {
  getGroupsColumns,
  getGroupsRows,
  getUsersColumns,
  getUsersRows,
} from './helpers/helpers';
import styles from './styles.module.scss';

const UAM: FC = () => {
  const dispatch = useAppDispatch();
  const { users, groups } = useAppSelector((state) => state.uam);

  useEffect(() => {
    dispatch(uamActions.getUsers());
  }, []);

  useEffect(() => {
    dispatch(uamActions.getGroups());
  }, []);

  const usersColumns: Column<UsersGetAllItemResponseDto>[] = getUsersColumns();
  const usersRows: UsersGetAllItemResponseDto[] = getUsersRows(users);

  const groupsColumns: Column<GroupsResponseDto>[] = getGroupsColumns();
  const groupsRows: GroupsResponseDto[] = getGroupsRows(groups);

  return (
    <div className={styles.uam}>
      <h1 className={styles.pageTitle}>User Access Managment</h1>
      <UsersTable data={usersRows} columns={usersColumns} />
      <GroupsTable data={groupsRows} columns={groupsColumns} />
    </div>
  );
};

export { UAM };
