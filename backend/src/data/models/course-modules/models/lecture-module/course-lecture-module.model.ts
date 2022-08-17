import { Model, RelationMappings } from 'objection';
import { Abstract } from 'src/data/models/abstract/abstract.model';
import { Course, CourseLectureModuleAsset } from 'src/data/models/models';

import { DbTableName } from '~/common/enums/enums';

class CourseLectureModule extends Abstract {
  public 'title': string;

  public 'description': string;

  public 'sortOrder': number;

  public 'assetId': number;

  public 'courseId': number;

  public static override get relationMappings(): RelationMappings {
    return {
      course: {
        relation: Model.HasOneRelation,
        modelClass: Course,
        join: {
          from: `${DbTableName.COURSES_LECTURE_MODULES}.course_id`,
          to: `${DbTableName.COURSES}.id`,
        },
      },
      courseLectureModuleAsset: {
        relation: Model.HasOneRelation,
        modelClass: CourseLectureModuleAsset,
        join: {
          from: `${DbTableName.COURSES_LECTURE_MODULES}.asset_id`,
          to: `${DbTableName.COURSES_LECTURE_MODULES_ASSET}.id`,
        },
      },
    };
  }

  public static override get tableName(): string {
    return DbTableName.COURSES_LECTURE_MODULES;
  }
}

export { CourseLectureModule };
