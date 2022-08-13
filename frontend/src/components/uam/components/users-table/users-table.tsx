import { PaginationDefaultValue } from 'common/enums/enums';
import { FC } from 'common/types/types';
import { Table } from 'components/common/common';
import { Pagination } from 'components/common/pagination/pagination';
import { UsersTableRow } from 'components/uam/common/types/types';
import {
  useAppDispatch,
  useAppSelector,
  useEffect,
  useMemo,
  useState,
} from 'hooks/hooks';
import { Column } from 'react-table';
import { uamActions } from 'store/actions';

import { getUsersColumns } from './helpers/helpers';
import styles from './styles.module.scss';

const UsersTable: FC = () => {
  const [page, setPage] = useState<number>(PaginationDefaultValue.DEFAULT_PAGE);
  const dispatch = useAppDispatch();
  const { users } = useAppSelector((state) => state.uam);

  const handlePageChange = (page: number): void => {
    setPage(page);
  };

  useEffect(() => {
    dispatch(
      uamActions.getUsers({
        page,
        count: PaginationDefaultValue.DEFAULT_COUNT,
      }),
    );
  }, [page]);

  const handleUserDelete = (userId: number): void => {
    dispatch(uamActions.deleteUser({ id: userId }));
  };

  const columns = useMemo<Column<UsersTableRow>[]>(() => {
    return getUsersColumns(handleUserDelete);
  }, []);

  return (
    <div className={styles.usersTable}>
      <h1 className={styles.usersTableHeading}>Users</h1>
      <Table data={users.items} columns={columns} />
      <Pagination
        currentPage={page}
        onPageChange={handlePageChange}
        pageSize={PaginationDefaultValue.DEFAULT_COUNT}
        totalCount={users.total}
      />
    </div>
  );
};

export { UsersTable };
