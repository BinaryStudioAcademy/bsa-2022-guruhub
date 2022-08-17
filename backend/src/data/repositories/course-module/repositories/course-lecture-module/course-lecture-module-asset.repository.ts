import { CourseLectureAssetModuleCreateArgumentsDto } from '~/common/types/types';
import { CourseLectureModuleAsset as AssetM } from '~/data/models/models';

type Constructor = {
  AssetModel: typeof AssetM;
};

class CourseLectureAssetModule {
  #AssetModel: typeof AssetM;

  public constructor({ AssetModel: Model }: Constructor) {
    this.#AssetModel = Model;
  }

  public async create(
    asset: CourseLectureAssetModuleCreateArgumentsDto,
  ): Promise<AssetM> {
    const { title, assetType } = asset;

    return this.#AssetModel.query().insert({
      title,
      assetType,
    });
  }
}

export { CourseLectureAssetModule };
