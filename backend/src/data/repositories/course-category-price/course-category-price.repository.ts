import { CourseCategoryPriceGetAllItemResponseDto } from '~/common/types/types';
import { CourseCategoryPrice as CourseCategoryPriceM } from '~/data/models/models';

type Constructor = {
  CourseCategoryPriceModel: typeof CourseCategoryPriceM;
};

class CourseCategoryPrice {
  #CourseCategoryModel: typeof CourseCategoryPriceM;

  public constructor({
    CourseCategoryPriceModel: CourseCategoryModel,
  }: Constructor) {
    this.#CourseCategoryModel = CourseCategoryModel;
  }

  public getAll(): Promise<CourseCategoryPriceGetAllItemResponseDto[]> {
    return this.#CourseCategoryModel
      .query()
      .withGraphJoined('category')
      .castTo<CourseCategoryPriceGetAllItemResponseDto[]>()
      .execute();
  }

  public getById(
    id: number,
  ): Promise<CourseCategoryPriceGetAllItemResponseDto | null> {
    const courseCategoryPrice = this.#CourseCategoryModel
      .query()
      .select()
      .findById(id)
      .castTo<CourseCategoryPriceGetAllItemResponseDto>()
      .execute();

    return courseCategoryPrice ?? null;
  }
}

export { CourseCategoryPrice };