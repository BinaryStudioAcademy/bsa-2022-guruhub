import { FastifyPluginAsync } from 'fastify';

import { HttpCode, HttpMethod, UsersApiPath } from '~/common/enums/enums';
import { user as userService } from '~/services/services';

type Options = {
  services: {
    user: typeof userService;
  };
};

const initUsersApi: FastifyPluginAsync<Options> = async (fastify, opts) => {
  const { user: userService } = opts.services;

  fastify.route({
    method: HttpMethod.GET,
    url: UsersApiPath.ROOT,
    async handler(req, rep) {
      const users = await userService.getAll();

      return rep.status(HttpCode.OK).send(users);
    },
  });
};

export { initUsersApi };
