import { NavigationItem } from '~/common/types/types';

const getScreensByAuth = (
  screens: NavigationItem[],
  isAuthRequired: boolean,
): NavigationItem[] => {
  if (!isAuthRequired) {
    return screens.filter((screen) => !screen.requireAuth);
  }

  return screens;
};

export { getScreensByAuth };
