import Joi from 'joi';

import { CourseCheckIsMentorForMenteeRequestParamsDto } from '~/common/types/types';
import { getNameOf } from '~/helpers/helpers';

const courseCheckIsMentorForStudentParams = Joi.object({
  [getNameOf<CourseCheckIsMentorForMenteeRequestParamsDto>('courseId')]:
    Joi.number().integer().required(),
  [getNameOf<CourseCheckIsMentorForMenteeRequestParamsDto>('menteeId')]:
    Joi.number().integer().required(),
});

export { courseCheckIsMentorForStudentParams };
