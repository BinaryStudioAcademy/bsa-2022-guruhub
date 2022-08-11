import { CourseCategoryGetResponseDto } from '~/common/types/types';
import { courseCategory as courseCategoryRep } from '~/data/repositories/repositories';

type Constructor = {
  courseCategoryRepository: typeof courseCategoryRep;
};

class CourseCategory {
  #courseCategoryRepository: typeof courseCategoryRep;
  constructor({ courseCategoryRepository }: Constructor) {
    this.#courseCategoryRepository = courseCategoryRepository;
  }

  async getById(id: number): Promise<CourseCategoryGetResponseDto | null> {
    const courseCategory = await this.#courseCategoryRepository.getById(id);

    return courseCategory ?? null;
  }
}

export { CourseCategory };
