import { UsersGetAllItemResponseDto } from 'common/types/types';

import { UserTableAccessor } from '../common/enums/enums';

const getRows = (
  users: UsersGetAllItemResponseDto[],
): UsersGetAllItemResponseDto[] => {
  return users.map((user) => ({
    [UserTableAccessor.ID]: user.id,
    [UserTableAccessor.EMAIL]: user.email,
  }));
};

export { getRows };
