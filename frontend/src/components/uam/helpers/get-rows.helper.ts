import {
  UsersGetAllItemResponseDto,
  UsersGetAllResponseDto,
} from 'guruhub-shared';

const getRows = (
  users: UsersGetAllResponseDto,
): readonly UsersGetAllItemResponseDto[] => {
  return users.map((user) => ({
    id: user.id,
    email: user.email,
  }));
};

export { getRows };
