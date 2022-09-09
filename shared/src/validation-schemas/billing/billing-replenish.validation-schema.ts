import * as Joi from 'joi';

import { BillingReplenishParamsDto } from '~/common/types/types';
import { getNameOf } from '~/helpers/helpers';

const billingReplenishParams = Joi.object({
  [getNameOf<BillingReplenishParamsDto>('amountOfMoneyToReplenish')]:
    Joi.number().required(),
});

export { billingReplenishParams };
