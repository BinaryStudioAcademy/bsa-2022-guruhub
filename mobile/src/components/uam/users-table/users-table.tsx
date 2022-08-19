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

import { ActionCell } from './action-cell';
import { styles } from './styles';

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
  }, [page, users]);

  return (
    <View>
      <Text style={styles.label}>Users</Text>
      <View style={styles.tableWrapper}>
        <Table
          columns={usersColumns}
          data={tableData}
          columnWidthArr={[50, 250, 250, 150, 150]}
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
