import {
  FormControl,
  FormControlErrors,
  FormControlRegister,
  PermissionGetAllItemResponseDto,
  PermissionsGroupCreationDto,
} from 'common/types/types';
import { Checkbox } from 'components/common/common';

import {
  GroupCreationFieldsName,
  PermissionTableAccessor,
} from '../../common/enums/enums';

const getPermissionsRows = (
  permissions: PermissionGetAllItemResponseDto[],
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
          errorMessage={'Permissions checkboxes can not be empty'}
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
