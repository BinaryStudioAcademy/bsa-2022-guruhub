import { userWithPermissionsSchema } from '../../json-schemas';

const signUpResponseSchema = {
  type: 'object',
  properties: {
    token: {
      type: 'string',
    },
    user: userWithPermissionsSchema,
  },
  required: ['token', 'user'],
};

export { signUpResponseSchema };
