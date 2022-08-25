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
};

const getPermissionsRows = ({
  permissions,
  onToggle,
  control,
}: Props): PermissionsTableRow[] => {
  return permissions.map((permission) => {
    const handleCheckbox = (): void => onToggle(permission.id);

    return {
      [PermissionTableAccessor.CHECKBOX]: (
        <Checkbox
          name={`permissionIds.${permission.id}`}
          control={control}
          onToggle={handleCheckbox}
        />
      ),
      [PermissionTableAccessor.NAME]: permission.name,
      [PermissionTableAccessor.ID]: permission.id,
    };
  });
};

export { getPermissionsRows };
