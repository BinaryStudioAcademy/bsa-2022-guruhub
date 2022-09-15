import { ExceptionMessage } from '~/common/enums/enums';
import {
  CourseModuleCreateArgumentsDto,
  CourseModuleGetByIdResponseDto,
  CourseModuleGetRequestParamsDto,
  CourseModulesGetAllItemResponseDto,
} from '~/common/types/types';
import { courseModule as moduleRep } from '~/data/repositories/repositories';
import { CoursesModulesError } from '~/exceptions/exceptions';
import { sanitizeHTML } from '~/helpers/helpers';
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
  ): Promise<CourseModulesGetAllItemResponseDto> {
    const { title, description, courseId } = moduleRequestDto;

    return this.#moduleRepository.create({
      title,
      description,
      courseId,
    });
  }

  public async getModulesByCourseId(
    courseId: number,
  ): Promise<CourseModulesGetAllItemResponseDto[]> {
    const modules = await this.#moduleRepository.getAllByCourseId({ courseId });

    return modules;
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

    for (const courseModule of courseData) {
      await this.create({
        ...courseModule,
        description: courseModule.description
          ? sanitizeHTML(courseModule.description)
          : null,
        courseId: dbCourseId,
      });
    }
    // await Promise.all(
    //   courseData.map((courseModule) => {
    //     return this.create({
    //       ...courseModule,
    //       description: courseModule.description
    //         ? sanitizeHTML(courseModule.description)
    //         : null,
    //       courseId: dbCourseId,
    //     });
    //   }),
    // );
  }

  public getById({
    courseId,
    moduleId,
  }: CourseModuleGetRequestParamsDto): Promise<CourseModuleGetByIdResponseDto | null> {
    return this.#moduleRepository.getById({ courseId, moduleId });
  }
}

export { CourseModule };
