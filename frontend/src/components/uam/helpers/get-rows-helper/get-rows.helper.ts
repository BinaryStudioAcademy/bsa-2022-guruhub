import { UsersGetAllItemResponseDto } from 'common/types/types';
import { UserTableAccesson } from 'components/uam/common/enums/user-table-accesson.enum';

const getRows = (
  users: UsersGetAllItemResponseDto[],
): UsersGetAllItemResponseDto[] => {
  return users.map((user) => ({
    [UserTableAccesson.ID]: user.id,
    [UserTableAccesson.EMAIL]: user.email,
  }));
};

export { getRows };
