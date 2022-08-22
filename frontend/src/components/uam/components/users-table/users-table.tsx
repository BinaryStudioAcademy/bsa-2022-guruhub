import { PaginationDefaultValue } from 'common/enums/enums';
import { FC } from 'common/types/types';
import { Pagination, Table } from 'components/common/common';
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

import { getUsersColumns } from './helpers/helpers';
import styles from './styles.module.scss';

const UsersTable: FC = () => {
  const { page, handlePageChange } = usePagination({ queryName: 'page' });
  const dispatch = useAppDispatch();
  const { users, usersTotalCount } = useAppSelector((state) => state.uam);

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
    return getUsersColumns(handleUserDelete);
  }, []);

  return (
    <div className={styles.usersTable}>
      <h1 className={styles.usersTableHeading}>Users</h1>
      <Table data={users} columns={columns} />
      <div className={styles.tableFooterSection}>
        <p className={styles.results}>{usersTotalCount} results</p>
        <Pagination
          currentPage={page}
          onPageChange={handlePageChange}
          pageSize={PaginationDefaultValue.DEFAULT_COUNT}
          totalCount={usersTotalCount}
        />
      </div>
    </div>
  );
};

export { UsersTable };
