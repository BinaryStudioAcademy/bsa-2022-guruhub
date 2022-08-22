import {
  CourseModuleCreateArgumentsDto,
  CourseModuleGetByIdResponseDto,
  CourseModuleGetRequestParamsDto,
} from '~/common/types/types';
import { CourseModule as ModuleM } from '~/data/models/models';

type Constructor = {
  ModuleModel: typeof ModuleM;
};

class CourseModule {
  #ModuleModel: typeof ModuleM;

  public constructor({ ModuleModel }: Constructor) {
    this.#ModuleModel = ModuleModel;
  }

  public create(
    courseModule: CourseModuleCreateArgumentsDto,
  ): Promise<ModuleM> {
    const { title, description, courseId } = courseModule;

    return this.#ModuleModel
      .query()
      .insert({
        title,
        description,
        courseId,
      })
      .execute();
  }

  public async getById({
    courseId,
    moduleId,
  }: CourseModuleGetRequestParamsDto): Promise<CourseModuleGetByIdResponseDto | null> {
    const module = await this.#ModuleModel
      .query()
      .where({
        courseId,
      })
      .andWhere('course_modules.id', moduleId)
      .joinRelated('course')
      .select('course_modules.*', 'course.title as courseTitle')
      .first()
      .castTo<CourseModuleGetByIdResponseDto>();

    return module ?? null;
  }
}

export { CourseModule };
