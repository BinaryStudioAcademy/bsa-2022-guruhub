import { CourseCategoryPriceGetAllItemResponseDto } from '~/common/types/types';
import { CourseCategoryPrice as CourseCategoryPriceM } from '~/data/models/models';

type Constructor = {
  CourseCategoryPriceModel: typeof CourseCategoryPriceM;
};

class CourseCategoryPrice {
  #CourseCategoryPriceModel: typeof CourseCategoryPriceM;

  public constructor({
    CourseCategoryPriceModel: CourseCategoryModel,
  }: Constructor) {
    this.#CourseCategoryPriceModel = CourseCategoryModel;
  }

  public getAll(): Promise<CourseCategoryPriceGetAllItemResponseDto[]> {
    return this.#CourseCategoryPriceModel
      .query()
      .withGraphJoined('category')
      .castTo<CourseCategoryPriceGetAllItemResponseDto[]>()
      .execute();
  }

  public async getById(
    id: number,
  ): Promise<CourseCategoryPriceGetAllItemResponseDto | null> {
    const courseCategoryPrice = await this.#CourseCategoryPriceModel
      .query()
      .findById(id)
      .castTo<CourseCategoryPriceGetAllItemResponseDto>()
      .execute();

    return courseCategoryPrice ?? null;
  }
}

export { CourseCategoryPrice };
