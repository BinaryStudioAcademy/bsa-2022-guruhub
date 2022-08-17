import * as Joi from 'joi';

import { UserDetailsUpdateImage } from '~/common/types/types';
import { getNameOf } from '~/helpers/helpers';

const userDetailsAvatarUpdate = Joi.object({
  [getNameOf<UserDetailsUpdateImage>('avatarUrl')]: Joi.string().required(),
});

export { userDetailsAvatarUpdate };
