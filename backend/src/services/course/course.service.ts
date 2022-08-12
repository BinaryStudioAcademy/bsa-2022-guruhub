import { ExceptionMessage } from '~/common/enums/enums';
import { CourseGetResponseDto, CourseRequestDto } from '~/common/types/types';
import { course as courseRep } from '~/data/repositories/repositories';
import { CourseError } from '~/exceptions/exceptions';
import {
  courseCategory as courseCategoryServ,
  courseToCourseCategories as courseToCourseCategoriesServ,
  courseToVendors as courseToVendorsServ,
  vendor as vendorServ,
} from '~/services/services';

type Constructor = {
  courseRepository: typeof courseRep;
  courseCategoryService: typeof courseCategoryServ;
  courseToCourseCategoriesService: typeof courseToCourseCategoriesServ;
  courseToVendorsService: typeof courseToVendorsServ;
  vendorService: typeof vendorServ;
};

class Course {
  #courseRepository: typeof courseRep;
  #courseCategoryService: typeof courseCategoryServ;
  #courseToCourseCategoriesService: typeof courseToCourseCategoriesServ;
  #courseToVendorsService: typeof courseToVendorsServ;
  #vendorService: typeof vendorServ;

  constructor({
    courseRepository,
    courseCategoryService,
    courseToCourseCategoriesService,
    courseToVendorsService,
    vendorService,
  }: Constructor) {
    this.#courseRepository = courseRepository;
    this.#courseCategoryService = courseCategoryService;
    this.#courseToCourseCategoriesService = courseToCourseCategoriesService;
    this.#courseToVendorsService = courseToVendorsService;
    this.#vendorService = vendorService;
  }

  async create(
    courseRequestDto: CourseRequestDto,
  ): Promise<CourseGetResponseDto> {
    const { courseCategoryId, description, title, url, vendorId } =
      courseRequestDto;

    const courseCategory = await this.#courseCategoryService.getById(
      courseCategoryId,
    );

    if (!courseCategory) {
      throw new CourseError();
    }

    const vendor = await this.#vendorService.getById(vendorId);

    if (!vendor) {
      throw new CourseError({
        message: ExceptionMessage.INVALID_COURSE_VENDOR,
      });
    }

    const course = await this.#courseRepository.create({
      description,
      title,
      url,
    });

    await this.#courseToCourseCategoriesService.createCourseToCourseCategories({
      courseCategoryId,
      courseId: course.id,
    });

    await this.#courseToVendorsService.createCourseToVendors({
      courseId: course.id,
      vendorId,
    });

    return course;
  }

  // async createByUrl(
  //   url: string,
  // ): Promise<CourseGetResponseDto> {
  //   const course = await this.#courseRepository.createByUrl(url);

  //   return course;
  // }
}

export { Course };
