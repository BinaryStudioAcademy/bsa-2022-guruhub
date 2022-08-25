import { ApiPath, HttpMethod } from 'common/enums/enums';
import { InterviewsGetAllResponseDto } from 'common/types/types';
import { Http } from 'services/http/http.service';

type Constructor = {
  http: Http;
  apiPrefix: string;
};

class InterviewsApi {
  #http: Http;

  #apiPrefix: string;

  public constructor({ http, apiPrefix }: Constructor) {
    this.#http = http;
    this.#apiPrefix = apiPrefix;
  }

  public getAll(): Promise<InterviewsGetAllResponseDto> {
    return this.#http.load(`${this.#apiPrefix}${ApiPath.INTERVIEWS}`, {
      method: HttpMethod.GET,
    });
  }
}

export { InterviewsApi };
