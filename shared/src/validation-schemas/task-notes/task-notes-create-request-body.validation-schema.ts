import Joi from 'joi';

import { TaskNoteCreateRequestBodyDto } from '~/common/types/types';
import { getNameOf } from '~/helpers/helpers';

const taskNotesCreateRequestBody = Joi.object({
  [getNameOf<TaskNoteCreateRequestBodyDto>('note')]: Joi.string().required(),
});

export { taskNotesCreateRequestBody };
