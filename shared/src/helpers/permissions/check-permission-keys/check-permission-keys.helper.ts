import { PermissionKey } from '~/common/enums/enums';

type Args = {
  pagePermissions: PermissionKey[];
  userPermissions: PermissionKey[];
};

const checkHasPermission = ({
  pagePermissions,
  userPermissions,
}: Args): boolean => {
  return pagePermissions.every((pagePermission) => {
    return userPermissions.some(
      (userPermission) => userPermission === pagePermission,
    );
  });
};
export { checkHasPermission };
