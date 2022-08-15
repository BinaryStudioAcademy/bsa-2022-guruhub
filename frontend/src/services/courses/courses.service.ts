import { ApiPath, CoursesApiPath, HttpMethod } from 'common/enums/enums';
import { CourseGetResponseDto } from 'common/types/types';

import { Http } from '../http/http.service';

type Constructor = {
  http: Http;
  apiPrefix: string;
};

class CoursesApi {
  #http: Http;
  #apiPrefix: string;
  constructor({ http, apiPrefix }: Constructor) {
    this.#http = http;
    this.#apiPrefix = apiPrefix;
  }

  getAll(): Promise<CourseGetResponseDto> {
    return this.#http.load(
      `${this.#apiPrefix}${ApiPath.COURSES}${CoursesApiPath.ROOT}`,
      {
        method: HttpMethod.GET,
      },
    );
  }
}

export { CoursesApi };
