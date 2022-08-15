import { USER_PASSWORD_SALT_ROUNDS } from '~/common/constants/user.constants';
import { ENV } from '~/common/enums/enums';
import {
  course as courseRepository,
  group as groupsRepository,
  groupsToPermissions as groupsToPermissionsRepository,
  permission as permissionRepository,
  user as userRepository,
  usersToGroups as usersToGroupsRepository,
  vendor as vendorRepository,
} from '~/data/repositories/repositories';
import { getUdemyToken } from '~/helpers/helpers';

import { Auth } from './auth/auth.service';
import { Course } from './course/course.service';
import { Encrypt } from './encrypt/encrypt.service';
import { Group } from './group/group.service';
import { GroupsToPermissions } from './groups-to-permissions/groups-to-permissions.service';
import { Http } from './http/http.service';
import { Permission } from './permission/permission.service';
import { Token } from './token/token.service';
import { Udemy } from './udemy/udemy.service';
import { User } from './user/user.service';
import { UsersToGroups } from './users-to-groups/users-to-groups.service';
import { Vendor } from './vendor/vendor.service';

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

const usersToGroups = new UsersToGroups({
  usersToGroupsRepository,
});

const group = new Group({
  groupsRepository,
  permissionService: permission,
  groupsToPermissionsService: groupsToPermissions,
  usersToGroupsService: usersToGroups,
  userService: user,
});

const vendor = new Vendor({ vendorRepository });

const http = new Http();

const udemy = new Udemy({
  httpService: http,
  baseUrl: ENV.UDEMY.BASE_URL,
  authorizationToken: getUdemyToken(),
});

const course = new Course({
  courseRepository,
  vendorService: vendor,
  udemyService: udemy,
});

export {
  auth,
  course,
  encrypt,
  group,
  groupsToPermissions,
  http,
  permission,
  token,
  udemy,
  user,
  usersToGroups,
  vendor,
};
