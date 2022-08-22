import * as Joi from 'joi';

import { CourseModuleGetRequestParamsDto } from '~/common/types/types';
import { getNameOf } from '~/helpers/helpers';

const courseModuleGetParams = Joi.object({
  [getNameOf<CourseModuleGetRequestParamsDto>('courseId')]: Joi.number()
    .integer()
    .required(),
  [getNameOf<CourseModuleGetRequestParamsDto>('moduleId')]: Joi.number()
    .integer()
    .required(),
});

export { courseModuleGetParams };
