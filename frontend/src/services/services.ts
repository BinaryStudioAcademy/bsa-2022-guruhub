import { ENV } from 'common/enums/enums';

import { AuthApi } from './auth-api/auth-api.service';
import { CategoriesApi } from './categories-api/categories-api.service';
import { CourseModulesApi } from './course-modules-api/course-modules-api.service';
import { CoursesApi } from './courses-api/courses-api.service';
import { GroupsApi } from './groups-api/groups-api.service';
import { Http } from './http/http.service';
import { InterviewsApi } from './interviews-api/interviews-api.service';
import { Navigation } from './navigation/navigation.service';
import { Notification } from './notification/notification.service';
import { PermissionsApi } from './permissions-api/permissions-api';
import { Storage } from './storage/storage.service';
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

const interviewsApi = new InterviewsApi({
  apiPrefix: ENV.API_PATH,
  http,
});

const notification = new Notification();

const navigation = new Navigation();

export {
  authApi,
  categoriesApi,
  courseModulesApi,
  coursesApi,
  groupsApi,
  interviewsApi,
  navigation,
  notification,
  permissionsApi,
  storage,
  usersApi,
};
