import { FastifyPluginAsync, FastifyRequest } from 'fastify';

import {
  CoursesApiPath,
  HttpCode,
  HttpMethod,
  PaginationDefaultValue,
  PermissionKey,
} from '~/common/enums/enums';
import {
  CourseCheckIsMentorRequestParamsDto,
  CourseCreateRequestDto,
  CourseFilteringDto,
  CourseGetRequestParamsDto,
  CourseMentorsFilteringDto,
  CourseSelectMentorRequestDto,
  CourseSelectMentorRequestParamsDto,
  CourseUpdateCategoryRequestDto,
  EntityPaginationRequestQueryDto,
} from '~/common/types/types';
import { checkHasPermissions } from '~/hooks/hooks';
import {
  course as courseService,
  mentor as mentorService,
} from '~/services/services';
import {
  courseCheckIsMentorParams as courseCheckIsMentorParamsValidationSchema,
  courseCreate as courseCreateValidationSchema,
  courseFiltering as courseFilteringValidationSchema,
  courseGetParams as courseGetParamsValidationSchema,
  courseMentorCreate as courseMentorCreateBodyValidationSchema,
  courseMentorsFiltering as courseMentorsFilteringValidationSchema,
  courseUpdateByIdParams as courseUpdateParamsValidationSchema,
  courseUpdateCategory as courseUpdateCategoryValidationSchema,
  pagination as paginationValidationSchema,
} from '~/validation-schemas/validation-schemas';

type Options = {
  services: {
    course: typeof courseService;
    mentor: typeof mentorService;
  };
};

const initCoursesApi: FastifyPluginAsync<Options> = async (fastify, opts) => {
  const { course: courseService, mentor: mentorService } = opts.services;

  fastify.route({
    method: HttpMethod.GET,
    url: CoursesApiPath.DASHBOARD,
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
      const courses = await courseService.getAllWithCategories({
        categoryKey,
        title,
      });

      return rep.status(HttpCode.OK).send(courses);
    },
  });

  fastify.route({
    method: HttpMethod.GET,
    url: CoursesApiPath.STUDYING,
    async handler(req, res) {
      const courses = await courseService.getAllCoursesStudying(req.user.id);

      return res.status(HttpCode.OK).send(courses);
    },
  });

  fastify.route({
    method: HttpMethod.GET,
    url: CoursesApiPath.MENTORING,
    schema: { querystring: paginationValidationSchema },
    async handler(
      req: FastifyRequest<{ Querystring: EntityPaginationRequestQueryDto }>,
      res,
    ) {
      const courses = await courseService.getAllCoursesMentoring(
        req.user.id,
        req.query,
      );

      return res.status(HttpCode.OK).send(courses);
    },
  });

  fastify.route({
    method: HttpMethod.GET,
    url: CoursesApiPath.ROOT,
    schema: { querystring: paginationValidationSchema },
    async handler(
      req: FastifyRequest<{ Querystring: EntityPaginationRequestQueryDto }>,
      res,
    ) {
      const {
        count = PaginationDefaultValue.DEFAULT_COURSE_CATEGORIES_COUNT,
        page = PaginationDefaultValue.DEFAULT_PAGE,
      } = req.query;
      const courseWithCategories = await courseService.getAll({
        count,
        page,
      });

      return res.status(HttpCode.OK).send(courseWithCategories);
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
    schema: {
      params: courseGetParamsValidationSchema,
      querystring: courseMentorsFilteringValidationSchema,
    },
    async handler(
      req: FastifyRequest<{
        Params: CourseGetRequestParamsDto;
        Querystring: CourseMentorsFilteringDto;
      }>,
      rep,
    ) {
      const { id } = req.params;
      const { mentorName } = req.query;
      const mentors = await courseService.getMentorsByCourseId({
        courseId: id,
        filteringOpts: { mentorName },
      });

      rep.status(HttpCode.OK).send(mentors);
    },
  });

  fastify.route({
    method: HttpMethod.GET,
    url: CoursesApiPath.$ID_MENTEES,
    schema: {
      params: courseGetParamsValidationSchema,
    },
    async handler(
      req: FastifyRequest<{
        Params: CourseGetRequestParamsDto;
      }>,
      rep,
    ) {
      const { id } = req.params;

      const mentees = await courseService.getMenteesByCourseIdAndMentorId({
        mentorId: req.user.id,
        courseId: id,
      });

      rep.status(HttpCode.OK).send(mentees);
    },
  });

  fastify.route({
    method: HttpMethod.GET,
    url: CoursesApiPath.$ID_IS_MENTOR_CHECK,
    schema: {
      params: courseCheckIsMentorParamsValidationSchema,
    },
    async handler(
      req: FastifyRequest<{
        Params: CourseCheckIsMentorRequestParamsDto;
      }>,
      rep,
    ) {
      const { id } = req.params;
      const { user } = req;

      const isMentor = await mentorService.checkIsMentor({
        courseId: id,
        userId: user.id,
      });

      rep.status(HttpCode.OK).send(isMentor);
    },
  });

  fastify.route({
    method: HttpMethod.GET,
    url: CoursesApiPath.$ID_HAS_MENTOR_CHECK,
    schema: {
      params: courseCheckIsMentorParamsValidationSchema,
    },
    async handler(
      req: FastifyRequest<{
        Params: CourseCheckIsMentorRequestParamsDto;
      }>,
      rep,
    ) {
      const { id } = req.params;
      const { user } = req;

      const hasMentor = await mentorService.checkHasMentor({
        courseId: id,
        userId: user.id,
      });

      rep.status(HttpCode.OK).send(hasMentor);
    },
  });

  fastify.route({
    method: HttpMethod.PATCH,
    url: CoursesApiPath.$ID_CATEGORY,
    schema: {
      params: courseUpdateParamsValidationSchema,
      body: courseUpdateCategoryValidationSchema,
    },
    preHandler: checkHasPermissions('every', PermissionKey.MANAGE_CATEGORIES),
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
      const chooseMentor = await mentorService.chooseMentor({
        courseId: id,
        mentorId,
        menteeId,
      });

      return rep.status(HttpCode.CREATED).send(chooseMentor);
    },
  });
};

export { initCoursesApi };
