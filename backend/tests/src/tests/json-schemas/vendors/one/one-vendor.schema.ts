const vendorSchema = {
  type: 'object',
  properties: {
    id: {
      type: 'integer',
    },
    key: {
      type: 'string',
    },
    name: {
      type: 'string',
    },
    createdAt: {
      type: 'string',
      format: 'date-time',
    },
    updatedAt: {
      type: 'string',
      format: 'date-time',
    },
  },
  required: ['id', 'key', 'name', 'createdAt', 'updatedAt'],
  additionalProperties: false,
};

export { vendorSchema };
