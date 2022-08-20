import React, { FC } from 'react';

import { PaginationDefaultValue } from '~/common/enums/enums';
import { Pagination, Table, Text, View } from '~/components/common/common';
import { getUsersColumns } from '~/components/uam/helpers/helpers';
import {
  useAppDispatch,
  useAppSelector,
  useEffect,
  useState,
} from '~/hooks/hooks';
import { uamActions } from '~/store/actions';

import { styles } from '../styles';
import { ActionCell } from './components/components';

const UsersTable: FC = () => {
  const [page, setPage] = useState<number>(PaginationDefaultValue.DEFAULT_PAGE);
  const dispatch = useAppDispatch();
  const { users } = useAppSelector((state) => state.uam);

  const handleUserDelete = (userId: number): void => {
    dispatch(uamActions.deleteUser({ id: userId }));
  };

  const usersColumns = getUsersColumns();

  const tableData = users.items.map((user) => ({
    ...user,
    action: <ActionCell id={user.id} onDelete={handleUserDelete} />,
  }));

  useEffect(() => {
    dispatch(
      uamActions.getUsers({
        page,
        count: PaginationDefaultValue.DEFAULT_COUNT,
      }),
    );
  }, [page]);

  return (
    <View style={styles.tableContainer}>
      <Text style={styles.tableTitle}>Users</Text>
      <View style={styles.tableWrapper}>
        <Table
          columns={usersColumns}
          data={tableData}
          columnWidthArr={[50, 190, 250, 150, 100]}
        />
      </View>
      <Pagination
        totalCount={users.total}
        pageSize={PaginationDefaultValue.DEFAULT_COUNT}
        currentPage={page}
        onPageChange={setPage}
      />
    </View>
  );
};

export { UsersTable };
