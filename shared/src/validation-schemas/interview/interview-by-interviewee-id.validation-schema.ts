import Joi from 'joi';

import { InterviewsByIntervieweeIdDto } from '~/common/types/types';
import { getNameOf } from '~/helpers/helpers';

const interviewByIntervieweeId = Joi.object({
  [getNameOf<InterviewsByIntervieweeIdDto>('intervieweeUserId')]: Joi.number()
    .integer()
    .required(),
});

export { interviewByIntervieweeId };
