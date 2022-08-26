import { CourseHost, ExceptionMessage, VendorKey } from '~/common/enums/enums';
import {
  CourseCreateArgumentsDto,
  CourseFilteringDto,
  CourseGetByIdAndVendorKeyArgumentsDto,
  CourseGetResponseDto,
  UsersGetResponseDto,
} from '~/common/types/types';
import { course as courseRep } from '~/data/repositories/repositories';
import { CoursesError } from '~/exceptions/exceptions';
import { sanitizeHTML } from '~/helpers/helpers';
import {
  courseCategory as courseCategoryServ,
  courseModule as courseModuleServ,
  udemy as udemyServ,
  vendor as vendorServ,
} from '~/services/services';

type Constructor = {
  courseRepository: typeof courseRep;
  courseModuleService: typeof courseModuleServ;
  vendorService: typeof vendorServ;
  udemyService: typeof udemyServ;
  courseCategoryService: typeof courseCategoryServ;
};

class Course {
  #courseRepository: typeof courseRep;

  #courseModuleService: typeof courseModuleServ;

  #vendorService: typeof vendorServ;

  #udemyService: typeof udemyServ;

  #courseCategoryService: typeof courseCategoryServ;

  public constructor({
    courseRepository,
    courseModuleService,
    vendorService,
    udemyService,
    courseCategoryService,
  }: Constructor) {
    this.#courseRepository = courseRepository;
    this.#courseModuleService = courseModuleService;
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
    const { description, title, url, vendorKey, originalId } = courseRequestDto;

    const vendor = await this.#vendorService.getByKey(vendorKey);

    if (!vendor) {
      throw new CoursesError({
        message: ExceptionMessage.INVALID_COURSE_VENDOR,
      });
    }

    const courseByOriginalIdAndVendor = await this.getByOriginalIdAndVendorKey({
      originalId,
      vendorKey,
    });

    if (courseByOriginalIdAndVendor) {
      throw new CoursesError({
        message: ExceptionMessage.COURSE_EXIST,
      });
    }

    const course = await this.#courseRepository.create({
      description: sanitizeHTML(description),
      title,
      url,
      vendorId: vendor.id,
      originalId,
    });

    return {
      ...course,
      category: null,
      vendor,
    };
  }

  public async createByUrl(url: string): Promise<CourseGetResponseDto | null> {
    const urlObject = new URL(url);
    const { host } = urlObject;

    switch (host) {
      case CourseHost.UDEMY:
      case CourseHost.W_UDEMY: {
        const courseData = await this.#udemyService.getCourseByUrl(urlObject);

        const { description, title, url, id } = courseData;

        const course = await this.create({
          description,
          title,
          url,
          vendorKey: VendorKey.UDEMY,
          originalId: id.toString(),
        });

        await this.#courseModuleService.createModulesByCourseId(id, course.id);

        return course;
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

  public async getByOriginalIdAndVendorKey({
    originalId,
    vendorKey,
  }: CourseGetByIdAndVendorKeyArgumentsDto): Promise<CourseGetResponseDto | null> {
    const course = await this.#courseRepository.getByOriginalIdAndVendorKey({
      originalId,
      vendorKey,
    });

    return course ?? null;
  }

  public async getById(courseId: number): Promise<CourseGetResponseDto | null> {
    const course = await this.#courseRepository.getById(courseId);

    return course ?? null;
  }

  public getMentorsByCourseId(
    courseId: number,
  ): Promise<UsersGetResponseDto[]> {
    return this.#courseRepository.getMentorsByCourseId(courseId);
  }

  public updateCategory(
    courseId: number,
    newCategoryId: number,
  ): Promise<CourseGetResponseDto> {
    return this.#courseRepository.updateCategory(courseId, newCategoryId);
  }
}

export { Course };
