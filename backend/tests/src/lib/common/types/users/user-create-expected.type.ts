import { UserDetailsResponseDto, UserWithPermissions } from 'guruhub-shared';

type UserCreateExpected = Pick<UserWithPermissions, 'email'> & {
  userDetails: Pick<UserDetailsResponseDto, 'fullName'>;
};

export { type UserCreateExpected };
