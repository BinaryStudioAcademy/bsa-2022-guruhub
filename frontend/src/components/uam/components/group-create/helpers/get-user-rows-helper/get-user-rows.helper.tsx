import {
  FormControl,
  FormControlErrors,
  FormControlRegister,
  UsersGetResponseDto,
  UsersGroupCreationDto,
} from 'common/types/types';
import { Checkbox } from 'components/common/common';
import { UserTableAccessor } from 'components/uam/common/enums/enums';

import { GroupCreationFieldsName } from '../../common/enums/enums';

const getUserRows = (
  users: UsersGetResponseDto[],
  useFormData: {
    register: FormControlRegister;
    control: FormControl;
    errors: FormControlErrors;
  },
): UsersGroupCreationDto[] => {
  return users.map((user) => ({
    [UserTableAccessor.CHECKBOX]: (
      <Checkbox
        id={user.id}
        name={GroupCreationFieldsName.USER_IDS}
        register={useFormData.register}
        control={useFormData.control}
      />
    ),
    [UserTableAccessor.EMAIL]: user.email,
    [UserTableAccessor.FULL_NAME]: user.fullName,
    [UserTableAccessor.ID]: user.id,
  }));
};

export { getUserRows };
