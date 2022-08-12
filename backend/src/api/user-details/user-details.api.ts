import { FastifyPluginAsync, FastifyRequest } from 'fastify';

import { HttpCode, HttpMethod, UsersApiPath } from '~/common/enums/enums';
import { UserDetailsCreateRequestDto } from '~/common/types/types';
import { userDetails as userDetailsService } from '~/services/services';

type Options = {
  services: {
    userDetails: typeof userDetailsService;
  };
};

const initUserDetailsApi: FastifyPluginAsync<Options> = async (
  fastify,
  opts,
) => {
  const { userDetails: userDetailsService } = opts.services;

  fastify.route({
    method: HttpMethod.GET,
    url: UsersApiPath.DETAILS,
    async handler(req, rep) {
      const userDetails = await userDetailsService.getByUserId(req.user.id);

      return rep.status(HttpCode.OK).send(userDetails);
    },
  });

  fastify.route({
    method: HttpMethod.POST,
    url: UsersApiPath.DETAILS,
    async handler(
      req: FastifyRequest<{ Body: UserDetailsCreateRequestDto }>,
      rep,
    ) {
      const userDetails = await userDetailsService.create(
        req.user.id,
        req.body,
      );

      return rep.status(HttpCode.CREATED).send(userDetails);
    },
  });
};

export { initUserDetailsApi };
