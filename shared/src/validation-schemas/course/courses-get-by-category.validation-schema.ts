import * as Joi from 'joi';

import { CoursesGetByCategoryRequestParamsDto } from '~/common/types/types';
import { getNameOf } from '~/helpers/helpers';

const coursesGetByCategory = Joi.object({
  [getNameOf<CoursesGetByCategoryRequestParamsDto>('categoryKey')]:
    Joi.string(),
});

export { coursesGetByCategory };
