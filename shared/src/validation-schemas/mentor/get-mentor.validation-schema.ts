import * as Joi from 'joi';

import { GetMentorRequestParamsDto } from '~/common/types/types';
import { getNameOf } from '~/helpers/helpers';

const getMentor = Joi.object({
  [getNameOf<GetMentorRequestParamsDto>('menteeId')]: Joi.number()
    .integer()
    .required(),
  [getNameOf<GetMentorRequestParamsDto>('courseId')]: Joi.number()
    .integer()
    .required(),
});

export { getMentor };
