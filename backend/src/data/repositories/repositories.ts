import {
  Course as CourseModel,
  CoursesToCourseCategories as CoursesToCourseCategoriesModel,
  CoursesToVendors as CoursesToVendorsModel,
  Group as GroupModel,
  GroupsToPermissions as GroupsToPermissionsModel,
  Permission as PermissionModel,
  User as UserModel,
  UsersToGroups as UsersToGroupsModel,
} from '~/data/models/models';

import { Course } from './course/course.repository';
import { CoursesToCourseCategories } from './courses-to-course-categories/courses-to-course-categories.repository';
import { CoursesToVendors } from './courses-to-vendors/courses-to-vendors.repository';
import { Group } from './group/group.repository';
import { GroupsToPermissions } from './groups-to-permissions/groups-to-permissions.repository';
import { Permission } from './permission/permission.repository';
import { User } from './user/user.repository';
import { UsersToGroups } from './users-to-groups/users-to-groups.repository';

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

const courses = new Course({ CourseModel });

const coursesToVendors = new CoursesToVendors({ CoursesToVendorsModel });

const coursesToCourseCategories = new CoursesToCourseCategories({
  CoursesToCourseCategoriesModel,
});

export {
  courses,
  coursesToCourseCategories,
  coursesToVendors,
  group,
  groupsToPermissions,
  permission,
  user,
  usersToGroups,
};
