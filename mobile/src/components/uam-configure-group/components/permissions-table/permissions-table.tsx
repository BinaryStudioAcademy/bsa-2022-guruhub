import React, { FC } from 'react';

import { PaginationDefaultValue } from '~/common/enums/enums';
import { PermissionsGetAllItemResponseDto } from '~/common/types/types';
import { Pagination, Table, View } from '~/components/common/common';
import {
  getPermissionsColumns,
  getPermissionsRows,
  getSelectedItemsValues,
} from '~/components/uam-configure-group/helpers/helpers';
import { useAppForm, useCallback, useFocusEffect } from '~/hooks/hooks';

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

  useFocusEffect(
    useCallback(() => {
      const selectedPermissions = getSelectedItemsValues({
        checkedIds,
        items: permissions,
        namePrefix: 'permissionIds',
      });
      reset(selectedPermissions);
    }, [permissions, checkedIds]),
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
