import { AppRoute } from 'common/enums/enums';

import { IconName } from '../types';

type SubNavigationMenuItem = {
  name: string;
  iconName: IconName;
  href: AppRoute;
};

export { SubNavigationMenuItem };
