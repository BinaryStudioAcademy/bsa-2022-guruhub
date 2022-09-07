const interviewCreationSchema = {
  type: 'object',
  properties: {
    id: {
      type: 'integer',
    },
    status: {
      type: 'string',
    },
    categoryId: {
      type: 'integer',
    },
    intervieweeUserId: {
      type: 'integer',
    },
  },
  required: ['id', 'status', 'categoryId', 'intervieweeUserId'],
};

export { interviewCreationSchema };
