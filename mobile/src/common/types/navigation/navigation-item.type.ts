import React from 'react';

import {
  AppScreenName,
  CourseScreenName,
  PermissionKey,
} from '~/common/enums/enums';

type NavigationItem = {
  name: AppScreenName | CourseScreenName;
  permissions: PermissionKey[];
  component: React.FC;
  requireAuth: boolean;
};

export { type NavigationItem };
