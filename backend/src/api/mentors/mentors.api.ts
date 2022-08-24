import { FastifyPluginAsync, FastifyRequest } from 'fastify';

import { HttpCode, HttpMethod, MentorsApiPath } from '~/common/enums/enums';
import { MentorCreateRequestDto } from '~/common/types/types';
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
    async handler(req: FastifyRequest<{ Body: MentorCreateRequestDto }>, rep) {
      const { courseId, userId } = req.body;

      await mentorService.create({ courseId, userId });

      rep.status(HttpCode.OK).send('OK');
    },
  });
};

export { initMentorsApi };
