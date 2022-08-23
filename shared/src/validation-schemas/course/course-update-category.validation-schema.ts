import * as Joi from 'joi';

import { CourseUpdateCategoryRequestDto } from '~/common/types/types';
import { getNameOf } from '~/helpers/helpers';

const courseUpdateCategory = Joi.object({
  [getNameOf<CourseUpdateCategoryRequestDto>('newCategoryId')]: Joi.number()
    .integer()
    .required(),
});

export { courseUpdateCategory };
