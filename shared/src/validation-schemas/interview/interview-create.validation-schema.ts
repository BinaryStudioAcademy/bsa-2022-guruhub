import Joi from 'joi';

import { InterviewsCreateRequestBodyDto } from '~/common/types/types';
import { getNameOf } from '~/helpers/helpers';

const interviewCreate = Joi.object({
  [getNameOf<InterviewsCreateRequestBodyDto>('categoryId')]: Joi.number()
    .integer()
    .required(),
  [getNameOf<InterviewsCreateRequestBodyDto>('intervieweeUserId')]: Joi.number()
    .integer()
    .required(),
});

export { interviewCreate };
