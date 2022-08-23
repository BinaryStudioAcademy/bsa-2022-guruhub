import { AppRoute, PermissionKey } from 'common/enums/enums';

import { IconName } from '../types';

type SubNavigationMenuItem = {
  name: string;
  iconName: IconName;
  href: AppRoute;
  permissions?: PermissionKey[];
};

export { SubNavigationMenuItem };
