import * as Joi from 'joi';
import { getNameOf } from '~/helpers/helpers';
import { UserSignInRequestDto } from '~/common/types/types';
import { UserValidationMessage } from '~/common/enums/enums';

const userSignIn = Joi.object({
  [getNameOf<UserSignInRequestDto>('email')]: Joi.string()
    .trim()
    .min(5)
    .max(60)
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      'string.email': UserValidationMessage.EMAIL_WRONG,
      'string.empty': UserValidationMessage.EMAIL_REQUIRE,
    }),
  [getNameOf<UserSignInRequestDto>('password')]: Joi.string()
    .trim()
    .min(8)
    .max(32)
    .required(),
});

export { userSignIn };
