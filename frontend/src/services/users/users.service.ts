import { ApiPath, HttpMethod, UsersApiPath } from 'common/enums/enums';
import {
  UsersDeleteRequestParamsDto,
  UsersGetAllResponseDto,
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

  public getAll(): Promise<UsersGetAllResponseDto> {
    return this.#http.load(
      `${this.#apiPrefix}${ApiPath.USERS}${UsersApiPath.ROOT}`,
      {
        method: HttpMethod.GET,
      },
    );
  }

  public delete(payload: UsersDeleteRequestParamsDto): Promise<void> {
    return this.#http.load(
      `${this.#apiPrefix}${ApiPath.USERS}${UsersApiPath.ROOT}${payload.id}`,
      {
        method: HttpMethod.DELETE,
      },
    );
  }
}

export { UsersApi };
