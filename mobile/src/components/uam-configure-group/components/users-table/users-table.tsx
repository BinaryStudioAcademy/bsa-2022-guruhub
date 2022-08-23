import React, { FC } from 'react';

import { PaginationDefaultValue } from '~/common/enums/enums';
import { UsersGetResponseDto } from '~/common/types/types';
import { Pagination, Table, View } from '~/components/common/common';
import { SelectedItemsValues } from '~/components/uam-configure-group/common/types/selected-items-values.type';
import {
  getUserColumns,
  getUserRows,
} from '~/components/uam-configure-group/helpers/helpers';
import {
  useAppForm,
  useCallback,
  useEffect,
  useFocusEffect,
} from '~/hooks/hooks';

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

  const selectedItems: SelectedItemsValues = {};

  useFocusEffect(
    useCallback(() => {
      reset(selectedItems);
    }, [users.items, checkedIds]),
  );

  useEffect(() => {
    checkedIds.map(
      (id) =>
        (selectedItems[`userIds.${id}`] = Boolean(
          users.items.find((user) => user.id === id),
        )),
    );
  }, [users.items, checkedIds]);

  useEffect(() => {
    reset(selectedItems);
  }, [users.items]);

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
