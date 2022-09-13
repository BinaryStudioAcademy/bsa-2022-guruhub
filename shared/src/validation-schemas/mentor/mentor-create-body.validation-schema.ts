import Joi from 'joi';

import { MentorValidationMessage } from '~/common/enums/enums';
import { CoursesToMentorsRequestDto } from '~/common/types/types';
import { getNameOf } from '~/helpers/helpers';

const mentorCreateBody = Joi.object({
  [getNameOf<CoursesToMentorsRequestDto>('courseId')]: Joi.number()
    .integer()
    .required()
    .messages({
      'number.base': MentorValidationMessage.COURSE_ID_INTEGER,
      'any.required': MentorValidationMessage.COURSE_ID_REQUIRE,
    }),
  [getNameOf<CoursesToMentorsRequestDto>('userId')]: Joi.number()
    .integer()
    .required()
    .messages({
      'number.base': MentorValidationMessage.USER_ID_INTEGER,
      'any.required': MentorValidationMessage.USER_ID_REQUIRE,
    }),
});

export { mentorCreateBody };
