import {
  ApiPath,
  CategoriesApiPath,
  CategoryGetAllResponseDto,
} from 'guruhub-shared';

import { Response } from '~/lib/common/types/types';

import { HttpService } from '../http/http.service';

type Constructor = {
  httpService: HttpService;
};

class CategoriesService {
  #httpService: HttpService;

  public constructor({ httpService }: Constructor) {
    this.#httpService = httpService;
  }

  public getAll(): Promise<Response<CategoryGetAllResponseDto>> {
    return this.#httpService
      .request()
      .get()
      .path(`${ApiPath.CATEGORIES}${CategoriesApiPath.ROOT}`)
      .send();
  }
}

export { CategoriesService };
