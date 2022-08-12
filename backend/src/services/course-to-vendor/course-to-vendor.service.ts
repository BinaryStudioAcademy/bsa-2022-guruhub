import { CourseToVendorResponseDto } from '~/common/types/types';
import { courseToVendor as courseToVendorRep } from '~/data/repositories/repositories';

type Constructor = {
  courseToVendorRepository: typeof courseToVendorRep;
};

class CourseToVendor {
  #courseToVendorRepository: typeof courseToVendorRep;

  constructor({ courseToVendorRepository }: Constructor) {
    this.#courseToVendorRepository = courseToVendorRepository;
  }

  async createCourseToVendor(courseToVendor: {
    courseId: number;
    vendorId: number;
  }): Promise<CourseToVendorResponseDto> {
    const { courseId, vendorId } = courseToVendor;

    const result = await this.#courseToVendorRepository.create({
      courseId,
      vendorId,
    });

    return {
      id: result.id,
      courseId: result.courseId,
      vendorId: result.vendorId,
    };
  }
}

export { CourseToVendor };
