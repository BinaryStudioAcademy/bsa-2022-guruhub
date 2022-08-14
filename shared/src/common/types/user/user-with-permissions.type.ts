import { PermissionGetAllItemResponseDto } from '../permission/permission';

type UserWithPermissions = {
  id: number;
  email: string;
  fullName: string;
  createdAt: string;
  permissions: PermissionGetAllItemResponseDto[];
};

export { type UserWithPermissions };
