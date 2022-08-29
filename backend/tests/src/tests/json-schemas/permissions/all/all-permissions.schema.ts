import { permissionSchema } from '../permissions';

const allPermissionsSchema = {
  type: 'object',
  properties: {
    total: {
      type: 'integer',
      minimum: 0,
    },
    items: {
      type: 'array',
      items: permissionSchema,
    },
  },
  required: ['total', 'items'],
};

export { allPermissionsSchema };
