import { HttpMethod } from '~/common/enums/enums';
import {
  UdemyModuleGetResponseDto,
  UdemyModulesGetResponseDto,
} from '~/common/types/types';
import { http as httpServ } from '~/services/services';

import { Udemy } from './udemy.service';

type Constructor = {
  httpService: typeof httpServ;
  baseUrl: string;
};

class UdemyCourseModule extends Udemy {
  #MODULE_API_PAGE_SIZE = 15;

  #INITIAL_PAGE = 1;

  #baseUrl: string;

  #httpService: typeof httpServ;

  public constructor({ httpService, baseUrl }: Constructor) {
    super();
    this.#baseUrl = baseUrl;
    this.#httpService = httpService;
  }

  public async getModulesByCourseId(
    courseId: number,
  ): Promise<UdemyModuleGetResponseDto[]> {
    const modules = await this.fetchAllCourseModules(
      this.#INITIAL_PAGE,
      courseId,
    );

    return modules;
  }

  private async fetchAllCourseModules(
    page: number,
    courseId: number,
  ): Promise<UdemyModuleGetResponseDto[]> {
    let modules: UdemyModuleGetResponseDto[] = [];

    let fetchedModules: UdemyModuleGetResponseDto[] =
      await this.fetchModulesPage(
        this.getRequestUrl(courseId, page),
        this.getHeaders(),
      );
    while (fetchedModules.length === this.#MODULE_API_PAGE_SIZE) {
      modules = modules.concat(fetchedModules);
      fetchedModules = await this.fetchModulesPage(
        this.getRequestUrl(courseId, ++page),
        this.getHeaders(),
      );
    }
    modules = modules.concat(fetchedModules);

    return modules;
  }

  private async fetchModulesPage(
    requestUrl: string,
    headers: Record<string, string>,
  ): Promise<UdemyModuleGetResponseDto[]> {
    const fetchedModules =
      await this.#httpService.load<UdemyModulesGetResponseDto>(requestUrl, {
        headers,
        method: HttpMethod.GET,
      });

    return fetchedModules.results;
  }

  private getRequestUrl(courseId: number, page: number): string {
    return `${
      this.#baseUrl
    }courses/${courseId}/public-curriculum-items/?page=${page}&page_size=${
      this.#MODULE_API_PAGE_SIZE
    }`;
  }
}

export { UdemyCourseModule };
