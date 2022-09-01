import { ApiPath, HttpMethod, InterviewsApiPath } from '~/common/enums/enums';
import {
  EntityPagination,
  EntityPaginationRequestQueryDto,
  InterviewsGetAllItemResponseDto,
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
}

export { InterviewsApi };
