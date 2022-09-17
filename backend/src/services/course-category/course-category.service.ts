import {
  CategoryGetAllResponseDto,
  CourseCategoryGetResponseDto,
  CourseCategoryPriceGetAllItemResponseDto,
  CourseCategoryPriceGetAllResponseDto,
} from '~/common/types/types';
import {
  courseCategory as courseCategoryRep,
  courseCategoryPrice as courseCategoryPriceRep,
} from '~/data/repositories/repositories';

type Constructor = {
  courseCategoryRepository: typeof courseCategoryRep;
  courseCategoryPriceRepository: typeof courseCategoryPriceRep;
};

class CourseCategory {
  #courseCategoryRepository: typeof courseCategoryRep;

  #courseCategoryPriceRepository: typeof courseCategoryPriceRep;

  public constructor({
    courseCategoryRepository,
    courseCategoryPriceRepository,
  }: Constructor) {
    this.#courseCategoryRepository = courseCategoryRepository;
    this.#courseCategoryPriceRepository = courseCategoryPriceRepository;
  }

  public async getAll(): Promise<CategoryGetAllResponseDto> {
    const categories = await this.#courseCategoryRepository.getAll();

    return {
      items: categories.map((category) => ({
        id: category.id,
        key: category.key,
        name: category.name,
      })),
    };
  }

  public async getAllWithCourses(): Promise<CategoryGetAllResponseDto> {
    const categories = await this.#courseCategoryRepository.getAllWithCourses();

    return {
      items: categories,
    };
  }

  public getByKey(key: string): Promise<CourseCategoryGetResponseDto | null> {
    return this.#courseCategoryRepository.getByKey(key);
  }

  public getById(id: number): Promise<CourseCategoryGetResponseDto | null> {
    return this.#courseCategoryRepository.getById(id);
  }

  public async getAllPriceDtos(): Promise<CourseCategoryPriceGetAllResponseDto> {
    const categoryPriceDtos =
      await this.#courseCategoryPriceRepository.getAll();

    return { items: categoryPriceDtos };
  }

  public getPriceDtoById(
    id: number,
  ): Promise<CourseCategoryPriceGetAllItemResponseDto | null> {
    return this.#courseCategoryPriceRepository.getById(id);
  }

  public getPriceDtoByCategoryId(
    categoryId: number,
  ): Promise<CourseCategoryPriceGetAllItemResponseDto | null> {
    return this.#courseCategoryPriceRepository.getByCategoryId(categoryId);
  }
}

export { CourseCategory };
