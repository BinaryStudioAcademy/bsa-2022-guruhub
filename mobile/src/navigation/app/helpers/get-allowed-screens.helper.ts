import { DrawerNavigationItem, PermissionItem } from '~/common/types/types';

const getAllowedScreens = (
  screens: DrawerNavigationItem[],
  userPermissions: PermissionItem[],
): DrawerNavigationItem[] => {
  return screens.filter((screen) => {
    if (!screen.permissions.length) {
      return true;
    }

    return screen.permissions.some((permission) => {
      return (
        userPermissions?.filter(
          (userPermission) => userPermission.id === permission.id,
        ).length ?? false
      );
    });
  });
};

export { getAllowedScreens };
