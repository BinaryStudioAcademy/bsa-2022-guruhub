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
      'string.pattern.base': UserDetailsValidationMessage.FULL_NAME_REQUIRE,
    }),
  [getNameOf<UserDetailsUpdateInfoRequestDto>('gender')]: Joi.string()
    .trim()
    .required()
    .messages({
      'string.empty': UserDetailsValidationMessage.GENDER_REQUIRE,
    }),
  [getNameOf<UserDetailsUpdateInfoRequestDto>('dateOfBirth')]: Joi.date()
    .required()
    .min(UserDetailsValidationRule.MIN_DATE)
    .max(UserDetailsValidationRule.MAX_DATE)
    .messages({
      'date.empty': UserDetailsValidationMessage.DATE_OF_BIRTH_REQUIRE,
      'date.min': UserDetailsValidationMessage.MIN_DATE_OF_BIRTH,
      'date.max': UserDetailsValidationMessage.MAX_DATE_OF_BIRTH,
    }),
});

export { userDetailsUpdateInfo };
