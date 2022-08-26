import Joi from 'joi';

import { CoursesToMentorsRequestDto } from '~/common/types/types';
import { getNameOf } from '~/helpers/helpers';

const mentorCreateBody = Joi.object({
  [getNameOf<CoursesToMentorsRequestDto>('courseId')]: Joi.number()
    .integer()
    .required(),
  [getNameOf<CoursesToMentorsRequestDto>('userId')]: Joi.number()
    .integer()
    .required(),
});

export { mentorCreateBody };
