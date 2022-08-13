import { CourseHost, ExceptionMessage, VendorKey } from '~/common/enums/enums';
import {
  CourseCreateRequestDto,
  CourseGetResponseDto,
} from '~/common/types/types';
import { course as courseRep } from '~/data/repositories/repositories';
import { CourseError } from '~/exceptions/exceptions';
import { udemy as udemyServ, vendor as vendorServ } from '~/services/services';

type Constructor = {
  courseRepository: typeof courseRep;
  vendorService: typeof vendorServ;
  udemyService: typeof udemyServ;
};

class Course {
  #courseRepository: typeof courseRep;
  #vendorService: typeof vendorServ;
  #udemyService: typeof udemyServ;

  constructor({ courseRepository, vendorService, udemyService }: Constructor) {
    this.#courseRepository = courseRepository;
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

    return course;
  }

  async createByUrl(url: string): Promise<CourseGetResponseDto | null> {
    const urlObject = new URL(url);
    const host = urlObject.host;

    switch (host) {
      case CourseHost.UDEMY:
      case CourseHost.W_UDEMY: {
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
