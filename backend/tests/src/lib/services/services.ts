import { ApiSession } from '~/lib/common/types/types';
import { SessionStorage } from '~/lib/helpers/helpers';

import { AuthService } from './auth/auth.service';
import { CategoriesService } from './categories/categories.service';
import { HttpService } from './http/http.service';
import { InterviewService } from './interview/interview.service';
import { PermissionsService } from './permissions/permissions.service';
import { UsersService } from './users/users.service';

const sessionStorage = new SessionStorage<ApiSession>();

const httpService = new HttpService({ sessionStorage });

const authService = new AuthService({ httpService });

const categoriesService = new CategoriesService({ httpService });

const permissionsService = new PermissionsService({ httpService });

const interviewService = new InterviewService({ httpService });

const usersService = new UsersService({ httpService });

export {
  sessionStorage as apiSessionStorage,
  authService,
  categoriesService,
  httpService,
  interviewService,
  permissionsService,
  usersService,
};
