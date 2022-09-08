import * as Joi from 'joi';

import { CourseMentorsFilteringDto } from '~/common/types/types';
import { getNameOf } from '~/helpers/helpers';

const courseMentorsFiltering = Joi.object({
  [getNameOf<CourseMentorsFilteringDto>('mentorName')]: Joi.string().allow(
    null,
    '',
  ),
});

export { courseMentorsFiltering };
