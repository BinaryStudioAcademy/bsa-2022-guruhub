import { PermissionKey } from '~/common/enums/enums';

type Args = {
  requiredPermissions: PermissionKey[];
  userPermissions: PermissionKey[];
};

const checkPermissionKeys = ({
  requiredPermissions,
  userPermissions,
}: Args): boolean =>
  requiredPermissions.every((permission) => {
    return userPermissions.includes(permission);
  });

export { checkPermissionKeys };
