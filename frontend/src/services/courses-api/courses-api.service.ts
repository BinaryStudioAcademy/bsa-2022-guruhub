import {
  ApiPath,
  ContentType,
  CoursesApiPath,
  HttpMethod,
} from 'common/enums/enums';
import {
  CourseFilteringDto,
  CourseGetRequestParamsDto,
  CourseGetResponseDto,
  CourseModulesGetAllResponseDto,
  CourseModulesGetRequestDto,
} from 'common/types/types';
import { Http } from 'services/http/http.service';

type Constructor = {
  http: Http;
  apiPrefix: string;
};

class Courses {
  #http: Http;

  #apiPrefix: string;

  public constructor({ http, apiPrefix }: Constructor) {
    this.#http = http;
    this.#apiPrefix = apiPrefix;
  }

  public getAll(opts: {
    filtering: CourseFilteringDto;
  }): Promise<CourseGetResponseDto[]> {
    return this.#http.load(
      `${this.#apiPrefix}${ApiPath.COURSES}${CoursesApiPath.ROOT}`,
      {
        method: HttpMethod.GET,
        queryString: {
          title: opts.filtering.title,
          categoryKey: opts.filtering.categoryKey,
        },
      },
    );
  }

  public create(url: string): Promise<CourseGetResponseDto> {
    return this.#http.load(
      `${this.#apiPrefix}${ApiPath.COURSES}${CoursesApiPath.ROOT}`,
      {
        method: HttpMethod.POST,
        contentType: ContentType.JSON,
        payload: JSON.stringify({ url }),
      },
    );
  }

  public getById({
    id,
  }: CourseGetRequestParamsDto): Promise<CourseGetResponseDto> {
    return this.#http.load(
      `${this.#apiPrefix}${ApiPath.COURSES}${CoursesApiPath.ROOT}${id}`,
      {
        method: HttpMethod.GET,
      },
    );
  }

  public getCourseModulesById({
    courseId,
  }: CourseModulesGetRequestDto): Promise<CourseModulesGetAllResponseDto> {
    return this.#http.load(
      `${this.#apiPrefix}${ApiPath.COURSES}${
        CoursesApiPath.ROOT
      }${courseId}/modules`,
      {
        method: HttpMethod.GET,
      },
    );
  }
}

export { Courses };
