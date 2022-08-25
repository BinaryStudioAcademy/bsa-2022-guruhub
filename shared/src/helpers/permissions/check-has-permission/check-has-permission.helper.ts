import { PermissionKey } from '~/common/enums/enums';
import { PermissionsGetAllItemResponseDto } from '~/common/types/types';

type Args = {
  permissionKeys: PermissionKey[];
  userPermissions: PermissionsGetAllItemResponseDto[];
};

const checkHasPermission = ({
  permissionKeys,
  userPermissions,
}: Args): boolean => {
  const isRequiringPermissions = Boolean(permissionKeys.length);
  const userPermissionKeys = userPermissions.map((item) => item.key);

  return (
    !isRequiringPermissions ||
    permissionKeys.some((pagePermission) => {
      return userPermissionKeys.includes(pagePermission);
    })
  );
};
export { checkHasPermission };
