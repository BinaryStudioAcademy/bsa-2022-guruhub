import {
  DrawerNavigationItem,
  PermissionsGetAllItemResponseDto,
} from '~/common/types/types';

const getAllowedScreens = (
  screens: DrawerNavigationItem[],
  userPermissions: PermissionsGetAllItemResponseDto[],
): DrawerNavigationItem[] => {
  const userPermissionKeys = userPermissions.map((item) => item.key);

  return screens.filter((screen) => {
    const isNotRequiringPermissions = !screen.permissions.length;

    return (
      isNotRequiringPermissions ||
      screen.permissions.some((permission) =>
        userPermissionKeys.includes(permission),
      )
    );
  });
};

export { getAllowedScreens };
