import React from 'react';

import {
  FormControl,
  GroupsCreateRequestDto,
  PermissionsGetAllItemResponseDto,
  PermissionsGroupCreationDto,
} from '~/common/types/types';
import { Checkbox } from '~/components/common/common';
import { PermissionTableAccessor } from '~/components/uam/components/uam-group-creation/common/enums/enums';

type Props = {
  permissions: PermissionsGetAllItemResponseDto[];
  control: FormControl<GroupsCreateRequestDto>;
  onCheckbox: (id: number) => void;
};

const getPermissionsRows = ({
  permissions,
  control,
  onCheckbox,
}: Props): PermissionsGroupCreationDto[] => {
  return permissions.map((permission) => {
    return {
      [PermissionTableAccessor.CHECKBOX]: (
        <Checkbox
          name={`permissionIds.${permission.id}`}
          control={control}
          onCheckbox={(): void => onCheckbox(permission.id)}
        />
      ),
      [PermissionTableAccessor.NAME]: permission.name,
      [PermissionTableAccessor.ID]: permission.id,
    };
  });
};

export { getPermissionsRows };
