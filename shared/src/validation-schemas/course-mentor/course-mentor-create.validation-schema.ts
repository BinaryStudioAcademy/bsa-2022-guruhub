import Joi from 'joi';

import { CourseSelectMentorRequestDto } from '~/common/types/types';
import { getNameOf } from '~/helpers/helpers';

const courseMentorCreate = Joi.object({
  [getNameOf<CourseSelectMentorRequestDto>('mentorId')]: Joi.number()
    .integer()
    .required(),
  [getNameOf<CourseSelectMentorRequestDto>('menteeId')]: Joi.number()
    .integer()
    .required(),
});

export { courseMentorCreate };
