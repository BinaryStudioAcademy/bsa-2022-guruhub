import { CourseQuizModuleCreateArgumentsDto } from '~/common/types/types';
import { CourseQuizModule as ModuleM } from '~/data/models/models';

type Constructor = {
  ModuleModel: typeof ModuleM;
};

class CourseQuizModule {
  #ModuleModel: typeof ModuleM;

  public constructor({ ModuleModel }: Constructor) {
    this.#ModuleModel = ModuleModel;
  }

  public async create(
    quizModule: CourseQuizModuleCreateArgumentsDto,
  ): Promise<ModuleM> {
    const { title, description, sortOrder, passPercent, courseId } = quizModule;

    return this.#ModuleModel.query().insert({
      title,
      description,
      sortOrder,
      passPercent,
      courseId,
    });
  }
}

export { CourseQuizModule };
