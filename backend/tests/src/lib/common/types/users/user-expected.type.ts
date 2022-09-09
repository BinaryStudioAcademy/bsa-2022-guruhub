import { UserDetailsResponseDto, UserWithPermissions } from 'guruhub-shared';

type UserExpected = Pick<UserWithPermissions, 'id' | 'email'> & {
  userDetails: Pick<UserDetailsResponseDto, 'fullName'>;
};

export { type UserExpected };
