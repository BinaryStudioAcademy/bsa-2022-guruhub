import { permissionSchema } from '../../json-schemas';

const userSchema = {
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
    fullName: {
      type: 'string',
    },
    permissions: {
      type: 'array',
      items: permissionSchema,
    },
  },
  required: ['id', 'email'],
};

export { userSchema };
