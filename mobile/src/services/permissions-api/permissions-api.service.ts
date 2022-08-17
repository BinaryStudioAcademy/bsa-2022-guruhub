import { ApiPath, HttpMethod } from '~/common/enums/enums';
import { PermissionsGetAllResponseDto } from '~/common/types/types';

import { Http } from '../http/http.service';

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

  public getAll(): Promise<PermissionsGetAllResponseDto> {
    return this.#http.load(`${this.#apiPrefix}${ApiPath.PERMISSIONS}`, {
      method: HttpMethod.GET,
    });
  }
}

export { PermissionsApi };
