import { CourseHost, ExceptionMessage, VendorKey } from '~/common/enums/enums';
import {
  CourseCreateRequestDto,
  CourseGetResponseDto,
} from '~/common/types/types';
import { course as courseRep } from '~/data/repositories/repositories';
import { CourseError } from '~/exceptions/exceptions';
import {
  courseToVendor as courseToVendorServ,
  udemy as udemyServ,
  vendor as vendorServ,
} from '~/services/services';

type Constructor = {
  courseRepository: typeof courseRep;
  courseToVendorService: typeof courseToVendorServ;
  vendorService: typeof vendorServ;
  udemyService: typeof udemyServ;
};

class Course {
  #courseRepository: typeof courseRep;
  #courseToVendorService: typeof courseToVendorServ;
  #vendorService: typeof vendorServ;
  #udemyService: typeof udemyServ;

  constructor({
    courseRepository,
    courseToVendorService,
    vendorService,
    udemyService,
  }: Constructor) {
    this.#courseRepository = courseRepository;
    this.#courseToVendorService = courseToVendorService;
    this.#vendorService = vendorService;
    this.#udemyService = udemyService;
  }

  async create(
    courseRequestDto: CourseCreateRequestDto,
  ): Promise<CourseGetResponseDto> {
    const { description, title, url, vendorKey } = courseRequestDto;

    const vendor = await this.#vendorService.getByKey(vendorKey);

    if (!vendor) {
      throw new CourseError({
        message: ExceptionMessage.INVALID_COURSE_VENDOR,
      });
    }

    const course = await this.#courseRepository.create({
      description,
      title,
      url,
      vendorId: vendor.id,
    });

    await this.#courseToVendorService.createCourseToVendor({
      courseId: course.id,
      vendorId: vendor.id,
    });

    return course;
  }

  async createByUrl(url: string): Promise<CourseGetResponseDto | null> {
    const urlObject = new URL(url);
    const host = urlObject.host;

    switch (host) {
      case CourseHost.UDEMY: {
        const courseData = await this.#udemyService.getByUrl(urlObject);
        const { description, title, url } = courseData;

        return await this.create({
          description,
          title,
          url,
          vendorKey: VendorKey.UDEMY,
        });
      }
      default: {
        throw new CourseError({
          message: ExceptionMessage.INVALID_URL_HOST,
        });
      }
    }
  }
}

export { Course };
