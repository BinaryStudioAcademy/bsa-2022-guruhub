import * as Joi from 'joi';

import {
  UserDetailsValidationMessage,
  UserDetailsValidationRule,
} from '~/common/enums/enums';
import { UserDetailsUpdateInfoRequestDto } from '~/common/types/types';
import { getNameOf } from '~/helpers/helpers';

const userDetailsUpdateInfo = Joi.object({
  [getNameOf<UserDetailsUpdateInfoRequestDto>('fullName')]: Joi.string()
    .trim()
    .min(UserDetailsValidationRule.FULL_NAME_MIN_LENGTH)
    .max(UserDetailsValidationRule.FULL_NAME_MAX_LENGTH)
    .pattern(UserDetailsValidationRule.FULL_NAME_PATTERN)
    .required()
    .messages({
      'string.empty': UserDetailsValidationMessage.FULL_NAME_REQUIRE,
      'string.min': UserDetailsValidationMessage.FULL_NAME_MIN_LENGTH,
      'string.max': UserDetailsValidationMessage.FULL_NAME_MAX_LENGTH,
      'string.pattern.base': UserDetailsValidationMessage.FULL_NAME_WRONG,
    }),
  [getNameOf<UserDetailsUpdateInfoRequestDto>('gender')]: Joi.string()
    .trim()
    .required()
    .messages({
      'string.empty': UserDetailsValidationMessage.GENDER_REQUIRE,
    }),
  [getNameOf<UserDetailsUpdateInfoRequestDto>('dateOfBirth')]:
    Joi.date().allow(null),
  [getNameOf<UserDetailsUpdateInfoRequestDto>('telegramUsername')]: Joi.string()
    .trim()
    .min(UserDetailsValidationRule.TELEGRAM_USERNAME_MIN_LENGTH)
    .max(UserDetailsValidationRule.TELEGRAM_USERNAME_MAX_LENGTH)
    .pattern(UserDetailsValidationRule.TELEGRAM_USERNAME_PATTERN)
    .messages({
      'string.min': UserDetailsValidationMessage.TELEGRAM_USERNAME_MIN_LENGTH,
      'string.max': UserDetailsValidationMessage.TELEGRAM_USERNAME_MAX_LENGTH,
      'string.pattern.base':
        UserDetailsValidationMessage.TELEGRAM_USERNAME_WRONG,
    })
    .allow(null, ''),
});

export { userDetailsUpdateInfo };
