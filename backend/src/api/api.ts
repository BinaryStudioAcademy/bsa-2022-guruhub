import { FastifyPluginAsync } from 'fastify';
import { ApiPath } from '~/common/enums/enums';
import { ValidationSchema } from '~/common/types/types';
import { auth, permission, groups } from '~/services/services';
import { initAuthApi } from './auth/auth.api';
import { initPermissionApi } from './permission/permission.api';
import { initGroupsApi } from './groups/groups.api';

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

  fastify.register(initPermissionApi, {
    services: {
      permission,
    },
    prefix: ApiPath.PERMISSIONS,
  });

  fastify.register(initGroupsApi, {
    services: {
      groups,
    },
    prefix: ApiPath.GROUPS,
  });
};

export { initApi };
