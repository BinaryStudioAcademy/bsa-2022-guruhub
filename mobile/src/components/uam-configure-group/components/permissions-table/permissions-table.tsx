import React, { FC } from 'react';

import { PaginationDefaultValue } from '~/common/enums/enums';
import { PermissionsGetAllItemResponseDto } from '~/common/types/types';
import { Pagination, Table, View } from '~/components/common/common';
import { SelectedItemsValues } from '~/components/uam-configure-group/common/types/selected-items-values.type';
import {
  getPermissionsColumns,
  getPermissionsRows,
} from '~/components/uam-configure-group/helpers/helpers';
import {
  useAppForm,
  useCallback,
  useEffect,
  useFocusEffect,
} from '~/hooks/hooks';

import { styles } from './styles';

type Props = {
  permissions: PermissionsGetAllItemResponseDto[];
  onCheckboxToggle: (id: number) => void;
  pagination: {
    page: number;
    setPage: (page: number) => void;
  };
  checkedIds: number[];
};

const PermissionsTable: FC<Props> = ({
  permissions,
  onCheckboxToggle,
  pagination,
  checkedIds,
}) => {
  const { control, reset } = useAppForm({ defaultValues: {} });

  const permissionRows = getPermissionsRows({
    permissions: permissions,
    control,
    onToggle: onCheckboxToggle,
  });
  const permissionColumns = getPermissionsColumns();

  const selectedItems: SelectedItemsValues = {};

  useFocusEffect(
    useCallback(() => {
      reset(selectedItems);
    }, [permissions, checkedIds]),
  );

  useEffect(() => {
    checkedIds.map(
      (id) =>
        (selectedItems[`permissionIds.${id}`] = Boolean(
          permissions.find((permission) => permission.id === id),
        )),
    );
  }, [permissions, checkedIds]);

  useEffect(() => {
    reset(selectedItems);
  }, [permissions]);

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
        columns={permissionColumns}
        data={permissionRows}
        columnWidthArr={[50, 200, 100]}
      />
      <Pagination
        totalCount={permissions.length}
        pageSize={PaginationDefaultValue.DEFAULT_COUNT}
        currentPage={pagination.page}
        onPageChange={pagination.setPage}
      />
    </View>
  );
};

export { PermissionsTable };
