import { CourseToCourseCategories as CourseToCourseCategoriesM } from '~/data/models/models';

type Constructor = {
  CourseToCourseCategoriesModel: typeof CourseToCourseCategoriesM;
};

class CourseToCourseCategories {
  #CourseToCourseCategoriesModel: typeof CourseToCourseCategoriesM;

  constructor({ CourseToCourseCategoriesModel }: Constructor) {
    this.#CourseToCourseCategoriesModel = CourseToCourseCategoriesModel;
  }

  async create(courseToCourseCategories: {
    courseId: number;
    courseCategoryId: number;
  }): Promise<CourseToCourseCategoriesM> {
    const { courseId, courseCategoryId } = courseToCourseCategories;

    return this.#CourseToCourseCategoriesModel.query().insert({
      courseId,
      courseCategoryId,
    });
  }
}

export { CourseToCourseCategories };
