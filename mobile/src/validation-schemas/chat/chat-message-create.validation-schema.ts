import { getNameOf } from 'guruhub-shared/helpers/helpers';
import Joi from 'joi';

import {
  ChatValidationMessage,
  ChatValidationRule,
} from '~/common/enums/enums';
import { ChatMessageFormRequestDto } from '~/common/types/types';

const chatMessageCreate = Joi.object({
  [getNameOf<ChatMessageFormRequestDto>('message')]: Joi.string()
    .min(ChatValidationRule.MESSAGE_MIN_LENGTH)
    .required()
    .messages({
      'string.min': ChatValidationMessage.MESSAGE_MIN_LENGTH,
    }),
});

export { chatMessageCreate };
