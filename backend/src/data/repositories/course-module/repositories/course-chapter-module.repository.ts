import { CourseChapterModuleCreateArgumentsDto } from '~/common/types/types';
import { CourseChapterModule as ModuleM } from '~/data/models/models';

type Constructor = {
  ModuleModel: typeof ModuleM;
};

class CourseChapterModule {
  #ModuleModel: typeof ModuleM;

  public constructor({ ModuleModel }: Constructor) {
    this.#ModuleModel = ModuleModel;
  }

  public async create(
    chapterModule: CourseChapterModuleCreateArgumentsDto,
  ): Promise<ModuleM> {
    const { title, description, sortOrder, courseId } = chapterModule;

    return this.#ModuleModel.query().insert({
      title,
      description,
      sortOrder,
      courseId,
    });
  }
}

export { CourseChapterModule };
