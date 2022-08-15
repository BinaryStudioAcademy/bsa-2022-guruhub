import { ENV } from '~/lib/common/enums/enums';
import { setTestsConfig } from '~/lib/helpers/helpers';

const { API, USERS } = ENV.TESTS_CONFIG.STAGING;

setTestsConfig({
  prefixUrl: API.PREFIX_URL,
  users: {
    student: USERS.STUDENT,
    mentor: USERS.MENTOR,
    interviewManager: USERS.INTERVIEW_MANAGER,
    uamManager: USERS.UAM_MANAGER,
    categoriesManager: USERS.CATEGORIES_MANAGER,
    mentoringManager: USERS.MENTORING_MANAGER,
  },
});
