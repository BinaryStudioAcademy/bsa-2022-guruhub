import { UserWithPermissions } from './user-with-permissions.type';

type UserSignUpResponseDto = {
  token: string;
  user: UserWithPermissions;
};

export { type UserSignUpResponseDto };
