import { CourseModuleCreateArgumentsDto } from '~/common/types/types';
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
    const { title, description, sortOrder, courseId } = courseModule;

    return this.#ModuleModel
      .query()
      .insert({
        title,
        description,
        moduleIndex: sortOrder,
        courseId,
      })
      .execute();
  }
}

export { CourseModule };
