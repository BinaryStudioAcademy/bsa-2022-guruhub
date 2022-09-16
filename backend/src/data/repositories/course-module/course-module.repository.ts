import {
  CourseModuleCreateArgumentsDto,
  CourseModuleGetByIdResponseDto,
  CourseModuleGetRequestParamsDto,
  CourseModulesGetAllItemResponseDto,
  CourseModulesGetAllRequestParamsDto,
  NumericalValueContainer,
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

  public async getAllByCourseId({
    courseId,
  }: CourseModulesGetAllRequestParamsDto): Promise<
    CourseModulesGetAllItemResponseDto[]
  > {
    const modules = await this.#ModuleModel
      .query()
      .where({ courseId })
      .returning('*')
      .castTo<CourseModulesGetAllItemResponseDto[]>();

    return modules ?? [];
  }

  public getAllCourseModulesCountByCourseId({
    courseId,
  }: CourseModulesGetAllRequestParamsDto): Promise<NumericalValueContainer> {
    return this.#ModuleModel
      .query()
      .select()
      .where({ courseId })
      .count('* as value')
      .first()
      .castTo<NumericalValueContainer>()
      .execute();
  }
}

export { CourseModule };
