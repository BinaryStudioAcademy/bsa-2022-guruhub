import Joi from 'joi';

import { TaskByIdRequestParamsDto } from '~/common/types/types';
import { getNameOf } from '~/helpers/helpers';

const tasksByIdParams = Joi.object({
  [getNameOf<TaskByIdRequestParamsDto>('taskId')]: Joi.number()
    .integer()
    .required(),
});

export { tasksByIdParams };
