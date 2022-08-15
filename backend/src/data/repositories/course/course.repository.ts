import { CourseCreateRequestArgumentsDto } from '~/common/types/types';
import { Course as CourseM } from '~/data/models/models';

type Constructor = {
  CourseModel: typeof CourseM;
};

class Course {
  #CourseModel: typeof CourseM;

  constructor({ CourseModel }: Constructor) {
    this.#CourseModel = CourseModel;
  }

  async create(course: CourseCreateRequestArgumentsDto): Promise<CourseM> {
    const { title, description, url, vendorId, courseCategoryId } = course;

    return this.#CourseModel.query().insert({
      title,
      description,
      url,
      vendorId,
      courseCategoryId,
    });
  }

  async getByCategoryId(courseCategoryId: number): Promise<CourseM[] | null> {
    const courses = await this.#CourseModel
      .query()
      .select()
      .where({ courseCategoryId });

    return courses ?? null;
  }
}

export { Course };
