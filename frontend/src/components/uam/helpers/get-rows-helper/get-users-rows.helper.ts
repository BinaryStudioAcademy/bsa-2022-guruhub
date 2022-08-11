import { UsersGetResponseDto } from 'common/types/types';
import { UserTableAccessor } from 'components/uam/common/enums/enums';
import { UsersTableType } from 'components/uam/common/types/types';

const getUsersRows = (users: UsersGetResponseDto[]): UsersTableType[] => {
  return users.map((user) => ({
    [UserTableAccessor.ID]: user.id,
    [UserTableAccessor.EMAIL]: user.email,
    [UserTableAccessor.FULL_NAME]: user.fullName,
    [UserTableAccessor.CREATED_AT]: user.createdAt,
    [UserTableAccessor.ACTIONS_PAYLOAD]: user.id,
  }));
};

export { getUsersRows };
