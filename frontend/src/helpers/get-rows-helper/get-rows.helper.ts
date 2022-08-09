import {
  PermissionsGroupCreationDto,
  UsersGetAllItemResponseDto,
  UsersGetAllResponseDto,
  UsersGroupCreationDto,
} from 'common/types/types';
import { CheckboxComponent } from 'components/common/checkbox/checkbox';
import { PermissionTableAccesson } from 'components/uam/common/enums/permission-table-accesson.enum';
import { UserTableAccesson } from 'components/uam/common/enums/user-table-accesson.enum';
import { PermissionsGetAllResponseDto } from 'guruhub-shared/common/types/permission/permission-get-all-response-dto.type';

const getRows = (
  users: UsersGetAllResponseDto,
): UsersGetAllItemResponseDto[] => {
  return users.items.map((user) => ({
    [UserTableAccesson.ID]: user.id,
    [UserTableAccesson.EMAIL]: user.email,
    [UserTableAccesson.FULL_NAME]: user.fullName,
    createdAt: user.createdAt,
  }));
};

const getGroupCreationUserRows = (
  users: UsersGetAllResponseDto,
): UsersGroupCreationDto[] => {
  return users.items.map((user) => ({
    [UserTableAccesson.CHECKBOX]: CheckboxComponent,
    [UserTableAccesson.EMAIL]: user.email,
    [UserTableAccesson.FULL_NAME]: user.fullName,
    [UserTableAccesson.ID]: user.id,
  }));
};

const getGroupCreationPermissionRows = (
  permissions: PermissionsGetAllResponseDto,
): PermissionsGroupCreationDto[] => {
  return permissions.items.map((permission) => ({
    [PermissionTableAccesson.CHECKBOX]: CheckboxComponent,
    [PermissionTableAccesson.NAME]: permission.name,
    [PermissionTableAccesson.ID]: permission.id,
  }));
};

export { getGroupCreationPermissionRows, getGroupCreationUserRows, getRows };
