import Joi from 'joi';

import { InterviewsCreateRequestDto } from '~/common/types/types';
import { getNameOf } from '~/helpers/helpers';

const interviewCreate = Joi.object({
  [getNameOf<InterviewsCreateRequestDto>('categoryId')]: Joi.number()
    .integer()
    .required(),
  [getNameOf<InterviewsCreateRequestDto>('intervieweeUserId')]: Joi.number()
    .integer()
    .required(),
});

export { interviewCreate };
