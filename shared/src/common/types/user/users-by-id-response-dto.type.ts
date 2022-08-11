import { PermissionsGetAllItemResponseDto } from '../permission/permission';

type UsersByIdResponseDto = {
  id: number;
  email: string;
  fullName: string;
  createdAt: string;
  permissions: PermissionsGetAllItemResponseDto[];
};

export { type UsersByIdResponseDto };
