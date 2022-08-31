import * as Joi from 'joi';

import { ChatMessageGetAllRequestParamsDto } from '~/common/types/types';
import { getNameOf } from '~/helpers/helpers';

const chatMessageGetAllParams = Joi.object({
  [getNameOf<ChatMessageGetAllRequestParamsDto>('id')]: Joi.number()
    .integer()
    .required(),
});

export { chatMessageGetAllParams };
