import { ENV } from '~/lib/common/enums/enums';
import { setTestsConfig } from '~/lib/helpers/helpers';

const {
  TESTS_CONFIG: {
    STAGING: { API },
  },
  USERS,
} = ENV;

setTestsConfig({
  prefixUrl: API.PREFIX_URL,
  users: {
    student: USERS.STUDENT,
    mentor: USERS.MENTOR,
    interviewsManager: USERS.INTERVIEWS_MANAGER,
    interviewer: USERS.INTERVIEWER,
    categoriesManager: USERS.CATEGORIES_MANAGER,
    mentoringManager: USERS.MENTORING_MANAGER,
    uamManager: USERS.UAM_MANAGER,
  },
});
