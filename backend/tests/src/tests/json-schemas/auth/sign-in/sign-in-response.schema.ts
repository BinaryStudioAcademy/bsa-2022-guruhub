const signInResponseSchema = {
  'type': 'object',
  'properties': {
    'token': {
      'type': 'string',
    },
    'user': {
      'type': 'object',
      'properties': {
        'id': {
          'type': 'integer',
        },
        'email': {
          'type': 'string',
        },
      },
      'required': ['id', 'email'],
    },
    'required': ['token', 'user'],
  },
};

export { signInResponseSchema };
