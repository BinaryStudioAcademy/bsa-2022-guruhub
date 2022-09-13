import * as Joi from 'joi';

import {
  UserValidationMessage,
  UserValidationRule,
} from '~/common/enums/enums';
import { UserSignUpRequestDto } from '~/common/types/types';
import { getNameOf } from '~/helpers/helpers';

const userSignUp = Joi.object({
  [getNameOf<UserSignUpRequestDto>('email')]: Joi.string()
    .trim()
    .min(UserValidationRule.EMAIL_MIN_LENGTH)
    .max(UserValidationRule.EMAIL_MAX_LENGTH)
    .email({ tlds: { allow: false } })
    .min(UserValidationRule.EMAIL_MIN_LENGTH)
    .max(UserValidationRule.EMAIL_MAX_LENGTH)
    .required()
    .messages({
      'string.email': UserValidationMessage.EMAIL_WRONG,
      'string.empty': UserValidationMessage.EMAIL_REQUIRE,
      'string.min': UserValidationMessage.EMAIL_MIN_LENGTH,
      'string.max': UserValidationMessage.EMAIL_MAX_LENGTH,
      'string.base': UserValidationMessage.EMAIL_STRING,
      'any.required': UserValidationMessage.EMAIL_REQUIRE,
    }),
  [getNameOf<UserSignUpRequestDto>('password')]: Joi.string()
    .trim()
    .min(UserValidationRule.PASSWORD_MIN_LENGTH)
    .max(UserValidationRule.PASSWORD_MAX_LENGTH)
    .required()
    .messages({
      'string.empty': UserValidationMessage.PASSWORD_REQUIRE,
      'string.min': UserValidationMessage.PASSWORD_MIN_LENGTH,
      'string.max': UserValidationMessage.PASSWORD_MAX_LENGTH,
      'string.base': UserValidationMessage.PASSWORD_STRING,
      'any.required': UserValidationMessage.PASSWORD_REQUIRE,
    }),
  [getNameOf<UserSignUpRequestDto>('fullName')]: Joi.string()
    .trim()
    .min(UserValidationRule.NAME_MIN_LENGTH)
    .max(UserValidationRule.NAME_MAX_LENGTH)
    .required()
    .pattern(UserValidationRule.NAME_PATTERN)
    .messages({
      'string.empty': UserValidationMessage.NAME_REQUIRE,
      'string.min': UserValidationMessage.NAME_MIN_LENGTH,
      'string.max': UserValidationMessage.NAME_MAX_LENGTH,
      'string.pattern.base': UserValidationMessage.NAME_WRONG,
      'string.base': UserValidationMessage.NAME_STRING,
      'any.required': UserValidationMessage.NAME_REQUIRE,
    }),
});

export { userSignUp };
