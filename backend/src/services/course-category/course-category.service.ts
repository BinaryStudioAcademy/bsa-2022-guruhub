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

  getByKey(key: string): Promise<CourseCategoryGetResponseDto | null> {
    return this.#courseCategoryRepository.getByKey(key);
  }
}

export { CourseCategory };
