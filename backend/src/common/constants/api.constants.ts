import {
  ApiPath,
  AuthApiPath,
  CategoriesApiPath,
  CourseModulesApiPath,
  CoursesApiPath,
  ENV,
  HttpMethod,
} from '~/common/enums/enums';
import { WhiteRoute } from '~/common/types/types';

const WHITE_ROUTES: WhiteRoute[] = [
  {
    route: `${ENV.API.V1_PREFIX}${ApiPath.AUTH}${AuthApiPath.SIGN_IN}`,
    method: HttpMethod.POST,
  },
  {
    route: `${ENV.API.V1_PREFIX}${ApiPath.AUTH}${AuthApiPath.SIGN_UP}`,
    method: HttpMethod.POST,
  },
  {
    route: `${ENV.API.V1_PREFIX}${ApiPath.CATEGORIES}${CategoriesApiPath.ROOT}`,
    method: HttpMethod.GET,
  },
  {
    route: `${ENV.API.V1_PREFIX}${ApiPath.COURSES}${CoursesApiPath.ROOT}`,
    method: HttpMethod.GET,
  },
  {
    route: `${ENV.API.V1_PREFIX}${ApiPath.COURSES}${CoursesApiPath.$ID}`,
    method: HttpMethod.GET,
  },
  {
    route: `${ENV.API.V1_PREFIX}${ApiPath.COURSE_MODULES}${CourseModulesApiPath.COURSES_$ID_MODULES}`,
    method: HttpMethod.GET,
  },
];

export { WHITE_ROUTES };
