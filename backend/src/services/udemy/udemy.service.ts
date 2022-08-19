import { ENV, HttpMethod } from '~/common/enums/enums';
import { UdemyGetResponseDto } from '~/common/types/types';
import { http as httpServ } from '~/services/services';

type Constructor = {
  httpService: typeof httpServ;
  baseUrl: string;
};

class Udemy {
  #authorizationToken: string;

  #baseUrl: string;

  #httpService: typeof httpServ;

  public constructor({ httpService, baseUrl }: Constructor) {
    this.#authorizationToken = this.getToken();
    this.#baseUrl = baseUrl;
    this.#httpService = httpService;
  }

  public async getByUrl(url: URL): Promise<UdemyGetResponseDto> {
    const courseIdOrSlug = url.pathname
      .split('/')
      .filter(Boolean)
      .pop() as string;
    const headers = this.getHeaders();
    const res = await this.#httpService.load<UdemyGetResponseDto>(
      this.getRequestUrl(courseIdOrSlug),
      { headers, method: HttpMethod.GET },
    );

    return res;
  }

  private getHeaders(): Record<string, string> {
    const headers = {
      Authorization: `Basic ${this.#authorizationToken}`,
    };

    return headers;
  }

  private getRequestUrl(courseIdOrSlug: string): string {
    return `${
      this.#baseUrl
    }courses/${courseIdOrSlug}?fields[course]=title,description,url`;
  }

  private getToken(): string {
    return Buffer.from(
      `${ENV.UDEMY.CLIENT_ID}:${ENV.UDEMY.CLIENT_SECRET}`,
      'utf-8',
    ).toString('base64');
  }
}

export { Udemy };
