import {
  FormControl,
  FormControlErrors,
  UsersGroupCreationDto,
} from 'common/types/types';
import { Checkbox } from 'components/common/common';
import { UserTableAccessor } from 'components/uam/common/enums/user-table-accessor.enum';
import { UsersGetAllItemResponseDto } from 'guruhub-shared/common/types/user/users-get-all-item-response-dto.type';

const getGroupCreationUserRows = (
  users: UsersGetAllItemResponseDto[],
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

export { getGroupCreationUserRows };
