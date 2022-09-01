import * as Joi from 'joi';

import { CourseCheckIsMentorRequestParamsDto } from '~/common/types/types';
import { getNameOf } from '~/helpers/helpers';

const courseCheckIsMentorParams = Joi.object({
  [getNameOf<CourseCheckIsMentorRequestParamsDto>('id')]: Joi.number()
    .integer()
    .required(),
});

export { courseCheckIsMentorParams };
