import {
  Course as CourseModel,
  CourseCategory as CourseCategoryModel,
  CourseModule as CourseModuleModel,
  Group as GroupModel,
  GroupsToPermissions as GroupsToPermissionsModel,
  Interview as InterviewModel,
  MentorsToCourseCategories as MentorsToCourseCategoriesModel,
  Permission as PermissionModel,
  User as UserModel,
  UsersToGroups as UsersToGroupsModel,
  Vendor as VendorModel,
} from '~/data/models/models';

import { Course } from './course/course.repository';
import { CourseCategory } from './course-category/course-category.repository';
import { CourseModule } from './course-module/course-module.repository';
import { Group } from './group/group.repository';
import { GroupsToPermissions } from './groups-to-permissions/groups-to-permissions.repository';
import { Interview } from './interview/interview.repository';
import { MentorsToCourseCategories } from './mentors-to-course-categories/mentors-to-course-categories.repository';
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

const courseModule = new CourseModule({
  ModuleModel: CourseModuleModel,
});

const vendor = new Vendor({ VendorModel });

const courseCategory = new CourseCategory({ CourseCategoryModel });

const interview = new Interview({ InterviewModel });

const mentorsToCourseCategories = new MentorsToCourseCategories({
  MentorsToCourseCategoriesModel,
});

export {
  course,
  courseCategory,
  courseModule,
  group,
  groupsToPermissions,
  interview,
  mentorsToCourseCategories,
  permission,
  user,
  usersToGroups,
  vendor,
};
