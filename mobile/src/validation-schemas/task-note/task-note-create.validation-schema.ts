import { getNameOf } from 'guruhub-shared/helpers/helpers';
import Joi from 'joi';

import { TaskNoteValidationMessage } from '~/common/enums/enums';
import { TaskNoteFormRequestDto } from '~/common/types/types';

const taskNoteCreate = Joi.object({
  [getNameOf<TaskNoteFormRequestDto>('note')]: Joi.string()
    .required()
    .messages({
      'string.empty': TaskNoteValidationMessage.MESSAGE_EMPTY,
    }),
});

export { taskNoteCreate };
