import {
  DrawerNavigationItem,
  PermissionsGetAllItemResponseDto,
} from '~/common/types/types';
import { checkHasPermission } from '~/helpers/helpers';

const getAllowedScreens = (
  screens: DrawerNavigationItem[],
  userPermissions: PermissionsGetAllItemResponseDto[],
): DrawerNavigationItem[] => {
  return screens.filter((screen) => {
    return checkHasPermission({
      permissionKeys: screen.permissions,
      userPermissions: userPermissions,
    });
  });
};

export { getAllowedScreens };
