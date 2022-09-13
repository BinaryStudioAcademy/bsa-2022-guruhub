import Joi from 'joi';

import { CourseValidationMessage } from '~/common/enums/enums';
import { CourseSelectMentorRequestDto } from '~/common/types/types';
import { getNameOf } from '~/helpers/helpers';

const courseMentorCreate = Joi.object({
  [getNameOf<CourseSelectMentorRequestDto>('mentorId')]: Joi.number()
    .integer()
    .required()
    .messages({
      'number.base': CourseValidationMessage.MENTOR_ID_INTEGER,
      'any.required': CourseValidationMessage.MENTOR_ID_REQUIRE,
    }),
  [getNameOf<CourseSelectMentorRequestDto>('menteeId')]: Joi.number()
    .integer()
    .required()
    .messages({
      'number.base': CourseValidationMessage.MENTEE_ID_INTEGER,
      'any.required': CourseValidationMessage.MENTEE_ID_REQUIRE,
    }),
});

export { courseMentorCreate };
