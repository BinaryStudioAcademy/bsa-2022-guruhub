import { FastifyPluginAsync, FastifyRequest } from 'fastify';
import {
  HttpCode,
  HttpMethod,
  ApiPath,
  UsersApiPath,
} from '~/common/enums/enums';
import { user as usersService } from '~/services/services';

type Options = {
  services: {
    user: typeof usersService;
  };
};

const initUserApi: FastifyPluginAsync<Options> = async (fastify, opts) => {
  const { user: userService } = opts.services;

  fastify.route({
    method: HttpMethod.GET,
    url: `${ApiPath.USERS}${UsersApiPath.ROOT}`,
    async handler(req: FastifyRequest, rep) {
      const users = await userService.getAll();

      return rep.status(HttpCode.OK).send(users);
    },
  });
};

export { initUserApi };
