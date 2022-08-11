import {
  Course as CourseModel,
  CourseCategory as CourseCategoryModel,
  CoursesToCourseCategories as CoursesToCourseCategoriesModel,
  CoursesToVendors as CoursesToVendorsModel,
  Group as GroupModel,
  GroupsToPermissions as GroupsToPermissionsModel,
  Permission as PermissionModel,
  User as UserModel,
  UsersToGroups as UsersToGroupsModel,
  Vendor as VendorModel,
} from '~/data/models/models';

import { Course } from './course/course.repository';
import { CourseCategory } from './course-category/course-category.repository';
import { CoursesToCourseCategories } from './courses-to-course-categories/courses-to-course-categories.repository';
import { CoursesToVendors } from './courses-to-vendors/courses-to-vendors.repository';
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

const coursesToVendors = new CoursesToVendors({ CoursesToVendorsModel });

const coursesToCourseCategories = new CoursesToCourseCategories({
  CoursesToCourseCategoriesModel,
});

const vendor = new Vendor({ VendorModel });

export {
  course,
  courseCategory,
  coursesToCourseCategories,
  coursesToVendors,
  group,
  groupsToPermissions,
  permission,
  user,
  usersToGroups,
  vendor,
};
