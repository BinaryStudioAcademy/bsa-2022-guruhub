import Joi from 'joi';

import { CourseModulesGetByCourseIdAndMenteeIdRequestDto } from '~/common/types/types';
import { getNameOf } from '~/helpers/helpers';

const courseModulesGetAllByCourseIdAndMenteeIdParams = Joi.object({
  [getNameOf<CourseModulesGetByCourseIdAndMenteeIdRequestDto>('courseId')]:
    Joi.number().integer().required(),
  [getNameOf<CourseModulesGetByCourseIdAndMenteeIdRequestDto>('menteeId')]:
    Joi.number().integer().required(),
});

export { courseModulesGetAllByCourseIdAndMenteeIdParams };
