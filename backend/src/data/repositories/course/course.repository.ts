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

  public constructor({ CourseModel }: Constructor) {
    this.#CourseModel = CourseModel;
  }

  public getAll(filteringOpts: {
    categoryId: number | null;
    title: string;
  }): Promise<CourseGetResponseDto[]> {
    const { categoryId, title } = filteringOpts ?? {};

    return this.#CourseModel
      .query()
      .where((builder) => {
        if (categoryId) {
          builder.where({ courseCategoryId: categoryId });
        }

        if (title) {
          builder.where('title', 'ilike', `%${title}%`);
        }
      })
      .withGraphJoined('vendor')
      .castTo<CourseGetResponseDto[]>()
      .execute();
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

  public async getByCategoryId(
    courseCategoryId: number,
  ): Promise<CourseGetResponseDto[]> {
    return this.#CourseModel
      .query()
      .where({ courseCategoryId })
      .withGraphJoined('vendor')
      .castTo<CourseGetResponseDto[]>()
      .execute();
  }
}

export { Course };
