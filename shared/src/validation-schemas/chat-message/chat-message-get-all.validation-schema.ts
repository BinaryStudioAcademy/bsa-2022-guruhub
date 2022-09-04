import * as Joi from 'joi';

import { ChatMessageGetAllRequestParamsDto } from '~/common/types/types';
import { getNameOf } from '~/helpers/helpers';

const chatMessageGetAllParams = Joi.object({
  [getNameOf<ChatMessageGetAllRequestParamsDto>('id')]: Joi.string().required(),
});

export { chatMessageGetAllParams };
