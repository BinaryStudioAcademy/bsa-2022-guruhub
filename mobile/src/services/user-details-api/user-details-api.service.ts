import {
  ApiPath,
  ContentType,
  HttpMethod,
  UserDetailsApiPath,
} from '~/common/enums/enums';
import {
  UserDetailsResponseDto,
  UserDetailsUpdateAvatarRequestDto,
  UserDetailsUpdateInfoRequestDto,
} from '~/common/types/types';
import { Http } from '~/services/http/http.service';

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
      `${this.#apiPrefix}${ApiPath.USER_DETAILS}${UserDetailsApiPath.ROOT}`,
    );
  }

  public updateUserDetails(
    payload: UserDetailsUpdateInfoRequestDto,
  ): Promise<UserDetailsResponseDto> {
    return this.#http.load(
      `${this.#apiPrefix}${ApiPath.USER_DETAILS}${UserDetailsApiPath.ROOT}`,
      {
        method: HttpMethod.PUT,
        contentType: ContentType.JSON,
        payload: JSON.stringify(payload),
      },
    );
  }

  public updateUserAvatar({
    file,
    userId,
  }: UserDetailsUpdateAvatarRequestDto): Promise<UserDetailsResponseDto> {
    const { uri, type, fileName: name } = file;
    const formData = new FormData();
    formData.append('file', { uri, type, name } as any);

    return this.#http.load<UserDetailsResponseDto>(
      `${this.#apiPrefix}${ApiPath.USER_DETAILS}${
        UserDetailsApiPath.ROOT
      }${userId}${UserDetailsApiPath.AVATAR}`,
      {
        method: HttpMethod.PUT,
        contentType: ContentType.FORM_DATA,
        payload: formData,
      },
    );
  }
}

export { UserDetailsApi };
