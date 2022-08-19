import {
  ApiPath,
  AuthApiPath,
  CategoriesApiPath,
  CoursesApiPath,
  ENV,
} from '~/common/enums/enums';

const WHITE_ROUTES = [
  `${ENV.API.V1_PREFIX}${ApiPath.AUTH}${AuthApiPath.SIGN_IN}`,
  `${ENV.API.V1_PREFIX}${ApiPath.AUTH}${AuthApiPath.SIGN_UP}`,
  `${ENV.API.V1_PREFIX}${ApiPath.CATEGORIES}${CategoriesApiPath.ROOT}`,
  `${ENV.API.V1_PREFIX}${ApiPath.COURSES}${CoursesApiPath.ROOT}`,
];

export { WHITE_ROUTES };
