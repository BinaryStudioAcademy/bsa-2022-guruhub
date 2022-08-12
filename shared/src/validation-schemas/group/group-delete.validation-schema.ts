import * as Joi from 'joi';

import { GroupsDeleteRequestParamDto } from '~/common/types/groups/groups-delete-request-dto.types';
import { getNameOf } from '~/helpers/helpers';

const groupDelete = Joi.object({
  [getNameOf<GroupsDeleteRequestParamDto>('id')]: Joi.string()
    .trim()
    .required(),
});

export { groupDelete };
