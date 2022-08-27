import { FastifyPluginAsync, FastifyRequest } from 'fastify';

import {
  HttpCode,
  HttpMethod,
  InterviewsApiPath,
  InterviewStatus,
  PaginationDefaultValue,
  PermissionKey,
} from '~/common/enums/enums';
import {
  EntityPaginationRequestQueryDto,
  InterviewsByIdRequestParamsDto,
  InterviewsByIntervieweeIdRequestDto,
  InterviewsCreateRequestBodyDto,
} from '~/common/types/types';
import { checkHasPermissions } from '~/hooks/hooks';
import { interview as interviewService } from '~/services/services';
import {
  interviewByIdParams as interviewByIdParamsValidationSchema,
  interviewByIntervieweeId as interviewByIntervieweeIdValidationSchema,
  interviewCreate as interviewCreateValidationSchema,
  pagination as paginationValidationSchema,
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
    preHandler: checkHasPermissions(
      PermissionKey.MANAGE_INTERVIEWS,
      PermissionKey.MANAGE_INTERVIEW,
    ),
    async handler(req, res) {
      const { id, permissions } = req.user;
      const interviews = await interviewService.getAll({
        userId: id,
        permissions,
      });

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
      req: FastifyRequest<{ Body: InterviewsCreateRequestBodyDto }>,
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
      req: FastifyRequest<{ Params: InterviewsByIntervieweeIdRequestDto }>,
      rep,
    ) {
      const { intervieweeUserId } = req.params;

      const categoryIds =
        await interviewService.getPassedInterviewsCategoryIdsByUserId(
          intervieweeUserId,
        );

      rep.status(HttpCode.OK).send(categoryIds);
    },
  });

  fastify.route({
    method: HttpMethod.GET,
    url: InterviewsApiPath.$ID_OTHER,
    schema: {
      querystring: paginationValidationSchema,
      params: interviewByIdParamsValidationSchema,
    },
    preHandler: checkHasPermissions(PermissionKey.MANAGE_INTERVIEW),
    async handler(
      req: FastifyRequest<{
        Params: InterviewsByIdRequestParamsDto;
        Querystring: EntityPaginationRequestQueryDto;
      }>,
      rep,
    ) {
      const { id } = req.params;
      const {
        count = PaginationDefaultValue.DEFAULT_COUNT,
        page = PaginationDefaultValue.DEFAULT_PAGE,
      } = req.query;

      const otherInterviews = await interviewService.getOtherByInterviewId({
        interviewId: id,
        count,
        page,
      });

      rep.status(HttpCode.OK).send(otherInterviews);
    },
  });
};

export { initInterviewsApi };
