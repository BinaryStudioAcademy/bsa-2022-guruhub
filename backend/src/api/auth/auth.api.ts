import { FastifyPluginAsync, FastifyRequest } from 'fastify';

import { AuthApiPath, HttpCode, HttpMethod } from '~/common/enums/enums';
import {
  UserSignInRequestDto,
  UserSignUpRequestDto,
} from '~/common/types/types';
import { auth as authService } from '~/services/services';
import {
  userSignIn as userSignInValidationSchema,
  userSignUp as userSignUpValidationSchema,
} from '~/validation-schemas/validation-schemas';

type Options = {
  services: {
    auth: typeof authService;
  };
};

const initAuthApi: FastifyPluginAsync<Options> = async (fastify, opts) => {
  const { auth: authService } = opts.services;

  fastify.route({
    method: HttpMethod.POST,
    url: AuthApiPath.SIGN_UP,
    schema: {
      body: userSignUpValidationSchema,
    },
    async handler(req: FastifyRequest<{ Body: UserSignUpRequestDto }>, rep) {
      const user = await authService.signUp(req.body);

      return rep.status(HttpCode.CREATED).send(user);
    },
  });

  fastify.route({
    method: HttpMethod.POST,
    url: AuthApiPath.SIGN_IN,
    schema: {
      body: userSignInValidationSchema,
    },
    async handler(req: FastifyRequest<{ Body: UserSignInRequestDto }>, rep) {
      const user = await authService.signIn(req.body);

      return rep.status(HttpCode.OK).send(user);
    },
  });

  fastify.route({
    method: HttpMethod.GET,
    url: AuthApiPath.CURRENT_USER,
    async handler(req, rep) {
      const [, token] = req.headers?.authorization?.split(' ') ?? [];

      const user = await authService.getCurrentUser(token);

      return rep.status(HttpCode.OK).send(user);
    },
  });
};

export { initAuthApi };
