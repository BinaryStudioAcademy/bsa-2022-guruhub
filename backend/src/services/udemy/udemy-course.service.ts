import { HttpMethod } from '~/common/enums/enums';
import { UdemyCourseGetResponseDto } from '~/common/types/types';
import { http as httpServ } from '~/services/services';

import { Udemy } from './udemy.service';

type Constructor = {
  httpService: typeof httpServ;
  baseUrl: string;
};

class UdemyCourse extends Udemy {
  #baseUrl: string;

  #httpService: typeof httpServ;

  public constructor({ httpService, baseUrl }: Constructor) {
    super();
    this.#baseUrl = baseUrl;
    this.#httpService = httpService;
  }

  public async getByUrl(url: URL): Promise<UdemyCourseGetResponseDto> {
    const { pathname: courseIdOrSlug } = url;
    const headers = this.getHeaders();
    const res = await this.#httpService.load<UdemyCourseGetResponseDto>(
      this.getRequestUrl(courseIdOrSlug),
      { headers, method: HttpMethod.GET },
    );

    return res;
  }

  private getRequestUrl(courseIdOrSlug: string): string {
    return `${
      this.#baseUrl
    }courses${courseIdOrSlug}?fields[course]=title,description,url`;
  }
}

export { UdemyCourse };
