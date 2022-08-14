import {
  FormControl,
  FormControlErrors,
  UsersGetResponseDto,
  UsersGroupCreationDto,
} from 'common/types/types';
import { Checkbox } from 'components/common/common';
import { UserTableAccessor } from 'components/uam/common/enums/user-table-accessor.enum';

const getUserRows = (
  users: UsersGetResponseDto[],
  useFormData: {
    control: FormControl;
    errors: FormControlErrors;
  },
): UsersGroupCreationDto[] => {
  return users.map((user) => ({
    [UserTableAccessor.CHECKBOX]: (
      <Checkbox
        id={user.id}
        name={`user${user.id}`}
        control={useFormData.control}
        errors={useFormData.errors}
      />
    ),
    [UserTableAccessor.EMAIL]: user.email,
    [UserTableAccessor.FULL_NAME]: user.fullName,
    [UserTableAccessor.ID]: user.id,
  }));
};

export { getUserRows };
