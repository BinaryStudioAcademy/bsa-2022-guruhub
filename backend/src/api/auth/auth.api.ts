import { FastifyPluginAsync, FastifyRequest } from 'fastify';

import { HttpCode, HttpMethod, AuthApiPath } from '~/common/enums/enums';
import { UserSignUpRequestDto } from '~/common/types/types';
import { auth as authService } from '~/services/services';
import { userSignUp as userSignUpValidationSchema } from '~/validation-schemas/validation-schemas';

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
};

export { initAuthApi };
