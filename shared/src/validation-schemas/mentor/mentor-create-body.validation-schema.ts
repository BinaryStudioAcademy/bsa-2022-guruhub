import Joi from 'joi';

import { MentorCreateRequestDto } from '~/common/types/types';
import { getNameOf } from '~/helpers/helpers';

const mentorCreateBody = Joi.object({
  [getNameOf<MentorCreateRequestDto>('courseId')]: Joi.number()
    .integer()
    .required(),
  [getNameOf<MentorCreateRequestDto>('userId')]: Joi.number()
    .integer()
    .required(),
});

export { mentorCreateBody };
