import React, { FC, useEffect, useMemo, useState } from 'react';

import { PaginationDefaultValue } from '~/common/enums/enums';
import { TableColumn } from '~/common/types/ui/ui';
import { Pagination, Table, Text, View } from '~/components/common/common';
import { useAppDispatch, useAppSelector } from '~/hooks/hooks';
import { uamActions } from '~/store/actions';

import { UsersTableData } from '../common/types/types';
import { getUsersColumns } from '../helpers/helpers';
import { ActionCell } from './action-cell';
import { styles } from './styles';

const UsersTable: FC = () => {
  const [page, setPage] = useState<number>(PaginationDefaultValue.DEFAULT_PAGE);
  const dispatch = useAppDispatch();
  const { users } = useAppSelector((state) => state.uam);

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

  const usersColumns = useMemo<TableColumn<UsersTableData>[]>(() => {
    return getUsersColumns();
  }, []);

  const tableData = users.items.map((user) => ({
    ...user,
    action: <ActionCell id={user.id} onDelete={handleUserDelete} />,
  }));

  return (
    <View>
      <Text style={styles.label}>Users</Text>
      <View style={styles.tableWrapper}>
        <Table
          columns={usersColumns}
          data={tableData}
          columnWidthArr={[80, 180, 260, 220, 100]}
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
