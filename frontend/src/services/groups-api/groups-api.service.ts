import {
  ApiPath,
  ContentType,
  GroupsApiPath,
  HttpMethod,
} from 'common/enums/enums';
import {
  EntityPagination,
  EntityPaginationRequestQueryDto,
  GroupsConfigureRequestDto,
  GroupsDeleteRequestParamDto,
  GroupsGetByIdResponseDto,
  GroupsItemResponseDto,
  GroupUpdateRequestArgumentsDto,
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

  public getAll(
    paginationData?: EntityPaginationRequestQueryDto,
  ): Promise<EntityPagination<GroupsItemResponseDto>> {
    const { count, page } = paginationData ?? {};

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

  public getById(id: number): Promise<GroupsGetByIdResponseDto> {
    return this.#http.load(
      `${this.#apiPrefix}${ApiPath.GROUPS}${GroupsApiPath.ROOT}${id}`,
      {
        method: HttpMethod.GET,
      },
    );
  }

  public create(
    payload: GroupsConfigureRequestDto,
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

  public update({
    payload,
    id,
  }: GroupUpdateRequestArgumentsDto): Promise<GroupsItemResponseDto> {
    return this.#http.load(
      `${this.#apiPrefix}${ApiPath.GROUPS}${GroupsApiPath.ROOT}${id}`,
      {
        method: HttpMethod.PUT,
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
