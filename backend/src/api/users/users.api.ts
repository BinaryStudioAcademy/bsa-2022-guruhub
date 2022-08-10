import { FastifyPluginAsync, FastifyRequest } from 'fastify';

import { DEFAULT_COUNT, DEFAULT_PAGE } from '~/common/constants/constants';
import { HttpCode, HttpMethod, UsersApiPath } from '~/common/enums/enums';
import {
  UserGetAllRequestQueryDto,
  UsersDeleteRequestParamsDto,
} from '~/common/types/types';
import { user as userService } from '~/services/services';
import {
  pagination as paginationQueryValidationSchema,
  userDelete as userDeleteRequestParamsValidationSchema,
} from '~/validation-schemas/validation-schemas';

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
    schema: {
      querystring: paginationQueryValidationSchema,
    },
    async handler(
      req: FastifyRequest<{
        Querystring: UserGetAllRequestQueryDto;
      }>,
      rep,
    ) {
      const { page = DEFAULT_PAGE, count = DEFAULT_COUNT } = req.query;
      const users = await userService.getAll({
        page,
        count,
      });

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

      return rep.status(isDeleted ? HttpCode.NO_CONTENT : HttpCode.NOT_FOUND);
    },
  });
};

export { initUsersApi };
