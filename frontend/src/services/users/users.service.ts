import { HttpMethod, UsersApiPath } from 'common/enums/enums';
import { UserResponse } from 'common/types/types';
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

  public getUsers(): Promise<UserResponse[]> {
    return this.#http.load(`${this.#apiPrefix}${UsersApiPath.USERS}`, {
      method: HttpMethod.GET,
    });
  }
}

export { UsersApi };
