import Joi from 'joi';

import { TaskGetByMenteeIdCourseIdModuleIdRequestDto } from '~/common/types/types';
import { getNameOf } from '~/helpers/helpers';

const taskByMenteeIdCourseIdModuleIdParams = Joi.object({
  [getNameOf<TaskGetByMenteeIdCourseIdModuleIdRequestDto>('courseId')]:
    Joi.number().integer().required(),
  [getNameOf<TaskGetByMenteeIdCourseIdModuleIdRequestDto>('menteeId')]:
    Joi.number().integer().required(),
  [getNameOf<TaskGetByMenteeIdCourseIdModuleIdRequestDto>('moduleId')]:
    Joi.number().integer().required(),
});

export { taskByMenteeIdCourseIdModuleIdParams };
