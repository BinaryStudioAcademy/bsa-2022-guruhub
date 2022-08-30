import { permissionSchema, userDetailsSchema } from '../../json-schemas';

const userWithPermissionsSchema = {
  type: 'object',
  properties: {
    id: {
      type: 'integer',
    },
    email: {
      type: 'string',
    },
    userDetails: userDetailsSchema,
    createdAt: {
      type: 'string',
    },
    permissions: {
      type: 'array',
      items: permissionSchema,
    },
  },
  required: ['id', 'email', 'userDetails', 'createdAt', 'permissions'],
};

export { userWithPermissionsSchema };
