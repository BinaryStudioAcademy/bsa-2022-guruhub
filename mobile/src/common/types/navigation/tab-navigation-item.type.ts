import React from 'react';

import { CourseScreenName, PermissionKey } from '~/common/enums/enums';

type TabNavigationItem = {
  name: CourseScreenName;
  permissions: PermissionKey[];
  component: React.FC;
};

export { type TabNavigationItem };
