import { CoursePracticeModuleCreateArgumentsDto } from '~/common/types/types';
import { CoursePracticeModule as ModuleM } from '~/data/models/models';

type Constructor = {
  ModuleModel: typeof ModuleM;
};

class CoursePracticeModule {
  #ModuleModel: typeof ModuleM;

  public constructor({ ModuleModel }: Constructor) {
    this.#ModuleModel = ModuleModel;
  }

  public async create(
    practiceModule: CoursePracticeModuleCreateArgumentsDto,
  ): Promise<ModuleM> {
    const { title, sortOrder, courseId } = practiceModule;

    return this.#ModuleModel.query().insert({
      title,
      sortOrder,
      courseId,
    });
  }
}

export { CoursePracticeModule };
