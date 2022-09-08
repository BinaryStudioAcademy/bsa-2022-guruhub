import Joi from 'joi';

import { TasksGetByCourseIdAndMenteeIdRequestDto } from '~/common/types/types';
import { getNameOf } from '~/helpers/helpers';

const tasksByCourseIdAndMenteeId = Joi.object({
  [getNameOf<TasksGetByCourseIdAndMenteeIdRequestDto>('courseId')]: Joi.number()
    .integer()
    .required(),
  [getNameOf<TasksGetByCourseIdAndMenteeIdRequestDto>('menteeId')]: Joi.number()
    .integer()
    .required(),
});

export { tasksByCourseIdAndMenteeId };
