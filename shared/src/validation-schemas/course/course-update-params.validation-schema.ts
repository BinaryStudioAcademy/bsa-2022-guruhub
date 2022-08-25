import * as Joi from 'joi';

import { CourseUpdateRequestParamsDto } from '~/common/types/types';
import { getNameOf } from '~/helpers/helpers';

const courseUpdateByIdParams = Joi.object({
  [getNameOf<CourseUpdateRequestParamsDto>('id')]: Joi.number()
    .integer()
    .required(),
});

export { courseUpdateByIdParams };
