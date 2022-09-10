import {
  ApiPath,
  EntityPagination,
  HttpErrorDto,
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

  public getAll(): Promise<
    Response<EntityPagination<PermissionsGetAllItemResponseDto> | HttpErrorDto>
  > {
    return this.#httpService.request().get().path(ApiPath.PERMISSIONS).send();
  }
}

export { PermissionsService };
