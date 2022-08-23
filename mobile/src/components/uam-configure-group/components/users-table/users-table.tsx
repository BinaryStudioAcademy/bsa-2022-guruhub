import React, { FC } from 'react';

import { PaginationDefaultValue } from '~/common/enums/enums';
import { UsersGetResponseDto } from '~/common/types/types';
import { Pagination, Table, View } from '~/components/common/common';
import { SelectedItemsValues } from '~/components/uam-configure-group/common/types/types';
import {
  getUserColumns,
  getUserRows,
} from '~/components/uam-configure-group/helpers/helpers';
import { useAppForm, useCallback, useFocusEffect } from '~/hooks/hooks';

import { styles } from './styles';

type Props = {
  users: {
    items: UsersGetResponseDto[];
    total: number;
  };
  onCheckboxToggle: (id: number) => void;
  pagination: {
    page: number;
    setPage: (page: number) => void;
  };
  checkedIds: number[];
};

const UsersTable: FC<Props> = ({
  users,
  onCheckboxToggle,
  pagination,
  checkedIds,
}) => {
  const { control, reset } = useAppForm({ defaultValues: {} });

  const userRows = getUserRows({
    users: users.items,
    control,
    onToggle: onCheckboxToggle,
  });
  const userColumns = getUserColumns();

  useFocusEffect(
    useCallback(() => {
      const selectedUsers: SelectedItemsValues = checkedIds.reduce(
        (object, id) => {
          return {
            ...object,
            [`userIds.${id}`]: Boolean(
              users.items.find((user) => user.id === id),
            ),
          };
        },
        {},
      );
      reset(selectedUsers);
    }, [users.items, checkedIds]),
  );

  useFocusEffect(
    useCallback(() => {
      return () => {
        reset({});
      };
    }, []),
  );

  return (
    <View style={styles.tableContainer}>
      <Table
        columns={userColumns}
        data={userRows}
        columnWidthArr={[50, 50, 200, 250, 150]}
      />
      <Pagination
        totalCount={users.total}
        pageSize={PaginationDefaultValue.DEFAULT_COUNT}
        currentPage={pagination.page}
        onPageChange={pagination.setPage}
      />
    </View>
  );
};

export { UsersTable };
