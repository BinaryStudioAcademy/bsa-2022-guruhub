import { categoryWithDatesSchema } from '../../categories/categories';
import { vendorSchema } from '../../vendor/vendor';

const courseCreateResponseSchema = {
  type: 'object',
  properties: {
    id: {
      type: 'integer',
    },
    title: {
      type: 'string',
    },
    description: {
      type: 'string',
    },
    url: {
      type: 'string',
    },
    vendorId: {
      type: 'integer',
    },
    imageUrl: {
      type: ['string', 'null'],
    },
    originalId: {
      type: 'string',
    },
    vendor: vendorSchema,
    category: { ...categoryWithDatesSchema, type: ['null', 'object'] },
    createdAt: {
      type: 'string',
      format: 'date-time',
    },
    updatedAt: {
      type: 'string',
      format: 'date-time',
    },
  },
  required: [
    'id',
    'title',
    'description',
    'url',
    'vendorId',
    'imageUrl',
    'originalId',
    'vendor',
    'category',
    'createdAt',
    'updatedAt',
  ],
  additionalProperties: false,
};

export { courseCreateResponseSchema };
