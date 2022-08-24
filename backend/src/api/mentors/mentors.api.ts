import { FastifyPluginAsync, FastifyRequest } from 'fastify';

import { HttpCode, HttpMethod, MentorsApiPath } from '~/common/enums/enums';
import { CoursesToMentorsRequestDto } from '~/common/types/types';
import { coursesToMentors as coursesToMentorsServ } from '~/services/services';
import { mentorCreateBody as mentorCreateBodyValidationSchema } from '~/validation-schemas/validation-schemas';

type Options = {
  services: {
    coursesToMentors: typeof coursesToMentorsServ;
  };
};

const initMentorsApi: FastifyPluginAsync<Options> = async (fastify, opts) => {
  const { coursesToMentors: coursesToMentorsService } = opts.services;

  fastify.route({
    method: HttpMethod.POST,
    url: MentorsApiPath.ROOT,
    schema: { body: mentorCreateBodyValidationSchema },
    async handler(
      req: FastifyRequest<{ Body: CoursesToMentorsRequestDto }>,
      rep,
    ) {
      const { courseId, userId } = req.body;

      const courseToMentor = await coursesToMentorsService.createMentorToCourse(
        { courseId, userId },
      );

      rep.status(HttpCode.OK).send(courseToMentor);
    },
  });
};

export { initMentorsApi };
