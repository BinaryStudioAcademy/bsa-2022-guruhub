import { FastifyPluginAsync, FastifyRequest } from 'fastify';

import {
  HttpCode,
  HttpMethod,
  PaginationDefaultValue,
  PermissionApiPath,
} from '~/common/enums/enums';
import { EntityPaginationRequestQueryDto } from '~/common/types/types';
import { permission as permissionService } from '~/services/services';
import { pagination as paginationValidationSchema } from '~/validation-schemas/validation-schemas';

type Options = {
  services: {
    permission: typeof permissionService;
  };
};

const initPermissionsApi: FastifyPluginAsync<Options> = async (
  fastify,
  opts,
) => {
  const { permission: permissionService } = opts.services;

  fastify.route({
    method: HttpMethod.GET,
    url: PermissionApiPath.ROOT,
    schema: { querystring: paginationValidationSchema },
    async handler(
      req: FastifyRequest<{ Querystring: EntityPaginationRequestQueryDto }>,
      rep,
    ) {
      const {
        page = PaginationDefaultValue.DEFAULT_PAGE,
        count = PaginationDefaultValue.DEFAULT_COUNT,
      } = req.query;

      const permissions = await permissionService.getAll({ page, count });

      return rep.status(HttpCode.OK).send(permissions);
    },
  });
};

export { initPermissionsApi };
