import Joi from 'joi';

import {
  GroupValidationMessage,
  GroupValidationRule,
} from '~/common/enums/enums';
import { GroupsConfigureRequestDto } from '~/common/types/types';
import { getNameOf } from '~/helpers/helpers';

const groupCreateClient = Joi.object({
  [getNameOf<GroupsConfigureRequestDto>('name')]: Joi.string()
    .trim()
    .min(GroupValidationRule.NAME_MIN_LENGTH)
    .max(GroupValidationRule.NAME_MAX_LENGTH)
    .required()
    .messages({
      'string.empty': GroupValidationMessage.NAME_REQUIRE,
      'string.min': GroupValidationMessage.NAME_MIN_LENGTH,
      'string.max': GroupValidationMessage.NAME_MAX_LENGTH,
    }),
});

export { groupCreateClient };
