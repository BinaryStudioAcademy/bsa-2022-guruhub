import * as Joi from 'joi';

import { UserDeleteRequestParamsDto } from '~/common/types/types';
import { getNameOf } from '~/helpers/helpers';

const userDelete = Joi.object({
  [getNameOf<UserDeleteRequestParamsDto>('id')]: Joi.string().trim().required(),
});

export { userDelete };
