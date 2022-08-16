const signUpErrorResponseSchema = {
  'type': 'object',
  'default': {},
  'title': 'Root Schema',
  'required': ['statusCode', 'error', 'message'],
  'properties': {
    'statusCode': {
      'type': 'integer',
      'default': 0,
      'title': 'The statusCode Schema',
      'examples': [400],
    },
    'error': {
      'type': 'string',
      'default': '',
      'title': 'The error Schema',
      'examples': ['Bad Request'],
    },
    'message': {
      'type': 'string',
      'default': '',
      'title': 'The message Schema',
      'examples': ['Password must be at least 8 characters long'],
    },
  },
  'examples': [
    {
      'statusCode': 400,
      'error': 'Bad Request',
      'message': 'Password must be at least 8 characters long',
    },
  ],
};

export { signUpErrorResponseSchema };
