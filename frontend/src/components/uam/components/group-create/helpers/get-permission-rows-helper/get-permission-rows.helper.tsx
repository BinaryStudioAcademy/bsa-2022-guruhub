import {
  FormControl,
  FormControlErrors,
  FormControlRegister,
  PermissionsGetAllItemResponseDto,
  PermissionsGroupCreationDto,
} from 'common/types/types';
import { Checkbox } from 'components/common/common';

import {
  GroupCreationFieldsName,
  PermissionTableAccessor,
} from '../../common/enums/enums';

const getPermissionsRows = (
  permissions: PermissionsGetAllItemResponseDto[],
  useFormData: {
    register: FormControlRegister;
    control: FormControl;
    errors: FormControlErrors;
  },
): PermissionsGroupCreationDto[] => {
  return permissions.map((permission) => {
    return {
      [PermissionTableAccessor.CHECKBOX]: (
        <Checkbox
          id={permission.id}
          name={GroupCreationFieldsName.PERMISSION_IDS}
          register={useFormData.register}
          control={useFormData.control}
        />
      ),
      [PermissionTableAccessor.NAME]: permission.name,
      [PermissionTableAccessor.ID]: permission.id,
    };
  });
};

export { getPermissionsRows };
