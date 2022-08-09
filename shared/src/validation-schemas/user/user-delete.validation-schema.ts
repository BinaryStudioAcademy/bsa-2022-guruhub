import * as Joi from 'joi';

import { UserDeleteRequestRaramsDto } from '~/common/types/types';
import { getNameOf } from '~/helpers/helpers';

const userDelete = Joi.object({
  [getNameOf<UserDeleteRequestRaramsDto>('id')]: Joi.string().trim().required(),
});

export { userDelete };
