import { HttpMethod, UserByIdResponse } from 'guruhub-shared';
import { Http } from 'services/http/http.service';
import { ApiPath } from './common';

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

  public getUsers(): Promise<UserByIdResponse[]> {
    return this.#http.load(`${this.#apiPrefix}${ApiPath.USERS}`, {
      method: HttpMethod.GET,
    });
  }
}

export { UsersApi };
