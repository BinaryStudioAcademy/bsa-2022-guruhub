import * as Joi from 'joi';

import {
  ChatValidationMessage,
  ChatValidationRule,
} from '~/common/enums/enums';
import { ChatMessageCreateRequestBodyDto } from '~/common/types/types';
import { getNameOf } from '~/helpers/helpers';

const chatMessageCreateArguments = Joi.object({
  [getNameOf<ChatMessageCreateRequestBodyDto>('message')]: Joi.string()
    .trim()
    .min(ChatValidationRule.MESSAGE_MIN_LENGTH)
    .max(ChatValidationRule.MESSAGE_MAX_LENGTH)
    .required()
    .messages({
      'string.base': ChatValidationMessage.MESSAGE_STRING,
      'any.required': ChatValidationMessage.MESSAGE_REQUIRE,
      'string.min': ChatValidationMessage.MESSAGE_MIN_LENGTH,
      'string.max': ChatValidationMessage.MESSAGE_MAX_LENGTH,
    }),
  [getNameOf<ChatMessageCreateRequestBodyDto>('receiverId')]: Joi.number()
    .integer()
    .required()
    .messages({
      'number.base': ChatValidationMessage.RECEIVER_ID_INTEGER,
      'any.base': ChatValidationMessage.RECEIVER_ID_REQUIRE,
    }),
  [getNameOf<ChatMessageCreateRequestBodyDto>('chatId')]: Joi.string().messages(
    {
      'string.base': ChatValidationMessage.CHAT_ID_STRING,
    },
  ),
});

export { chatMessageCreateArguments };
