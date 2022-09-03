import { ENV } from 'common/enums/enums';

import { AuthApi } from './auth-api/auth-api.service';
import { CategoriesApi } from './categories-api/categories-api.service';
import { CourseModulesApi } from './course-modules-api/course-modules-api.service';
import { CoursesApi } from './courses-api/courses-api.service';
import { GroupsApi } from './groups-api/groups-api.service';
import { Http } from './http/http.service';
import { InterviewsApi } from './interviews-api/interviews-api.service';
import { MentorsApi } from './mentors-api/mentors-api.service';
import { Navigation } from './navigation/navigation.service';
import { Notification } from './notification/notification.service';
import { PermissionsApi } from './permissions-api/permissions-api';
import { Storage } from './storage/storage.service';
import { TasksApi } from './tasks-api/tasks-api.service';
import { UserDetailsApi } from './user-details-api/user-details-api.service';
import { UsersApi } from './users-api/users-api.service';

const storage = new Storage({
  storage: localStorage,
});

const http = new Http({
  storage,
});

const authApi = new AuthApi({
  apiPrefix: ENV.API_PATH,
  http,
});

const usersApi = new UsersApi({
  apiPrefix: ENV.API_PATH,
  http,
});

const userDetailsApi = new UserDetailsApi({
  apiPrefix: ENV.API_PATH,
  http,
});

const groupsApi = new GroupsApi({
  apiPrefix: ENV.API_PATH,
  http,
});

const permissionsApi = new PermissionsApi({
  apiPrefix: ENV.API_PATH,
  http,
});

const coursesApi = new CoursesApi({
  apiPrefix: ENV.API_PATH,
  http,
});

const courseModulesApi = new CourseModulesApi({
  apiPrefix: ENV.API_PATH,
  http,
});

const categoriesApi = new CategoriesApi({
  apiPrefix: ENV.API_PATH,
  http,
});

const notification = new Notification();

const navigation = new Navigation();

const interviewsApi = new InterviewsApi({ apiPrefix: ENV.API_PATH, http });

const mentorsApi = new MentorsApi({ apiPrefix: ENV.API_PATH, http });

const tasksApi = new TasksApi({ apiPrefix: ENV.API_PATH, http });

export {
  authApi,
  categoriesApi,
  courseModulesApi,
  coursesApi,
  groupsApi,
  interviewsApi,
  mentorsApi,
  navigation,
  notification,
  permissionsApi,
  storage,
  tasksApi,
  userDetailsApi,
  usersApi,
};
