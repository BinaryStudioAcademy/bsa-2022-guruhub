import * as Joi from 'joi';

import { CourseValidationMessage } from '~/common/enums/enums';
import { CourseUpdateCategoryRequestDto } from '~/common/types/types';
import { getNameOf } from '~/helpers/helpers';

const courseUpdateCategory = Joi.object({
  [getNameOf<CourseUpdateCategoryRequestDto>('newCategoryId')]: Joi.number()
    .integer()
    .required()
    .messages({
      'number.empty': CourseValidationMessage.EMPTY_COURSE_CATEGORY_ID,
      'number.base': CourseValidationMessage.CATEGORY_INTEGER,
      'any.required': CourseValidationMessage.CATEGORY_REQUIRE,
    }),
});

export { courseUpdateCategory };
