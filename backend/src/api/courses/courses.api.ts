import { FastifyPluginAsync, FastifyRequest } from 'fastify';

import {
  CoursesApiPath,
  HttpCode,
  HttpMethod,
  PermissionKey,
} from '~/common/enums/enums';
import {
  CourseCreateRequestDto,
  CourseFilteringDto,
  CourseGetRequestParamsDto,
  CourseSelectMentorRequestDto,
  CourseSelectMentorRequestParamsDto,
  CourseUpdateCategoryRequestDto,
} from '~/common/types/types';
import { checkHasPermissions } from '~/hooks/hooks';
import {
  course as courseService,
  menteesToMentors as menteesToMentorsService,
} from '~/services/services';
import {
  courseCreate as courseCreateValidationSchema,
  courseFiltering as courseFilteringValidationSchema,
  courseGetParams as courseGetParamsValidationSchema,
  courseMentorCreateBody as courseMentorCreateBodyValidationSchema,
  courseUpdateByIdParams as courseUpdateParamsValidationSchema,
  courseUpdateCategory as courseUpdateCategoryValidationSchema,
} from '~/validation-schemas/validation-schemas';

type Options = {
  services: {
    course: typeof courseService;
    menteesToMentors: typeof menteesToMentorsService;
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
    schema: { params: courseGetParamsValidationSchema },
    async handler(
      req: FastifyRequest<{ Params: CourseGetRequestParamsDto }>,
      rep,
    ) {
      const { id } = req.params;
      const course = await courseService.getById(id);

      return rep.status(HttpCode.OK).send(course);
    },
  });

  fastify.route({
    method: HttpMethod.GET,
    url: CoursesApiPath.$ID_MENTORS,
    schema: { params: courseGetParamsValidationSchema },
    async handler(
      req: FastifyRequest<{ Params: CourseGetRequestParamsDto }>,
      rep,
    ) {
      const { id } = req.params;
      const mentors = await courseService.getMentors(id);

      rep.status(HttpCode.OK).send(mentors);
    },
  });

  fastify.route({
    method: HttpMethod.PATCH,
    url: CoursesApiPath.$ID,
    schema: {
      params: courseUpdateParamsValidationSchema,
      body: courseUpdateCategoryValidationSchema,
    },
    preHandler: checkHasPermissions(PermissionKey.MANAGE_CATEGORIES),
    async handler(
      req: FastifyRequest<{
        Params: CourseGetRequestParamsDto;
        Body: CourseUpdateCategoryRequestDto;
      }>,
      rep,
    ) {
      const { id } = req.params;
      const { newCategoryId } = req.body;
      const course = await courseService.updateCategory(id, newCategoryId);

      return rep.status(HttpCode.OK).send(course);
    },
  });

  fastify.route({
    method: HttpMethod.POST,
    url: CoursesApiPath.$ID_MENTORS,
    schema: {
      params: courseGetParamsValidationSchema,
      body: courseMentorCreateBodyValidationSchema,
    },
    async handler(
      req: FastifyRequest<{
        Params: CourseSelectMentorRequestParamsDto;
        Body: CourseSelectMentorRequestDto;
      }>,
      rep,
    ) {
      const { mentorId, menteeId } = req.body;
      const { id } = req.params;
      const menteeToMentor =
        await menteesToMentorsService.createMenteesToMentors({
          courseId: id,
          mentorId,
          menteeId,
        });

      return rep.status(HttpCode.CREATED).send(menteeToMentor);
    },
  });
};

export { initCoursesApi };
