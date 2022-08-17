import { FastifyPluginAsync, FastifyRequest } from 'fastify';

import { HttpCode, HttpMethod, UsersApiPath } from '~/common/enums/enums';
import {
  UserDetailsUpdateImageRequestDto,
  UserDetailsUpdateInfoRequestDto,
} from '~/common/types/types';
import { userDetails as userDetailsService } from '~/services/services';
import {
  userDetailsUpdateAvatar as userDetailsUpdateAvatarValidationSchema,
  userDetailsUpdateInfo as userDetailsUpdateInfoValidationSchema,
} from '~/validation-schemas/validation-schemas';

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
    method: HttpMethod.PUT,
    url: UsersApiPath.DETAILS,
    schema: {
      body: userDetailsUpdateInfoValidationSchema,
    },
    async handler(
      req: FastifyRequest<{ Body: UserDetailsUpdateInfoRequestDto }>,
      rep,
    ) {
      const userDetails = await userDetailsService.updateUserDetails(
        req.user.id,
        req.body,
      );

      return rep.status(userDetails.status).send(userDetails.userDetails);
    },
  });

  fastify.route({
    method: HttpMethod.PUT,
    url: UsersApiPath.DETAILS_AVATAR,
    schema: {
      body: userDetailsUpdateAvatarValidationSchema,
    },
    async handler(
      req: FastifyRequest<{ Body: UserDetailsUpdateImageRequestDto }>,
      rep,
    ) {
      const userDetails = await userDetailsService.updateAvatar(
        req.user.id,
        req.body,
      );

      return rep.status(userDetails.status).send(userDetails.userDetails);
    },
  });
};

export { initUserDetailsApi };
