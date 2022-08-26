import * as Joi from 'joi';

import { InterviewsUpdateRequestDto } from '~/common/types/types';
import { getNameOf } from '~/helpers/helpers';

const interviewUpdate = Joi.object({
  [getNameOf<InterviewsUpdateRequestDto>('interviewerUserId')]: Joi.number()
    .integer()
    .required(),
});

export { interviewUpdate };
