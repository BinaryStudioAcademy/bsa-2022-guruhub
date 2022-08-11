import { CourseToVendors as CourseToVendorsM } from '~/data/models/models';

type Constructor = {
  CourseToVendorsModel: typeof CourseToVendorsM;
};

class CourseToVendors {
  #CourseToVendorsModel: typeof CourseToVendorsM;

  constructor({ CourseToVendorsModel }: Constructor) {
    this.#CourseToVendorsModel = CourseToVendorsModel;
  }

  async create(courseToVendors: {
    courseId: number;
    vendorId: number;
  }): Promise<CourseToVendorsM> {
    const { courseId, vendorId } = courseToVendors;

    return this.#CourseToVendorsModel.query().insert({
      courseId,
      vendorId,
    });
  }
}

export { CourseToVendors };
