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
    const courseIdOrSlug = url.pathname
      .split('/')
      .filter(Boolean)
      .pop() as string;

    const headers = this.getHeaders();
    const res = await this.#httpService.load<EdxCourseGetResponseDto>(
      this.getCourseRequestUrl(courseIdOrSlug),
      { headers, method: HttpMethod.GET },
    );

    return res;
  }

  private getCourseRequestUrl(courseIdOrSlug: string): string {
    return `${this.#baseUrl}courses/${courseIdOrSlug}`;
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
