import { ApiPath, HttpMethod, UsersApiPath } from 'common/enums/enums';
import {
  EntityPagination,
  EntityPaginationRequestQueryDto,
  UsersGetResponseDto,
} from 'common/types/types';
import { Http } from 'services/http/http.service';

type Constructor = {
  http: Http;
  apiPrefix: string;
};

class UsersApi {
  #http: Http;
  #apiPrefix: string;

  constructor({ http, apiPrefix }: Constructor) {
    this.#http = http;
    this.#apiPrefix = apiPrefix;
  }

  public getPaginated({
    page,
    count,
  }: EntityPaginationRequestQueryDto): Promise<
    EntityPagination<UsersGetResponseDto>
  > {
    return this.#http.load(
      `${this.#apiPrefix}${ApiPath.USERS}${
        UsersApiPath.ROOT
      }?page=${page}&count=${count}`,
      {
        method: HttpMethod.GET,
      },
    );
  }
}

export { UsersApi };
