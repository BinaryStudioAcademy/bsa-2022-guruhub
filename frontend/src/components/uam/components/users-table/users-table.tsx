import { PaginationDefaultValue } from 'common/enums/enums';
import { FC, UsersGetResponseDto } from 'common/types/types';
import { Table } from 'components/common/common';
import { Pagination } from 'components/common/pagination/pagination';
import { getUsersColumns, getUsersRows } from 'components/uam/helpers/helpers';
import {
  useAppDispatch,
  useAppSelector,
  useEffect,
  useState,
} from 'hooks/hooks';
import { Column } from 'react-table';
import { uamActions } from 'store/actions';

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

  const columns: Column<UsersGetResponseDto>[] = getUsersColumns();
  const rows: UsersGetResponseDto[] = getUsersRows(users.items);

  return (
    <div className={styles.usersTable}>
      <h1 className={styles.usersTableHeading}>Users</h1>
      <Table data={rows} columns={columns} />
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
