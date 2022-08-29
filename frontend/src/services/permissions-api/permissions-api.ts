import { ApiPath, HttpMethod } from 'common/enums/enums';
import {
  EntityPagination,
  EntityPaginationRequestQueryDto,
  PermissionsGetAllItemResponseDto,
} from 'common/types/types';
import { Http } from 'services/http/http.service';

type Constructor = {
  http: Http;
  apiPrefix: string;
};

class PermissionsApi {
  #http: Http;

  #apiPrefix: string;

  public constructor({ http, apiPrefix }: Constructor) {
    this.#http = http;
    this.#apiPrefix = apiPrefix;
  }

  public getAll(
    paginationData?: EntityPaginationRequestQueryDto,
  ): Promise<EntityPagination<PermissionsGetAllItemResponseDto>> {
    const { page, count } = paginationData ?? {};

    return this.#http.load(`${this.#apiPrefix}${ApiPath.PERMISSIONS}`, {
      method: HttpMethod.GET,
      queryString: {
        page,
        count,
      },
    });
  }
}

export { PermissionsApi };
