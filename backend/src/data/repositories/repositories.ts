import {
  Course as CourseModel,
  Group as GroupModel,
  GroupsToPermissions as GroupsToPermissionsModel,
  Interview as InterviewModel,
  Permission as PermissionModel,
  User as UserModel,
  UsersToGroups as UsersToGroupsModel,
  Vendor as VendorModel,
} from '~/data/models/models';

import { Course } from './course/course.repository';
import { Group } from './group/group.repository';
import { GroupsToPermissions } from './groups-to-permissions/groups-to-permissions.repository';
import { Interview } from './interview/interview.repository';
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

const vendor = new Vendor({ VendorModel });

const interview = new Interview({ InterviewModel });

export {
  course,
  group,
  groupsToPermissions,
  interview,
  permission,
  user,
  usersToGroups,
  vendor,
};
