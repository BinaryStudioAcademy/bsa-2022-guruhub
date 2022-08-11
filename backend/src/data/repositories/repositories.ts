import {
  Course as CourseModel,
  CourseCategory as CourseCategoryModel,
  CourseToCourseCategories as CourseToCourseCategoriesModel,
  CourseToVendors as CourseToVendorsModel,
  Group as GroupModel,
  GroupsToPermissions as GroupsToPermissionsModel,
  Permission as PermissionModel,
  User as UserModel,
  UsersToGroups as UsersToGroupsModel,
  Vendor as VendorModel,
} from '~/data/models/models';

import { Course } from './course/course.repository';
import { CourseCategory } from './course-category/course-category.repository';
import { CourseToVendors } from './course-to-vendors/course-to-vendors.repository';
import { CourseToCourseCategories } from './courses-to-course-categories/courses-to-course-categories.repository';
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

const courseCategory = new CourseCategory({ CourseCategoryModel });

const courseToVendors = new CourseToVendors({ CourseToVendorsModel });

const courseToCourseCategories = new CourseToCourseCategories({
  CourseToCourseCategoriesModel,
});

const vendor = new Vendor({ VendorModel });

export {
  course,
  courseCategory,
  courseToCourseCategories,
  courseToVendors,
  group,
  groupsToPermissions,
  permission,
  user,
  usersToGroups,
  vendor,
};
