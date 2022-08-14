import { HttpMethod } from '~/common/enums/enums';
import { UdemyGetResponseDto } from '~/common/types/types';
import { http as httpServ } from '~/services/services';

type Constructor = {
  httpService: typeof httpServ;
  authorizationToken: string;
  baseUrl: string;
};

class Udemy {
  #authorizationTokenBase64: string;
  #baseUrl: string;
  #httpService: typeof httpServ;

  constructor({ httpService, authorizationToken, baseUrl }: Constructor) {
    this.#authorizationTokenBase64 = authorizationToken;
    this.#baseUrl = baseUrl;
    this.#httpService = httpService;
  }

  async getByUrl(url: URL): Promise<UdemyGetResponseDto> {
    const courseIdOrSlug = url.pathname;
    const headers = this.getHeaders();
    const res = await this.#httpService.load<UdemyGetResponseDto>(
      this.getRequestUrl(courseIdOrSlug),
      { headers, method: HttpMethod.GET },
    );

    return res;
  }

  private getHeaders(): Record<string, string> {
    const headers = {
      Authorization: `Basic ${this.#authorizationTokenBase64}`,
    };

    return headers;
  }

  private getRequestUrl(courseIdOrSlug: string): string {
    return `${
      this.#baseUrl
    }courses${courseIdOrSlug}?fields[course]=title,description,url`;
  }
}

export { Udemy };
