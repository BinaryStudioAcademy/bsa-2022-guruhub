import * as Joi from 'joi';

import { BillingReplenishParamsDto } from '~/common/types/types';
import { getNameOf } from '~/helpers/helpers';

const billingReplenishParams = Joi.object({
  [getNameOf<BillingReplenishParamsDto>('amountOfMoneyToReplenish')]:
    Joi.number().positive().required(),
  [getNameOf<BillingReplenishParamsDto>('token')]: Joi.object({
    id: Joi.string().required(),
  }).required(),
});

export { billingReplenishParams };
