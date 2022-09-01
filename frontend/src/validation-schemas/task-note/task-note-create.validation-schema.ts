import { TaskNoteValidationRule } from 'common/enums/enums';
import { TaskNoteFormRequestDto } from 'common/types/types';
import { getNameOf } from 'helpers/helpers';
import Joi from 'joi';

const taskNoteCreate = Joi.object({
  [getNameOf<TaskNoteFormRequestDto>('note')]: Joi.string()
    .required()
    .messages({
      'string.empty': TaskNoteValidationRule.MESSAGE_EMPTY,
    }),
});

export { taskNoteCreate };
