import { CourseLectureModuleCreateArgumentsDto } from '~/common/types/types';
import { CourseLectureModule as ModuleM } from '~/data/models/models';

type Constructor = {
  ModuleModel: typeof ModuleM;
};

class CourseLectureModule {
  #ModuleModel: typeof ModuleM;

  public constructor({ ModuleModel }: Constructor) {
    this.#ModuleModel = ModuleModel;
  }

  public async create(
    lectureModule: CourseLectureModuleCreateArgumentsDto,
  ): Promise<ModuleM> {
    const { title, description, sortOrder, courseId, assetId } = lectureModule;

    return this.#ModuleModel.query().insert({
      title,
      description,
      sortOrder,
      assetId,
      courseId,
    });
  }
}

export { CourseLectureModule };
