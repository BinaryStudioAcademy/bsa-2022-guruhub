import { FastifyPluginAsync, FastifyRequest } from 'fastify';

import { CoursesApiPath, HttpCode, HttpMethod } from '~/common/enums/enums';
import {
  CourseCreateRequestDto,
  CoursesGetByCategoryRequestParamsDto,
} from '~/common/types/types';
import { course as courseService } from '~/services/services';
import {
  courseCreate as courseCreateValidationSchema,
  coursesGetByCategory as coursesGetByCategoryValidationSchema,
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
    async handler(_req, rep) {
      const courses = await courseService.getAll();

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
    url: CoursesApiPath.ROOT,
    schema: {
      querystring: coursesGetByCategoryValidationSchema,
    },
    async handler(
      req: FastifyRequest<{
        Querystring: CoursesGetByCategoryRequestParamsDto;
      }>,
      rep,
    ) {
      const { categoryKey } = req.query;
      const courses = await courseService.getByCategoryKey(categoryKey);

      return rep.status(HttpCode.OK).send(courses);
    },
  });
};

export { initCoursesApi };
