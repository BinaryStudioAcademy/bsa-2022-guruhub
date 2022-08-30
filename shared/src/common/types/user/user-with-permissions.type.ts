import {
  PermissionsGetAllItemResponseDto,
  UserDetailsResponseDto,
} from '~/common/types/types';

type UserWithPermissions = {
  id: number;
  email: string;
  createdAt: string;
  userDetails: UserDetailsResponseDto;
  permissions: PermissionsGetAllItemResponseDto[];
};

export { type UserWithPermissions };
