import { ApiPath, HttpErrorDto } from 'guruhub-shared';

import { Response } from '~/lib/common/types/types';

import { HttpService } from '../http/http.service';

type Constructor = {
  httpService: HttpService;
};

class UsersService {
  #httpService: HttpService;

  public constructor({ httpService }: Constructor) {
    this.#httpService = httpService;
  }

  public delete(userId: number): Promise<Response<boolean | HttpErrorDto>> {
    return this.#httpService
      .request()
      .delete()
      .path(`${ApiPath.USERS}/${userId}`)
      .send();
  }
}

export { UsersService };
