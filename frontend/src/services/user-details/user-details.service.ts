import {
  ApiPath,
  ContentType,
  HttpMethod,
  UsersApiPath,
} from 'common/enums/enums';
import {
  UserDetailsResponseDto,
  UserDetailsUpdateImageRequestDto,
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
        hasAuth: true,
      },
    );
  }

  public updateAvatar(
    payload: UserDetailsUpdateImageRequestDto,
  ): Promise<UserDetailsResponseDto> {
    return this.#http.load(
      `${this.#apiPrefix}${ApiPath.USERS}${UsersApiPath.DETAILS_AVATAR}`,
      {
        method: HttpMethod.PUT,
        contentType: ContentType.JSON,
        payload: JSON.stringify(payload),
        hasAuth: true,
      },
    );
  }
}

export { UserDetailsApi };
