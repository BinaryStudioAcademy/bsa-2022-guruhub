import {
  ApiPath,
  ContentType,
  HttpMethod,
  UsersApiPath,
} from 'common/enums/enums';
import {
  UserDetailsResponseDto,
  UserDetailsUpdateInfoRequestDto,
} from 'common/types/types';
import { Http } from 'services/http/http.service';

type Constructor = {
  http: Http;
  apiPrefix: string;
};

class UserDetailsApi {
  #http: Http;

  #apiPrefix: string;

  public constructor({ http, apiPrefix }: Constructor) {
    this.#http = http;
    this.#apiPrefix = apiPrefix;
  }

  public get(): Promise<UserDetailsResponseDto> {
    return this.#http.load(
      `${this.#apiPrefix}${ApiPath.USERS}${UsersApiPath.DETAILS}`,
      {
        method: HttpMethod.GET,
      },
    );
  }

  public updateUserDetails(
    payload: UserDetailsUpdateInfoRequestDto,
  ): Promise<UserDetailsResponseDto> {
    return this.#http.load(
      `${this.#apiPrefix}${ApiPath.USERS}${UsersApiPath.DETAILS}`,
      {
        method: HttpMethod.PUT,
        contentType: ContentType.JSON,
        payload: JSON.stringify(payload),
      },
    );
  }
}

export { UserDetailsApi };
