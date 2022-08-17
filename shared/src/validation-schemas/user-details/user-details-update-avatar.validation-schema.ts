import * as Joi from 'joi';

import { UserDetailsUpdateImageRequestDto } from '~/common/types/types';
import { getNameOf } from '~/helpers/helpers';

const userDetailsUpdateAvatar = Joi.object({
  [getNameOf<UserDetailsUpdateImageRequestDto>('avatarUrl')]:
    Joi.string().required(),
});

export { userDetailsUpdateAvatar };
