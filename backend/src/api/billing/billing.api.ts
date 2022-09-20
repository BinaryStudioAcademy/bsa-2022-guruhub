import { FastifyPluginAsync, FastifyRequest } from 'fastify';

import {
  BillingApiPath,
  HttpCode,
  HttpMethod,
  PaginationDefaultValue,
} from '~/common/enums/enums';
import {
  BillingReplenishParamsDto,
  EntityPaginationRequestQueryDto,
} from '~/common/types/types';
import {
  billing as billingService,
  user as userService,
} from '~/services/services';
import {
  billingReplenishParams as billingReplenishParamsValidationSchema,
  pagination as paginationValidationSchema,
} from '~/validation-schemas/validation-schemas';

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
      const userBalance = await userService.getByIdMoneyBalance(id);

      return rep.status(HttpCode.OK).send(userBalance);
    },
  });

  fastify.route({
    method: HttpMethod.GET,
    url: BillingApiPath.TRANSACTIONS,
    schema: { querystring: paginationValidationSchema },
    async handler(
      req: FastifyRequest<{ Querystring: EntityPaginationRequestQueryDto }>,
      res,
    ) {
      const { id } = req.user;
      const {
        count = PaginationDefaultValue.DEFAULT_COUNT,
        page = PaginationDefaultValue.DEFAULT_PAGE,
      } = req.query;
      const userTransactions = await billingService.getByUserIdTransactions(
        id,
        {
          count,
          page,
        },
      );

      return res.status(HttpCode.OK).send(userTransactions);
    },
  });

  fastify.route({
    method: HttpMethod.PATCH,
    url: BillingApiPath.REPLENISH,
    schema: { body: billingReplenishParamsValidationSchema },
    async handler(
      req: FastifyRequest<{ Body: BillingReplenishParamsDto }>,
      rep,
    ) {
      const { id } = req.user;
      const { amountOfMoneyToReplenish, token } = req.body;

      const userMoneyBalance = await billingService.replenish({
        userId: id,
        amountOfMoneyToReplenish,
        token,
      });

      return rep.status(HttpCode.OK).send(userMoneyBalance);
    },
  });

  fastify.route({
    method: HttpMethod.PATCH,
    url: BillingApiPath.WITHDRAW,
    async handler(req, rep) {
      const { id } = req.user;

      const userMoneyBalance = await billingService.withdraw(id);

      return rep.status(HttpCode.OK).send(userMoneyBalance);
    },
  });
};

export { initBillingApi };
