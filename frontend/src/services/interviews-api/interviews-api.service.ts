import {
  ApiPath,
  ContentType,
  HttpMethod,
  InterviewsApiPath,
} from 'common/enums/enums';
import {
  InterviewsCreateRequestBodyDto,
  InterviewsResponseDto,
} from 'common/types/types';
import { Http } from 'services/http/http.service';

type Constructor = {
  http: Http;
  apiPrefix: string;
};

class InterviewsApi {
  #http: Http;

  #apiPrefix: string;

  public constructor({ apiPrefix, http }: Constructor) {
    this.#apiPrefix = apiPrefix;
    this.#http = http;
  }

  public create(
    payload: InterviewsCreateRequestBodyDto,
  ): Promise<InterviewsResponseDto> {
    return this.#http.load<InterviewsResponseDto>(
      `${this.#apiPrefix}${ApiPath.INTERVIEWS}${InterviewsApiPath.ROOT}`,
      {
        method: HttpMethod.POST,
        contentType: ContentType.JSON,
        payload: JSON.stringify(payload),
      },
    );
  }

  public getPassedInterviewsCategoryIdsByUserId(
    intervieweeUserId: number,
  ): Promise<number[]> {
    return this.#http.load<number[]>(
      `${this.#apiPrefix}${ApiPath.INTERVIEWS}${
        InterviewsApiPath.INTERVIEWEE
      }/${intervieweeUserId}${InterviewsApiPath.CATEGORIES}`,
      {
        method: HttpMethod.GET,
      },
    );
  }
}

export { InterviewsApi };
