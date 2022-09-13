import {
  CourseCategoryPriceGetAllItemResponseDto,
  CourseCategoryPriceGetAllResponseDto,
} from '~/common/types/types';
import { courseCategoryPrice as courseCategoryPriceRep } from '~/data/repositories/repositories';

type Constructor = {
  courseCategoryPriceRepository: typeof courseCategoryPriceRep;
};

class CourseCategoryPrice {
  #courseCategoryPriceRepository: typeof courseCategoryPriceRep;

  public constructor({ courseCategoryPriceRepository }: Constructor) {
    this.#courseCategoryPriceRepository = courseCategoryPriceRepository;
  }

  public async getAll(): Promise<CourseCategoryPriceGetAllResponseDto> {
    const categoryPriceDtos =
      await this.#courseCategoryPriceRepository.getAll();

    return { items: categoryPriceDtos };
  }

  public getById(
    id: number,
  ): Promise<CourseCategoryPriceGetAllItemResponseDto | null> {
    return this.#courseCategoryPriceRepository.getById(id);
  }

  public getByCategoryId(
    categoryId: number,
  ): Promise<CourseCategoryPriceGetAllItemResponseDto | null> {
    return this.#courseCategoryPriceRepository.getByCategoryId(categoryId);
  }
}

export { CourseCategoryPrice };
