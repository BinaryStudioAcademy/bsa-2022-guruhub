import {
  ApiPath,
  AuthApiPath,
  CategoriesApiPath,
  CourseModulesApiPath,
  CoursesApiPath,
  ENV,
  InterviewsApiPath,
  MentorsApiPath,
} from '~/common/enums/enums';

const WHITE_ROUTES = [
  `${ENV.API.V1_PREFIX}${ApiPath.AUTH}${AuthApiPath.SIGN_IN}`,
  `${ENV.API.V1_PREFIX}${ApiPath.AUTH}${AuthApiPath.SIGN_UP}`,
  `${ENV.API.V1_PREFIX}${ApiPath.CATEGORIES}${CategoriesApiPath.ROOT}`,
  `${ENV.API.V1_PREFIX}${ApiPath.COURSES}${CoursesApiPath.ROOT}`,
  `${ENV.API.V1_PREFIX}${ApiPath.INTERVIEWS}${InterviewsApiPath.INTERVIEWEE_USER_$ID_CATEGORIES}`,
  `${ENV.API.V1_PREFIX}${ApiPath.MENTORS}${MentorsApiPath.ROOT}`,
  `${ENV.API.V1_PREFIX}${ApiPath.COURSES}${CoursesApiPath.$ID}`,
  `${ENV.API.V1_PREFIX}${ApiPath.COURSE_MODULES}${CourseModulesApiPath.COURSES_$ID_MODULES}`,
];

export { WHITE_ROUTES };
