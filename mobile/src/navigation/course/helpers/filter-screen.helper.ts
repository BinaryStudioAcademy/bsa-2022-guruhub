import { CourseScreenName } from '~/common/enums/enums';
import { TabNavigationItem } from '~/common/types/types';

import { COURSE_TAB_ITEMS } from '../common/constants';

const filterScreen = (screenName: CourseScreenName): TabNavigationItem[] => {
  const screens = COURSE_TAB_ITEMS.filter(
    (screen) => screen.name !== screenName,
  );

  return screens;
};

export { filterScreen };
