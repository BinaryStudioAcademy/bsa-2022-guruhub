import { userDetailsSchema } from '../user';

const interviewerSchema = {
  type: 'object',
  properties: {
    id: {
      type: 'integer',
    },
    email: {
      type: 'string',
    },
    createdAt: {
      type: 'string',
    },
    updatedAt: {
      type: 'string',
    },
    userDetails: userDetailsSchema,
  },
};

export { interviewerSchema };
