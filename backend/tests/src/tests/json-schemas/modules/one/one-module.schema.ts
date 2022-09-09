const moduleSchema = {
  type: 'object',
  properties: {
    id: {
      type: 'integer',
    },
    courseId: {
      type: 'integer',
    },
    title: {
      type: 'string',
    },
    description: {
      type: ['string', 'null'],
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
  required: [
    'id',
    'courseId',
    'title',
    'description',
    'createdAt',
    'updatedAt',
  ],
  additionalProperties: false,
};

export { moduleSchema };
