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
  InterviewNoteCreateRequestDto,
  InterviewNoteCreateRequestParamsDto,
  InterviewsByIdRequestParamsDto,
  InterviewsByIntervieweeIdRequestDto,
  InterviewsCreateRequestBodyDto,
  InterviewsGetInterviewersByCategoryRequestDto,
  InterviewsUpdateRequestDto,
  InterviewsUpdateRequestParamsDto,
} from '~/common/types/types';
import { checkHasPermissions } from '~/hooks/hooks';
import { interview as interviewService } from '~/services/services';
import {
  interviewByIdParams as interviewByIdParamsValidationSchema,
  interviewByIntervieweeId as interviewByIntervieweeIdValidationSchema,
  interviewCreate as interviewCreateValidationSchema,
  interviewGetInterviewersByCategory as interviewGetInterviewersByCategoryValidationSchema,
  interviewNotesCreateArguments as interviewNotesCreateArgumentsValidationSchema,
  interviewNotesCreateParams as interviewNotesCreateParamsValidationSchema,
  interviewNotesGetAllParams as interviewNotesGetAllParamsValidationSchema,
  interviewUpdate as interviewUpdateValidationSchema,
  interviewUpdateParams as interviewUpdateParamsValidationSchema,
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
    schema: { querystring: paginationValidationSchema },
    preHandler: checkHasPermissions(
      'oneOf',
      PermissionKey.MANAGE_INTERVIEWS,
      PermissionKey.MANAGE_INTERVIEW,
    ),
    async handler(
      req: FastifyRequest<{ Querystring: EntityPaginationRequestQueryDto }>,
      res,
    ) {
      const { id, permissions } = req.user;
      const {
        count = PaginationDefaultValue.DEFAULT_COUNT,
        page = PaginationDefaultValue.DEFAULT_PAGE,
      } = req.query;
      const interviews = await interviewService.getAll({
        userId: id,
        permissions,
        count,
        page,
      });

      return res.status(HttpCode.OK).send(interviews);
    },
  });

  fastify.route({
    method: HttpMethod.GET,
    url: InterviewsApiPath.$ID,
    preHandler: checkHasPermissions(
      'oneOf',
      PermissionKey.MANAGE_INTERVIEW,
      PermissionKey.MANAGE_INTERVIEWS,
    ),
    async handler(req: FastifyRequest<{ Params: { id: number } }>, res) {
      const { id } = req.params;
      const interview = await interviewService.getById(id);

      return res.status(HttpCode.OK).send(interview);
    },
  });

  fastify.route({
    method: HttpMethod.PUT,
    url: InterviewsApiPath.$ID,
    schema: {
      body: interviewUpdateValidationSchema,
      params: interviewUpdateParamsValidationSchema,
    },
    preHandler: checkHasPermissions(
      'oneOf',
      PermissionKey.MANAGE_INTERVIEWS,
      PermissionKey.MANAGE_INTERVIEW,
    ),
    async handler(
      req: FastifyRequest<{
        Body: InterviewsUpdateRequestDto;
        Params: InterviewsUpdateRequestParamsDto;
      }>,
      rep,
    ) {
      const interview = await interviewService.update({
        id: req.params.id,
        interviewUpdateInfoRequestDto: req.body,
      });

      return rep.status(HttpCode.OK).send(interview);
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
    url: InterviewsApiPath.INTERVIEWERS_CATEGORIES_$ID,
    schema: { params: interviewGetInterviewersByCategoryValidationSchema },
    preHandler: checkHasPermissions('oneOf', PermissionKey.MANAGE_INTERVIEWS),
    async handler(
      req: FastifyRequest<{
        Params: InterviewsGetInterviewersByCategoryRequestDto;
      }>,
      rep,
    ) {
      const { categoryId } = req.params;

      const interviewers = await interviewService.getInterviewersByCategoryId(
        categoryId,
      );

      rep.status(HttpCode.OK).send(interviewers);
    },
  });

  fastify.route({
    method: HttpMethod.GET,
    url: `${InterviewsApiPath.$ID}${InterviewsApiPath.NOTES}`,
    schema: { params: interviewNotesGetAllParamsValidationSchema },
    preHandler: checkHasPermissions(
      'oneOf',
      PermissionKey.MANAGE_INTERVIEW,
      PermissionKey.MANAGE_INTERVIEWS,
    ),
    async handler(
      req: FastifyRequest<{ Params: InterviewNoteCreateRequestParamsDto }>,
      rep,
    ) {
      const { id: interviewId } = req.params;
      const notesDto = await interviewService.getAllNotes(interviewId);

      return rep.status(HttpCode.OK).send(notesDto);
    },
  });

  fastify.route({
    method: HttpMethod.POST,
    url: `${InterviewsApiPath.$ID}${InterviewsApiPath.NOTES}`,
    schema: {
      params: interviewNotesCreateParamsValidationSchema,
      body: interviewNotesCreateArgumentsValidationSchema,
    },
    preHandler: checkHasPermissions(
      'oneOf',
      PermissionKey.MANAGE_INTERVIEW,
      PermissionKey.MANAGE_INTERVIEWS,
    ),
    async handler(
      req: FastifyRequest<{
        Params: InterviewNoteCreateRequestParamsDto;
        Body: InterviewNoteCreateRequestDto;
      }>,
      rep,
    ) {
      const { id: authorId } = req.user;
      const { id: interviewId } = req.params;
      const { note } = req.body;
      const newNote = await interviewService.createNote({
        note,
        interviewId,
        authorId,
      });

      return rep.status(HttpCode.CREATED).send(newNote);
    },
  });

  fastify.route({
    method: HttpMethod.GET,
    url: InterviewsApiPath.$ID_OTHER,
    schema: {
      querystring: paginationValidationSchema,
      params: interviewByIdParamsValidationSchema,
    },
    preHandler: checkHasPermissions(
      'oneOf',
      PermissionKey.MANAGE_INTERVIEWS,
      PermissionKey.MANAGE_INTERVIEW,
    ),
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
