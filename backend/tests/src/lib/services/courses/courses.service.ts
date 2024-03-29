import {
  ApiPath,
  CourseCreateRequestDto,
  CourseGetResponseDto,
  CourseModulesGetAllResponseDto,
  CoursesApiPath,
  HttpErrorDto,
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
  ): Promise<Response<CourseModulesGetAllResponseDto>> {
    return this.#httpService
      .request()
      .get()
      .path(`${ApiPath.COURSE_MODULES}/${id}${CoursesApiPath.MODULES}`)
      .send();
  }

  public create(
    data: CourseCreateRequestDto,
  ): Promise<Response<CourseGetResponseDto | HttpErrorDto>> {
    return this.#httpService
      .request()
      .post()
      .path(ApiPath.COURSES)
      .data(data)
      .send();
  }

  public updateCategory(
    courseId: number,
    newCategoryId: number,
  ): Promise<Response<CourseGetResponseDto | HttpErrorDto>> {
    return this.#httpService
      .request()
      .patch()
      .path(`${ApiPath.COURSES}/${courseId}${CoursesApiPath.CATEGORY}`)
      .data({ newCategoryId })
      .send();
  }
}

export { CoursesService };
