import * as Joi from 'joi';

import { UsersDeleteRequestParamsDto } from '~/common/types/types';
import { getNameOf } from '~/helpers/helpers';

const userDelete = Joi.object({
  [getNameOf<UsersDeleteRequestParamsDto>('id')]: Joi.number()
    .integer()
    .required(),
});

export { userDelete };
