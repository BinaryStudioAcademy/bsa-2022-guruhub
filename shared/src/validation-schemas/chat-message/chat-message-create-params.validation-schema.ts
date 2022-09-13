import * as Joi from 'joi';

import { ChatValidationMessage } from '~/common/enums/enums';
import { ChatMessageCreateRequestBodyDto } from '~/common/types/types';
import { getNameOf } from '~/helpers/helpers';

const chatMessageCreateArguments = Joi.object({
  [getNameOf<ChatMessageCreateRequestBodyDto>('message')]: Joi.string()
    .required()
    .messages({
      'string.base': ChatValidationMessage.MESSAGE_STRING,
      'any.required': ChatValidationMessage.MESSAGE_REQUIRE,
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
