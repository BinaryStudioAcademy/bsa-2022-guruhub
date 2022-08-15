import { ApiPath, HttpMethod } from 'common/enums/enums';
import { PermissionsGetAllResponseDto } from 'guruhub-shared/common/types/permission/permission';
import { Http } from 'services/http/http.service';

type Constructor = {
  http: Http;
  apiPrefix: string;
};

class PermissionsApi {
  #http: Http;
  #apiPrefix: string;

  constructor({ http, apiPrefix }: Constructor) {
    this.#http = http;
    this.#apiPrefix = apiPrefix;
  }

  getAll(): Promise<PermissionsGetAllResponseDto> {
    return this.#http.load(`${this.#apiPrefix}${ApiPath.PERMISSIONS}`, {
      method: HttpMethod.GET,
    });
  }
}

export { PermissionsApi };
