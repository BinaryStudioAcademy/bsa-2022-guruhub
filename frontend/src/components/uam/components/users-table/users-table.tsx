import { PaginationDefaultValue } from 'common/enums/enums';
import { FC, UserWithPermissions } from 'common/types/types';
import { Table } from 'components/common/common';
import { UsersTableRow } from 'components/uam/common/types/types';
import {
  useAppDispatch,
  useAppSelector,
  useEffect,
  useMemo,
  usePagination,
} from 'hooks/hooks';
import { Column } from 'react-table';
import { uamActions } from 'store/actions';

import { getUsersColumns, getUserTableData } from './helpers/helpers';
import styles from './styles.module.scss';

const UsersTable: FC = () => {
  const { page, handlePageChange } = usePagination({ queryName: 'page' });
  const dispatch = useAppDispatch();

  const { user, users, usersTotalCount } = useAppSelector((state) => ({
    user: state.auth.user,
    users: state.uam.users,
    usersTotalCount: state.uam.usersTotalCount,
  }));

  useEffect(() => {
    dispatch(
      uamActions.getUsers({
        page,
        count: PaginationDefaultValue.DEFAULT_COUNT,
      }),
    );
  }, [page, usersTotalCount]);

  const handleUserDelete = (userId: number): void => {
    dispatch(uamActions.deleteUser({ id: userId }));
  };

  const columns = useMemo<Column<UsersTableRow>[]>(() => {
    return getUsersColumns(user as UserWithPermissions, handleUserDelete);
  }, []);

  const usersData = useMemo<UsersTableRow[]>(() => {
    return getUserTableData(users);
  }, [users]);

  return (
    <div className={styles.usersTable}>
      <h1 className={styles.usersTableHeading}>Users</h1>
      <Table
        data={usersData}
        columns={columns}
        currentPage={page}
        onPageChange={handlePageChange}
        pageSize={PaginationDefaultValue.DEFAULT_COUNT}
        totalCount={usersTotalCount}
      />
    </div>
  );
};

export { UsersTable };
