const interviewGetAllSchema = {
  type: 'object',
  properties: {
    items: {
      type: 'array',
      items: [
        {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
            },
            createdAt: {
              type: 'string',
            },
            updatedAt: {
              type: 'string',
            },
            interviewDate: {
              type: 'null',
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
            interviewerUserId: {
              type: 'null',
            },
            courseCategory: {
              type: 'object',
              properties: {
                id: {
                  type: 'integer',
                },
                name: {
                  type: 'string',
                },
                key: {
                  type: 'string',
                },
                createdAt: {
                  type: 'string',
                },
                updatedAt: {
                  type: 'string',
                },
              },
            },
            interviewee: {
              type: 'object',
              properties: {
                id: {
                  type: 'integer',
                },
                email: {
                  type: 'string',
                },
                createdAt: {
                  type: 'string',
                },
                updatedAt: {
                  type: 'string',
                },
                userDetails: {
                  type: 'object',
                  properties: {
                    id: {
                      type: 'integer',
                    },
                    gender: {
                      type: 'string',
                    },
                    avatarUrl: {
                      type: 'null',
                    },
                    createdAt: {
                      type: 'string',
                    },
                    updatedAt: {
                      type: 'string',
                    },
                    dateOfBirth: {
                      type: 'null',
                    },
                    userId: {
                      type: 'integer',
                    },
                    fullName: {
                      type: 'string',
                    },
                  },
                },
              },
            },
            interviewer: {
              type: 'null',
            },
          },
        },
      ],
    },
  },
};

export { interviewGetAllSchema };
