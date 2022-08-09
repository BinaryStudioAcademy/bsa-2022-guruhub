import { FastifyPluginAsync, FastifyRequest } from 'fastify';

import { HttpCode, HttpMethod, UserPath } from '~/common/enums/enums';
import { UserDeleteRequestRaramsDto } from '~/common/types/types';
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
    method: HttpMethod.DELETE,
    url: `${UserPath.$ID}`,
    schema: { params: userDeleteRequestParamsValidationSchema },
    async handler(
      req: FastifyRequest<{ Params: UserDeleteRequestRaramsDto }>,
      rep,
    ) {
      const { id } = req.params;

      await userService.delete(Number(id));

      return rep.status(HttpCode.OK);
    },
  });
};

export { initUsersApi };
