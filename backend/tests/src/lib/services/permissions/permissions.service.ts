import {
  ApiPath,
  PermissionApiPath,
  PermissionsGetAllItemResponseDto,
} from 'guruhub-shared';

import { Response } from '~/lib/common/types/types';

import { HttpService } from '../http/http.service';

type Constructor = {
  httpService: HttpService;
};

class PermissionsService {
  #httpService: HttpService;

  public constructor({ httpService }: Constructor) {
    this.#httpService = httpService;
  }

  public getAll(): Promise<Response<PermissionsGetAllItemResponseDto[]>> {
    return this.#httpService
      .request()
      .get()
      .path(`${ApiPath.PERMISSIONS}${PermissionApiPath.ROOT}`)
      .send();
  }
}

export { PermissionsService };
