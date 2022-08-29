import {
  ApiPath,
  ContentType,
  HttpMethod,
  InterviewsApiPath,
} from 'common/enums/enums';
import {
  EntityPagination,
  InterviewsCreateRequestBodyDto,
  InterviewsGetAllResponseDto,
  InterviewsGetOtherItemResponseDto,
  InterviewsGetOtherRequestDto,
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

  public constructor({ http, apiPrefix }: Constructor) {
    this.#http = http;
    this.#apiPrefix = apiPrefix;
  }

  public getAll(): Promise<InterviewsGetAllResponseDto> {
    return this.#http.load(`${this.#apiPrefix}${ApiPath.INTERVIEWS}`, {
      method: HttpMethod.GET,
    });
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

  public getOtherByInterviewId({
    interviewId,
    count,
    page,
  }: InterviewsGetOtherRequestDto): Promise<
    EntityPagination<InterviewsGetOtherItemResponseDto>
  > {
    return this.#http.load<EntityPagination<InterviewsGetOtherItemResponseDto>>(
      `${this.#apiPrefix}${ApiPath.INTERVIEWS}${
        InterviewsApiPath.ROOT
      }${interviewId}${InterviewsApiPath.OTHER}`,
      {
        method: HttpMethod.GET,
        queryString: {
          count,
          page,
        },
      },
    );
  }
}

export { InterviewsApi };
