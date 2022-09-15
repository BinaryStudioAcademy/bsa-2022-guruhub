import * as Joi from 'joi';

import { GroupValidationRule } from '~/common/enums/enums';
import { GroupValidationMessage } from '~/common/enums/group/group';
import { GroupsUpdateRequestDto } from '~/common/types/types';
import { getNameOf } from '~/helpers/helpers';

const groupUpdate = Joi.object({
  [getNameOf<GroupsUpdateRequestDto>('name')]: Joi.string()
    .trim()
    .min(GroupValidationRule.NAME_MIN_LENGTH)
    .max(GroupValidationRule.NAME_MAX_LENGTH)
    .required()
    .messages({
      'string.empty': GroupValidationMessage.NAME_REQUIRE,
      'string.min': GroupValidationMessage.NAME_MIN_LENGTH,
      'string.max': GroupValidationMessage.NAME_MAX_LENGTH,
      'string.base': GroupValidationMessage.NAME_STRING,
      'any.required': GroupValidationMessage.NAME_REQUIRE,
    }),
  [getNameOf<GroupsUpdateRequestDto>('permissionIds')]: Joi.array()
    .items(Joi.number())
    .min(GroupValidationRule.PERMISSION_IDS_MIN_LENGTH)
    .required()
    .messages({
      'array.empty': GroupValidationMessage.PERMISSION_IDS_REQUIRE,
      'array.min': GroupValidationMessage.PERMISSION_IDS_MIN_LENGTH,
      'array.base': GroupValidationMessage.PREMISSION_IDS_INTEGER,
      'any.required': GroupValidationMessage.PERMISSION_IDS_REQUIRE,
    }),
  [getNameOf<GroupsUpdateRequestDto>('userIds')]: Joi.array()
    .items(Joi.number())
    .required()
    .messages({
      'array.base': GroupValidationMessage.USER_IDS_INTEGER,
      'any.required': GroupValidationMessage.USER_IDS_REQUIRE,
    }),
});

export { groupUpdate };
