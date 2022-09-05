import { ApiPath, HttpMethod } from 'common/enums/enums';
import { CategoryGetAllResponseDto } from 'common/types/types';
import { Http } from 'services/http/http.service';

type Constructor = {
  http: Http;
  apiPrefix: string;
};

class CategoriesApi {
  #http: Http;

  #apiPrefix: string;

  public constructor({ http, apiPrefix }: Constructor) {
    this.#http = http;
    this.#apiPrefix = apiPrefix;
  }

  public getAll(): Promise<CategoryGetAllResponseDto> {
    return this.#http.load(
      `${this.#apiPrefix}${ApiPath.CATEGORIES}${ApiPath.DASHBOARD}`,
      {
        method: HttpMethod.GET,
      },
    );
  }
}

export { CategoriesApi };
