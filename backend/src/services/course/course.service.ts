import { CourseHost, ExceptionMessage, VendorKey } from '~/common/enums/enums';
import {
  CourseCreateArgumentsDto,
  CourseFilteringDto,
  CourseGetByIdAndVendorKeyArgumentsDto,
  CourseGetMenteesByMentorRequestDto,
  CourseGetMentoringDto,
  CourseGetMentorsRequestDto,
  CourseGetResponseDto,
  CourseUpdateMentoringDto,
  EntityPagination,
  EntityPaginationRequestQueryDto,
  UsersGetResponseDto,
} from '~/common/types/types';
import { course as courseRep } from '~/data/repositories/repositories';
import { CoursesError } from '~/exceptions/exceptions';
import { sanitizeHTML } from '~/helpers/helpers';
import {
  courseCategory as courseCategoryServ,
  courseModule as courseModuleServ,
  coursesToMentors as coursesToMentorsServ,
  edx as edxServ,
  udemy as udemyServ,
  vendor as vendorServ,
} from '~/services/services';

type Constructor = {
  courseRepository: typeof courseRep;
  courseModuleService: typeof courseModuleServ;
  vendorService: typeof vendorServ;
  udemyService: typeof udemyServ;
  edxService: typeof edxServ;
  courseCategoryService: typeof courseCategoryServ;
  coursesToMentorsService: typeof coursesToMentorsServ;
};

class Course {
  #courseRepository: typeof courseRep;

  #courseModuleService: typeof courseModuleServ;

  #vendorService: typeof vendorServ;

  #udemyService: typeof udemyServ;

  #edxService: typeof edxServ;

  #courseCategoryService: typeof courseCategoryServ;

  #coursesToMentorsService: typeof coursesToMentorsServ;

  public constructor({
    courseRepository,
    courseModuleService,
    vendorService,
    udemyService,
    edxService,
    courseCategoryService,
    coursesToMentorsService,
  }: Constructor) {
    this.#courseRepository = courseRepository;
    this.#courseModuleService = courseModuleService;
    this.#vendorService = vendorService;
    this.#udemyService = udemyService;
    this.#edxService = edxService;
    this.#courseCategoryService = courseCategoryService;
    this.#coursesToMentorsService = coursesToMentorsService;
  }

  public async getAllWithCategories(
    filteringOpts: CourseFilteringDto,
  ): Promise<CourseGetResponseDto[]> {
    const { categoryKey, title } = filteringOpts;
    const categoryId = await this.getCategoryIdByKey(categoryKey);

    return this.#courseRepository.getAllWithCategories({
      categoryId,
      title,
    });
  }

  public getAll(
    args: EntityPaginationRequestQueryDto,
  ): Promise<EntityPagination<CourseGetResponseDto>> {
    const { page, count } = args;

    const zeroIndexPage = page - 1;

    return this.#courseRepository.getAll({
      page: zeroIndexPage,
      count,
    });
  }

  public getAllCoursesStudying(
    userId: number,
  ): Promise<CourseGetResponseDto[]> {
    return this.#courseRepository.getAllCoursesStudying(userId);
  }

  public getAllCoursesMentoring(
    userId: number,
    pagination: EntityPaginationRequestQueryDto,
  ): Promise<EntityPagination<CourseGetMentoringDto>> {
    const { page, count } = pagination;
    const zeroIndexPage = page - 1;

    return this.#courseRepository.getAllCoursesMentoring(userId, {
      count,
      page: zeroIndexPage,
    });
  }

  public async create(
    courseRequestDto: CourseCreateArgumentsDto,
  ): Promise<CourseGetResponseDto> {
    const { description, title, url, vendorKey, originalId, imageUrl } =
      courseRequestDto;

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
      imageUrl,
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

        const { description, title, url, id, image_480x270 } = courseData;

        const course = await this.create({
          description,
          title,
          url,
          vendorKey: VendorKey.UDEMY,
          originalId: id.toString(),
          imageUrl: image_480x270,
        });

        await this.#courseModuleService.createModulesByCourseId(id, course.id);

        return course;
      }
      case CourseHost.EDX: {
        const courseData = await this.#edxService.getCourseByUrl(urlObject);

        const { description, name, course_id } = courseData;

        const course = await this.create({
          description,
          title: name,
          url,
          vendorKey: VendorKey.EDX,
          originalId: course_id.toString(),
          imageUrl: null,
        });

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

  public async getMentorsByCourseId({
    courseId,
    filteringOpts,
  }: CourseGetMentorsRequestDto): Promise<UsersGetResponseDto[]> {
    const mentorsWithMenteesCount =
      await this.#courseRepository.getMentorsWithMenteesCount(courseId);

    const mentorsWithMenteesMaxCount =
      await this.#courseRepository.getMentorsWithMenteesMaxCount(courseId);

    const filteredMentorIds = mentorsWithMenteesMaxCount.map(
      (mentorWithMaxCount) => {
        const mentorWithCountFiltered = mentorsWithMenteesCount.find(
          (mentorWithCount) => mentorWithCount.id === mentorWithMaxCount.id,
        );

        if (!mentorWithCountFiltered) {
          return mentorWithMaxCount.id;
        }

        if (mentorWithCountFiltered.count < mentorWithMaxCount.count) {
          return mentorWithCountFiltered.id;
        }

        return -1;
      },
    );

    return this.#courseRepository.getMentorsByCourseId(filteredMentorIds, {
      courseId,
      filteringOpts,
    });
  }

  public getMenteesByCourseIdAndMentorId({
    mentorId,
    courseId,
  }: CourseGetMenteesByMentorRequestDto): Promise<UsersGetResponseDto[]> {
    return this.#courseRepository.getMenteesByCourseIdAndMentorId({
      courseId,
      mentorId,
    });
  }

  public updateStudentsCount(
    userId: number,
    data: CourseUpdateMentoringDto,
  ): Promise<number> {
    return this.#coursesToMentorsService.updateStudentsCount(userId, data);
  }

  public updateCategory(
    courseId: number,
    newCategoryId: number,
  ): Promise<CourseGetResponseDto> {
    return this.#courseRepository.updateCategory(courseId, newCategoryId);
  }
}

export { Course };
