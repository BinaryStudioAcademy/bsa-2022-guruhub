import * as Joi from 'joi';

import { InterviewValidationMessage } from '~/common/enums/enums';
import { InterviewNoteCreateRequestDto } from '~/common/types/types';
import { getNameOf } from '~/helpers/helpers';

const interviewNotesCreateArguments = Joi.object({
  [getNameOf<InterviewNoteCreateRequestDto>('note')]: Joi.string()
    .required()
    .messages({
      'string.base': InterviewValidationMessage.NOTE_STRING,
      'any.required': InterviewValidationMessage.NOTE_REQUIRE,
    }),
});

export { interviewNotesCreateArguments };
