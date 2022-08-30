import Joi from 'joi';

import { TaskNoteByIdRequestParamsDto } from '~/common/types/types';
import { getNameOf } from '~/helpers/helpers';

const taskNotesByIdParams = Joi.object({
  [getNameOf<TaskNoteByIdRequestParamsDto>('taskId')]: Joi.number()
    .integer()
    .required(),
});

export { taskNotesByIdParams };
