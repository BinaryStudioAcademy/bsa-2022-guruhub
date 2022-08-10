import { PermissionsGetAllItemResponseDto } from '../permission/permission-item-response-dto.type';
import { UsersByIdResponseDto } from './users-by-id-response-dto.type';

type UserSignUpResponseDto = {
  token: string;
  user: UsersByIdResponseDto;
  permissions: PermissionsGetAllItemResponseDto[] | [];
};

export { type UserSignUpResponseDto };
