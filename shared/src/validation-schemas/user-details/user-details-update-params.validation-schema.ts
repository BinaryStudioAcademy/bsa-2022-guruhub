import Joi from 'joi';

import { UserDetailsUpdateAvatarRequestParamsDto } from '~/common/types/types';
import { getNameOf } from '~/helpers/helpers';

const userDetailsUpdateParams = Joi.object({
  [getNameOf<UserDetailsUpdateAvatarRequestParamsDto>('userId')]: Joi.number()
    .integer()
    .required(),
});

export { userDetailsUpdateParams };
