import React, { FC } from 'react';

import { PaginationDefaultValue } from '~/common/enums/enums';
import { Pagination, Table, Text, View } from '~/components/common/common';
import { getUsersColumns } from '~/components/uam/helpers/helpers';
import { getFormattedDate } from '~/helpers/helpers';
import {
  useAppDispatch,
  useAppSelector,
  useEffect,
  useState,
} from '~/hooks/hooks';
import { uamActions } from '~/store/actions';

import { ActionCell } from './components/components';
import { styles } from './styles';

const UsersTable: FC = () => {
  const [page, setPage] = useState<number>(PaginationDefaultValue.DEFAULT_PAGE);
  const dispatch = useAppDispatch();
  const { users, usersTotalCount, currentUserID } = useAppSelector(
    ({ uam, auth }) => ({
      users: uam.users,
      usersTotalCount: uam.usersTotalCount,
      currentUserID: auth.user?.id,
    }),
  );

  const handleUserDelete = (userId: number): void => {
    dispatch(uamActions.deleteUser({ id: userId }));
  };

  const usersColumns = getUsersColumns();

  const tableData = users.map((user) => ({
    ...user,
    fullName: user.userDetails.fullName,
    createdAt: getFormattedDate(user.createdAt, 'HH:mm dd.MM.yyyy'),
    ...(currentUserID !== user.id && {
      action: <ActionCell id={user.id} onDelete={handleUserDelete} />,
    }),
  }));

  useEffect(() => {
    dispatch(
      uamActions.getUsers({
        page,
        count: PaginationDefaultValue.DEFAULT_COUNT,
      }),
    );
  }, [page, usersTotalCount]);

  return (
    <View style={styles.tableContainer}>
      <Text style={styles.tableTitle}>Users</Text>
      <View style={styles.tableWrapper}>
        <Table
          columns={usersColumns}
          data={tableData}
          columnWidthArr={[50, 190, 250, 155, 100]}
        />
      </View>
      <Pagination
        totalCount={usersTotalCount}
        pageSize={PaginationDefaultValue.DEFAULT_COUNT}
        currentPage={page}
        onPageChange={setPage}
      />
    </View>
  );
};

export { UsersTable };
