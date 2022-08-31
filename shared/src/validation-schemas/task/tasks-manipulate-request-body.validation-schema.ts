import Joi from 'joi';

import { TaskNoteManipulateRequestBodyDto } from '~/common/types/types';
import { getNameOf } from '~/helpers/helpers';

const tasksManipulateRequestBody = Joi.object({
  [getNameOf<TaskNoteManipulateRequestBodyDto>('note')]:
    Joi.string().required(),
  [getNameOf<TaskNoteManipulateRequestBodyDto>('status')]:
    Joi.string().required(),
});

export { tasksManipulateRequestBody };
