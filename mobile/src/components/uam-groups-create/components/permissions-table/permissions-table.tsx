import React, { FC } from 'react';
import { useWindowDimensions } from 'react-native';

import { PermissionsGetAllItemResponseDto } from '~/common/types/types';
import { Table, View } from '~/components/common/common';
import {
  getPermissionsColumns,
  getPermissionsRows,
} from '~/components/uam-groups-create/helpers/helpers';
import { useAppForm } from '~/hooks/hooks';

type Props = {
  permissions: PermissionsGetAllItemResponseDto[];
  onCheckbox: (id: number) => void;
};

const GroupsTable: FC<Props> = ({ permissions, onCheckbox }) => {
  const { control } = useAppForm({ defaultValues: {} });

  const permissionRows = getPermissionsRows({
    permissions: permissions,
    onCheckbox,
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
    </View>
  );
};

export { GroupsTable };
