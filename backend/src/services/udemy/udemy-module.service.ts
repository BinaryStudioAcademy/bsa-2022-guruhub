import { HttpMethod } from '~/common/enums/enums';
import { UdemyModulesGetResponseDto } from '~/common/types/types';
import { http as httpServ } from '~/services/services';

import { Udemy } from './udemy.service';

type Constructor = {
  httpService: typeof httpServ;
  baseUrl: string;
};

class UdemyCourseModule extends Udemy {
  #baseUrl: string;

  #httpService: typeof httpServ;

  public constructor({ httpService, baseUrl }: Constructor) {
    super();
    this.#baseUrl = baseUrl;
    this.#httpService = httpService;
  }

  public async getByCourseId(
    courseId: number,
  ): Promise<UdemyModulesGetResponseDto> {
    const headers = this.getHeaders();

    const res = await this.#httpService.load<UdemyModulesGetResponseDto>(
      this.getRequestUrl(courseId),
      { headers, method: HttpMethod.GET },
    );

    return res;
  }

  private getRequestUrl(courseId: number): string {
    return `${this.#baseUrl}courses/${courseId}/public-curriculum-items/`;
  }
}

export { UdemyCourseModule };
