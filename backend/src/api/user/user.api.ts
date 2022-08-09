import { FastifyPluginAsync, FastifyRequest } from 'fastify';

import { HttpCode, HttpMethod, UserPath } from '~/common/enums/enums';
import { UserDeleteRequestDto } from '~/common/types/types';
import { user as userService } from '~/services/services';

type Options = {
  services: {
    user: typeof userService;
  };
};

const initUserApi: FastifyPluginAsync<Options> = async (fastify, opts) => {
  const { user: userService } = opts.services;

  fastify.route({
    method: HttpMethod.DELETE,
    url: `${UserPath.USER}${UserPath.$ID}`,
    async handler(req: FastifyRequest<{ Params: UserDeleteRequestDto }>, rep) {
      await userService.delete(req.params.id);

      return rep.status(HttpCode.OK).send(true);
    },
  });
};

export { initUserApi };
