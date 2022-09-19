import Joi from 'joi';

import { ChatMessageReadParams } from '~/common/types/types';
import { getNameOf } from '~/helpers/helpers';

const chatMessageReadParams = Joi.object({
  [getNameOf<ChatMessageReadParams>('id')]: Joi.string().uuid().required(),
});

export { chatMessageReadParams };
