import React, { FC } from 'react';

import { PaginationDefaultValue } from '~/common/enums/enums';
import { PermissionsGetAllItemResponseDto } from '~/common/types/types';
import { Pagination, Table, View } from '~/components/common/common';
import {
  getPermissionsColumns,
  getPermissionsRows,
} from '~/components/uam-groups-config/helpers/helpers';
import { useAppForm } from '~/hooks/hooks';

type Props = {
  permissions: PermissionsGetAllItemResponseDto[];
  onCheckboxToggle: (id: number) => void;
  pagination: {
    page: number;
    setPage: (page: number) => void;
  };
  checkedPermissionsIds?: number[];
};

const PermissionsTable: FC<Props> = ({
  permissions,
  onCheckboxToggle,
  pagination,
}) => {
  const { control } = useAppForm({ defaultValues: {} });

  const permissionRows = getPermissionsRows({
    permissions: permissions,
    onToggle: onCheckboxToggle,
    control,
  });
  const permissionColumns = getPermissionsColumns();

  return (
    <View>
      <Table
        columns={permissionColumns}
        data={permissionRows}
        columnWidthArr={[60, 200, 100]}
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
