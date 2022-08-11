import { CoursesToCourseCategories as CoursesToCourseCategoriesM } from '~/data/models/courses-to-course-categories/courses-to-course-categories.model';

type Constructor = {
  CoursesToCourseCategoriesModel: typeof CoursesToCourseCategoriesM;
};

class CoursesToCourseCategories {
  #CoursesToCourseCategoriesModel: typeof CoursesToCourseCategoriesM;

  constructor({ CoursesToCourseCategoriesModel }: Constructor) {
    this.#CoursesToCourseCategoriesModel = CoursesToCourseCategoriesModel;
  }

  async create(coursesToCourseCategories: {
    courseId: number;
    courseCategoryId: number;
  }): Promise<CoursesToCourseCategoriesM> {
    const { courseId, courseCategoryId } = coursesToCourseCategories;

    return this.#CoursesToCourseCategoriesModel.query().insert({
      courseId,
      courseCategoryId,
    });
  }
}

export { CoursesToCourseCategories };
