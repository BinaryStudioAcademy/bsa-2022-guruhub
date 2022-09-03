import { FastifyPluginAsync, FastifyRequest } from 'fastify';

import {
  CourseModulesApiPath,
  HttpCode,
  HttpMethod,
} from '~/common/enums/enums';
import {
  CourseModuleGetRequestParamsDto,
  CourseModulesGetAllRequestParamsDto,
  CourseModulesGetByCourseIdAndMenteeIdRequestParamsDto,
} from '~/common/types/types';
import { courseModule as courseModuleService } from '~/services/services';
import {
  courseModuleGetParams as courseModuleGetParamsValidationSchema,
  courseModulesGetAllByCourseIdAndMenteeIdParams as courseModulesGetAllByCourseIdAndMenteeIdParamsValidationSchema,
  courseModulesGetAllParams as courseModuleGetAllParamsValidationSchema,
} from '~/validation-schemas/validation-schemas';

type Options = {
  services: {
    courseModule: typeof courseModuleService;
  };
};

const initCourseModulesApi: FastifyPluginAsync<Options> = async (
  fastify,
  opts,
) => {
  const { courseModule: courseModuleService } = opts.services;

  fastify.route({
    method: HttpMethod.GET,
    url: CourseModulesApiPath.COURSES_$ID_MODULES_$ID,
    schema: { params: courseModuleGetParamsValidationSchema },
    async handler(
      req: FastifyRequest<{ Params: CourseModuleGetRequestParamsDto }>,
      rep,
    ) {
      const { courseId, moduleId } = req.params;
      const module = await courseModuleService.getById({ courseId, moduleId });

      rep.status(HttpCode.OK).send(module);
    },
  });

  fastify.route({
    method: HttpMethod.GET,
    url: CourseModulesApiPath.COURSES_$ID_MODULES,
    schema: { params: courseModuleGetAllParamsValidationSchema },
    async handler(
      req: FastifyRequest<{ Params: CourseModulesGetAllRequestParamsDto }>,
      rep,
    ) {
      const { courseId } = req.params;
      const items = await courseModuleService.getModulesByCourseId(courseId);

      rep.status(HttpCode.OK).send({ items });
    },
  });

  fastify.route({
    method: HttpMethod.GET,
    url: CourseModulesApiPath.COURSES_$ID_MENTEES_$ID,
    schema: {
      params: courseModulesGetAllByCourseIdAndMenteeIdParamsValidationSchema,
    },
    async handler(
      req: FastifyRequest<{
        Params: CourseModulesGetByCourseIdAndMenteeIdRequestParamsDto;
      }>,
      rep,
    ) {
      const { courseId, menteeId } = req.params;
      const modules = await courseModuleService.getAllByCourseIdAndMenteeId(
        courseId,
        menteeId,
      );

      rep.status(HttpCode.OK).send(modules);
    },
  });
};

export { initCourseModulesApi };
