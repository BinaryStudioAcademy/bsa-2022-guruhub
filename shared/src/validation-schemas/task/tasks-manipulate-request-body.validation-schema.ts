import Joi from 'joi';

import { TaskNoteValidationRule } from '~/common/enums/enums';
import { TaskNoteManipulateRequestBodyDto } from '~/common/types/types';
import { getNameOf } from '~/helpers/helpers';

const tasksManipulateRequestBody = Joi.object({
  [getNameOf<TaskNoteManipulateRequestBodyDto>('note')]: Joi.string()
    .required()
    .messages({ 'string.empty': TaskNoteValidationRule.MESSAGE_EMPTY }),
  [getNameOf<TaskNoteManipulateRequestBodyDto>('status')]: Joi.string()
    .required()
    .messages({ 'string.empty': TaskNoteValidationRule.STATUS_EMPTY }),
});

export { tasksManipulateRequestBody };
