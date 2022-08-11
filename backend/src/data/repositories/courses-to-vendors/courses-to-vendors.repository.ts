import { CoursesToVendors as CoursesToVendorsM } from '~/data/models/models';

type Constructor = {
  CoursesToVendorsModel: typeof CoursesToVendorsM;
};

class CoursesToVendors {
  #CoursesToVendorsModel: typeof CoursesToVendorsM;

  constructor({ CoursesToVendorsModel }: Constructor) {
    this.#CoursesToVendorsModel = CoursesToVendorsModel;
  }

  async create(coursesToVendors: {
    courseId: number;
    vendorId: number;
  }): Promise<CoursesToVendorsM> {
    const { courseId, vendorId } = coursesToVendors;

    return this.#CoursesToVendorsModel.query().insert({
      courseId,
      vendorId,
    });
  }
}

export { CoursesToVendors };
