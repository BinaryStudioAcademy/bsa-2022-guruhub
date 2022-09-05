import {
  ChatMessage as ChatMessageModel,
  Course as CourseModel,
  CourseCategory as CourseCategoryModel,
  CourseModule as CourseModuleModel,
  CoursesToMentors as CoursesToMentorsModel,
  File as FileModel,
  Group as GroupModel,
  GroupsToPermissions as GroupsToPermissionsModel,
  Interview as InterviewModel,
  InterviewNote as InterviewNoteModel,
  MenteesToMentors as MenteesToMentorsModel,
  Permission as PermissionModel,
  Task as TaskModel,
  TaskNote as TaskNoteModel,
  User as UserModel,
  UserDetails as UserDetailsModel,
  UsersToGroups as UsersToGroupsModel,
  Vendor as VendorModel,
} from '~/data/models/models';

import { ChatMessage } from './chat-message/chat-message.repository';
import { Course } from './course/course.repository';
import { CourseCategory } from './course-category/course-category.repository';
import { CourseModule } from './course-module/course-module.repository';
import { CoursesToMentors } from './courses-to-mentors/courses-to-mentors.repository';
import { File } from './file/file.repository';
import { Group } from './group/group.repository';
import { GroupsToPermissions } from './groups-to-permissions/groups-to-permissions.repository';
import { Interview } from './interview/interview.repository';
import { InterviewNote } from './interview-note/interview-note.repository';
import { MenteesToMentors } from './mentees-to-mentors/mentees-to-mentors.repository';
import { Permission } from './permission/permission.repository';
import { Task } from './task/task.repository';
import { TaskNote } from './task-note/task-note.repository';
import { User } from './user/user.repository';
import { UserDetails } from './user-details/user-details.repository';
import { UsersToGroups } from './users-to-groups/users-to-groups.repository';
import { Vendor } from './vendor/vendor.repository';

const user = new User({
  UserModel,
});

const userDetails = new UserDetails({
  UserDetailsModel,
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

const interviewNote = new InterviewNote({
  InterviewNoteModel,
});

const file = new File({ FileModel });

const coursesToMentors = new CoursesToMentors({ CoursesToMentorsModel });

const menteesToMentors = new MenteesToMentors({ MenteesToMentorsModel });

const chatMessage = new ChatMessage({
  ChatMessageModel,
});

const task = new Task({ TaskModel });

const taskNote = new TaskNote({ TaskNoteModel });

export {
  chatMessage,
  course,
  courseCategory,
  courseModule,
  coursesToMentors,
  file,
  group,
  groupsToPermissions,
  interview,
  interviewNote,
  menteesToMentors,
  permission,
  task,
  taskNote,
  user,
  userDetails,
  usersToGroups,
  vendor,
};
