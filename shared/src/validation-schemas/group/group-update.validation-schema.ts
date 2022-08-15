import * as Joi from 'joi';

import { GroupValidationRule } from '~/common/enums/enums';
import { GroupValidationMessage } from '~/common/enums/group/group';
import {
  GroupsUpdateRequestDto,
  GroupsUpdateRequestParamsDto,
} from '~/common/types/types';
import { getNameOf } from '~/helpers/helpers';

const groupUpdate = Joi.object({
  [getNameOf<GroupsUpdateRequestDto>('name')]: Joi.string()
    .trim()
    .min(GroupValidationRule.NAME_MIN_LENGTH)
    .max(GroupValidationRule.NAME_MAX_LENGTH)
    .messages({
      'string.empty': GroupValidationMessage.NAME_REQUIRE,
      'string.min': GroupValidationMessage.NAME_MIN_LENGTH,
      'string.max': GroupValidationMessage.NAME_MAX_LENGTH,
    }),
  [getNameOf<GroupsUpdateRequestDto>('permissionIds')]: Joi.array()
    .items(Joi.number())
    .min(GroupValidationRule.PERMISSION_IDS_MIN_LENGTH)
    .messages({
      'array.empty': GroupValidationMessage.PERMISSION_IDS_REQUIRE,
      'array.min': GroupValidationMessage.PERMISSION_IDS_MIN_LENGTH,
    }),
  [getNameOf<GroupsUpdateRequestDto>('userIds')]: Joi.array().items(
    Joi.number(),
  ),
});

const groupUpdateParams = Joi.object({
  [getNameOf<GroupsUpdateRequestParamsDto>('id')]: Joi.string()
    .trim()
    .required(),
});

export { groupUpdate, groupUpdateParams };
