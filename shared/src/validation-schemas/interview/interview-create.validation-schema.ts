import Joi from 'joi';

import { InterviewValidationMessage } from '~/common/enums/enums';
import { InterviewsCreateRequestBodyDto } from '~/common/types/types';
import { getNameOf } from '~/helpers/helpers';

const interviewCreate = Joi.object({
  [getNameOf<InterviewsCreateRequestBodyDto>('categoryId')]: Joi.number()
    .integer()
    .required()
    .messages({
      'number.base': InterviewValidationMessage.CATEGORY_ID_INTEGER,
      'any.required': InterviewValidationMessage.CATEGORY_ID_REQUIRE,
    }),
  [getNameOf<InterviewsCreateRequestBodyDto>('intervieweeUserId')]: Joi.number()
    .integer()
    .required()
    .messages({
      'number.base': InterviewValidationMessage.INTERVIEWER_ID_INTEGER,
      'any.required': InterviewValidationMessage.INTERVIEWEE_ID_REQUIRE,
    }),
});

export { interviewCreate };
