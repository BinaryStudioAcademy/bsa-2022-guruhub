import { ApiPath, CategoriesApiPath } from '~/common/enums/enums';
import {
  CategoryGetAllResponseDto,
  CourseCategoryGetByIdRequestParamsDto,
  CourseCategoryGetResponseDto,
} from '~/common/types/types';
import { Http } from '~/services/http/http.service';

type Constructor = {
  http: Http;
  apiPrefix: string;
};

class CategoriesApi {
  #http: Http;

  #apiPrefix: string;

  public constructor({ http, apiPrefix }: Constructor) {
    this.#http = http;
    this.#apiPrefix = apiPrefix;
  }

  public getAllWithCourses(): Promise<CategoryGetAllResponseDto> {
    return this.#http.load(
      `${this.#apiPrefix}${ApiPath.CATEGORIES}${CategoriesApiPath.DASHBOARD}`,
    );
  }

  public getAll(): Promise<CategoryGetAllResponseDto> {
    return this.#http.load(`${this.#apiPrefix}${ApiPath.CATEGORIES}`);
  }

  public getById({
    id,
  }: CourseCategoryGetByIdRequestParamsDto): Promise<CourseCategoryGetResponseDto> {
    return this.#http.load(
      `${this.#apiPrefix}${ApiPath.CATEGORIES}${CategoriesApiPath.ROOT}${id}`,
    );
  }
}

export { CategoriesApi };
