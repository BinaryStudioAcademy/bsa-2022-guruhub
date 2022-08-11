import { UsersGetResponseDto } from 'common/types/types';
import { UserTableAccessor } from 'components/uam/common/enums/enums';

const getUsersRows = (users: UsersGetResponseDto[]): UsersGetResponseDto[] => {
  return users.map((user) => ({
    [UserTableAccessor.ID]: user.id,
    [UserTableAccessor.EMAIL]: user.email,
    [UserTableAccessor.FULL_NAME]: user.fullName,
    [UserTableAccessor.CREATED_AT]: user.createdAt,
  }));
};

export { getUsersRows };
