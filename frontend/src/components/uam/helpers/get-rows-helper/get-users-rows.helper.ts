import { UsersGetAllItemResponseDto } from 'common/types/types';
import { UserTableAccessor } from 'components/uam/common/enums/enums';
import { UsersTableType } from 'components/uam/common/types/types';

import { Actions } from '../../components/users-table/components/components';

const getUsersRows = (
  users: UsersGetAllItemResponseDto[],
  onUserDelete: (userId: string) => void,
): UsersTableType[] => {
  return users.map((user) => ({
    [UserTableAccessor.ID]: user.id,
    [UserTableAccessor.EMAIL]: user.email,
    [UserTableAccessor.FULL_NAME]: user.fullName,
    [UserTableAccessor.CREATED_AT]: user.createdAt,
    [UserTableAccessor.ACTIONS]: Actions(String(user.id), onUserDelete),
  }));
};

export { getUsersRows };
