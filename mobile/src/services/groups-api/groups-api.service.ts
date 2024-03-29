import {
  ApiPath,
  ContentType,
  GroupsApiPath,
  HttpMethod,
} from '~/common/enums/enums';
import {
  EntityPagination,
  EntityPaginationRequestQueryDto,
  GroupGetByIdResponseDto,
  GroupsCreateRequestDto,
  GroupsDeleteRequestParamDto,
  GroupsItemResponseDto,
  GroupsUpdateRequestParamsDto,
  GroupUpdateRequestParamsDto,
} from '~/common/types/types';
import { Http } from '~/services/http/http.service';

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

  public getPage({
    page,
    count,
  }: EntityPaginationRequestQueryDto): Promise<
    EntityPagination<GroupsItemResponseDto>
  > {
    return this.#http.load(
      `${this.#apiPrefix}${ApiPath.GROUPS}${GroupsApiPath.ROOT}`,
      {
        queryParams: {
          page,
          count,
        },
      },
    );
  }

  public delete({ id }: GroupsDeleteRequestParamDto): Promise<boolean> {
    return this.#http.load(
      `${this.#apiPrefix}${ApiPath.GROUPS}${GroupsApiPath.ROOT}${id}`,
      {
        method: HttpMethod.DELETE,
      },
    );
  }

  public getById({
    id,
  }: GroupsUpdateRequestParamsDto): Promise<GroupGetByIdResponseDto> {
    return this.#http.load(
      `${this.#apiPrefix}${ApiPath.GROUPS}${GroupsApiPath.ROOT}${id}`,
    );
  }

  public edit({
    id,
    payload,
  }: GroupUpdateRequestParamsDto): Promise<GroupsItemResponseDto> {
    return this.#http.load(
      `${this.#apiPrefix}${ApiPath.GROUPS}${GroupsApiPath.ROOT}${id}`,
      {
        method: HttpMethod.PUT,
        contentType: ContentType.JSON,
        payload: JSON.stringify(payload),
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
}

export { GroupsApi };
