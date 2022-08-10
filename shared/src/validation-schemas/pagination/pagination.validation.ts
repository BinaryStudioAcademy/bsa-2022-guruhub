import * as Joi from 'joi';

import { PaginationValidationRule } from '~/common/enums/enums';
import { EntityPaginationRequestQueryDto } from '~/common/types/types';
import { getNameOf } from '~/helpers/helpers';

const pagination = Joi.object({
  [getNameOf<EntityPaginationRequestQueryDto>('count')]: Joi.number().min(
    PaginationValidationRule.MIN_COUNT,
  ),
  [getNameOf<EntityPaginationRequestQueryDto>('page')]: Joi.number().min(
    PaginationValidationRule.MIN_PAGE,
  ),
});

export { pagination };
