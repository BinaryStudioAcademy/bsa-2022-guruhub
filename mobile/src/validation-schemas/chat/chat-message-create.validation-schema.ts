import { getNameOf } from 'guruhub-shared/helpers/helpers';
import Joi from 'joi';

import {
  ChatValidationMessage,
  ChatValidationRule,
} from '~/common/enums/enums';
import { ChatMessageCreateRequestBodyDto } from '~/common/types/types';

const chatMessageCreate = Joi.object({
  [getNameOf<ChatMessageCreateRequestBodyDto>('message')]: Joi.string()
    .trim()
    .min(ChatValidationRule.MESSAGE_MIN_LENGTH)
    .required()
    .messages({
      'string.min': ChatValidationMessage.MESSAGE_MIN_LENGTH,
    }),
});

export { chatMessageCreate };
