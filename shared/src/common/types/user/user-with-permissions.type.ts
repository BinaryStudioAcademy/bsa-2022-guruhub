import { PermissionsGetAllItemResponseDto } from '../permission/permission';

type UserWithPermissions = {
  id: number;
  email: string;
  fullName: string;
  createdAt: string;
  permissions: PermissionsGetAllItemResponseDto[];
};

export { type UserWithPermissions };
