import {
  ApiPath,
  AuthApiPath,
  HttpErrorDto,
  UsersGetResponseDto,
  UserSignInRequestDto,
  UserSignInResponseDto,
  UserSignUpRequestDto,
  UserSignUpResponseDto,
} from 'guruhub-shared';

import { Response } from '~/lib/common/types/types';

import { HttpService } from '../http/http.service';

type Constructor = {
  httpService: HttpService;
};

class AuthService {
  #httpService: HttpService;

  public constructor({ httpService }: Constructor) {
    this.#httpService = httpService;
  }

  public signIn(
    data: UserSignInRequestDto,
  ): Promise<Response<UserSignInResponseDto | HttpErrorDto>> {
    return this.#httpService
      .request()
      .post()
      .path(`${ApiPath.AUTH}${AuthApiPath.SIGN_IN}`)
      .noAutoAuth()
      .data(data)
      .send();
  }

  public signUp(
    data: UserSignUpRequestDto,
  ): Promise<Response<UserSignUpResponseDto>> {
    return this.#httpService
      .request()
      .post()
      .path(`${ApiPath.AUTH}${AuthApiPath.SIGN_UP}`)
      .noAutoAuth()
      .data(data)
      .send();
  }

  public getCurrentUser(): Promise<Response<UsersGetResponseDto>> {
    return this.#httpService
      .request()
      .get()
      .path(`${ApiPath.AUTH}${AuthApiPath.CURRENT_USER}`)
      .send();
  }
}

export { AuthService };
