import { FastifyPluginAsync } from 'fastify';
import fp from 'fastify-plugin';

import {
  ControllerHook,
  ExceptionMessage,
  HttpCode,
  HttpMethod,
} from '~/common/enums/enums';
import { WhiteRoute } from '~/common/types/types';
import { InvalidCredentialsError } from '~/exceptions/exceptions';
import {
  token as tokenService,
  user as userService,
} from '~/services/services';

type Options = {
  routesWhiteList: WhiteRoute[];
  services: {
    user: typeof userService;
    token: typeof tokenService;
  };
};

const auth: FastifyPluginAsync<Options> = async (fastify, opts) => {
  fastify.decorateRequest('user', null);

  fastify.addHook(ControllerHook.ON_REQUEST, async (request, reply) => {
    try {
      const whiteRoute = opts.routesWhiteList.find(
        ({ route }) => route === request.routerPath,
      );

      const isWhiteRoute = Boolean(whiteRoute);

      const isAllowedMethod = Boolean(
        whiteRoute?.methods.includes(request.method as HttpMethod),
      );

      if (isWhiteRoute && isAllowedMethod) {
        return;
      }

      const [, authToken] = request.headers?.authorization?.split(' ') ?? [];

      const { user, token } = opts.services;

      try {
        const { userId } = await token.decode(authToken);

        const authorizedUser = await user.getById(userId);

        if (!authorizedUser) {
          throw new InvalidCredentialsError(ExceptionMessage.INVALID_TOKEN);
        }

        request.user = authorizedUser;
      } catch {
        throw new InvalidCredentialsError(ExceptionMessage.UNAUTHORIZED_USER);
      }
    } catch (err) {
      reply.code(HttpCode.UNAUTHORIZED).send(err);
    }
  });
};
const authorization = fp(auth);

export { authorization };
