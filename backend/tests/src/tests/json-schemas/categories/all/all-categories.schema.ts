import { categorySchema } from '../categories';

const allCategoriesSchema = {
  type: 'object',
  properties: {
    items: {
      type: 'array',
      items: categorySchema,
    },
  },
  required: ['items'],
};

export { allCategoriesSchema };
