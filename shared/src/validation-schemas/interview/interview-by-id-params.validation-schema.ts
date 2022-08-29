import Joi from 'joi';

import { InterviewsByIdRequestParamsDto } from '~/common/types/types';
import { getNameOf } from '~/helpers/helpers';

const interviewByIdParams = Joi.object({
  [getNameOf<InterviewsByIdRequestParamsDto>('id')]: Joi.number()
    .integer()
    .required(),
});

export { interviewByIdParams };
