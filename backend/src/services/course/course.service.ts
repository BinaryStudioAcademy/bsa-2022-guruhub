import { CourseHost, ExceptionMessage, VendorKey } from '~/common/enums/enums';
import {
  CourseCreateRequestDto,
  CourseGetResponseDto,
} from '~/common/types/types';
import { course as courseRep } from '~/data/repositories/repositories';
import { CourseError } from '~/exceptions/exceptions';
import {
  courseCategory as courseCategoryServ,
  courseToCourseCategories as courseToCourseCategoriesServ,
  courseToVendors as courseToVendorsServ,
  udemy as udemyServ,
  vendor as vendorServ,
} from '~/services/services';

type Constructor = {
  courseRepository: typeof courseRep;
  courseCategoryService: typeof courseCategoryServ;
  courseToCourseCategoriesService: typeof courseToCourseCategoriesServ;
  courseToVendorsService: typeof courseToVendorsServ;
  vendorService: typeof vendorServ;
  udemyService: typeof udemyServ;
};

class Course {
  #courseRepository: typeof courseRep;
  #courseCategoryService: typeof courseCategoryServ;
  #courseToCourseCategoriesService: typeof courseToCourseCategoriesServ;
  #courseToVendorsService: typeof courseToVendorsServ;
  #vendorService: typeof vendorServ;
  #udemyService: typeof udemyServ;

  constructor({
    courseRepository,
    courseCategoryService,
    courseToCourseCategoriesService,
    courseToVendorsService,
    vendorService,
    udemyService,
  }: Constructor) {
    this.#courseRepository = courseRepository;
    this.#courseCategoryService = courseCategoryService;
    this.#courseToCourseCategoriesService = courseToCourseCategoriesService;
    this.#courseToVendorsService = courseToVendorsService;
    this.#vendorService = vendorService;
    this.#udemyService = udemyService;
  }

  async create(
    courseRequestDto: CourseCreateRequestDto,
  ): Promise<CourseGetResponseDto> {
    const { courseCategoryName, description, title, url, vendorKey } =
      courseRequestDto;

    const courseCategory = await this.#courseCategoryService.getByName(
      courseCategoryName,
    );

    if (!courseCategory) {
      throw new CourseError();
    }

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
    });

    await this.#courseToCourseCategoriesService.createCourseToCourseCategories({
      courseCategoryId: courseCategory.id,
      courseId: course.id,
    });

    await this.#courseToVendorsService.createCourseToVendors({
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
        const {
          description,
          title,
          url,
          primary_category: { title: courseCategoryName },
        } = courseData;

        return await this.create({
          courseCategoryName,
          description,
          title,
          url,
          vendorKey: VendorKey.UDEMY,
        });
      }
      default: {
        return null;
      }
    }
  }
}

export { Course };
