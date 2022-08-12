import { FastifyPluginAsync } from 'fastify';

import { HttpCode, HttpMethod, UsersApiPath } from '~/common/enums/enums';
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
};

export { initUserDetailsApi };
