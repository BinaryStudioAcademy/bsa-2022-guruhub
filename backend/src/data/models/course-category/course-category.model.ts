import { Model, RelationMappings } from 'objection';

import { DbTableName } from '~/common/enums/enums';

import { Abstract } from '../abstract/abstract.model';
import { Course, CourseCategoryPrice, Interview } from '../models';

class CourseCategory extends Abstract {
  public 'name': string;

  public 'key': string;

  public static override get relationMappings(): RelationMappings {
    return {
      interviews: {
        relation: Model.HasManyRelation,
        modelClass: Interview,
        join: {
          from: `${DbTableName.COURSE_CATEGORIES}.id`,
          to: `${DbTableName.INTERVIEWS}.categoryId`,
        },
      },
      courses: {
        relation: Model.HasManyRelation,
        modelClass: Course,
        join: {
          from: `${DbTableName.COURSE_CATEGORIES}.id`,
          to: `${DbTableName.COURSES}.courseCategoryId`,
        },
      },
      price: {
        relation: Model.HasOneRelation,
        modelClass: CourseCategoryPrice,
        join: {
          from: `${DbTableName.COURSE_CATEGORIES}.id`,
          to: `${DbTableName.COURSE_CATEGORIES_PRICES}.categoryId`,
        },
      },
    };
  }

  public static override get tableName(): string {
    return DbTableName.COURSE_CATEGORIES;
  }
}

export { CourseCategory };
