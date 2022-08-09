import { FastifyPluginAsync, FastifyRequest } from 'fastify';
import { HttpCode, HttpMethod, GroupsApiPath } from '~/common/enums/enums';
import { GroupsRequestDto } from '~/common/types/types';
import { groups as groupsService } from '~/services/services';

import { groupCreate as groupCreateValidationSchema } from '~/validation-schemas/validation-schemas';

type Options = {
  services: {
    groups: typeof groupsService;
  };
};

const initGroupsApi: FastifyPluginAsync<Options> = async (fastify, opts) => {
  const { groups: groupsService } = opts.services;

  fastify.route({
    method: HttpMethod.POST,
    url: GroupsApiPath.ROOT,
    schema: {
      body: groupCreateValidationSchema,
    },
    async handler(req: FastifyRequest<{ Body: GroupsRequestDto }>, rep) {
      const group = await groupsService.create(req.body);

      return rep.status(HttpCode.CREATED).send(group);
    },
  });
};

export { initGroupsApi };
