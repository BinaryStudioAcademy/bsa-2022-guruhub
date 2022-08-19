import * as Joi from 'joi';

import { GroupValidationRule } from '~/common/enums/enums';
import { GroupValidationMessage } from '~/common/enums/group/group';
import { GroupsConfigureRequestDto } from '~/common/types/types';
import { getNameOf } from '~/helpers/helpers';

const groupCreate = Joi.object({
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
  [getNameOf<GroupsConfigureRequestDto>('permissionIds')]: Joi.array()
    .items(Joi.number().integer())
    .min(GroupValidationRule.PERMISSION_IDS_MIN_LENGTH)
    .required()
    .messages({
      'array.empty': GroupValidationMessage.PERMISSION_IDS_REQUIRE,
      'array.min': GroupValidationMessage.PERMISSION_IDS_MIN_LENGTH,
    }),
  [getNameOf<GroupsConfigureRequestDto>('userIds')]: Joi.array().items(
    Joi.number().integer(),
  ),
});

export { groupCreate };
