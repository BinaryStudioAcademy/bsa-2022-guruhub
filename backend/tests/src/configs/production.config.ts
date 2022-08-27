import { ENV } from '~/lib/common/enums/enums';
import { setTestsConfig } from '~/lib/helpers/helpers';

const {
  TESTS_CONFIG: {
    PRODUCTION: { API },
  },
  USERS,
} = ENV;

setTestsConfig({
  prefixUrl: API.PREFIX_URL,
  users: {
    student: USERS.STUDENT,
    jsMentor: USERS.JS_MENTOR,
    pythonMentor: USERS.PYTHON_MENTOR,
    csharpMentor: USERS.CSHARP_MENTOR,
    interviewsManager: USERS.INTERVIEWS_MANAGER,
    interviewer: USERS.INTERVIEWER,
    categoriesManager: USERS.CATEGORIES_MANAGER,
    mentoringManager: USERS.MENTORING_MANAGER,
    uamManager: USERS.UAM_MANAGER,
  },
});
