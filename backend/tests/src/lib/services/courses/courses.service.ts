import {
  ApiPath,
  CourseCreateRequestDto,
  CourseGetResponseDto,
  CourseModulesGetAllItemResponseDto,
  CoursesApiPath,
} from 'guruhub-shared';

import { Response } from '~/lib/common/types/types';

import { HttpService } from '../http/http.service';

type Constructor = {
  httpService: HttpService;
};

class CoursesService {
  #httpService: HttpService;

  public constructor({ httpService }: Constructor) {
    this.#httpService = httpService;
  }

  public getOne(id: number): Promise<Response<CourseGetResponseDto>> {
    return this.#httpService
      .request()
      .get()
      .path(`${ApiPath.COURSES}/${id}`)
      .send();
  }

  public getModules(
    id: number,
  ): Promise<Response<CourseModulesGetAllItemResponseDto[]>> {
    return this.#httpService
      .request()
      .get()
      .path(`${ApiPath.COURSE_MODULES}/${id}${CoursesApiPath.MODULES}`)
      .send();
  }

  public create(
    data: CourseCreateRequestDto,
  ): Promise<Response<CourseGetResponseDto>> {
    return this.#httpService
      .request()
      .post()
      .path(ApiPath.COURSES)
      .data(data)
      .send();
  }
}

export { CoursesService };
