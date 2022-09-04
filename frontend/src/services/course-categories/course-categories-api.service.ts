import { ApiPath, HttpMethod } from 'common/enums/enums';
import {
  EntityPagination,
  EntityPaginationRequestQueryDto,
} from 'common/types/types';
import { CourseGetResponseDto } from 'guruhub-shared';
import { Http } from 'services/http/http.service';

type Constructor = {
  http: Http;
  apiPrefix: string;
};

class CourseCategoriesApi {
  #http: Http;

  #apiPrefix: string;

  public constructor({ http, apiPrefix }: Constructor) {
    this.#http = http;
    this.#apiPrefix = apiPrefix;
  }

  public getAll({
    count,
    page,
  }: EntityPaginationRequestQueryDto): Promise<
    EntityPagination<CourseGetResponseDto>
  > {
    return this.#http.load<EntityPagination<CourseGetResponseDto>>(
      `${this.#apiPrefix}${ApiPath.COURSES}${ApiPath.CATEGORIES}`,
      {
        method: HttpMethod.GET,
        queryString: {
          count,
          page,
        },
      },
    );
  }
}

export { CourseCategoriesApi };
