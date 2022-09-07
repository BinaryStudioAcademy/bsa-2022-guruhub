import { interviewGetOneSchema } from '../../json-schemas';

const interviewGetAllSchema = {
  type: 'object',
  properties: {
    items: {
      type: 'array',
      items: interviewGetOneSchema,
    },
  },
};

export { interviewGetAllSchema };
