import { ExceptionMessage, HttpCode } from '~/common/enums/enums';
import {
  CourseModuleCreateArgumentsDto,
  CourseModuleGetResponseDto,
} from '~/common/types/types';
import { courseModule as moduleRep } from '~/data/repositories/repositories';
import { CoursesModulesError } from '~/exceptions/exceptions';
import { udemyCourseModule as udemyServ } from '~/services/services';

type Constructor = {
  moduleRepository: typeof moduleRep;
  udemyService: typeof udemyServ;
};

class CourseModule {
  #moduleRepository: typeof moduleRep;

  #udemyService: typeof udemyServ;

  public constructor({ moduleRepository, udemyService }: Constructor) {
    this.#moduleRepository = moduleRepository;
    this.#udemyService = udemyService;
  }

  public async create(
    moduleRequestDto: CourseModuleCreateArgumentsDto,
  ): Promise<CourseModuleGetResponseDto> {
    const { title, description, sortOrder, courseId } = moduleRequestDto;

    return await this.#moduleRepository.create({
      title,
      description,
      sortOrder,
      courseId,
    });
  }

  public async createModulesByCourseId(courseId: number): Promise<void> {
    const courseData = await this.#udemyService.getModulesByCourseId(courseId);

    if (courseData.length === 0) {
      throw new CoursesModulesError({
        status: HttpCode.BAD_GATEWAY,
        message: ExceptionMessage.UDEMY_SERVER_RETURNED_AN_INVALID_RESPONSE,
      });
    }

    courseData.forEach((course) => {
      this.create({
        ...course,
        sortOrder: course.sort_order,
        courseId,
      });
    });
  }
}

export { CourseModule };
