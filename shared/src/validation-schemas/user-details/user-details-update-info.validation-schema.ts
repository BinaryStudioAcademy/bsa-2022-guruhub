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
});

export { userDetailsUpdateInfo };
