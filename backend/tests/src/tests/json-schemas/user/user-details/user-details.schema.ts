const userDetailsSchema = {
  type: 'object',
  properties: {
    id: {
      type: 'number',
    },
    fullName: {
      type: 'string',
    },
    gender: {
      type: ['string', 'null'],
      enum: ['male', 'female', 'other', null],
    },
    avatarUrl: {
      type: ['string', 'null'],
    },
    dateOfBirth: {
      type: ['string', 'null'],
    },
    userId: {
      type: 'number',
    },
    createdAt: {
      'type': 'string',
    },
    updatedAt: {
      'type': 'string',
    },
  },
  required: [
    'id',
    'fullName',
    'gender',
    'avatarUrl',
    'dateOfBirth',
    'userId',
    'createdAt',
    'updatedAt',
  ],
};

export { userDetailsSchema };
