import { FastifyPluginAsync, FastifyRequest } from 'fastify';

import { CategoriesApiPath, HttpCode, HttpMethod } from '~/common/enums/enums';
import { CourseCategoryGetByIdRequestParamsDto } from '~/common/types/types';
import { courseCategory as courseCategoryService } from '~/services/services';
import { courseCategoryGetByIdParams as courseCategoryGetByIdParamsValidationSchema } from '~/validation-schemas/validation-schemas';

type Options = {
  services: {
    courseCategory: typeof courseCategoryService;
  };
};

const initCategoriesApi: FastifyPluginAsync<Options> = async (
  fastify,
  opts,
) => {
  const { courseCategory: courseCategoryService } = opts.services;

  fastify.route({
    method: HttpMethod.GET,
    url: CategoriesApiPath.ROOT,
    async handler(_req, rep) {
      const categories = await courseCategoryService.getAll();

      return rep.status(HttpCode.OK).send(categories);
    },
  });

  fastify.route({
    method: HttpMethod.GET,
    url: CategoriesApiPath.DASHBOARD,
    async handler(_req, rep) {
      const categoriesWithCourses =
        await courseCategoryService.getWithCourses();

      return rep.status(HttpCode.OK).send(categoriesWithCourses);
    },
  });

  fastify.route({
    method: HttpMethod.GET,
    url: CategoriesApiPath.$ID,
    schema: { params: courseCategoryGetByIdParamsValidationSchema },
    async handler(
      req: FastifyRequest<{ Params: CourseCategoryGetByIdRequestParamsDto }>,
      rep,
    ) {
      const { id } = req.params;
      const category = await courseCategoryService.getById(id);

      return rep.status(HttpCode.OK).send(category);
    },
  });
};

export { initCategoriesApi };
