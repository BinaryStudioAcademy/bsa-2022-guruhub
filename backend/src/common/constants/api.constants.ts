import {
  ApiPath,
  AuthApiPath,
  CategoriesApiPath,
  CourseModulesApiPath,
  CoursesApiPath,
  ENV,
  HttpMethod,
  InterviewsApiPath,
  MentorsApiPath,
} from '~/common/enums/enums';
import { WhiteRoute } from '~/common/types/types';

const WHITE_ROUTES: WhiteRoute[] = [
  {
    route: `${ENV.API.V1_PREFIX}${ApiPath.AUTH}${AuthApiPath.SIGN_IN}`,
    methods: [HttpMethod.POST],
  },
  {
    route: `${ENV.API.V1_PREFIX}${ApiPath.AUTH}${AuthApiPath.SIGN_UP}`,
    methods: [HttpMethod.POST],
  },
  {
    route: `${ENV.API.V1_PREFIX}${ApiPath.CATEGORIES}${CategoriesApiPath.ROOT}`,
    methods: [HttpMethod.GET],
  },
  {
    route: `${ENV.API.V1_PREFIX}${ApiPath.COURSES}${CoursesApiPath.ROOT}`,
    methods: [HttpMethod.GET],
  },
  {
    route: `${ENV.API.V1_PREFIX}${ApiPath.COURSES}${CoursesApiPath.$ID}`,
    methods: [HttpMethod.GET],
  },
  {
    route: `${ENV.API.V1_PREFIX}${ApiPath.COURSE_MODULES}${CourseModulesApiPath.COURSES_$ID_MODULES}`,
    methods: [HttpMethod.GET],
  },
  {
    route: `${ENV.API.V1_PREFIX}${ApiPath.INTERVIEWS}${InterviewsApiPath.INTERVIEWEE_USER_$ID_CATEGORIES}`,
    methods: [HttpMethod.GET],
  },
  {
    route: `${ENV.API.V1_PREFIX}${ApiPath.MENTORS}${MentorsApiPath.ROOT}`,
    methods: [HttpMethod.GET],
  },
];

export { WHITE_ROUTES };
