import { ENV, HttpMethod } from '~/common/enums/enums';
import {
  UdemyCourseGetResponseDto,
  UdemyModuleGetResponseDto,
  UdemyModulesGetResponseDto,
} from '~/common/types/types';
import { http as httpServ } from '~/services/services';

type Constructor = {
  httpService: typeof httpServ;
  baseUrl: string;
};

class Udemy {
  #MODULE_API_PAGE_SIZE = 15;

  #INITIAL_PAGE = 1;

  #authorizationToken: string;

  #baseUrl: string;

  #httpService: typeof httpServ;

  public constructor({ httpService, baseUrl }: Constructor) {
    this.#authorizationToken = this.getToken();
    this.#baseUrl = baseUrl;
    this.#httpService = httpService;
  }

  public async getCourseByUrl(url: URL): Promise<UdemyCourseGetResponseDto> {
    const { pathname: courseIdOrSlug } = url;
    const headers = this.getHeaders();
    const res = await this.#httpService.load<UdemyCourseGetResponseDto>(
      this.getCourseRequestUrl(courseIdOrSlug),
      { headers, method: HttpMethod.GET },
    );

    return res;
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
    const modules: UdemyModuleGetResponseDto[] = [];

    let fetchedModules: UdemyModuleGetResponseDto[] =
      await this.fetchModulesPage(
        this.getModuleRequestUrl(courseId, page),
        this.getHeaders(),
      );
    while (fetchedModules.length === this.#MODULE_API_PAGE_SIZE) {
      modules.push(...fetchedModules);
      const nextPage = page + 1;
      fetchedModules = await this.fetchModulesPage(
        this.getModuleRequestUrl(courseId, nextPage),
        this.getHeaders(),
      );
    }
    modules.push(...fetchedModules);

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

  private getCourseRequestUrl(courseIdOrSlug: string): string {
    return `${
      this.#baseUrl
    }courses${courseIdOrSlug}?fields[course]=title,description,url`;
  }

  private getModuleRequestUrl(courseId: number, page: number): string {
    return `${
      this.#baseUrl
    }courses/${courseId}/public-curriculum-items/?page=${page}&page_size=${
      this.#MODULE_API_PAGE_SIZE
    }`;
  }

  private getHeaders(): Record<string, string> {
    const headers = {
      Authorization: `Basic ${this.#authorizationToken}`,
    };

    return headers;
  }

  private getToken(): string {
    return Buffer.from(
      `${ENV.UDEMY.CLIENT_ID}:${ENV.UDEMY.CLIENT_SECRET}`,
      'utf-8',
    ).toString('base64');
  }
}

export { Udemy };
