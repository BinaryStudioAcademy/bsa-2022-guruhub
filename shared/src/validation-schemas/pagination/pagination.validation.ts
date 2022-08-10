import * as Joi from 'joi';

import { UserGetAllRequestQueryDto } from '~/common/types/types';
import { getNameOf } from '~/helpers/helpers';

const pagination = Joi.object({
  [getNameOf<UserGetAllRequestQueryDto>('count')]: Joi.number().min(1),
  [getNameOf<UserGetAllRequestQueryDto>('page')]: Joi.number().min(1),
});

export { pagination };
