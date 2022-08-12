import { FastifyPluginAsync, FastifyRequest } from 'fastify';

import { CoursesApiPath, HttpMethod } from '~/common/enums/enums';
import { CourseCreateByUrlRequestDto } from '~/common/types/types';
import { course as courseService } from '~/services/services';
import { courseCreate as courseCreateValidationSchema } from '~/validation-schemas/validation-schemas';

type Options = {
  services: {
    course: typeof courseService;
  };
};

const initCourseApi: FastifyPluginAsync<Options> = async (fastify, opts) => {
  const { course: courseService } = opts.services;

  fastify.route({
    method: HttpMethod.POST,
    url: CoursesApiPath.ROOT,
    schema: {
      body: courseCreateValidationSchema,
    },
    async handler(
      req: FastifyRequest<{ Body: CourseCreateByUrlRequestDto }>,
      rep,
    ) {
      const { url } = req.body;
      const course = await courseService.createByUrl(url);
      rep.send(course);
    },
  });
};

export { initCourseApi };
