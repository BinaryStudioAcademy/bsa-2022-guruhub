import * as Joi from 'joi';

import { UserGetMentorParamsDto } from '~/common/types/types';
import { getNameOf } from '~/helpers/helpers';

const userGetMentor = Joi.object({
  [getNameOf<UserGetMentorParamsDto>('id')]: Joi.number().integer().required(),
  [getNameOf<UserGetMentorParamsDto>('courseId')]: Joi.number()
    .integer()
    .required(),
});

export { userGetMentor };
