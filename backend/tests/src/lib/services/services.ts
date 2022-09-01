import { ApiSession } from '~/lib/common/types/types';
import { SessionStorage } from '~/lib/helpers/helpers';

import { AuthService } from './auth/auth.service';
import { HttpService } from './http/http.service';
import { InterviewService } from './interview/interview.service';
import { PermissionsService } from './permissions/permissions.service';

const sessionStorage = new SessionStorage<ApiSession>();

const httpService = new HttpService({ sessionStorage });

const authService = new AuthService({ httpService });

const permissionsService = new PermissionsService({ httpService });

const interviewService = new InterviewService({ httpService });

export {
  sessionStorage as apiSessionStorage,
  authService,
  httpService,
  interviewService,
  permissionsService,
};
