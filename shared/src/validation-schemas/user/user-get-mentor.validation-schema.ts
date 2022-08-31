import * as Joi from 'joi';

import { UserGetMentorRequestParamsDto } from '~/common/types/types';
import { getNameOf } from '~/helpers/helpers';

const userGetMentor = Joi.object({
  [getNameOf<UserGetMentorRequestParamsDto>('id')]: Joi.number()
    .integer()
    .required(),
  [getNameOf<UserGetMentorRequestParamsDto>('courseId')]: Joi.number()
    .integer()
    .required(),
});

export { userGetMentor };
