import * as Joi from 'joi';

import { InterviewNoteCreateRequestDto } from '~/common/types/types';
import { getNameOf } from '~/helpers/helpers';

const interviewNotesCreateArguments = Joi.object({
  [getNameOf<InterviewNoteCreateRequestDto>('note')]: Joi.string().required(),
});

export { interviewNotesCreateArguments };
