// import { ExceptionMessage } from '~/common/enums/enums';
import {
  CourseModuleCreateArgumentsDto,
  CourseModuleGetResponseDto,
  // UdemyModulesGetResponseDto,
} from '~/common/types/types';
import { courseModule as moduleRep } from '~/data/repositories/repositories';
// import { CoursesModulesError } from '~/exceptions/exceptions';
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
    quizRequestDto: CourseModuleCreateArgumentsDto,
  ): Promise<CourseModuleGetResponseDto> {
    const { title, description, sortOrder, courseId } = quizRequestDto;

    return await this.#moduleRepository.create({
      title,
      description,
      sortOrder,
      courseId,
    });
  }

  public async createModulesByCourseId(courseId: number): Promise<void> {
    try {
      const courseData = await this.#udemyService.getByCourseId(courseId);
      JSON.stringify(courseData);
    } catch (err) {
      JSON.stringify(err);
    }
  }
}

export { CourseModule };
