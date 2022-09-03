import Joi from 'joi';

import { TaskNoteValidationMessage } from '~/common/enums/enums';
import { TaskNoteManipulateRequestBodyDto } from '~/common/types/types';
import { getNameOf } from '~/helpers/helpers';

const tasksManipulateRequestBody = Joi.object({
  [getNameOf<TaskNoteManipulateRequestBodyDto>('note')]: Joi.string()
    .required()
    .messages({ 'string.empty': TaskNoteValidationMessage.MESSAGE_EMPTY }),
  [getNameOf<TaskNoteManipulateRequestBodyDto>('status')]: Joi.string()
    .required()
    .messages({ 'string.empty': TaskNoteValidationMessage.STATUS_EMPTY }),
});

export { tasksManipulateRequestBody };
