import { userWithPermissionsSchema } from '../../json-schemas';

const signInResponseSchema = {
  type: 'object',
  properties: {
    token: {
      type: 'string',
    },
    user: userWithPermissionsSchema,
  },
  required: ['token', 'user'],
};

export { signInResponseSchema };
