import { HttpMethod } from '~/common/enums/enums';
import { EdxCourseGetResponseDto } from '~/common/types/types';
import { http as httpServ } from '~/services/services';

type Constructor = {
  httpService: typeof httpServ;
  baseUrl: string;
  clientId: string;
  clientSecret: string;
};

class Edx {
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

  public async getCourseByUrl(url: URL): Promise<EdxCourseGetResponseDto> {
    const courseSlug = url.pathname.split('/').filter(Boolean).pop() as string;
    const filteredSlug = courseSlug.split('?').shift() as string;
    const searchTerm = filteredSlug.split('-').join(' ');

    const headers = this.getHeaders();
    const [course] = await this.#httpService.load<EdxCourseGetResponseDto[]>(
      this.getCourseRequestUrl(),
      {
        headers,
        method: HttpMethod.GET,
        queryString: { search_term: searchTerm },
      },
    );

    return course;
  }

  private getCourseRequestUrl(): string {
    return `${this.#baseUrl}courses/`;
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

export { Edx };
