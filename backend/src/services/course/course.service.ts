import { CourseHost, ExceptionMessage, VendorKey } from '~/common/enums/enums';
import {
  CourseCreateArgumentsDto,
  CourseFilteringDto,
  CourseGetResponseDto,
} from '~/common/types/types';
import { course as courseRep } from '~/data/repositories/repositories';
import { CoursesError } from '~/exceptions/exceptions';
import {
  courseCategory as courseCategoryServ,
  udemy as udemyServ,
  vendor as vendorServ,
} from '~/services/services';

type Constructor = {
  courseRepository: typeof courseRep;
  vendorService: typeof vendorServ;
  udemyService: typeof udemyServ;
  courseCategoryService: typeof courseCategoryServ;
};

class Course {
  #courseRepository: typeof courseRep;

  #vendorService: typeof vendorServ;

  #udemyService: typeof udemyServ;

  #courseCategoryService: typeof courseCategoryServ;

  public constructor({
    courseRepository,
    vendorService,
    udemyService,
    courseCategoryService,
  }: Constructor) {
    this.#courseRepository = courseRepository;
    this.#vendorService = vendorService;
    this.#udemyService = udemyService;
    this.#courseCategoryService = courseCategoryService;
  }

  public async getAll(
    filteringOpts: CourseFilteringDto,
  ): Promise<CourseGetResponseDto[]> {
    const { categoryKey, title } = filteringOpts;
    const categoryId = await this.getCategoryIdByKey(categoryKey);

    return this.#courseRepository.getAll({
      categoryId,
      title,
    });
  }

  public async create(
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
      vendor,
    };
  }

  public async createByUrl(url: string): Promise<CourseGetResponseDto | null> {
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

  public async getCategoryIdByKey(categoryKey: string): Promise<number | null> {
    if (!categoryKey) {
      return null;
    }

    const category = await this.#courseCategoryService.getByKey(categoryKey);

    if (!category) {
      throw new CoursesError({
        message: ExceptionMessage.INVALID_COURSE_CATEGORY,
      });
    }

    return category.id;
  }
}

export { Course };
