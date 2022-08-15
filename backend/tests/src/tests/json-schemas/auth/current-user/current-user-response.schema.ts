const currentUserResponseSchema = {
  'type': 'object',
  'properties': {
    'id': {
      'type': 'integer',
    },
    'email': {
      'type': 'string',
    },
    'fullName': {
      'type': 'string',
    },
    'createdAt': {
      'type': 'string',
    },
    'permissions': {
      'type': 'array',
    },
  },
  'required': ['id', 'email', 'fullName', 'createdAt'],
};

export { currentUserResponseSchema };
