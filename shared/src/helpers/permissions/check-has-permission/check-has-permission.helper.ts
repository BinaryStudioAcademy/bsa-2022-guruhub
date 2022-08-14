import { PermissionKey } from '~/common/enums/enums';
import { PermissionItem } from '~/common/types/types';

type Args = {
  permissionKeys: PermissionKey[];
  userPermissions: PermissionItem[];
};

const checkHasPermission = ({
  permissionKeys,
  userPermissions,
}: Args): boolean => {
  const userPermissionKeys = userPermissions.map((item) => item.key);

  return permissionKeys.every((pagePermission) => {
    return userPermissionKeys.includes(pagePermission);
  });
};
export { checkHasPermission };
