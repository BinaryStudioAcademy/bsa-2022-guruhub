import { FastifyPluginAsync, FastifyRequest } from 'fastify';

import {
  HttpCode,
  HttpMethod,
  InterviewsApiPath,
  PermissionKey,
} from '~/common/enums/enums';
import {
  InterviewsUpdateRequestDto,
  InterviewsUpdateRequestParamsDto,
} from '~/common/types/types';
import { checkHasPermissions } from '~/hooks/hooks';
import { interview as interviewService } from '~/services/services';
import {
  interviewUpdate as interviewUpdateValidationSchema,
  interviewUpdateParams as interviewUpdateParamsValidationSchema,
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
    preHandler: checkHasPermissions(PermissionKey.MANAGE_INTERVIEWS),
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
    preHandler: checkHasPermissions(PermissionKey.MANAGE_INTERVIEWS),
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
};

export { initInterviewsApi };
