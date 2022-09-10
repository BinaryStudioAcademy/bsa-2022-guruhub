import {
  NavigationItem,
  PermissionsGetAllItemResponseDto,
} from '~/common/types/types';
import { checkHasPermission } from '~/helpers/helpers';

const getPermittedScreens = (
  screens: NavigationItem[],
  userPermissions: PermissionsGetAllItemResponseDto[],
): NavigationItem[] => {
  return screens.filter((screen) => {
    return checkHasPermission({
      permissionKeys: screen.permissions,
      userPermissions: userPermissions,
    });
  });
};

export { getPermittedScreens };
