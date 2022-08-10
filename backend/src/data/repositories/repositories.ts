import {
  Group as GroupModel,
  GroupsToPermissions as GroupsToPermissionsModel,
  Permission as PermissionModel,
  User as UserModel,
  UsersToGroups as UsersToGroupsModel,
} from '~/data/models/models';

import { Group } from './group/group.repository';
import { GroupsToPermissions } from './groups-to-permissions/groups-to-permissions.repository';
import { Permission } from './permission/permission.repository';
import { User } from './user/user.repository';
import { UsersToGroups } from './users-to-groups/users-to-groups.repository';

const user = new User({
  UserModel,
  GroupModel,
});

const permission = new Permission({
  PermissionModel,
});

const group = new Group({
  GroupModel,
});

const groupsToPermissions = new GroupsToPermissions({
  GroupsToPermissionsModel,
});

const usersToGroups = new UsersToGroups({
  UsersToGroupsModel,
});

export { group, groupsToPermissions, permission, user, usersToGroups };
