import * as Joi from 'joi';

import { ChatMessageCreateRequestBodyDto } from '~/common/types/types';
import { getNameOf } from '~/helpers/helpers';

const chatMessageCreateArguments = Joi.object({
  [getNameOf<ChatMessageCreateRequestBodyDto>('message')]:
    Joi.string().required(),
  [getNameOf<ChatMessageCreateRequestBodyDto>('receiverId')]: Joi.number()
    .integer()
    .required(),
  [getNameOf<ChatMessageCreateRequestBodyDto>('chatId')]: Joi.string(),
});

export { chatMessageCreateArguments };
