import { DrawerNavigationItem, PermissionItem } from '~/common/types/types';

const getAllowedScreens = (
  screens: DrawerNavigationItem[],
  userPermissions: PermissionItem[],
): DrawerNavigationItem[] => {
  const userPermissionKeys = userPermissions.map((item) => item.key);

  return screens.filter((screen) => {
    if (!screen.permissions.length) {
      return true;
    }

    return screen.permissions.some((permission) =>
      userPermissionKeys.includes(permission),
    );
  });
};

export { getAllowedScreens };
