import Joi from 'joi';

import { MenteesToMentorsRequestDto } from '~/common/types/types';
import { getNameOf } from '~/helpers/helpers';

const courseMentorCreateBody = Joi.object({
  [getNameOf<MenteesToMentorsRequestDto>('mentorId')]: Joi.number()
    .integer()
    .required(),
  [getNameOf<MenteesToMentorsRequestDto>('menteeId')]: Joi.number()
    .integer()
    .required(),
});

export { courseMentorCreateBody };
