import { FastifyPluginAsync, FastifyRequest } from 'fastify';

import { HttpCode, HttpMethod, MentorsApiPath } from '~/common/enums/enums';
import { CoursesToMentorsRequestDto } from '~/common/types/types';
import { mentor as mentorService } from '~/services/services';
import { mentorCreateBody as mentorCreateBodyValidationSchema } from '~/validation-schemas/validation-schemas';

type Options = {
  services: {
    mentor: typeof mentorService;
  };
};

const initMentorsApi: FastifyPluginAsync<Options> = async (fastify, opts) => {
  const { mentor: mentorService } = opts.services;

  fastify.route({
    method: HttpMethod.POST,
    url: MentorsApiPath.ROOT,
    schema: { body: mentorCreateBodyValidationSchema },
    async handler(
      req: FastifyRequest<{ Body: CoursesToMentorsRequestDto }>,
      rep,
    ) {
      const { courseId, userId } = req.body;

      const addedToCourseMentor = await mentorService.addMentorToCourse({
        courseId,
        userId,
      });

      rep.status(HttpCode.CREATED).send(addedToCourseMentor);
    },
  });
};

export { initMentorsApi };
