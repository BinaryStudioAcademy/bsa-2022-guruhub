const errorResponseSchema = {
  'type': 'object',
  'required': ['statusCode', 'error', 'message'],
  'properties': {
    'statusCode': {
      'type': 'integer',
    },
    'error': {
      'type': 'string',
    },
    'message': {
      'type': 'string',
    },
  },
};

export { errorResponseSchema };
