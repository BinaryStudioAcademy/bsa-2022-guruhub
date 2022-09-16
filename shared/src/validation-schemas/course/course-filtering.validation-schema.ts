import * as Joi from 'joi';

import { PaginationValidationRule } from '~/common/enums/enums';
import {
  CourseFilteringDto,
  EntityPaginationRequestQueryDto,
} from '~/common/types/types';
import { getNameOf } from '~/helpers/helpers';

const courseFiltering = Joi.object({
  [getNameOf<CourseFilteringDto>('title')]: Joi.string().allow(null, ''),
  [getNameOf<CourseFilteringDto>('categoryKey')]: Joi.string().allow(null, ''),
  [getNameOf<EntityPaginationRequestQueryDto>('count')]: Joi.number()
    .integer()
    .min(PaginationValidationRule.MIN_COUNT),
  [getNameOf<EntityPaginationRequestQueryDto>('page')]: Joi.number()
    .integer()
    .min(PaginationValidationRule.MIN_PAGE),
});

export { courseFiltering };
