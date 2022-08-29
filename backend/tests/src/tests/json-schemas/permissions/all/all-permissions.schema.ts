import { permissionSchema } from '../permissions';

const allPermissionsSchema = {
  type: 'array',
  items: permissionSchema,
};

export { allPermissionsSchema };
