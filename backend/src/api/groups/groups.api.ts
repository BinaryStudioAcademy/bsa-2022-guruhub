import { FastifyPluginAsync, FastifyRequest } from 'fastify';

import { GroupsApiPath, HttpCode, HttpMethod } from '~/common/enums/enums';
import { GroupsCreateRequestDto } from '~/common/types/types';
import { group as groupService } from '~/services/services';
import { groupCreate as groupCreateValidationSchema } from '~/validation-schemas/validation-schemas';

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
};

export { initGroupsApi };
