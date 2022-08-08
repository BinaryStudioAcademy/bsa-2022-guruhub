import { FastifyPluginAsync, FastifyRequest } from 'fastify';
import { HttpCode, HttpMethod } from '~/common/enums/enums';
import { UserApiPath } from './common/user-api-path.enum';
import { user as userService } from '~/services/services';

type Options = {
  services: {
    user: typeof userService;
  };
};

const initUserApi: FastifyPluginAsync<Options> = async (fastify, opts) => {
  const { user: userService } = opts.services;

  fastify.route({
    method: HttpMethod.GET,
    url: UserApiPath.USERS,
    async handler(req: FastifyRequest, rep) {
      const users = await userService.getAll();

      return rep.status(HttpCode.OK).send(users);
    },
  });
};

export { initUserApi };
