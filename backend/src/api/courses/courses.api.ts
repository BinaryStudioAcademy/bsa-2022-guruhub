import { FastifyPluginAsync, FastifyRequest } from 'fastify';

import { CoursesApiPath, HttpCode, HttpMethod } from '~/common/enums/enums';
import {
  CourseCreateRequestDto,
  CourseFilteringDto,
  CourseGetRequestParamsDto,
} from '~/common/types/types';
import { course as courseService } from '~/services/services';
import {
  courseCreate as courseCreateValidationSchema,
  courseFiltering as courseFilteringValidationSchema,
  courseGetParams as courseGetValidationSchema,
} from '~/validation-schemas/validation-schemas';

type Options = {
  services: {
    course: typeof courseService;
  };
};

const initCoursesApi: FastifyPluginAsync<Options> = async (fastify, opts) => {
  const { course: courseService } = opts.services;

  fastify.route({
    method: HttpMethod.GET,
    url: CoursesApiPath.ROOT,
    schema: {
      querystring: courseFilteringValidationSchema,
    },
    async handler(
      req: FastifyRequest<{
        Querystring: CourseFilteringDto;
      }>,
      rep,
    ) {
      const { categoryKey, title } = req.query;
      const courses = await courseService.getAll({ categoryKey, title });

      return rep.status(HttpCode.OK).send(courses);
    },
  });

  fastify.route({
    method: HttpMethod.POST,
    url: CoursesApiPath.ROOT,
    schema: {
      body: courseCreateValidationSchema,
    },
    async handler(req: FastifyRequest<{ Body: CourseCreateRequestDto }>, rep) {
      const { url } = req.body;
      const course = await courseService.createByUrl(url);

      return rep.status(HttpCode.CREATED).send(course);
    },
  });

  fastify.route({
    method: HttpMethod.GET,
    url: CoursesApiPath.$ID,
    schema: { params: courseGetValidationSchema },
    async handler(
      req: FastifyRequest<{ Params: CourseGetRequestParamsDto }>,
      rep,
    ) {
      const { id } = req.params;
      const course = await courseService.getById(id);

      return rep.status(HttpCode.OK).send(course);
    },
  });
};

export { initCoursesApi };
