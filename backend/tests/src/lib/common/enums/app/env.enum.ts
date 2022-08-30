import { config } from 'dotenv';

config();

const {
  LOCAL_API_PREFIX_URL,
  STUDENT_EMAIL,
  STUDENT_PASSWORD,
  JS_MENTOR_EMAIL,
  JS_MENTOR_PASSWORD,
  PYTHON_MENTOR_EMAIL,
  PYTHON_MENTOR_PASSWORD,
  CSHARP_MENTOR_EMAIL,
  CSHARP_MENTOR_PASSWORD,
  INTERVIEWS_MANAGER_EMAIL,
  INTERVIEWS_MANAGER_PASSWORD,
  INTERVIEWER_EMAIL,
  INTERVIEWER_PASSWORD,
  CATEGORIES_MANAGER_EMAIL,
  CATEGORIES_MANAGER_PASSWORD,
  MENTORING_MANAGER_EMAIL,
  MENTORING_MANAGER_PASSWORD,
  UAM_MANAGER_EMAIL,
  UAM_MANAGER_PASSWORD,
} = process.env;

const ENV = {
  TESTS_CONFIG: {
    DEVELOPMENT: {
      API: {
        PREFIX_URL: LOCAL_API_PREFIX_URL ?? '',
      },
    },
    STAGING: {
      API: {
        PREFIX_URL: 'https://development.guruhub.club/api/v1',
      },
    },
    PRODUCTION: {
      API: {
        PREFIX_URL: 'https://guruhub.club/api/v1',
      },
    },
  },
  USERS: {
    STUDENT: {
      email: STUDENT_EMAIL ?? '',
      password: STUDENT_PASSWORD ?? '',
    },
    JS_MENTOR: {
      email: JS_MENTOR_EMAIL ?? '',
      password: JS_MENTOR_PASSWORD ?? '',
    },
    PYTHON_MENTOR: {
      email: PYTHON_MENTOR_EMAIL ?? '',
      password: PYTHON_MENTOR_PASSWORD ?? '',
    },
    CSHARP_MENTOR: {
      email: CSHARP_MENTOR_EMAIL ?? '',
      password: CSHARP_MENTOR_PASSWORD ?? '',
    },
    INTERVIEWS_MANAGER: {
      email: INTERVIEWS_MANAGER_EMAIL ?? '',
      password: INTERVIEWS_MANAGER_PASSWORD ?? '',
    },
    INTERVIEWER: {
      email: INTERVIEWER_EMAIL ?? '',
      password: INTERVIEWER_PASSWORD ?? '',
    },
    CATEGORIES_MANAGER: {
      email: CATEGORIES_MANAGER_EMAIL ?? '',
      password: CATEGORIES_MANAGER_PASSWORD ?? '',
    },
    MENTORING_MANAGER: {
      email: MENTORING_MANAGER_EMAIL ?? '',
      password: MENTORING_MANAGER_PASSWORD ?? '',
    },
    UAM_MANAGER: {
      email: UAM_MANAGER_EMAIL ?? '',
      password: UAM_MANAGER_PASSWORD ?? '',
    },
  },
} as const;

export { ENV };
