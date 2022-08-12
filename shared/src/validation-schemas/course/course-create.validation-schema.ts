import * as Joi from 'joi';

import { CourseValidationMessage } from '~/common/enums/enums';
import { CourseCreateByUrlRequestDto } from '~/common/types/types';
import { getNameOf } from '~/helpers/helpers';

const courseCreate = Joi.object({
  [getNameOf<CourseCreateByUrlRequestDto>('url')]: Joi.string()
    .trim()
    .uri()
    .messages({
      'string.uri': CourseValidationMessage.INVALID_URL,
    }),
});

export { courseCreate };
