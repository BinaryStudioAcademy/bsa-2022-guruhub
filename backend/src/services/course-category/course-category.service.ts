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

  async getByName(name: string): Promise<CourseCategoryGetResponseDto | null> {
    return this.#courseCategoryRepository.getByName(name);
  }
}

export { CourseCategory };
