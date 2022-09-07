import * as Joi from 'joi';

import { InterviewStatus } from '~/common/enums/enums';
import { InterviewsUpdateRequestDto } from '~/common/types/types';
import { getNameOf } from '~/helpers/helpers';

const interviewUpdate = Joi.object({
  [getNameOf<InterviewsUpdateRequestDto>('interviewerUserId')]: Joi.number()
    .integer()
    .required(),
  [getNameOf<InterviewsUpdateRequestDto>('status')]: Joi.string()
    .required()
    .valid(...Object.values(InterviewStatus)),
});

export { interviewUpdate };
