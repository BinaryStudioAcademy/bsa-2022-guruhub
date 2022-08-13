import { UserWithPermissions } from './user-with-permissions.type';

type UserSignInResponseDto = {
  token: string;
  user: UserWithPermissions;
};

export { type UserSignInResponseDto };
