import { PermissionKey } from '~/common/enums/enums';
import { PermissionsGetAllItemResponseDto } from '~/common/types/types';

type checkType = 'every' | 'oneOf';

type Args = {
  permissionKeys: PermissionKey[];
  userPermissions: PermissionsGetAllItemResponseDto[];
  checkMode?: checkType;
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

  switch (checkMode) {
    case 'every': {
      return permissionKeys.every((pagePermission) => {
        return userPermissionKeys.includes(pagePermission);
      });
    }
    case 'oneOf': {
      return permissionKeys.some((pagePermission) => {
        return userPermissionKeys.includes(pagePermission);
      });
    }
  }
};
export { checkHasPermission };
