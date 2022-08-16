import { DrawerNavigationItem, PermissionItem } from '~/common/types/types';

const getAllowedScreens = (
  screens: DrawerNavigationItem[],
  userPermissions: PermissionItem[],
): DrawerNavigationItem[] => {
  const userPermissionKeys = userPermissions.map((item) => item.key);

  return screens.filter((screen) => {
    return screen.permissions.every((permission) =>
      userPermissionKeys.includes(permission),
    );
  });
};

export { getAllowedScreens };
