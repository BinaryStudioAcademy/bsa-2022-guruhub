import Joi from 'joi';

import { CourseModulesGetByCourseIdAndMenteeIdRequestParamsDto } from '~/common/types/types';
import { getNameOf } from '~/helpers/helpers';

const courseModulesGetAllByCourseIdAndMenteeIdParams = Joi.object({
  [getNameOf<CourseModulesGetByCourseIdAndMenteeIdRequestParamsDto>(
    'courseId',
  )]: Joi.number().integer().required(),
  [getNameOf<CourseModulesGetByCourseIdAndMenteeIdRequestParamsDto>(
    'menteeId',
  )]: Joi.number().integer().required(),
});

export { courseModulesGetAllByCourseIdAndMenteeIdParams };
