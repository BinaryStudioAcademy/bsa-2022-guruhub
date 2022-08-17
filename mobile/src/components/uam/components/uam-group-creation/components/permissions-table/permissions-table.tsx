import React, { FC } from 'react';
import { useWindowDimensions } from 'react-native';

import {
  FormControl,
  GroupsCreateRequestDto,
  PermissionsGetAllItemResponseDto,
} from '~/common/types/types';
import { Table, View } from '~/components/common/common';

import {
  getPermissionsColumns,
  getPermissionsRows,
} from '../../helpers/helpers';

type Props = {
  permissions: {
    items: PermissionsGetAllItemResponseDto[];
  };
  control: FormControl<GroupsCreateRequestDto>;
  onCheckbox: (id: number) => void;
};

const GroupCreationPermissionsTable: FC<Props> = ({
  permissions,
  control,
  onCheckbox,
}) => {
  const permissionRows = getPermissionsRows({
    permissions: permissions.items,
    control,
    onCheckbox,
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

export { GroupCreationPermissionsTable };
