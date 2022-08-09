import { UsersGetAllItemResponseDto } from 'common/types/types';

import { UserTableAccessor } from '../../common/enums/enums';
import { getTimeDifferenceWithCurrentTime } from '../helpers';

const getRows = (
  users: UsersGetAllItemResponseDto[],
): UsersGetAllItemResponseDto[] => {
  return users.map((user) => ({
    [UserTableAccessor.ID]: user.id,
    [UserTableAccessor.EMAIL]: user.email,
    [UserTableAccessor.FULL_NAME]: user.fullName,
    [UserTableAccessor.CREATED_AT]: getTimeDifferenceWithCurrentTime(
      user.createdAt,
    ),
  }));
};

export { getRows };
