import { HttpMethod } from '~/common/enums/enums';
import {
  UdemyCourseGetResponseDto,
  UdemyModuleGetResponseDto,
  UdemyModulesGetResponseDto,
} from '~/common/types/types';
import { UdemyError } from '~/exceptions/exceptions';
import { http as httpServ } from '~/services/services';

type Constructor = {
  httpService: typeof httpServ;
  baseUrl: string;
  clientId: string;
  clientSecret: string;
};

class Udemy {
  #MODULE_API_PAGE_SIZE = 100;

  #INITIAL_PAGE = 1;

  #MODULE_TYPE = 'chapter';

  #authorizationToken: string;

  #baseUrl: string;

  #httpService: typeof httpServ;

  #clientId: string;

  #clientSecret: string;

  public constructor({
    httpService,
    baseUrl,
    clientId,
    clientSecret,
  }: Constructor) {
    this.#authorizationToken = this.getToken();
    this.#baseUrl = baseUrl;
    this.#httpService = httpService;
    this.#clientId = clientId;
    this.#clientSecret = clientSecret;
  }

  public async getCourseByUrl(url: URL): Promise<UdemyCourseGetResponseDto> {
    try {
      const courseIdOrSlug = url.pathname
        .split('/')
        .filter(Boolean)
        .pop() as string;

      const headers = this.getHeaders();
      const res = await this.#httpService.load<UdemyCourseGetResponseDto>(
        this.getCourseRequestUrl(courseIdOrSlug),
        { headers, method: HttpMethod.GET },
      );

      return res;
    } catch {
      throw new UdemyError();
    }
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

    let fetchedModulesData: UdemyModulesGetResponseDto =
      await this.fetchModulesPage(
        this.getModuleRequestUrl(courseId, page),
        this.getHeaders(),
      );

    while (fetchedModulesData.next) {
      fetchedModulesData.results.map((item) => {
        if (item._class === this.#MODULE_TYPE) {
          modules.push(item);
        }
      });

      fetchedModulesData = await this.fetchModulesPage(
        fetchedModulesData.next,
        this.getHeaders(),
      );
    }

    fetchedModulesData.results.map((item) => {
      if (item._class === this.#MODULE_TYPE) {
        modules.push(item);
      }
    });

    return modules;
  }

  private async fetchModulesPage(
    requestUrl: string,
    headers: Record<string, string>,
  ): Promise<UdemyModulesGetResponseDto> {
    const fetchedModules =
      await this.#httpService.load<UdemyModulesGetResponseDto>(requestUrl, {
        headers,
        method: HttpMethod.GET,
      });

    return fetchedModules;
  }

  private getCourseRequestUrl(courseIdOrSlug: string): string {
    return `${
      this.#baseUrl
    }courses/${courseIdOrSlug}?fields[course]=title,description,url,image_480x270`;
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
      `${this.#clientId}:${this.#clientSecret}`,
      'utf-8',
    ).toString('base64');
  }
}

export { Udemy };
