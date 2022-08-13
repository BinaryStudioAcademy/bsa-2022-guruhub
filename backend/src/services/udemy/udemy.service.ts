import axios, { AxiosResponse } from 'axios';

import { UdemyApiPath } from '~/common/enums/enums';
import { UdemyGetResponseDto } from '~/common/types/types';
import { http as httpServ } from '~/services/services';

type Constructor = {
  httpService: typeof httpServ;
};

class Udemy {
  #authorizationTokenBase64: string;
  #apiBaseUrl: string;
  #httpService: typeof httpServ;

  constructor({ httpService }: Constructor) {
    const AUTHORIZATION_TOKEN_UTF8 = `${process.env.UDEMY_CLIENT_ID}:${process.env.UDEMY_CLIENT_SECRET}`;
    const AUTHORIZATION_TOKEN_BASE64 = Buffer.from(
      AUTHORIZATION_TOKEN_UTF8,
      'utf-8',
    ).toString('base64');
    this.#authorizationTokenBase64 = AUTHORIZATION_TOKEN_BASE64;
    this.#apiBaseUrl = 'https://www.udemy.com/api-2.0/';
    this.#httpService = httpService;
  }

  async getByUrl(url: URL): Promise<UdemyGetResponseDto> {
    const courseIdOrSlug = url.pathname;
    this.setHeaders();
    const res: AxiosResponse<UdemyGetResponseDto> = await this.#httpService.get(
      this.getRequestUrl(courseIdOrSlug),
    );

    return res.data;
  }

  private setHeaders(): void {
    axios.defaults.headers.common['Authorization'] = `Basic ${
      this.#authorizationTokenBase64
    }`;
  }

  private getRequestUrl(courseIdOrSlug: string): string {
    return `${this.#apiBaseUrl}${
      UdemyApiPath.COURSES
    }${courseIdOrSlug}?fields[course]=title,description,primary_category,url`;
  }
}

export { Udemy };
