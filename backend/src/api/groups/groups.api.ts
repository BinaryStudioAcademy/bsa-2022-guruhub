import { FastifyPluginAsync, FastifyRequest } from 'fastify';

import { GroupsApiPath, HttpCode, HttpMethod } from '~/common/enums/enums';
import {
  GroupsCreateRequestDto,
  GroupsDeleteRequestParamDto,
} from '~/common/types/types';
import { group as groupService } from '~/services/services';
import {
  groupCreate as groupCreateValidationSchema,
  groupDelete as GroupsDeleteValidationSchema,
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
    async handler(req: FastifyRequest<{ Body: GroupsCreateRequestDto }>, rep) {
      const group = await groupService.create(req.body);

      return rep.status(HttpCode.CREATED).send(group);
    },
  });

  fastify.route({
    method: HttpMethod.GET,
    url: GroupsApiPath.ROOT,
    async handler(req, rep) {
      const groups = await groupService.getAll();

      return rep.status(HttpCode.OK).send(groups);
    },
  });

  fastify.route({
    method: HttpMethod.DELETE,
    url: GroupsApiPath.$ID,
    schema: { params: GroupsDeleteValidationSchema },
    async handler(
      req: FastifyRequest<{ Params: GroupsDeleteRequestParamDto }>,
      rep,
    ) {
      const { id } = req.params;

      const isDeleted = await groupService.delete(Number(id));

      return rep
        .status(isDeleted ? HttpCode.NO_CONTENT : HttpCode.NOT_FOUND)
        .send();
    },
  });
};

export { initGroupsApi };
