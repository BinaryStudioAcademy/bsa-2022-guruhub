import {
  UsersGetAllItemResponseDto,
  UsersGetAllResponseDto,
} from 'common/types/types';
import { UserTableAccesson } from 'components/uam/common/enums/user-table-accesson.enum';

const getRows = (
  users: UsersGetAllResponseDto,
): UsersGetAllItemResponseDto[] => {
  return users.map((user) => ({
    [UserTableAccesson.ID]: user.id,
    [UserTableAccesson.EMAIL]: user.email,
  }));
};

export { getRows };
