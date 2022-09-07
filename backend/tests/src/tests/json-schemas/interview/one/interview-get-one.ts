import {
  categorySchema,
  intervieweeSchema,
  interviewerSchema,
} from '../../json-schemas';

const interviewGetOneSchema = {
  type: 'object',
  properties: {
    id: {
      type: 'integer',
    },
    createdAt: {
      type: 'string',
    },
    updatedAt: {
      type: 'string',
    },
    interviewDate: {
      type: 'string',
    },
    status: {
      type: 'string',
    },
    categoryId: {
      type: 'integer',
    },
    intervieweeUserId: {
      type: 'integer',
    },
    interviewerUserId: {
      type: 'null',
    },
    courseCategory: categorySchema,
    interviewee: intervieweeSchema,
    interviewer: interviewerSchema,
  },
};

export { interviewGetOneSchema };
