import { FastifyPluginAsync } from 'fastify';

import {
  ALLOWED_IMAGE_EXTENSIONS,
  WHITE_ROUTES,
} from '~/common/constants/constants';
import { ApiPath, FileSizeBytesValue } from '~/common/enums/enums';
import { ValidationSchema } from '~/common/types/types';
import {
  authorization as authorizationPlugin,
  file as filePlugin,
} from '~/plugins/plugins';
import {
  auth,
  course,
  courseCategory,
  courseModule,
  group,
  interview,
  mentor,
  permission,
  task,
  token,
  user,
  userDetails,
} from '~/services/services';

import { initAuthApi } from './auth/auth.api';
import { initCategoriesApi } from './categories/categories.api';
import { initCourseModulesApi } from './course-modules/course-modules.api';
import { initCoursesApi } from './courses/courses.api';
import { initGroupsApi } from './groups/groups.api';
import { initInterviewsApi } from './interviews/interviews.api';
import { initMentorsApi } from './mentors/mentors.api';
import { initPermissionsApi } from './permissions/permissions.api';
import { initTasksApi } from './tasks/tasks.api';
import { initUserDetailsApi } from './user-details/user-details.api';
import { initUsersApi } from './users/users.api';

const initApi: FastifyPluginAsync = async (fastify) => {
  fastify.setValidatorCompiler<ValidationSchema>(({ schema }) => {
    return <T>(data: T): ReturnType<ValidationSchema['validate']> => {
      return schema.validate(data);
    };
  });

  fastify.register(authorizationPlugin, {
    services: {
      user,
      token,
    },
    routesWhiteList: WHITE_ROUTES,
  });

  fastify.register(filePlugin, {
    limits: {
      fieldSize: FileSizeBytesValue.ONE_MB,
    },
    allowedExtensions: ALLOWED_IMAGE_EXTENSIONS,
  });

  fastify.register(initAuthApi, {
    services: {
      auth,
    },
    prefix: ApiPath.AUTH,
  });

  fastify.register(initPermissionsApi, {
    services: {
      permission,
    },
    prefix: ApiPath.PERMISSIONS,
  });

  fastify.register(initGroupsApi, {
    services: {
      group,
    },
    prefix: ApiPath.GROUPS,
  });

  fastify.register(initUsersApi, {
    services: {
      user,
    },
    prefix: ApiPath.USERS,
  });

  fastify.register(initUserDetailsApi, {
    services: {
      userDetails,
    },
    prefix: ApiPath.USER_DETAILS,
  });

  fastify.register(initCoursesApi, {
    services: {
      course,
      mentor,
    },
    prefix: ApiPath.COURSES,
  });

  fastify.register(initCategoriesApi, {
    services: {
      courseCategory,
    },
    prefix: ApiPath.CATEGORIES,
  });

  fastify.register(initCourseModulesApi, {
    services: {
      courseModule,
    },
    prefix: ApiPath.COURSE_MODULES,
  });

  fastify.register(initInterviewsApi, {
    services: {
      interview,
    },
    prefix: ApiPath.INTERVIEWS,
  });

  fastify.register(initMentorsApi, {
    services: {
      mentor,
    },
    prefix: ApiPath.MENTORS,
  });

  fastify.register(initTasksApi, {
    services: {
      task,
    },
    prefix: ApiPath.TASKS,
  });
};

export { initApi };
