import {
  ApiPath,
  CourseModulesApiPath,
  CoursesApiPath,
  HttpMethod,
} from 'common/enums/enums';
import {
  CourseModuleGetByIdResponseDto,
  CourseModuleGetRequestParamsDto,
  CourseModulesGetAllItemResponseDto,
  CourseModulesGetByCourseIdAndMenteeIdRequestDto,
} from 'common/types/types';
import { Http } from 'services/http/http.service';

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

  public getById({
    courseId,
    moduleId,
  }: CourseModuleGetRequestParamsDto): Promise<CourseModuleGetByIdResponseDto> {
    return this.#http.load(
      `${this.#apiPrefix}/${ApiPath.COURSES}/${courseId}${
        CoursesApiPath.MODULES
      }/${moduleId}`,
      {
        method: HttpMethod.GET,
      },
    );
  }

  public getByCourseIdAndMenteeId({
    courseId,
    menteeId,
  }: CourseModulesGetByCourseIdAndMenteeIdRequestDto): Promise<
    CourseModulesGetAllItemResponseDto[]
  > {
    return this.#http.load<CourseModulesGetAllItemResponseDto[]>(
      `${this.#apiPrefix}${ApiPath.COURSE_MODULES}/${courseId}${
        CourseModulesApiPath.MENTEES
      }/${menteeId}`,
      {
        method: HttpMethod.GET,
      },
    );
  }
}

export { CourseModulesApi };
