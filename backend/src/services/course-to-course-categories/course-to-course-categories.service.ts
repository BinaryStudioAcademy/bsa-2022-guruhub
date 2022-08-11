import { CourseToCourseCategoriesResponseDto } from '~/common/types/types';
import { courseToCourseCategories as courseToCourseCategoriesRep } from '~/data/repositories/repositories';

type Constructor = {
  courseToCourseCategoriesRepository: typeof courseToCourseCategoriesRep;
};

class CourseToCourseCategories {
  #courseToCourseCategoriesRepository: typeof courseToCourseCategoriesRep;

  constructor({ courseToCourseCategoriesRepository }: Constructor) {
    this.#courseToCourseCategoriesRepository =
      courseToCourseCategoriesRepository;
  }

  async createCourseToCourseCategories(courseToCourseCategories: {
    courseId: number;
    courseCategoryId: number;
  }): Promise<CourseToCourseCategoriesResponseDto> {
    const { courseId, courseCategoryId } = courseToCourseCategories;

    const result = await this.#courseToCourseCategoriesRepository.create({
      courseId,
      courseCategoryId,
    });

    return {
      id: result.id,
      courseId: result.courseId,
      courseCategoryId: result.courseCategoryId,
    };
  }
}

export { CourseToCourseCategories };
