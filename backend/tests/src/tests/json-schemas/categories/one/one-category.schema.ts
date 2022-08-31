const categorySchema = {
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
  },
  required: ['id', 'name', 'key'],
};

export { categorySchema };
