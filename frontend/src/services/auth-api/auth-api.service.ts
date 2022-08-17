import {
  ApiPath,
  AuthApiPath,
  ContentType,
  HttpMethod,
} from 'common/enums/enums';
import {
  UserSignInRequestDto,
  UserSignInResponseDto,
  UserSignUpRequestDto,
  UserSignUpResponseDto,
  UserWithPermissions,
} from 'common/types/types';
import { Http } from 'services/http/http.service';

type Constructor = {
  http: Http;
  apiPrefix: string;
};

class AuthApi {
  #http: Http;

  #apiPrefix: string;

  public constructor({ http, apiPrefix }: Constructor) {
    this.#http = http;

    this.#apiPrefix = apiPrefix;
  }

  public signUp(payload: UserSignUpRequestDto): Promise<UserSignUpResponseDto> {
    return this.#http.load(
      `${this.#apiPrefix}${ApiPath.AUTH}${AuthApiPath.SIGN_UP}`,
      {
        method: HttpMethod.POST,
        contentType: ContentType.JSON,
        payload: JSON.stringify(payload),
        hasAuth: false,
      },
    );
  }

  public signIn(payload: UserSignInRequestDto): Promise<UserSignInResponseDto> {
    return this.#http.load(
      `${this.#apiPrefix}${ApiPath.AUTH}${AuthApiPath.SIGN_IN}`,
      {
        method: HttpMethod.POST,
        contentType: ContentType.JSON,
        payload: JSON.stringify(payload),
        hasAuth: false,
      },
    );
  }

  public getCurrentUser(): Promise<UserWithPermissions> {
    return this.#http.load(
      `${this.#apiPrefix}${ApiPath.AUTH}${AuthApiPath.CURRENT_USER}`,
      {
        method: HttpMethod.GET,
        contentType: ContentType.JSON,
      },
    );
  }
}

export { AuthApi };
