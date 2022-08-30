import Joi from 'joi';

import { InterviewsGetInterviewersByCategoryRequestDto } from '~/common/types/types';
import { getNameOf } from '~/helpers/helpers';

const interviewGetInterviewersByCategory = Joi.object({
  [getNameOf<InterviewsGetInterviewersByCategoryRequestDto>('categoryId')]:
    Joi.number().integer().required(),
});

export { interviewGetInterviewersByCategory };
