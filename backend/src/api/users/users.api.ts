import { FastifyPluginAsync, FastifyRequest } from 'fastify';

import { HttpCode, HttpMethod, UsersApiPath } from '~/common/enums/enums';
import { user as usersService } from '~/services/services';

type Options = {
  services: {
    user: typeof usersService;
  };
};

const initUsersApi: FastifyPluginAsync<Options> = async (fastify, opts) => {
  const { user: userService } = opts.services;

  fastify.route({
    method: HttpMethod.GET,
    url: UsersApiPath.ROOT,
    async handler(req: FastifyRequest, rep) {
      const users = await userService.getAll();

      return rep.status(HttpCode.OK).send(users);
    },
  });
};

export { initUsersApi };
