import { CourseToVendorsResponseDto } from '~/common/types/types';
import { courseToVendors as courseToVendorsRep } from '~/data/repositories/repositories';

type Constructor = {
  courseToVendorsRepository: typeof courseToVendorsRep;
};

class CourseToVendors {
  #courseToVendorsRepository: typeof courseToVendorsRep;

  constructor({ courseToVendorsRepository }: Constructor) {
    this.#courseToVendorsRepository = courseToVendorsRepository;
  }

  async createCourseToVendors(courseToVendors: {
    courseId: number;
    vendorId: number;
  }): Promise<CourseToVendorsResponseDto> {
    const { courseId, vendorId } = courseToVendors;

    const result = await this.#courseToVendorsRepository.create({
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

export { CourseToVendors };
