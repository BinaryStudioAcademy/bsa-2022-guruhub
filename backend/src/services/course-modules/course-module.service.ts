import { ExceptionMessage } from '~/common/enums/enums';
import {
  CourseModuleCreateArgumentsDto,
  CourseModuleGetResponseDto,
} from '~/common/types/types';
import { courseModule as moduleRep } from '~/data/repositories/repositories';
import { CoursesModulesError } from '~/exceptions/exceptions';
import { udemy as udemyServ } from '~/services/services';

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

  public create(
    moduleRequestDto: CourseModuleCreateArgumentsDto,
  ): Promise<CourseModuleGetResponseDto> {
    const { title, description, moduleIndex, courseId } = moduleRequestDto;

    return this.#moduleRepository.create({
      title,
      description,
      moduleIndex,
      courseId,
    });
  }

  public async createModulesByCourseId(
    serviceCourseId: number,
    dbCourseId: number,
  ): Promise<void> {
    const courseData = await this.#udemyService.getModulesByCourseId(
      serviceCourseId,
    );

    if (!courseData.length) {
      throw new CoursesModulesError({
        message: ExceptionMessage.UDEMY_SERVER_RETURNED_AN_INVALID_RESPONSE,
      });
    }

    await Promise.all(
      courseData.map((course) => {
        return this.create({
          ...course,
          moduleIndex: course.sort_order,
          courseId: dbCourseId,
        });
      }),
    );
  }
}

export { CourseModule };
