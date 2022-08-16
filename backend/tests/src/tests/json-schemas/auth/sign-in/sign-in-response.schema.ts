import { userSchema } from '../../json-schemas';

const signInResponseSchema = {
  type: 'object',
  properties: {
    token: {
      type: 'string',
    },
    user: userSchema,
    required: ['token', 'user'],
  },
};

export { signInResponseSchema };
