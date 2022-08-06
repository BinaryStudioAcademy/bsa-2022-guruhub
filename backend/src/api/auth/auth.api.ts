import { FastifyPluginAsync, FastifyRequest } from 'fastify';

import { HttpCode, HttpMethod, AuthApiPath } from '~/common/enums/enums';
import { UserSignUpRequestDto } from '~/common/types/types';
import { auth as authService } from '~/services/services';
import { userSignUp as userSignUpValidationSchema } from '~/validation-schemas/validation-schemas';
import { userSignIn as userSignInValidationSchema } from '~/validation-schemas/validation-schemas';

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

      return rep.send(user).status(HttpCode.CREATED);
    },
  });

  fastify.route({
    method: HttpMethod.POST,
    url: AuthApiPath.SIGN_IN,
    schema: {
      body: userSignInValidationSchema,
    },
    async handler(req: FastifyRequest<{ Body: UserSignUpRequestDto }>, rep) {
      try {
        const user = await authService.signIn(req.body);
        return rep.status(HttpCode.OK).send(user);
      } catch (error) {
        if (error instanceof Error) {
          return rep
            .status(HttpCode.BAD_REQUEST)
            .send({ message: error.message });
        }
        return rep.status(HttpCode.BAD_REQUEST).send(error);
      }
    },
  });
};

export { initAuthApi };
