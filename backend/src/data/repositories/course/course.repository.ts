import { QueryBuilder } from 'objection';

import { VendorKey } from '~/common/enums/enums';
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

  public async getAll(filteringOpts: {
    categoryId: number | null;
  }): Promise<(CourseM & { vendorKey: VendorKey })[]> {
    const { categoryId } = filteringOpts ?? {};

    return this.#CourseModel
      .query()
      .where((builder) => {
        if (categoryId) {
          builder.where({ courseCategoryId: categoryId });
        }
      })
      .joinRelated('vendor')
      .select('courses.*', 'vendor.key as vendorKey') as QueryBuilder<
      CourseM & { vendorKey: VendorKey }
    >;
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
  ): Promise<(CourseM & { vendorKey: VendorKey })[]> {
    return this.#CourseModel
      .query()
      .where({ courseCategoryId })
      .joinRelated('vendor')
      .select('courses.*', 'vendor.key as vendorKey') as QueryBuilder<
      CourseM & { vendorKey: VendorKey }
    >;
  }
}

export { Course };
