import {
  Course as CourseModel,
  CourseToVendor as CourseToVendorModel,
  Group as GroupModel,
  GroupsToPermissions as GroupsToPermissionsModel,
  Permission as PermissionModel,
  User as UserModel,
  UsersToGroups as UsersToGroupsModel,
  Vendor as VendorModel,
} from '~/data/models/models';

import { Course } from './course/course.repository';
import { CourseToVendor } from './course-to-vendor/course-to-vendor.repository';
import { Group } from './group/group.repository';
import { GroupsToPermissions } from './groups-to-permissions/groups-to-permissions.repository';
import { Permission } from './permission/permission.repository';
import { User } from './user/user.repository';
import { UsersToGroups } from './users-to-groups/users-to-groups.repository';
import { Vendor } from './vendor/vendor.repository';

const user = new User({
  UserModel,
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

const course = new Course({ CourseModel });

const courseToVendor = new CourseToVendor({ CourseToVendorModel });

const vendor = new Vendor({ VendorModel });

export {
  course,
  courseToVendor,
  group,
  groupsToPermissions,
  permission,
  user,
  usersToGroups,
  vendor,
};
