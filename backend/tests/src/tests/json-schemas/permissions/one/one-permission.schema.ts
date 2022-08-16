const permissionSchema = {
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
    required: ['id', 'key', 'name'],
  },
};

export { permissionSchema };
