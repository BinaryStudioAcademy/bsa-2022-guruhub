import { CourseLectureModuleCreateArgumentsDto } from '~/common/types/types';
import {
  CourseLectureModule as ModuleM,
  CourseLectureModuleAsset as AssetM,
} from '~/data/models/models';

import { CourseLectureAssetModule as AssetRepo } from './course-lecture-module-asset.repository';

type Constructor = {
  ModuleModel: typeof ModuleM;
};

class CourseLectureModule {
  #ModuleModel: typeof ModuleM;

  #AssetRepo = new AssetRepo({ AssetModel: AssetM });

  public constructor({ ModuleModel }: Constructor) {
    this.#ModuleModel = ModuleModel;
  }

  public async create(
    asset: AssetM,
    lectureModule: CourseLectureModuleCreateArgumentsDto,
  ): Promise<ModuleM> {
    const assetRes = await this.#AssetRepo.create(asset);
    const { id } = assetRes;

    const { title, description, sortOrder, courseId } = lectureModule;

    return this.#ModuleModel.query().insert({
      title,
      description,
      sortOrder,
      assetId: id,
      courseId,
    });
  }
}

export { CourseLectureModule };
