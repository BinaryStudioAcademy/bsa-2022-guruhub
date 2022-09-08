import { FastifyPluginAsync, FastifyRequest } from 'fastify';

import { HttpCode, HttpMethod, MentorsApiPath } from '~/common/enums/enums';
import {
  CoursesToMentorsRequestDto,
  GetMentorRequestParamsDto,
} from '~/common/types/types';
import { mentor as mentorService } from '~/services/services';
import {
  getMentor as getMentorValidationSchema,
  mentorCreateBody as mentorCreateBodyValidationSchema,
} from '~/validation-schemas/validation-schemas';

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

  fastify.route({
    method: HttpMethod.GET,
    url: MentorsApiPath.COURSES_$ID_MENTEES_$ID,
    schema: { params: getMentorValidationSchema },
    async handler(
      req: FastifyRequest<{ Params: GetMentorRequestParamsDto }>,
      rep,
    ) {
      const { menteeId, courseId } = req.params;

      const menteeToMentor = await mentorService.getMentor({
        courseId,
        menteeId,
      });

      return rep.status(HttpCode.OK).send(menteeToMentor);
    },
  });
};

export { initMentorsApi };
