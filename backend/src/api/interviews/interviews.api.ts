import { FastifyPluginAsync, FastifyRequest } from 'fastify';

import {
  HttpCode,
  HttpMethod,
  InterviewsApiPath,
  InterviewStatus,
  PermissionKey,
} from '~/common/enums/enums';
import {
  InterviewsByIntervieweeIdDto,
  InterviewsCreateRequestDto,
} from '~/common/types/types';
import { checkHasPermissions } from '~/hooks/hooks';
import { interview as interviewService } from '~/services/services';
import {
  interviewByIntervieweeId as interviewByIntervieweeIdValidationSchema,
  interviewCreate as interviewCreateValidationSchema,
} from '~/validation-schemas/validation-schemas';

type Options = {
  services: {
    interview: typeof interviewService;
  };
};

const initInterviewsApi: FastifyPluginAsync<Options> = async (
  fastify,
  opts,
) => {
  const { interview: interviewService } = opts.services;

  fastify.route({
    method: HttpMethod.GET,
    url: InterviewsApiPath.ROOT,
    preHandler: checkHasPermissions(PermissionKey.MANAGE_INTERVIEWS),
    async handler(_req, res) {
      const interviews = await interviewService.getAll();

      return res.status(HttpCode.OK).send(interviews);
    },
  });

  fastify.route({
    method: HttpMethod.GET,
    url: InterviewsApiPath.$ID,
    preHandler: checkHasPermissions(PermissionKey.MANAGE_INTERVIEW),
    async handler(req: FastifyRequest<{ Params: { id: number } }>, res) {
      const { id } = req.params;
      const interview = await interviewService.getById(id);

      return res.status(HttpCode.OK).send(interview);
    },
  });

  fastify.route({
    method: HttpMethod.POST,
    url: InterviewsApiPath.ROOT,
    schema: { body: interviewCreateValidationSchema },
    async handler(
      req: FastifyRequest<{ Body: InterviewsCreateRequestDto }>,
      rep,
    ) {
      const { categoryId, intervieweeUserId } = req.body;
      const interview = await interviewService.create({
        categoryId,
        intervieweeUserId,
        status: InterviewStatus.PENDING,
      });

      rep.status(HttpCode.CREATED).send(interview);
    },
  });

  fastify.route({
    method: HttpMethod.GET,
    url: InterviewsApiPath.INTERVIEWEE_USER_$ID_CATEGORIES,
    schema: { params: interviewByIntervieweeIdValidationSchema },
    async handler(
      req: FastifyRequest<{ Params: InterviewsByIntervieweeIdDto }>,
      rep,
    ) {
      const { intervieweeUserId } = req.params;

      const categoryIds =
        await interviewService.getPendingOrPassedInterviewsCategoryIdsByUserId(
          intervieweeUserId,
        );

      rep.status(HttpCode.OK).send(categoryIds);
    },
  });
};

export { initInterviewsApi };
