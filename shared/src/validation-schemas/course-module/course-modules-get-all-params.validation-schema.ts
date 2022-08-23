import * as Joi from 'joi';

import { CourseModulesGetAllRequestParamsDto } from '~/common/types/types';
import { getNameOf } from '~/helpers/helpers';

const courseModulesGetAllParams = Joi.object({
  [getNameOf<CourseModulesGetAllRequestParamsDto>('courseId')]: Joi.number()
    .integer()
    .required(),
});

export { courseModulesGetAllParams };
