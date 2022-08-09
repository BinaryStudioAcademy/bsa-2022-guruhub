import { HttpMethod, ApiPath, UsersApiPath } from 'common/enums/enums';
import { UsersGetAllResponseDto } from 'common/types/types';
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

  getAll(): Promise<UsersGetAllResponseDto> {
    return this.#http.load(
      `${this.#apiPrefix}${ApiPath.USERS}${UsersApiPath.ROOT}`,
      {
        method: HttpMethod.GET,
      },
    );
  }
}

export { UsersApi };
