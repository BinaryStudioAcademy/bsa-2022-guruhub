import * as Joi from 'joi';

import { ChatMessageCreateRequestBodyDto } from '~/common/types/types';
import { getNameOf } from '~/helpers/helpers';

const chatMessageCreateArguments = Joi.object({
  [getNameOf<ChatMessageCreateRequestBodyDto>('message')]:
    Joi.string().required(),
  [getNameOf<ChatMessageCreateRequestBodyDto>('chatOpponentId')]: Joi.number()
    .integer()
    .required(),
});

export { chatMessageCreateArguments };
