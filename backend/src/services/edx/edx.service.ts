import { ENV, HttpMethod } from '~/common/enums/enums';
import { EdxCourseGetResponseDto } from '~/common/types/types';
import { http as httpServ } from '~/services/services';

type Constructor = {
  httpService: typeof httpServ;
  baseUrl: string;
};

class Edx {
  #authorizationToken: string;

  #baseUrl: string;

  #httpService: typeof httpServ;

  public constructor({ httpService, baseUrl }: Constructor) {
    this.#authorizationToken = this.getToken();
    this.#baseUrl = baseUrl;
    this.#httpService = httpService;
  }

  public async getCourseByUrl(url: URL): Promise<EdxCourseGetResponseDto> {
    const courseSlug = url.pathname.split('/').filter(Boolean).pop() as string;
    const filteredSlug = courseSlug.split('?').shift() as string;
    const searchTerm = filteredSlug.split('-').join(' ');

    const headers = this.getHeaders();
    const res = await this.#httpService.load<EdxCourseGetResponseDto[]>(
      this.getCourseRequestUrl(),
      {
        headers,
        method: HttpMethod.GET,
        queryString: { search_term: searchTerm },
      },
    );

    return res[0];
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
      `${ENV.EDX.CLIENT_ID}:${ENV.EDX.CLIENT_SECRET}`,
      'utf-8',
    ).toString('base64');
  }
}

export { Edx };
