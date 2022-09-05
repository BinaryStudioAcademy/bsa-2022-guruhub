import { ApiPath, HttpMethod } from 'common/enums/enums';
import {
  CategoryGetAllResponseDto,
  CourseGetResponseDto,
  EntityPagination,
  EntityPaginationRequestQueryDto,
} from 'common/types/types';
import { Http } from 'services/http/http.service';

type Constructor = {
  http: Http;
  apiPrefix: string;
};

class CoursesManagementApi {
  #http: Http;

  #apiPrefix: string;

  public constructor({ http, apiPrefix }: Constructor) {
    this.#http = http;
    this.#apiPrefix = apiPrefix;
  }

  public getAllCourses({
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

  public getAllCategories(): Promise<CategoryGetAllResponseDto> {
    return this.#http.load(`${this.#apiPrefix}${ApiPath.CATEGORIES}`, {
      method: HttpMethod.GET,
    });
  }
}

export { CoursesManagementApi };
