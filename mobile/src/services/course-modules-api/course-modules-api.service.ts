import { ApiPath, CoursesApiPath, HttpMethod } from '~/common/enums/enums';
import {
  CourseModulesGetAllRequestParamsDto,
  CourseModulesGetAllResponseDto,
} from '~/common/types/types';
import { Http } from '~/services/http/http.service';

type Constructor = {
  http: Http;
  apiPrefix: string;
};

class CourseModulesApi {
  #http: Http;

  #apiPrefix: string;

  public constructor({ http, apiPrefix }: Constructor) {
    this.#http = http;
    this.#apiPrefix = apiPrefix;
  }

  public getAll({
    courseId,
  }: CourseModulesGetAllRequestParamsDto): Promise<CourseModulesGetAllResponseDto> {
    return this.#http.load(
      `${this.#apiPrefix}/${ApiPath.COURSES}/${courseId}${
        CoursesApiPath.MODULES
      }`,
      {
        method: HttpMethod.GET,
      },
    );
  }
}

export { CourseModulesApi };
