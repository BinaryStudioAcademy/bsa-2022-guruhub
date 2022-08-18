import {
  ApiPath,
  ContentType,
  GroupsApiPath,
  HttpMethod,
} from 'common/enums/enums';
import {
  EntityPagination,
  EntityPaginationRequestQueryDto,
  GroupsCreateRequestDto,
  GroupsDeleteRequestParamDto,
  GroupsItemResponseDto,
} from 'common/types/types';
import { Http } from 'services/http/http.service';

type Constructor = {
  http: Http;
  apiPrefix: string;
};

class GroupsApi {
  #http: Http;

  #apiPrefix: string;

  public constructor({ http, apiPrefix }: Constructor) {
    this.#http = http;
    this.#apiPrefix = apiPrefix;
  }

  public getPaginated({
    page,
    count,
  }: EntityPaginationRequestQueryDto): Promise<
    EntityPagination<GroupsItemResponseDto>
  > {
    return this.#http.load(
      `${this.#apiPrefix}${ApiPath.GROUPS}${GroupsApiPath.ROOT}`,
      {
        method: HttpMethod.GET,
        queryString: {
          page,
          count,
        },
      },
    );
  }

  public create(
    payload: GroupsCreateRequestDto,
  ): Promise<GroupsItemResponseDto> {
    return this.#http.load(
      `${this.#apiPrefix}${ApiPath.GROUPS}${GroupsApiPath.ROOT}`,
      {
        method: HttpMethod.POST,
        contentType: ContentType.JSON,
        payload: JSON.stringify(payload),
      },
    );
  }

  public delete({ id }: GroupsDeleteRequestParamDto): Promise<boolean> {
    return this.#http.load(
      `${this.#apiPrefix}${ApiPath.GROUPS}${GroupsApiPath.ROOT}${id}`,
      { method: HttpMethod.DELETE },
    );
  }
}

export { GroupsApi };
