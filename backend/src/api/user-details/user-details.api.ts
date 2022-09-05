import { FastifyPluginAsync, FastifyRequest } from 'fastify';

import { HttpCode, HttpMethod, UserDetailsApiPath } from '~/common/enums/enums';
import {
  UserDetailsUpdateAvatarRequestParamsDto,
  UserDetailsUpdateInfoRequestDto,
} from '~/common/types/types';
import { userDetails as userDetailsService } from '~/services/services';
import {
  userDetailsUpdateInfo as userDetailsUpdateInfoValidationSchema,
  userDetailsUpdateParams as userDetailsUpdateParamsValidationSchema,
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
    url: UserDetailsApiPath.ROOT,
    async handler(req, rep) {
      const userDetails = await userDetailsService.getByUserId(req.user.id);

      return rep.status(HttpCode.OK).send(userDetails);
    },
  });

  fastify.route({
    method: HttpMethod.PUT,
    url: UserDetailsApiPath.ROOT,
    schema: {
      body: userDetailsUpdateInfoValidationSchema,
    },
    async handler(
      req: FastifyRequest<{ Body: UserDetailsUpdateInfoRequestDto }>,
      rep,
    ) {
      const userDetails = await userDetailsService.update(
        req.user.id,
        req.body,
      );

      return rep.send(userDetails);
    },
  });

  fastify.route({
    method: HttpMethod.PUT,
    url: UserDetailsApiPath.USER_$ID_AVATAR,
    schema: { params: userDetailsUpdateParamsValidationSchema },
    async handler(
      req: FastifyRequest<{ Params: UserDetailsUpdateAvatarRequestParamsDto }>,
      rep,
    ) {
      const { fileBuffer } = req;
      const { userId } = req.params;

      const updatedUserDetails = await userDetailsService.uploadAvatar(
        userId,
        fileBuffer,
      );

      rep.status(HttpCode.OK).send(updatedUserDetails);
    },
  });
};

export { initUserDetailsApi };
