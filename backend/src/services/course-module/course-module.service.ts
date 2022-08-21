import { ExceptionMessage } from '~/common/enums/enums';
import {
  CourseModuleCreateArgumentsDto,
  CourseModuleGetByIdResponseDto,
  CourseModuleGetRequestParamsDto,
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
    const { title, description, courseId } = moduleRequestDto;

    return this.#moduleRepository.create({
      title,
      description,
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
          courseId: dbCourseId,
        });
      }),
    );
  }

  public getById({
    courseId,
    moduleId,
  }: CourseModuleGetRequestParamsDto): Promise<CourseModuleGetByIdResponseDto | null> {
    return this.#moduleRepository.getById({ courseId, moduleId });
  }
}

export { CourseModule };
