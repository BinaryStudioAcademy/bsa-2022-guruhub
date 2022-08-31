import { FastifyPluginAsync, FastifyRequest } from 'fastify';

import {
  HttpCode,
  HttpMethod,
  PaginationDefaultValue,
  PermissionKey,
  UsersApiPath,
} from '~/common/enums/enums';
import {
  EntityPaginationRequestQueryDto,
  UserGetMentorRequestParamsDto,
  UsersDeleteRequestParamsDto,
} from '~/common/types/types';
import { checkHasPermissions } from '~/hooks/hooks';
import {
  menteesToMentors as menteesToMentorsService,
  user as userService,
} from '~/services/services';
import {
  pagination as paginationQueryValidationSchema,
  userDelete as userDeleteRequestParamsValidationSchema,
  userGetMentor as userGetMentorRequestParamsValidationSchema,
} from '~/validation-schemas/validation-schemas';

type Options = {
  services: {
    user: typeof userService;
    menteesToMentors: typeof menteesToMentorsService;
  };
};

const initUsersApi: FastifyPluginAsync<Options> = async (fastify, opts) => {
  const { user: userService, menteesToMentors: menteesToMentorsService } =
    opts.services;

  fastify.route({
    method: HttpMethod.GET,
    url: UsersApiPath.ROOT,
    schema: {
      querystring: paginationQueryValidationSchema,
    },
    async handler(
      req: FastifyRequest<{
        Querystring: EntityPaginationRequestQueryDto;
      }>,
      rep,
    ) {
      const {
        page = PaginationDefaultValue.DEFAULT_PAGE,
        count = PaginationDefaultValue.DEFAULT_COUNT,
      } = req.query;

      const users = await userService.getAll({
        page,
        count,
      });

      return rep.status(HttpCode.OK).send(users);
    },
  });

  fastify.route({
    method: HttpMethod.GET,
    url: UsersApiPath.$ID_COURSES_$ID_MENTOR,
    schema: { params: userGetMentorRequestParamsValidationSchema },
    async handler(
      req: FastifyRequest<{ Params: UserGetMentorRequestParamsDto }>,
      rep,
    ) {
      const { id, courseId } = req.params;

      const menteeToMentor =
        await menteesToMentorsService.getByCourseIdAndMenteeId({
          courseId,
          menteeId: id,
        });

      return rep.status(HttpCode.OK).send(menteeToMentor);
    },
  });

  fastify.route({
    method: HttpMethod.DELETE,
    url: UsersApiPath.$ID,
    schema: { params: userDeleteRequestParamsValidationSchema },
    preHandler: checkHasPermissions('every', PermissionKey.MANAGE_UAM),
    async handler(
      req: FastifyRequest<{ Params: UsersDeleteRequestParamsDto }>,
      rep,
    ) {
      const { id } = req.params;

      const isDeleted = await userService.delete(req.user, Number(id));

      return rep
        .status(isDeleted ? HttpCode.OK : HttpCode.NOT_FOUND)
        .send(isDeleted);
    },
  });
};

export { initUsersApi };
