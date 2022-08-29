import * as Joi from 'joi';

import { InterviewNoteCreateRequestParamsDto } from '~/common/types/types';
import { getNameOf } from '~/helpers/helpers';

const interviewNotesCreateParams = Joi.object({
  [getNameOf<InterviewNoteCreateRequestParamsDto>('id')]: Joi.number()
    .integer()
    .required(),
});

export { interviewNotesCreateParams };
