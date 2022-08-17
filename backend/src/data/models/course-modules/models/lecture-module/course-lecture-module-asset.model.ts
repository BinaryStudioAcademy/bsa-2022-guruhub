import { Model, RelationMappings } from 'objection';
import { Abstract } from 'src/data/models/abstract/abstract.model';

import { DbTableName } from '~/common/enums/enums';

import { CourseLectureModule } from './course-lecture-module.model';

class CourseLectureModuleAsset extends Abstract {
  public 'title': string;

  public 'assetType': string;

  public 'lectureModuleId': number;

  public static override get relationMappings(): RelationMappings {
    return {
      lectureModule: {
        relation: Model.HasOneRelation,
        modelClass: CourseLectureModule,
        join: {
          from: `${DbTableName.COURSES_LECTURE_MODULES_ASSET}.lecture_module_id`,
          to: `${DbTableName.COURSES_LECTURE_MODULES}.id`,
        },
      },
    };
  }

  public static override get tableName(): string {
    return DbTableName.COURSES_LECTURE_MODULES_ASSET;
  }
}

export { CourseLectureModuleAsset };
