import { HttpMethod } from '~/common/enums/enums';
import {
  CourseClientDataDto,
  EdxCourseGetResponseDto,
} from '~/common/types/types';
import { http as httpServ } from '~/services/services';

type Constructor = {
  httpService: typeof httpServ;
  baseUrl: string;
  clientData: CourseClientDataDto;
};

class Edx {
  #authorizationToken: string;

  #baseUrl: string;

  #httpService: typeof httpServ;

  #clientData: CourseClientDataDto;

  public constructor({ httpService, baseUrl, clientData }: Constructor) {
    this.#authorizationToken = this.getToken();
    this.#baseUrl = baseUrl;
    this.#httpService = httpService;
    this.#clientData = clientData;
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
      `${this.#clientData.clientId}:${this.#clientData.clientSecret}`,
      'utf-8',
    ).toString('base64');
  }
}

export { Edx };
