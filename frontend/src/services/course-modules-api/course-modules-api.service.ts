import { HttpMethod } from 'common/enums/enums';
import {
  CourseModuleGetByIdResponseDto,
  CourseModuleGetRequestParamsDto,
} from 'common/types/types';
import { Http } from 'services/http/http.service';

type Constructor = {
  http: Http;
  apiPrefix: string;
};

class CourseModules {
  #http: Http;

  #apiPrefix: string;

  public constructor({ http, apiPrefix }: Constructor) {
    this.#http = http;
    this.#apiPrefix = apiPrefix;
  }

  public getById({
    courseId,
    moduleId,
  }: CourseModuleGetRequestParamsDto): Promise<CourseModuleGetByIdResponseDto> {
    return this.#http.load(
      `${this.#apiPrefix}/courses/${courseId}/modules/${moduleId}`,
      {
        method: HttpMethod.GET,
      },
    );
  }
}

export { CourseModules };
