import * as Joi from 'joi';

import { InterviewNoteGetAllRequestParamsDto } from '~/common/types/types';
import { getNameOf } from '~/helpers/helpers';

const interviewNotesGetAllParams = Joi.object({
  [getNameOf<InterviewNoteGetAllRequestParamsDto>('id')]: Joi.number()
    .integer()
    .required(),
});

export { interviewNotesGetAllParams };
