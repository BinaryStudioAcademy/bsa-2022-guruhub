import { PermissionKey } from '~/common/enums/enums';
import {
  CheckPermisssionType,
  PermissionsGetAllItemResponseDto,
} from '~/common/types/types';

type Args = {
  permissionKeys: PermissionKey[];
  userPermissions: PermissionsGetAllItemResponseDto[];
  checkMode?: CheckPermisssionType;
};

const checkHasPermission = ({
  permissionKeys,
  userPermissions,
  checkMode = 'oneOf',
}: Args): boolean => {
  const isRequiringPermissions = Boolean(permissionKeys.length);
  const userPermissionKeys = userPermissions.map((item) => item.key);

  if (!isRequiringPermissions) {
    return true;
  }

  const permissionsMap = new Map<string, string>();
  userPermissionKeys.forEach((permission) => {
    permissionsMap.set(permission, permission);
  });

  switch (checkMode) {
    case 'every': {
      return permissionKeys.every((pagePermission) => {
        return permissionsMap.has(pagePermission);
      });
    }
    case 'oneOf': {
      return permissionKeys.some((pagePermission) => {
        return permissionsMap.has(pagePermission);
      });
    }
  }
};
export { checkHasPermission };
