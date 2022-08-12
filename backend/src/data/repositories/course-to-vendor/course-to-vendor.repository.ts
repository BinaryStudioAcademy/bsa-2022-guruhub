import { CourseToVendor as CourseToVendorM } from '~/data/models/models';

type Constructor = {
  CourseToVendorModel: typeof CourseToVendorM;
};

class CourseToVendor {
  #CourseToVendorModel: typeof CourseToVendorM;

  constructor({ CourseToVendorModel }: Constructor) {
    this.#CourseToVendorModel = CourseToVendorModel;
  }

  async create(courseToVendor: {
    courseId: number;
    vendorId: number;
  }): Promise<CourseToVendorM> {
    const { courseId, vendorId } = courseToVendor;

    return this.#CourseToVendorModel.query().insert({
      courseId,
      vendorId,
    });
  }
}

export { CourseToVendor };
