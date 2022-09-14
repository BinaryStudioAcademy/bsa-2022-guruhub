import * as Joi from 'joi';

import {
  CourseValidationMessage,
  CourseValidationRule,
} from '~/common/enums/enums';
import { CourseUpdateMentoringDto } from '~/common/types/types';
import { getNameOf } from '~/helpers/helpers';

const courseMentoringUpdateCount = Joi.object({
  [getNameOf<CourseUpdateMentoringDto>('courseId')]: Joi.number()
    .integer()
    .required(),
  [getNameOf<CourseUpdateMentoringDto>('studentsCount')]: Joi.number()
    .integer()
    .min(CourseValidationRule.STUDENTS_COUNT_MIN_NUMBER)
    .required()
    .messages({
      'number.min': CourseValidationMessage.INVALID_STUDENTS_COUNT_NUMBER,
    }),
});

export { courseMentoringUpdateCount };
