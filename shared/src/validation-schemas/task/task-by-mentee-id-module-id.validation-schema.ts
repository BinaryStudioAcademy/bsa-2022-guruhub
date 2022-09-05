import Joi from 'joi';

import { TaskGetByMenteeIdAndModuleId } from '~/common/types/types';
import { getNameOf } from '~/helpers/helpers';

const taskByMenteeIdAndModuleId = Joi.object({
  [getNameOf<TaskGetByMenteeIdAndModuleId>('moduleId')]: Joi.number()
    .integer()
    .required(),
  [getNameOf<TaskGetByMenteeIdAndModuleId>('menteeId')]: Joi.number()
    .integer()
    .required(),
});

export { taskByMenteeIdAndModuleId };
