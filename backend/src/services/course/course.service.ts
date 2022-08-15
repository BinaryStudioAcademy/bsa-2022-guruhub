import { CourseHost, ExceptionMessage, VendorKey } from '~/common/enums/enums';
import {
  CourseCreateArgumentsDto,
  CourseGetResponseDto,
} from '~/common/types/types';
import { course as courseRep } from '~/data/repositories/repositories';
import { CoursesError } from '~/exceptions/exceptions';
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

  async getAll(): Promise<CourseGetResponseDto[]> {
    const courses = await this.#courseRepository.getAll();

    return Promise.all(
      courses.map(async (course) => {
        const vendor = await this.#vendorService.getById(course.vendorId);

        if (!vendor) {
          throw new CoursesError({
            message: ExceptionMessage.INVALID_COURSE_VENDOR,
          });
        }

        return {
          ...course,
          vendorKey: vendor.key as VendorKey,
        };
      }),
    );
  }

  async create(
    courseRequestDto: CourseCreateArgumentsDto,
  ): Promise<CourseGetResponseDto> {
    const { description, title, url, vendorKey } = courseRequestDto;

    const vendor = await this.#vendorService.getByKey(vendorKey);

    if (!vendor) {
      throw new CoursesError({
        message: ExceptionMessage.INVALID_COURSE_VENDOR,
      });
    }

    const course = await this.#courseRepository.create({
      description,
      title,
      url,
      vendorId: vendor.id,
    });

    return {
      ...course,
      vendorKey,
    };
  }

  async createByUrl(url: string): Promise<CourseGetResponseDto | null> {
    const urlObject = new URL(url);
    const { host } = urlObject;

    switch (host) {
      case CourseHost.UDEMY:
      case CourseHost.W_UDEMY: {
        const courseData = await this.#udemyService.getByUrl(urlObject);
        const { description, title, url } = courseData;

        return this.create({
          description,
          title,
          url,
          vendorKey: VendorKey.UDEMY,
        });
      }
      default: {
        throw new CoursesError({
          message: ExceptionMessage.INVALID_URL_HOST,
        });
      }
    }
  }
}

export { Course };
