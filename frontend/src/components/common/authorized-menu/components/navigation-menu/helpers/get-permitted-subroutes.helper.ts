import { SubNavigationMenuItem, UserWithPermissions } from 'common/types/types';
import { checkHasPermission } from 'helpers/helpers';

const getPermittedSubroutes = (
  subroutes: SubNavigationMenuItem[],
  user: UserWithPermissions,
): SubNavigationMenuItem[] => {
  return subroutes.filter((route) =>
    checkHasPermission({
      permissionKeys: route.permissions,
      userPermissions: user.permissions,
    }),
  );
};

export { getPermittedSubroutes };
