import * as Joi from 'joi';

import { GroupsGetByIdRequestDto } from '~/common/types/types';
import { getNameOf } from '~/helpers/helpers';

const groupGetById = Joi.object({
  [getNameOf<GroupsGetByIdRequestDto>('id')]: Joi.string().trim().required(),
});

export { groupGetById };
