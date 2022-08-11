import { CourseCategory as CourseCategoryM } from '~/data/models/models';

type Constructor = {
  CourseCategoryModel: typeof CourseCategoryM;
};

class CourseCategory {
  #CourseCategoryModel: typeof CourseCategoryM;

  constructor({ CourseCategoryModel }: Constructor) {
    this.#CourseCategoryModel = CourseCategoryModel;
  }

  async getById(id: number): Promise<CourseCategoryM | null> {
    const courseCategory = await this.#CourseCategoryModel
      .query()
      .select()
      .where({ id })
      .first();

    return courseCategory ?? null;
  }
}

export { CourseCategory };
