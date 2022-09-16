import { UsersGetResponseDto } from 'common/types/types';
import { UsersTableRow } from 'components/uam/common/types/types';

const getUserTableData = (users: UsersGetResponseDto[]): UsersTableRow[] => {
  return users.map((user) => ({
    id: `#${user.id}`,
    email: user.email,
    fullName: user.userDetails.fullName,
    createdAt: user.createdAt,
  }));
};

export { getUserTableData };
