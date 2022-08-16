import {
  ApiPath,
  AuthApiPath,
  HttpErrorDto,
  UsersGetResponseDto,
  UserSignInRequestDto,
  UserSignInResponseDto,
} from 'guruhub-shared';

import { Response } from '~/lib/common/types/types';

import { HttpService } from '../http/http.service';

type Constructor = {
  httpService: HttpService;
};

class AuthService {
  #httpService: HttpService;

  constructor({ httpService }: Constructor) {
    this.#httpService = httpService;
  }

  signIn(
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

  getCurrentUser(): Promise<Response<UsersGetResponseDto>> {
    return this.#httpService
      .request()
      .get()
      .authorize()
      .path(`${ApiPath.AUTH}${AuthApiPath.CURRENT_USER}`)
      .send();
  }
}

export { AuthService };
