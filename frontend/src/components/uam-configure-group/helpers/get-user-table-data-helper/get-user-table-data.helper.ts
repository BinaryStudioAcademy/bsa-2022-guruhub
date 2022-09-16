import { UsersGetResponseDto } from 'common/types/types';
import { GroupConfigureUsersTableRow } from 'components/uam-configure-group/common/types/types';

const getUserTableData = (
  users: UsersGetResponseDto[],
): GroupConfigureUsersTableRow[] => {
  return users.map((user) => ({
    id: `#${user.id}`,
    email: user.email,
    fullName: user.userDetails.fullName,
    createdAt: user.createdAt,
  }));
};

export { getUserTableData };
