import * as Joi from 'joi';

import {
  InterviewStatus,
  InterviewValidationMessage,
} from '~/common/enums/enums';
import { InterviewsUpdateRequestDto } from '~/common/types/types';
import { getNameOf } from '~/helpers/helpers';

const interviewUpdate = Joi.object({
  [getNameOf<InterviewsUpdateRequestDto>('interviewerUserId')]: Joi.number()
    .integer()
    .allow(null)
    .messages({
      'number.base': InterviewValidationMessage.INTERVIEWER_ID_INTEGER,
    }),
  [getNameOf<InterviewsUpdateRequestDto>('status')]: Joi.string()
    .required()
    .valid(...Object.values(InterviewStatus))
    .messages({
      'string.base': InterviewValidationMessage.STATUS_STRING,
      'any.required': InterviewValidationMessage.STATUS_REQUIRE,
      'any.only': InterviewValidationMessage.STATUS_VALID,
    }),
  [getNameOf<InterviewsUpdateRequestDto>('interviewDate')]:
    Joi.date().allow(null),
});

export { interviewUpdate };
