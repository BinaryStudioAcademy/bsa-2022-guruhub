import {
  ApiPath,
  ContentType,
  HttpMethod,
  InterviewsApiPath,
} from '~/common/enums/enums';
import {
  EntityPagination,
  EntityPaginationRequestQueryDto,
  InterviewsCreateRequestBodyDto,
  InterviewsGetAllItemResponseDto,
  InterviewsResponseDto,
} from '~/common/types/types';
import { Http } from '~/services/http/http.service';

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

  public getPage({
    page,
    count,
  }: EntityPaginationRequestQueryDto): Promise<
    EntityPagination<InterviewsGetAllItemResponseDto>
  > {
    return this.#http.load(
      `${this.#apiPrefix}${ApiPath.INTERVIEWS}${InterviewsApiPath.ROOT}`,
      {
        method: HttpMethod.GET,
        queryParams: {
          page,
          count,
        },
      },
    );
  }

  public createInterview(
    payload: InterviewsCreateRequestBodyDto,
  ): Promise<InterviewsResponseDto> {
    return this.#http.load(
      `${this.#apiPrefix}${ApiPath.INTERVIEWS}${InterviewsApiPath.ROOT}`,
      {
        method: HttpMethod.POST,
        contentType: ContentType.JSON,
        payload: JSON.stringify(payload),
      },
    );
  }

  public getPassedInterviewCategoryIds(payload: number): Promise<number[]> {
    return this.#http.load(
      `${this.#apiPrefix}${ApiPath.INTERVIEWS}
      ${InterviewsApiPath.INTERVIEWEE}/${payload}${
        InterviewsApiPath.CATEGORIES
      }`,
      {
        method: HttpMethod.GET,
      },
    );
  }
}

export { InterviewsApi };
