import * as Joi from 'joi';

import { CourseValidationMessage } from '~/common/enums/enums';
import { CourseUpdateCategoryRequestDto } from '~/common/types/types';
import { getNameOf } from '~/helpers/helpers';

const courseUpdateCategory = Joi.object({
  [getNameOf<CourseUpdateCategoryRequestDto>('newCategoryId')]: Joi.number()
    .integer()
    .required()
    .messages({
      'string.empty': CourseValidationMessage.EMPTY_COURSE_CATEGORY_ID,
    }),
});

export { courseUpdateCategory };
