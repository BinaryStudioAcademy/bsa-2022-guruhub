import { MMKV } from 'react-native-mmkv';

import { ENV } from '~/common/enums/enums';
import { MentorsApi } from '~/services/mentors-api/mentors-api.service';

import { AuthApi } from './auth-api/auth-api.service';
import { CategoriesApi } from './categories-api/categories-api.service';
import { CourseModulesApi } from './course-modules-api/course-modules-api.service';
import { Courses } from './courses-api/courses-api.service';
import { GroupsApi } from './groups-api/groups-api.service';
import { Http } from './http/http.service';
import { InterviewsApi } from './interviews-api/interviews-api.service';
import { Notification } from './notification/notification.service';
import { PermissionsApi } from './permissions-api/permissions-api.service';
import { Storage } from './storage/storage.service';
import { TasksApi } from './tasks-api/tasks-api.service';
import { UserDetailsApi } from './user-details-api/user-details-api.service';
import { UsersApi } from './users-api/users-api.service';

const storage = new Storage({
  storage: new MMKV(),
});

const http = new Http({ storage });

const authApi = new AuthApi({
  http,
  apiPrefix: ENV.APP.API_PATH,
});

const groupsApi = new GroupsApi({
  http,
  apiPrefix: ENV.APP.API_PATH,
});

const usersApi = new UsersApi({
  http,
  apiPrefix: ENV.APP.API_PATH,
});

const userDetailsApi = new UserDetailsApi({
  http,
  apiPrefix: ENV.APP.API_PATH,
});

const notification = new Notification();

const permissionsApi = new PermissionsApi({
  apiPrefix: ENV.APP.API_PATH,
  http,
});

const coursesApi = new Courses({
  apiPrefix: ENV.APP.API_PATH,
  http,
});

const categoriesApi = new CategoriesApi({
  apiPrefix: ENV.APP.API_PATH,
  http,
});

const courseModulesApi = new CourseModulesApi({
  http,
  apiPrefix: ENV.APP.API_PATH,
});

const interviewsApi = new InterviewsApi({
  apiPrefix: ENV.APP.API_PATH,
  http,
});

const mentorsApi = new MentorsApi({
  apiPrefix: ENV.APP.API_PATH,
  http,
});

const tasksApi = new TasksApi({ apiPrefix: ENV.APP.API_PATH, http });

export {
  authApi,
  categoriesApi,
  courseModulesApi,
  coursesApi,
  groupsApi,
  interviewsApi,
  mentorsApi,
  notification,
  permissionsApi,
  storage,
  tasksApi,
  userDetailsApi,
  usersApi,
};
