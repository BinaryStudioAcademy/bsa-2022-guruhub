const userSchema = {
  type: 'object',
  properties: {
    id: {
      type: 'integer',
    },
    email: {
      type: 'string',
    },
  },
  required: ['id', 'email'],
};

export { userSchema };
