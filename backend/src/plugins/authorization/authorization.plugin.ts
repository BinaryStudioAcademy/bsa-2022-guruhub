import { FastifyPluginAsync } from 'fastify';
import fp from 'fastify-plugin';

import {
  ControllerHook,
  ExceptionMessage,
  HttpCode,
  HttpMethod,
} from '~/common/enums/enums';
import { InvalidCredentialsError } from '~/exceptions/exceptions';
import {
  token as tokenService,
  user as userService,
} from '~/services/services';

type Options = {
  routesWhiteList: string[];
  services: {
    user: typeof userService;
    token: typeof tokenService;
  };
};

const auth: FastifyPluginAsync<Options> = async (fastify, opts) => {
  fastify.decorateRequest('user', null);

  fastify.addHook(ControllerHook.ON_REQUEST, async (request, reply) => {
    try {
      const isWhiteRoute = opts.routesWhiteList.some(
        (route) => route === request.routerPath,
      );

      if (isWhiteRoute && request.method === HttpMethod.GET) {
        return;
      }
      const [, authToken] = request.headers?.authorization?.split(' ') ?? [];

      const { user, token } = opts.services;
      const { userId } = await token.decode(authToken);

      const authorizedUser = await user.getById(userId);

      if (!authorizedUser) {
        throw new InvalidCredentialsError(ExceptionMessage.INVALID_TOKEN);
      }

      request.user = authorizedUser;
    } catch (err) {
      reply.code(HttpCode.UNAUTHORIZED).send(err);
    }
  });
};
const authorization = fp(auth);

export { authorization };
