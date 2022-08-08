import { USER_PASSWORD_SALT_ROUNDS } from '~/common/constants/user.constants';
import {
  user as userRepository,
  groups as groupsRepository,
  permission as permissionRepository,
  groupsToPermissions as groupsToPermissionsRepository,
} from '~/data/repositories/repositories';
import { Auth } from './auth/auth.service';
import { Encrypt } from './encrypt/encrypt.service';
import { User } from './user/user.service';
import { Groups } from './groups/groups.service';
import { Permission } from './permission/permission.service';
import { GroupsToPermissions } from './groups-to-permissions/groups-to-permissions.service';

const encrypt = new Encrypt({
  salt: USER_PASSWORD_SALT_ROUNDS,
});

const user = new User({
  userRepository,
  encryptService: encrypt,
});

const auth = new Auth({
  userService: user,
});

const permission = new Permission({
  permissionRepository,
});

const groupsToPermissions = new GroupsToPermissions({
  groupsToPermissionsRepository,
});

const groups = new Groups({
  groupsRepository,
  permissionService: permission,
  groupsToPermissionsService: groupsToPermissions,
});

export { auth, user, permission, groups, groupsToPermissions };
