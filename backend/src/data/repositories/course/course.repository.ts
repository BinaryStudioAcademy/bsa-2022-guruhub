import {
  CourseCreateRequestArgumentsDto,
  CourseGetResponseDto,
} from '~/common/types/types';
import { Course as CourseM } from '~/data/models/models';

type Constructor = {
  CourseModel: typeof CourseM;
};

class Course {
  #CourseModel: typeof CourseM;

  constructor({ CourseModel }: Constructor) {
    this.#CourseModel = CourseModel;
  }

  getAll(): Promise<CourseGetResponseDto[]> {
    return this.#CourseModel
      .query()
      .withGraphJoined('vendor')
      .castTo<CourseGetResponseDto[]>()
      .execute();
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
}

export { Course };
