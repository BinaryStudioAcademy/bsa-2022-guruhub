import { TaskNoteValidationMessage } from 'common/enums/enums';
import { TaskNoteFormRequestDto } from 'common/types/types';
import { getNameOf } from 'helpers/helpers';
import Joi from 'joi';

const taskNoteCreate = Joi.object({
  [getNameOf<TaskNoteFormRequestDto>('note')]: Joi.string()
    .required()
    .messages({
      'string.empty': TaskNoteValidationMessage.MESSAGE_EMPTY,
    }),
});

export { taskNoteCreate };
