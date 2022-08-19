import { Group, Permission } from '~/data/models/models';

type GroupsWithPermissionsDto = Group & {
  permissions: Permission[];
};

export { GroupsWithPermissionsDto };
