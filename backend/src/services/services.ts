import { USER_PASSWORD_SALT_ROUNDS } from '~/common/constants/user.constants';
import { ENV } from '~/common/enums/enums';
import {
  user as userRepository,
  groups as groupsRepository,
  permission as permissionRepository,
  groupsToPermissions as groupsToPermissionsRepository,
} from '~/data/repositories/repositories';
import { Auth } from './auth/auth.service';
import { Encrypt } from './encrypt/encrypt.service';
import { Token } from './token/token.service';
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

const token = new Token({ alg: ENV.JWT.ALG, expiresIn: ENV.JWT.EXPIRES_IN });

const auth = new Auth({
  userService: user,
  encryptService: encrypt,
  tokenService: token,
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

export { auth, user, token, encrypt, permission, groups, groupsToPermissions };
