import Joi from 'joi';

import { InterviewsByIntervieweeIdRequestDto } from '~/common/types/types';
import { getNameOf } from '~/helpers/helpers';

const interviewByIntervieweeId = Joi.object({
  [getNameOf<InterviewsByIntervieweeIdRequestDto>('intervieweeUserId')]:
    Joi.number().integer().required(),
});

export { interviewByIntervieweeId };
