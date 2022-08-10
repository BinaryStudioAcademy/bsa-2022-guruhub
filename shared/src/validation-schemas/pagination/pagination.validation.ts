import * as Joi from 'joi';

import { PaginationMinValues } from '~/common/enums/enums';
import { EntityPaginationRequestQueryDto } from '~/common/types/types';
import { getNameOf } from '~/helpers/helpers';

const pagination = Joi.object({
  [getNameOf<EntityPaginationRequestQueryDto>('count')]: Joi.number().min(
    PaginationMinValues.COUNT,
  ),
  [getNameOf<EntityPaginationRequestQueryDto>('page')]: Joi.number().min(
    PaginationMinValues.PAGE,
  ),
});

export { pagination };
