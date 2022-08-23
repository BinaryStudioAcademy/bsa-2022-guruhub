import React from 'react';

import {
  FormControl,
  PermissionsGetAllItemResponseDto,
} from '~/common/types/types';
import { Checkbox } from '~/components/common/common';
import { PermissionTableAccessor } from '~/components/uam-configure-group/common/enums/enums';
import { PermissionsTableRow } from '~/components/uam-configure-group/common/types/types';

type Props = {
  permissions: PermissionsGetAllItemResponseDto[];
  control: FormControl;
  onToggle: (id: number) => void;
  checkedPermissionIds?: number[];
};

const getPermissionsRows = ({
  permissions,
  control,
  onToggle,
  checkedPermissionIds,
}: Props): PermissionsTableRow[] => {
  return permissions.map((permission) => {
    const isChecked = checkedPermissionIds?.includes(permission.id);

    return {
      [PermissionTableAccessor.CHECKBOX]: (
        <Checkbox
          name={`permissionIds.${permission.id}`}
          control={control}
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
