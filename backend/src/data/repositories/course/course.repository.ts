import { raw } from 'objection';

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

  async findByName(name: string): Promise<CourseM[]> {
    return this.#CourseModel
      .query()
      .where(raw('LOWER(??)', 'title'), 'like', `%${name.toLowerCase()}%`)
      .execute();
  }
}

export { Course };
