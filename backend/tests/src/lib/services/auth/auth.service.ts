import {
  ApiPath,
  AuthApiPath,
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

  constructor({ httpService }: Constructor) {
    this.#httpService = httpService;
  }

  signUp(data: UserSignUpRequestDto): Promise<Response<UserSignUpResponseDto>> {
    return this.#httpService
      .request()
      .post()
      .path(`${ApiPath.AUTH}${AuthApiPath.SIGN_UP}`)
      .noAutoAuth()
      .data(data)
      .send();
  }
}

export { AuthService };
