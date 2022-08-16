import * as Joi from 'joi';

import {
  UserDetailsValidationMessage,
  UserDetailsValidationRule,
} from '~/common/enums/enums';
import { UserDetailsCreateRequestDto } from '~/common/types/types';
import { getNameOf } from '~/helpers/helpers';

const userDetailsUpdate = Joi.object({
  [getNameOf<UserDetailsCreateRequestDto>('firstName')]: Joi.string()
    .trim()
    .min(UserDetailsValidationRule.FIRST_NAME_MIN_LENGTH)
    .max(UserDetailsValidationRule.FIRST_NAME_MAX_LENGTH)
    .pattern(UserDetailsValidationRule.FIRST_NAME_PATTERN)
    .required()
    .messages({
      'string.empty': UserDetailsValidationMessage.FIRST_NAME_REQUIRE,
      'string.min': UserDetailsValidationMessage.FIRST_NAME_MIN_LENGTH,
      'string.max': UserDetailsValidationMessage.FIRST_NAME_MAX_LENGTH,
      'string.pattern.base': UserDetailsValidationMessage.FIRST_NAME_WRONG,
    }),
  [getNameOf<UserDetailsCreateRequestDto>('lastName')]: Joi.string()
    .trim()
    .min(UserDetailsValidationRule.LAST_NAME_MIN_LENGTH)
    .max(UserDetailsValidationRule.LAST_NAME_MAX_LENGTH)
    .pattern(UserDetailsValidationRule.LAST_NAME_PATTERN)
    .required()
    .messages({
      'string.empty': UserDetailsValidationMessage.LAST_NAME_REQUIRE,
      'string.min': UserDetailsValidationMessage.LAST_NAME_MIN_LENGTH,
      'string.max': UserDetailsValidationMessage.LAST_NAME_MAX_LENGTH,
      'string.pattern.base': UserDetailsValidationMessage.LAST_NAME_WRONG,
    }),
  [getNameOf<UserDetailsCreateRequestDto>('gender')]: Joi.string()
    .trim()
    .required()
    .messages({
      'string.empty': UserDetailsValidationMessage.GENDER_REQUIRE,
    }),
  [getNameOf<UserDetailsCreateRequestDto>('dateOfBirth')]:
    Joi.date().less('now'),
});

export { userDetailsUpdate };
