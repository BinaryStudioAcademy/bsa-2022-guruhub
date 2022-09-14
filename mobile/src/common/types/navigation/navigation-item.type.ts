import React from 'react';

import { PermissionKey } from '~/common/enums/enums';

type NavigationItem = {
  name: string;
  permissions: PermissionKey[];
  component: React.FC;
  isAuthRequired: boolean;
};

export { type NavigationItem };
