import { FastifyPluginAsync, FastifyRequest } from 'fastify';

import { BillingApiPath, HttpCode, HttpMethod } from '~/common/enums/enums';
import {
  BillingReplenishParamsDto,
  UserGetResponseWithMoneyBalanceDto,
} from '~/common/types/types';
import {
  billing as billingService,
  user as userService,
  userDetails as userDetailsService,
} from '~/services/services';
import { billingReplenishParams as billingReplenishParamsValidationSchema } from '~/validation-schemas/validation-schemas';

type Options = {
  services: {
    billing: typeof billingService;
    user: typeof userService;
    userDetails: typeof userDetailsService;
  };
};

const initBillingApi: FastifyPluginAsync<Options> = async (fastify, opts) => {
  const {
    billing: billingService,
    user: userService,
    userDetails: userDetailsService,
  } = opts.services;

  fastify.route({
    method: HttpMethod.POST,
    url: BillingApiPath.REPLENISH,
    schema: { body: billingReplenishParamsValidationSchema },
    async handler(
      req: FastifyRequest<{ Body: BillingReplenishParamsDto }>,
      rep,
    ) {
      const { id } = req.user;
      const { amountOfMoneyToReplenish } = req.body;
      const userWithBalance = await userService.getByIdWithMoneyBalance(id);

      const replenishDto = await billingService.initReplenish(
        amountOfMoneyToReplenish,
      );

      let userDetailsWithBalance = null;

      if (replenishDto.status === 'complete') {
        const newBalance =
          (userWithBalance as UserGetResponseWithMoneyBalanceDto).userDetails
            .moneyBalance + amountOfMoneyToReplenish;
        userDetailsWithBalance = await userDetailsService.updateMoneyBalance(
          id,
          newBalance,
        );
      }

      rep.status(HttpCode.OK).send(userDetailsWithBalance);
    },
  });

  fastify.route({
    method: HttpMethod.POST,
    url: BillingApiPath.WITHDRAW,
    async handler(req, rep) {
      const { id } = req.user;
      const userWithBalance = await userService.getByIdWithMoneyBalance(id);

      const withdrawDto = await billingService.initWithdraw(
        (userWithBalance as UserGetResponseWithMoneyBalanceDto).userDetails
          .moneyBalance,
      );

      let userDtailsWithBalance = null;

      if (withdrawDto.status === 'in_transit') {
        const newBalance = 0;
        userDtailsWithBalance = await userDetailsService.updateMoneyBalance(
          id,
          newBalance,
        );
      }

      rep.status(HttpCode.OK).send(userDtailsWithBalance);
    },
  });
};

export { initBillingApi };
