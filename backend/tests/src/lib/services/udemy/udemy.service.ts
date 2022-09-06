import {
  UdemyCoursesGetResponseDto,
  UdemyModulesGetResponseDto,
} from 'guruhub-shared';

import { ENV } from '~/lib/common/enums/enums';
import { Response } from '~/lib/common/types/types';
import { choose, randint } from '~/lib/helpers/helpers';

import { HttpService } from '../http/http.service';
import { RequestBuilder } from '../http/request-builder';

type Constructor = {
  httpService: HttpService;
};

export class UdemyService {
  #MIN_PAGE_NUMBER = 1;

  #MAX_PAGE_SIZE = 100;

  #COURSE_MAX_PAGE_NUMBER = 4;

  #COURSE_SEARCH_TERMS = [
    'js',
    'c#',
    'python',
    'ruby',
    'java',
    'php',
    'qa',
    'react',
    'angular',
    'vue',
  ];

  #httpService: HttpService;

  public constructor({ httpService }: Constructor) {
    this.#httpService = httpService;
  }

  public getRandomCourseArray(): Promise<Response<UdemyCoursesGetResponseDto>> {
    const page = randint(this.#MIN_PAGE_NUMBER, this.#COURSE_MAX_PAGE_NUMBER);

    const search = choose(this.#COURSE_SEARCH_TERMS);

    return this.#udemyRequest()
      .get()
      .path('/courses')
      .query({ page, page_size: this.#MAX_PAGE_SIZE, search })
      .send();
  }

  public async getAllCourseModules(
    courseId: number,
  ): Promise<UdemyModulesGetResponseDto> {
    const {
      body: { count, results: firstPage },
    } = await this.getModulesPage(courseId, this.#MIN_PAGE_NUMBER);

    const maxPageNumber = Math.ceil(count / this.#MAX_PAGE_SIZE);

    const restOfModules = await Promise.all(
      new Array(maxPageNumber - 1)
        .fill(0)
        .map((_, index) => index + 2)
        .map(async (pageNumber) => {
          const {
            body: { results },
          } = await this.getModulesPage(courseId, pageNumber);

          return results;
        }),
    );

    return {
      count,
      results: [...firstPage, ...restOfModules.flat(1)],
    };
  }

  public getModulesPage(
    courseId: number,
    page: number,
  ): Promise<Response<UdemyModulesGetResponseDto>> {
    return this.#udemyRequest()
      .get()
      .path(`/courses/${courseId}/public-curriculum-items`)
      .query({ page, page_size: this.#MAX_PAGE_SIZE })
      .send();
  }

  #udemyRequest(): RequestBuilder {
    return this.#httpService.request().noAutoAuth().headers({
      Authorization: this.#encodeBasicAuth(),
    });
  }

  #encodeBasicAuth(): string {
    const user = ENV.UDEMY.CLIENT_ID;
    const pass = ENV.UDEMY.CLIENT_SECRET;

    return Buffer.from(`${user}:${pass}`, 'utf-8').toString('base64');
  }
}
