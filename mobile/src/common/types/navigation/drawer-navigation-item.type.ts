import { AppScreenName } from '~/common/enums/enums';

import { IconName } from '../ui/icon-name.type';

type DrawerNavigationItem = {
  name: AppScreenName;
  isFocused?: boolean;
  icon: IconName;
};

export { type DrawerNavigationItem };
