import { UsersGetAllItemResponseDto } from 'common/types/types';
import { UserTableAccessor } from 'components/uam/common/enums/user-table-accesson.enum';

const getRows = (
  users: UsersGetAllItemResponseDto[],
): UsersGetAllItemResponseDto[] => {
  return users.map((user) => ({
    [UserTableAccessor.ID]: user.id,
    [UserTableAccessor.EMAIL]: user.email,
  }));
};

export { getRows };
