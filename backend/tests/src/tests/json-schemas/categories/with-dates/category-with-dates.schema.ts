const categoryWithDatesSchema = {
  type: 'object',
  properties: {
    id: {
      type: 'integer',
    },
    name: {
      type: 'string',
    },
    key: {
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
  required: ['id', 'name', 'key', 'createdAt', 'updatedAt'],
  additionalProperties: false,
};

export { categoryWithDatesSchema };
