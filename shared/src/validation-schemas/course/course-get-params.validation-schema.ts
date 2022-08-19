import * as Joi from 'joi';

import { CourseGetRequestParamsDto } from '~/common/types/types';
import { getNameOf } from '~/helpers/helpers';

const courseGetParams = Joi.object({
  [getNameOf<CourseGetRequestParamsDto>('id')]: Joi.number()
    .integer()
    .required(),
});

export { courseGetParams };
