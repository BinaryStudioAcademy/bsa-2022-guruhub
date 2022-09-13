import { ApiSession } from '~/lib/common/types/types';
import { SessionStorage } from '~/lib/helpers/helpers';

import { ENV } from '../common/enums/enums';
import { AuthService } from './auth/auth.service';
import { CategoriesService } from './categories/categories.service';
import { CoursesService } from './courses/courses.service';
import { HttpService } from './http/http.service';
import { InterviewService } from './interview/interview.service';
import { PermissionsService } from './permissions/permissions.service';
import { UdemyService } from './udemy/udemy.service';
import { UsersService } from './users/users.service';

const sessionStorage = new SessionStorage<ApiSession>();

const httpService = new HttpService({ sessionStorage });

const udemyHttpService = new HttpService({
  sessionStorage,
  prefixUrl: ENV.UDEMY.BASE_URL,
});

const authService = new AuthService({ httpService });

const categoriesService = new CategoriesService({ httpService });

const coursesService = new CoursesService({ httpService });

const permissionsService = new PermissionsService({ httpService });

const interviewService = new InterviewService({ httpService });

const udemyService = new UdemyService({ httpService: udemyHttpService });

const usersService = new UsersService({ httpService });

export {
  sessionStorage as apiSessionStorage,
  authService,
  categoriesService,
  coursesService,
  httpService,
  interviewService,
  permissionsService,
  udemyHttpService,
  udemyService,
  usersService,
};
