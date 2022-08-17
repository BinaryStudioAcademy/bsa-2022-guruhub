import * as Joi from 'joi';

import {
  UserValidationMessage,
  UserValidationRule,
} from '~/common/enums/enums';
import { UserSignInRequestDto } from '~/common/types/types';
import { getNameOf } from '~/helpers/helpers';

const userSignIn = Joi.object({
  [getNameOf<UserSignInRequestDto>('email')]: Joi.string()
    .trim()
    .min(UserValidationRule.EMAIL_MIN_LENGTH)
    .max(UserValidationRule.EMAIL_MAX_LENGTH)
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      'string.email': UserValidationMessage.EMAIL_WRONG,
      'string.empty': UserValidationMessage.EMAIL_REQUIRE,
      'string.min': UserValidationMessage.EMAIL_MIN_LENGTH,
      'string.max': UserValidationMessage.EMAIL_MAX_LENGTH,
    }),
  [getNameOf<UserSignInRequestDto>('password')]: Joi.string()
    .trim()
    .min(UserValidationRule.PASSWORD_MIN_LENGTH)
    .max(UserValidationRule.PASSWORD_MAX_LENGTH)
    .required()
    .messages({
      'string.empty': UserValidationMessage.PASSWORD_REQUIRE,
      'string.min': UserValidationMessage.PASSWORD_MIN_LENGTH,
      'string.max': UserValidationMessage.PASSWORD_MAX_LENGTH,
    }),
});

export { userSignIn };
