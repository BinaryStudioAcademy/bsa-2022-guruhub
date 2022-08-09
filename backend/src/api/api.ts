import { FastifyPluginAsync } from 'fastify';

import { ApiPath } from '~/common/enums/enums';
import { ValidationSchema } from '~/common/types/types';
import { auth, user } from '~/services/services';

import { initAuthApi } from './auth/auth.api';
import { initUsersApi } from './users/users.api';

const initApi: FastifyPluginAsync = async (fastify) => {
  fastify.setValidatorCompiler<ValidationSchema>(({ schema }) => {
    return <T>(data: T): ReturnType<ValidationSchema['validate']> => {
      return schema.validate(data);
    };
  });

  fastify.register(initAuthApi, {
    services: {
      auth,
    },
    prefix: ApiPath.AUTH,
  });

  fastify.register(initUsersApi, {
    services: {
      user,
    },
    prefix: ApiPath.USERS,
  });
};

export { initApi };
