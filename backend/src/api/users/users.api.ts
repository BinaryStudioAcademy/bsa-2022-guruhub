import { FastifyPluginAsync, FastifyRequest } from 'fastify';

import { HttpCode, HttpMethod, UsersApiPath } from '~/common/enums/enums';
import { UsersDeleteRequestParamsDto } from '~/common/types/types';
import { user as userService } from '~/services/services';
import { userDelete as userDeleteRequestParamsValidationSchema } from '~/validation-schemas/validation-schemas';

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

  fastify.route({
    method: HttpMethod.DELETE,
    url: UsersApiPath.$ID,
    schema: { params: userDeleteRequestParamsValidationSchema },
    async handler(
      req: FastifyRequest<{ Params: UsersDeleteRequestParamsDto }>,
      rep,
    ) {
      const { id } = req.params;

      const isDeleted = await userService.delete(Number(id));

      return rep.status(isDeleted ? HttpCode.OK : HttpCode.NOT_FOUND);
    },
  });
};

export { initUsersApi };
