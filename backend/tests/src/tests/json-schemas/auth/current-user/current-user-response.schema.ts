import { permissionSchema } from '../../json-schemas';

const currentUserResponseSchema = {
  type: 'object',
  properties: {
    id: {
      type: 'integer',
    },
    email: {
      type: 'string',
    },
    fullName: {
      type: 'string',
    },
    createdAt: {
      type: 'string',
    },
    permissions: {
      type: 'array',
      items: permissionSchema,
    },
  },
  required: ['id', 'email', 'fullName', 'createdAt', 'permissions'],
};

export { currentUserResponseSchema };
