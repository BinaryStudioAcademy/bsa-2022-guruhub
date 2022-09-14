import * as Joi from 'joi';

import { CourseValidationMessage } from '~/common/enums/enums';
import { CourseCreateRequestDto } from '~/common/types/types';
import { getNameOf } from '~/helpers/helpers';

const courseCreate = Joi.object({
  [getNameOf<CourseCreateRequestDto>('url')]: Joi.string()
    .trim()
    .uri()
    .messages({
      'string.uri': CourseValidationMessage.INVALID_URL,
      'any.required': CourseValidationMessage.URL_REQUIRE,
    }),
});

export { courseCreate };
