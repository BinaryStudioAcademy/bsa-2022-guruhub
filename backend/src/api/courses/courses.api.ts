import { FastifyPluginAsync, FastifyRequest } from 'fastify';

import { CoursesApiPath, HttpCode, HttpMethod } from '~/common/enums/enums';
import { CourseCreateRequestDto } from '~/common/types/types';
import { course as courseService } from '~/services/services';
import { courseCreate as courseCreateValidationSchema } from '~/validation-schemas/validation-schemas';

type Options = {
  services: {
    course: typeof courseService;
  };
};

const initCoursesApi: FastifyPluginAsync<Options> = async (fastify, opts) => {
  const { course: courseService } = opts.services;

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
};

export { initCoursesApi };
