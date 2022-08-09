import {
  UsersGetAllItemResponseDto,
  UsersGetAllResponseDto,
  UsersGroupCreationDto,
} from 'common/types/types';
import { CheckboxComponent } from 'components/common/checkbox/checkbox';
import { UserTableAccesson } from 'components/uam/common/enums/user-table-accesson.enum';

const getRows = (
  users: UsersGetAllResponseDto,
): UsersGetAllItemResponseDto[] => {
  return users.map((user) => ({
    [UserTableAccesson.ID]: user.id,
    [UserTableAccesson.EMAIL]: user.email,
    [UserTableAccesson.FULL_NAME]: user.name,
  }));
};

const getGroupCreationRows = (
  users: UsersGetAllResponseDto,
): UsersGroupCreationDto[] => {
  return users.map((user) => ({
    [UserTableAccesson.CHECKBOX]: CheckboxComponent,
    [UserTableAccesson.EMAIL]: user.email,
    [UserTableAccesson.FULL_NAME]: user.name,
  }));
};

export { getRows, getGroupCreationRows };
