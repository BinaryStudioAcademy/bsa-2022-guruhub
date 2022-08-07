import * as Joi from 'joi';
import { getNameOf } from '~/helpers/helpers';
import { UserSignUpRequestDto } from '~/common/types/types';
import { UserValidationMessage } from '~/common/enums/enums';
import {
  EMAIL_MAX_LENGTH,
  EMAIL_MIN_LENGTH,
  NAME_MAX_LENGTH,
  NAME_MIN_LENGTH,
  NAME_PATTERN,
  PASSWORD_MAX_LENGTH,
  PASSWORD_MIN_LENGTH,
} from '~/common/constants/constants';

const userSignUp = Joi.object({
  [getNameOf<UserSignUpRequestDto>('email')]: Joi.string()
    .trim()
    .email({ tlds: { allow: false } })
    .required()
    .min(EMAIL_MIN_LENGTH)
    .max(EMAIL_MAX_LENGTH)
    .messages({
      'string.email': UserValidationMessage.EMAIL_WRONG,
      'string.empty': UserValidationMessage.EMAIL_REQUIRE,
    }),
  [getNameOf<UserSignUpRequestDto>('password')]: Joi.string()
    .trim()
    .min(PASSWORD_MIN_LENGTH)
    .max(PASSWORD_MAX_LENGTH)
    .required(),
  [getNameOf<UserSignUpRequestDto>('full_name')]: Joi.string()
    .trim()
    .pattern(NAME_PATTERN)
    .required()
    .min(NAME_MIN_LENGTH)
    .max(NAME_MAX_LENGTH),
});

export { userSignUp };
