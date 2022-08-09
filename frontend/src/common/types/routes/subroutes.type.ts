import { AppRoute } from 'common/enums/enums';

import { IconName } from '../types';

type Subroute = {
  name: string;
  iconName: IconName;
  href: AppRoute;
};

export { Subroute };
