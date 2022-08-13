import { PermissionItem } from '../permission/permission';

type UserWithPermissions = {
  id: number;
  email: string;
  fullName: string;
  createdAt: string;
  permissions: PermissionItem[];
};

export { type UserWithPermissions };
