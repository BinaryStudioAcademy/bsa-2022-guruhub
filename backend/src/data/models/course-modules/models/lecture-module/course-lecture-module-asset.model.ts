import { Abstract } from 'src/data/models/abstract/abstract.model';

import { DbTableName } from '~/common/enums/enums';

class CourseLectureModuleAsset extends Abstract {
  public 'title': string;

  public 'assetType': string;

  public static override get tableName(): string {
    return DbTableName.COURSES_LECTURE_MODULES_ASSET;
  }
}

export { CourseLectureModuleAsset };
