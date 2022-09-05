import { CourseCategory as CourseCategoryM } from '~/data/models/models';

type Constructor = {
  CourseCategoryModel: typeof CourseCategoryM;
};

class CourseCategory {
  #CourseCategoryModel: typeof CourseCategoryM;

  public constructor({ CourseCategoryModel }: Constructor) {
    this.#CourseCategoryModel = CourseCategoryModel;
  }

  public getAll(): Promise<CourseCategoryM[]> {
    return this.#CourseCategoryModel.query().execute();
  }

  public getWithCourses(): Promise<CourseCategoryM[]> {
    return this.#CourseCategoryModel
      .query()
      .select('courseCategories.id', 'key', 'name')
      .distinct('courseCategories.id')
      .innerJoin('courses', 'courseCategories.id', 'courses.courseCategoryId')
      .execute();
  }

  public async getByKey(key: string): Promise<CourseCategoryM | null> {
    const courseCategory = await this.#CourseCategoryModel
      .query()
      .select()
      .where({ key })
      .first();

    return courseCategory ?? null;
  }

  public async getById(id: number): Promise<CourseCategoryM | null> {
    const courseCategory = await this.#CourseCategoryModel
      .query()
      .select()
      .findById(id);

    return courseCategory ?? null;
  }
}

export { CourseCategory };
