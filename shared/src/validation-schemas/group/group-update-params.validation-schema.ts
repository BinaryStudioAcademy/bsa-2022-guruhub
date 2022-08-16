import * as Joi from 'joi';

import { GroupsUpdateRequestParamsDto } from '~/common/types/types';
import { getNameOf } from '~/helpers/helpers';

const groupUpdateParams = Joi.object({
  [getNameOf<GroupsUpdateRequestParamsDto>('id')]: Joi.number()
    .integer()
    .required(),
});

export { groupUpdateParams };
