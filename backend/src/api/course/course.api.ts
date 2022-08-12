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

const initCourseApi: FastifyPluginAsync<Options> = async (fastify, _opts) => {
  // const { course: courseService } = opts.services;

  fastify.route({
    method: HttpMethod.POST,
    url: CoursesApiPath.ROOT,
    schema: {
      body: courseCreateValidationSchema,
    },
    async handler(
      _req: FastifyRequest<{ Body: CourseCreateByUrlRequestDto }>,
      _rep,
    ) {
      // const { url } = req.body;
      // const urlObject = new URL(url);
      // TO DO
      // const course = await courseService.createByUrl(req.body);
      // createByUrl is not implemented yet
      // It should get the course data from the url and create the course
    },
  });
};

export { initCourseApi };
