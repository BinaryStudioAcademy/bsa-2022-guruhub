import * as Joi from 'joi';

import { ChatMessageCreateRequestParamsDto } from '~/common/types/types';
import { getNameOf } from '~/helpers/helpers';

const chatMessageCreateArguments = Joi.object({
  [getNameOf<ChatMessageCreateRequestParamsDto>('message')]:
    Joi.string().required(),
  [getNameOf<ChatMessageCreateRequestParamsDto>('chatOpponentId')]: Joi.number()
    .integer()
    .required(),
});

export { chatMessageCreateArguments };
