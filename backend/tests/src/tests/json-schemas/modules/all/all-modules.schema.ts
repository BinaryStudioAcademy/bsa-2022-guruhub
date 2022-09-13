import { moduleSchema } from '../modules';

const allModulesSchema = {
  type: 'object',
  properties: {
    items: {
      type: 'array',
      items: moduleSchema,
    },
  },
};

export { allModulesSchema };
