import { QueryBuilder } from 'objection';

import { VendorKey } from '~/common/enums/enums';
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

  async getAll(): Promise<(CourseM & { vendorKey: VendorKey })[]> {
    return this.#CourseModel
      .query()
      .joinRelated('vendor')
      .select('courses.*', 'vendor.key as vendorKey') as QueryBuilder<
      CourseM & { vendorKey: VendorKey }
    >;
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
