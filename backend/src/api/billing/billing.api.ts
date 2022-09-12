import { FastifyPluginAsync, FastifyRequest } from 'fastify';

import { BillingApiPath, HttpCode, HttpMethod } from '~/common/enums/enums';
import { BillingReplenishParamsDto } from '~/common/types/types';
import {
  billing as billingService,
  user as userService,
} from '~/services/services';
import { billingReplenishParams as billingReplenishParamsValidationSchema } from '~/validation-schemas/validation-schemas';

type Options = {
  services: {
    billing: typeof billingService;
    user: typeof userService;
  };
};

const initBillingApi: FastifyPluginAsync<Options> = async (fastify, opts) => {
  const { billing: billingService, user: userService } = opts.services;

  fastify.route({
    method: HttpMethod.GET,
    url: BillingApiPath.BALANCE,
    async handler(req, rep) {
      const { id } = req.user;
      const userWithBalance = await userService.getByIdWithMoneyBalance(id);

      return rep.status(HttpCode.OK).send(userWithBalance);
    },
  });

  fastify.route({
    method: HttpMethod.POST,
    url: BillingApiPath.REPLENISH,
    schema: { body: billingReplenishParamsValidationSchema },
    async handler(
      req: FastifyRequest<{ Body: BillingReplenishParamsDto }>,
      rep,
    ) {
      const { id } = req.user;
      const { amountOfMoneyToReplenish, token } = req.body;

      const userDetailWithMoneyBalanceDto = await billingService.replenish({
        userId: id,
        amountOfMoneyToReplenish,
        token,
      });

      return rep.status(HttpCode.OK).send(userDetailWithMoneyBalanceDto);
    },
  });

  fastify.route({
    method: HttpMethod.POST,
    url: BillingApiPath.WITHDRAW,
    async handler(req, rep) {
      const { id } = req.user;

      const userDetailsWithMoneyBalance = await billingService.withdraw(id);

      return rep.status(HttpCode.OK).send(userDetailsWithMoneyBalance);
    },
  });
};

export { initBillingApi };
