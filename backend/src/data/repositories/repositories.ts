import {
  User as UserModel,
  Permission as PermissionModel,
  Groups as GroupsModel,
  GroupsToPermissions as GroupsToPermissionsModel,
  UsersToGroups as UsersToGroupsModel,
} from '~/data/models/models';
import { User } from './user/user.repository';
import { Permission } from './permission/permission.repository';
import { Groups } from './groups/groups.repository';
import { GroupsToPermissions } from './groups-to-permissions/groups-to-permissions.repository';
import { UsersToGroups } from './users-to-groups/users-to-groups.repository';

const user = new User({
  UserModel,
});

const permission = new Permission({
  PermissionModel,
});

const groups = new Groups({
  GroupsModel,
});

const groupsToPermissions = new GroupsToPermissions({
  GroupsToPermissionsModel,
});

const usersToGroups = new UsersToGroups({
  UsersToGroupsModel,
});

export { user, permission, groups, groupsToPermissions, usersToGroups };
