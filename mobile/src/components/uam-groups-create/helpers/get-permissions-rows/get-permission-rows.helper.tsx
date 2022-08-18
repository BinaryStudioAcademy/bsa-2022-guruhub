import React from 'react';

import {
  FormControl,
  PermissionsGetAllItemResponseDto,
} from '~/common/types/types';
import { Checkbox } from '~/components/common/common';
import { PermissionTableAccessor } from '~/components/uam-groups-create/common/enums/enums';
import { PermissionsTableRow } from '~/components/uam-groups-create/common/types/types';

type Props = {
  permissions: PermissionsGetAllItemResponseDto[];
  control: FormControl;
  onToggle: (id: number) => void;
};

const getPermissionsRows = ({
  permissions,
  control,
  onToggle,
}: Props): PermissionsTableRow[] => {
  return permissions.map((permission) => {
    return {
      [PermissionTableAccessor.CHECKBOX]: (
        <Checkbox
          name={`permissionIds.${permission.id}`}
          control={control}
          onToggle={(): void => onToggle(permission.id)}
        />
      ),
      [PermissionTableAccessor.NAME]: permission.name,
      [PermissionTableAccessor.ID]: permission.id,
    };
  });
};

export { getPermissionsRows };
