const errorResponseSchema = {
  type: 'object',
  properties: {
    statusCode: {
      type: 'integer',
    },
    error: {
      type: 'string',
    },
    message: {
      type: 'string',
    },
    required: ['statusCode', 'error', 'message'],
  },
};

export { errorResponseSchema };
