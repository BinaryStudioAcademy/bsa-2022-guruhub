import * as Joi from 'joi';

import { InterviewNoteCreateRequsetDto } from '~/common/types/types';
import { getNameOf } from '~/helpers/helpers';

const interviewNotesCreateArguments = Joi.object({
  [getNameOf<InterviewNoteCreateRequsetDto>('note')]: Joi.string().required(),
});

export { interviewNotesCreateArguments };
