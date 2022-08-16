import { CourseCreateRequestArgumentsDto } from '~/common/types/types';
import { Course as CourseM } from '~/data/models/models';

type Constructor = {
  CourseModel: typeof CourseM;
};

class Course {
  #CourseModel: typeof CourseM;

  public constructor({ CourseModel }: Constructor) {
    this.#CourseModel = CourseModel;
  }

  public async create(
    course: CourseCreateRequestArgumentsDto,
  ): Promise<CourseM> {
    const { title, description, url, vendorId, courseCategoryId } = course;

    return this.#CourseModel.query().insert({
      title,
      description,
      url,
      vendorId,
      courseCategoryId,
    });
  }
}

export { Course };
