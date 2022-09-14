import * as Joi from 'joi';

import { BillingReplenishParamsDto } from '~/common/types/types';
import { getNameOf } from '~/helpers/helpers';

const billingReplenishParams = Joi.object({
  [getNameOf<BillingReplenishParamsDto>('amountOfMoneyToReplenish')]:
    Joi.number().required(),
  [getNameOf<BillingReplenishParamsDto>('token')]: Joi.object({
    id: Joi.string(),
    object: Joi.string(),
    card: Joi.object({
      id: Joi.string(),
      object: Joi.string(),
      address_city: Joi.string().allow(null),
      address_country: Joi.string().allow(null),
      address_line1: Joi.string().allow(null),
      address_line1_check: Joi.string().allow(null),
      address_line2: Joi.string().allow(null),
      address_state: Joi.string().allow(null),
      address_zip: Joi.string().allow(null),
      address_zip_check: Joi.string().allow(null),
      brand: Joi.string(),
      country: Joi.string(),
      cvc_check: Joi.string(),
      dynamic_last4: Joi.string().allow(null),
      exp_month: Joi.number(),
      exp_year: Joi.number(),
      funding: Joi.string(),
      last4: Joi.string(),
      metadata: Joi.object(),
      name: Joi.string(),
      tokenization_method: Joi.string().allow(null),
    }),
    client_ip: Joi.string(),
    created: Joi.number(),
    email: Joi.string(),
    livemode: Joi.boolean(),
    type: Joi.string(),
    used: Joi.boolean(),
  }).required(),
});

export { billingReplenishParams };
