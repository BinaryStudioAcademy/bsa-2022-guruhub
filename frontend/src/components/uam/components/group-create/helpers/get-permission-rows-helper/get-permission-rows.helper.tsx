import {
  FormControl,
  FormControlErrors,
  PermissionsGroupCreationDto,
} from 'common/types/types';
import { Checkbox } from 'components/common/common';
import { PermissionsGetAllItemResponseDto } from 'guruhub-shared/common/types/permission/permission-item-response-dto.type';

import { PermissionTableAccessor } from '../../common/enums/enums';

const getPermissionsRows = (
  permissions: PermissionsGetAllItemResponseDto[],
  useFormData: {
    control: FormControl;
    errors: FormControlErrors;
  },
): PermissionsGroupCreationDto[] => {
  return permissions.map((permission) => {
    return {
      [PermissionTableAccessor.CHECKBOX]: (
        <Checkbox
          id={permission.id}
          name={`permission${permission.id}`}
          control={useFormData.control}
          errors={useFormData.errors}
        />
      ),
      [PermissionTableAccessor.NAME]: permission.name,
      [PermissionTableAccessor.ID]: permission.id,
    };
  });
};

export { getPermissionsRows };
