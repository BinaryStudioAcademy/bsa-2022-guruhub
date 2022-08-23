import React from 'react';

import { PermissionsGetAllItemResponseDto } from '~/common/types/types';
import { PermissionTableAccessor } from '~/components/uam-configure-group/common/enums/enums';
import { PermissionsTableRow } from '~/components/uam-configure-group/common/types/types';
import { ActionCell } from '~/components/uam-configure-group/components/action-cell/action-cell';

type Props = {
  permissions: PermissionsGetAllItemResponseDto[];
  onToggle: (id: number) => void;
  checkedPermissionIds: number[];
};

const getPermissionsRows = ({
  permissions,
  onToggle,
  checkedPermissionIds,
}: Props): PermissionsTableRow[] => {
  return permissions.map((permission) => {
    const name = `permissionIds.${permission.id}`;
    const isChecked = checkedPermissionIds.includes(permission.id);

    return {
      [PermissionTableAccessor.CHECKBOX]: (
        <ActionCell
          name={name}
          onToggle={(): void => onToggle(permission.id)}
          isChecked={isChecked}
        />
      ),
      [PermissionTableAccessor.NAME]: permission.name,
      [PermissionTableAccessor.ID]: permission.id,
    };
  });
};

export { getPermissionsRows };
