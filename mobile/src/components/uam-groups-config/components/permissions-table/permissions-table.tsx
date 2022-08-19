import React, { FC } from 'react';
import { useWindowDimensions } from 'react-native';

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
  onCheckbox: (id: number) => void;
  pagination: {
    page: number;
    setPage: (page: number) => void;
  };
  checkedPermissionsIds?: number[];
};

const PermissionsTable: FC<Props> = ({
  permissions,
  onCheckbox,
  pagination,
  checkedPermissionsIds,
}) => {
  const checkedIds: Record<string, boolean> = {};
  const { control } = useAppForm({
    defaultValues: checkedPermissionsIds?.length
      ? checkedPermissionsIds.map(
          (checkedId) => (checkedIds[`userIds.${checkedId}`] = true),
        )
      : {},
  });

  const permissionRows = getPermissionsRows({
    permissions: permissions,
    onToggle: onCheckbox,
    control,
  });
  const permissionColumns = getPermissionsColumns();
  const { width } = useWindowDimensions();

  return (
    <View>
      <Table
        columns={permissionColumns}
        data={permissionRows}
        columnWidthArr={[width * 0.1, width * 0.5, width * 0.3]}
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
