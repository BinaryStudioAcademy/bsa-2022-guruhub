import { FastifyPluginAsync, FastifyRequest } from 'fastify';

import {
  HttpCode,
  HttpMethod,
  InterviewsApiPath,
  InterviewStatus,
  PermissionKey,
} from '~/common/enums/enums';
import {
  InterviewNoteCreateRequestParamsDto,
  InterviewNoteCreateRequsetDto,
  InterviewsByIntervieweeIdRequestDto,
  InterviewsCreateRequestBodyDto,
} from '~/common/types/types';
import { checkHasPermissions } from '~/hooks/hooks';
import {
  interview as interviewService,
  interviewNote as interviewNoteService,
} from '~/services/services';
import {
  interviewByIntervieweeId as interviewByIntervieweeIdValidationSchema,
  interviewCreate as interviewCreateValidationSchema,
} from '~/validation-schemas/validation-schemas';

type Options = {
  services: {
    interview: typeof interviewService;
    interviewNote: typeof interviewNoteService;
  };
};

const initInterviewsApi: FastifyPluginAsync<Options> = async (
  fastify,
  opts,
) => {
  const { interview: interviewService, interviewNote: interviewNoteService } =
    opts.services;

  fastify.route({
    method: HttpMethod.GET,
    url: InterviewsApiPath.ROOT,
    preHandler: checkHasPermissions(
      'every',
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
    preHandler: checkHasPermissions('every', PermissionKey.MANAGE_INTERVIEW),
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
    url: `${InterviewsApiPath.$ID}${InterviewsApiPath.NOTES}`,
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
      const notes = await interviewNoteService.getAll(interviewId);

      return rep.status(HttpCode.OK).send(notes);
    },
  });

  fastify.route({
    method: HttpMethod.POST,
    url: `${InterviewsApiPath.$ID}${InterviewsApiPath.NOTES}`,
    preHandler: checkHasPermissions(
      'oneOf',
      PermissionKey.MANAGE_INTERVIEW,
      PermissionKey.MANAGE_INTERVIEWS,
    ),
    async handler(
      req: FastifyRequest<{
        Params: InterviewNoteCreateRequestParamsDto;
        Body: InterviewNoteCreateRequsetDto;
      }>,
      rep,
    ) {
      const { id: authorId } = req.user;
      const { id: interviewId } = req.params;
      const { note } = req.body;
      const newNote = await interviewNoteService.create({
        note,
        interviewId,
        authorId,
      });

      return rep.status(HttpCode.CREATED).send(newNote);
    },
  });
};

export { initInterviewsApi };
