import * as Joi from 'joi';

import { CourseCategoryGetByIdRequestParamsDto } from '~/common/types/types';
import { getNameOf } from '~/helpers/helpers';

const courseCategoryGetByIdParams = Joi.object({
  [getNameOf<CourseCategoryGetByIdRequestParamsDto>('id')]: Joi.number()
    .integer()
    .required(),
});

export { courseCategoryGetByIdParams };
