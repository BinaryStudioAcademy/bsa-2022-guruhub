import { NavigationItem } from '~/common/types/types';

const getScreensByAuth = (
  screens: NavigationItem[],
  hasUser: boolean,
): NavigationItem[] => {
  if (!hasUser) {
    return screens.filter((screen) => screen.requireAuth === hasUser);
  }

  return screens;
};

export { getScreensByAuth };
