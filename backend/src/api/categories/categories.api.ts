import { FastifyPluginAsync } from 'fastify';

import { CategoriesApiPath, HttpCode, HttpMethod } from '~/common/enums/enums';
import { courseCategory as courseCategoryService } from '~/services/services';

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
};

export { initCategoriesApi };
