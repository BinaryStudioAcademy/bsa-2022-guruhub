import { FC, GroupsGetAllItemResponseDto } from 'common/types/types';
import { useAppDispatch, useAppSelector, useEffect } from 'hooks/hooks';
import { Column } from 'react-table';
import { uamActions } from 'store/actions';

import { UsersTableType } from './common/types/types';
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

  const handleUserDelete = (userId: string): void => {
    dispatch(uamActions.deleteUser({ id: userId }));
  };

  const usersColumns: Column<UsersTableType>[] = getUsersColumns();
  const usersRows: UsersTableType[] = getUsersRows(users, handleUserDelete);

  const groupsColumns: Column<GroupsGetAllItemResponseDto>[] =
    getGroupsColumns();
  const groupsRows: GroupsGetAllItemResponseDto[] = getGroupsRows(groups);

  return (
    <div className={styles.uam}>
      <h1 className={styles.pageTitle}>User Access Managment</h1>
      <UsersTable data={usersRows} columns={usersColumns} />
      <GroupsTable data={groupsRows} columns={groupsColumns} />
    </div>
  );
};

export { UAM };
