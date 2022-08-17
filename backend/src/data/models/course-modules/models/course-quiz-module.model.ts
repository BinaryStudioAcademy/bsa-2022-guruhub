import { Model, RelationMappings } from 'objection';
import { Abstract } from 'src/data/models/abstract/abstract.model';
import { Course } from 'src/data/models/models';

import { DbTableName } from '~/common/enums/enums';

class CourseQuizModule extends Abstract {
  public 'title': string;

  public 'description': string;

  public 'sortOrder': number;

  public 'passPercent': number;

  public 'courseId': number;

  public static override get relationMappings(): RelationMappings {
    return {
      course: {
        relation: Model.HasOneRelation,
        modelClass: Course,
        join: {
          from: `${DbTableName.COURSES_QUIZ_MODULES}.course_id`,
          to: `${DbTableName.COURSES}.id`,
        },
      },
    };
  }

  public static override get tableName(): string {
    return DbTableName.COURSES_QUIZ_MODULES;
  }
}

export { CourseQuizModule };
