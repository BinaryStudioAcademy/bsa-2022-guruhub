import { USER_PASSWORD_SALT_ROUNDS } from '~/common/constants/user.constants';
import { ENV } from '~/common/enums/enums';
import {
  chatMessage as chatMessageRepository,
  course as courseRepository,
  courseCategory as courseCategoryRepository,
  courseCategoryPrice as courseCategoryPriceRepository,
  courseModule as courseModuleRepository,
  coursesToMentors as coursesToMentorsRepository,
  file as fileRepository,
  group as groupsRepository,
  groupsToPermissions as groupsToPermissionsRepository,
  interview as interviewRepository,
  interviewNote as interviewNoteRepository,
  menteesToMentors as menteesToMentorsRepository,
  permission as permissionRepository,
  task as taskRepository,
  taskNote as taskNoteRepository,
  transaction as transactionRepository,
  user as userRepository,
  userDetails as userDetailsRepository,
  usersToGroups as usersToGroupsRepository,
  vendor as vendorRepository,
} from '~/data/repositories/repositories';

import { Auth } from './auth/auth.service';
import { File } from './aws/file/file.service';
import { Billing } from './billing/billing.service';
import { ChatMessage } from './chat-message/chat-message.service';
import { Course } from './course/course.service';
import { CourseCategory } from './course-category/course-category.service';
import { CourseModule } from './course-module/course-module.service';
import { CoursesToMentors } from './courses-to-mentors/courses-to-mentors.service';
import { Edx } from './edx/edx.service';
import { Encrypt } from './encrypt/encrypt.service';
import { Group } from './group/group.service';
import { GroupsToPermissions } from './groups-to-permissions/groups-to-permissions.service';
import { Http } from './http/http.service';
import { Interview } from './interview/interview.service';
import { InterviewNote } from './interview-note/interview-note.service';
import { MenteesToMentors } from './mentees-to-mentors/mentees-to-mentors.service';
import { Mentor } from './mentor/mentor.service';
import { Permission } from './permission/permission.service';
import { Socket } from './socket/socket.service';
import { Task } from './task/task.service';
import { TaskNote } from './task-note/task-note.service';
import { Token } from './token/token.service';
import { Transaction } from './transaction/transaction.service';
import { Udemy } from './udemy/udemy.service';
import { User } from './user/user.service';
import { UserDetails } from './user-details/user-details.service';
import { UsersToGroups } from './users-to-groups/users-to-groups.service';
import { Vendor } from './vendor/vendor.service';

const encrypt = new Encrypt({
  salt: USER_PASSWORD_SALT_ROUNDS,
});

const token = new Token({ alg: ENV.JWT.ALG, expiresIn: ENV.JWT.EXPIRES_IN });

const file = new File({
  region: ENV.AWS.REGION,
  accessKeyId: ENV.AWS.ACCESS_KEY_ID,
  secretAccessKey: ENV.AWS.SECRET_ACCESS_KEY,
  fileRepository,
});

const userDetails = new UserDetails({
  userDetailsRepository,
  fileService: file,
  avatarBucketName: ENV.AWS.USERS_FILES_BUCKET_NAME,
});

const usersToGroups = new UsersToGroups({
  usersToGroupsRepository,
});

const menteesToMentors = new MenteesToMentors({ menteesToMentorsRepository });

const coursesToMentors = new CoursesToMentors({
  coursesToMentorsRepository,
  groupRepository: groupsRepository,
  usersToGroupsService: usersToGroups,
  menteesToMentorsService: menteesToMentors,
});

const interviewNote = new InterviewNote({
  interviewNoteRepository,
});

const interview = new Interview({
  interviewRepository,
  interviewNoteService: interviewNote,
});

const user = new User({
  userRepository,
  encryptService: encrypt,
  userDetailsService: userDetails,
  coursesToMentorsService: coursesToMentors,
  menteesToMentorsService: menteesToMentors,
  interviewService: interview,
});

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
  clientId: ENV.UDEMY.CLIENT_ID,
  clientSecret: ENV.UDEMY.CLIENT_SECRET,
});

const edx = new Edx({
  httpService: http,
  baseUrl: ENV.EDX.BASE_URL,
  clientId: ENV.EDX.CLIENT_ID,
  clientSecret: ENV.EDX.CLIENT_SECRET,
});

const courseCategory = new CourseCategory({
  courseCategoryRepository,
  courseCategoryPriceRepository,
});

const courseModule = new CourseModule({
  moduleRepository: courseModuleRepository,
  udemyService: udemy,
});

const course = new Course({
  courseRepository,
  vendorService: vendor,
  courseModuleService: courseModule,
  udemyService: udemy,
  edxService: edx,
  courseCategoryService: courseCategory,
  coursesToMentorsService: coursesToMentors,
});

const taskNote = new TaskNote({ taskNoteRepository });

const transaction = new Transaction({ transactionRepository });

const billing = new Billing({
  secretKey: ENV.STRIPE.SECRET_KEY,
  apiVersion: ENV.STRIPE.API_VERSION,
  transactionService: transaction,
  userService: user,
  userDetailsService: userDetails,
});

const task = new Task({
  taskRepository,
  taskNoteService: taskNote,
  billingService: billing,
  menteesToMentorsService: menteesToMentors,
  userService: user,
  userDetailsService: userDetails,
});

const mentor = new Mentor({
  menteesToMentorsService: menteesToMentors,
  courseService: course,
  coursesToMentorsService: coursesToMentors,
  courseModuleService: courseModule,
  courseCategoryService: courseCategory,
  taskService: task,
  billingService: billing,
});

const chatMessage = new ChatMessage({
  chatMessageRepository,
  menteesToMentorsRepository,
  userRepository,
});

const socket = new Socket();

export {
  auth,
  billing,
  chatMessage,
  course,
  courseCategory,
  courseModule,
  coursesToMentors,
  edx,
  encrypt,
  file,
  group,
  groupsToPermissions,
  http,
  interview,
  interviewNote,
  menteesToMentors,
  mentor,
  permission,
  socket,
  task,
  taskNote,
  token,
  transaction,
  udemy,
  user,
  userDetails,
  usersToGroups,
  vendor,
};
