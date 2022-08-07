import * as Joi from 'joi';
import { getNameOf } from '~/helpers/helpers';
import { UserSignInRequestDto } from '~/common/types/types';
import {
  UserValidationMessage,
  UserSignInValidationRule,
} from '~/common/enums/enums';

const userSignIn = Joi.object({
  [getNameOf<UserSignInRequestDto>('email')]: Joi.string()
    .trim()
    .min(UserSignInValidationRule.EMAIL_MIN_LENGTH)
    .max(UserSignInValidationRule.EMAIL_MAX_LENGTH)
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      'string.email': UserValidationMessage.EMAIL_WRONG,
      'string.empty': UserValidationMessage.EMAIL_REQUIRE,
    }),
  [getNameOf<UserSignInRequestDto>('password')]: Joi.string()
    .trim()
    .min(UserSignInValidationRule.PASSWORD_MIN_LENGTH)
    .max(UserSignInValidationRule.PASSWORD_MAX_LENGTH)
    .required(),
});

export { userSignIn };
