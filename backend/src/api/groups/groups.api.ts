import { FastifyPluginAsync, FastifyRequest } from 'fastify';

import {
  GroupsApiPath,
  HttpCode,
  HttpMethod,
  PaginationDefaultValue,
  PermissionKey,
} from '~/common/enums/enums';
import {
  EntityPaginationRequestQueryDto,
  GroupsConfigureRequestDto,
  GroupsDeleteRequestParamDto,
  GroupsUpdateRequestDto,
  GroupsUpdateRequestParamsDto,
} from '~/common/types/types';
import { checkHasPermissions } from '~/hooks/hooks';
import { group as groupService } from '~/services/services';
import {
  groupCreate as groupCreateValidationSchema,
  groupDelete as groupsDeleteValidationSchema,
  groupGetById as groupGetByIdValidationSchema,
  groupUpdate as groupUpdateValidationSchema,
  groupUpdateParams as groupUpdateParamsValidationSchema,
  pagination as paginationQueryValidationSchema,
} from '~/validation-schemas/validation-schemas';

type Options = {
  services: {
    group: typeof groupService;
  };
};

const initGroupsApi: FastifyPluginAsync<Options> = async (fastify, opts) => {
  const { group: groupService } = opts.services;

  fastify.route({
    method: HttpMethod.POST,
    url: GroupsApiPath.ROOT,
    schema: {
      body: groupCreateValidationSchema,
    },
    preHandler: checkHasPermissions(PermissionKey.MANAGE_UAM),
    async handler(
      req: FastifyRequest<{ Body: GroupsConfigureRequestDto }>,
      rep,
    ) {
      const group = await groupService.create(req.body);

      return rep.status(HttpCode.CREATED).send(group);
    },
  });

  fastify.route({
    method: HttpMethod.GET,
    url: GroupsApiPath.ROOT,
    schema: {
      querystring: paginationQueryValidationSchema,
    },
    preHandler: checkHasPermissions(PermissionKey.MANAGE_UAM),
    async handler(
      req: FastifyRequest<{ Querystring: EntityPaginationRequestQueryDto }>,
      rep,
    ) {
      const {
        page = PaginationDefaultValue.DEFAULT_PAGE,
        count = PaginationDefaultValue.DEFAULT_COUNT,
      } = req.query;

      const groups = await groupService.getPaginated({
        page,
        count,
      });

      return rep.status(HttpCode.OK).send(groups);
    },
  });

  fastify.route({
    method: HttpMethod.GET,
    url: GroupsApiPath.$ID,
    schema: { params: groupGetByIdValidationSchema },
    preHandler: checkHasPermissions(PermissionKey.MANAGE_UAM),
    async handler(req: FastifyRequest<{ Params: { id: string } }>, rep) {
      const { id } = req.params;

      const group = await groupService.getById(Number(id));

      return rep.status(HttpCode.OK).send(group);
    },
  });

  fastify.route({
    method: HttpMethod.PUT,
    url: GroupsApiPath.$ID,
    schema: {
      body: groupUpdateValidationSchema,
      params: groupUpdateParamsValidationSchema,
    },
    async handler(
      req: FastifyRequest<{
        Body: GroupsUpdateRequestDto;
        Params: GroupsUpdateRequestParamsDto;
      }>,
      rep,
    ) {
      const group = await groupService.update({
        id: req.params.id,
        groupsRequestDto: req.body,
      });

      return rep.status(HttpCode.OK).send(group);
    },
  });

  fastify.route({
    method: HttpMethod.DELETE,
    url: GroupsApiPath.$ID,
    schema: { params: groupsDeleteValidationSchema },
    preHandler: checkHasPermissions(PermissionKey.MANAGE_UAM),
    async handler(
      req: FastifyRequest<{ Params: GroupsDeleteRequestParamDto }>,
      rep,
    ) {
      const { id } = req.params;

      const isDeleted = await groupService.delete(Number(id));

      return rep
        .status(isDeleted ? HttpCode.OK : HttpCode.NOT_FOUND)
        .send(isDeleted);
    },
  });
};

export { initGroupsApi };
