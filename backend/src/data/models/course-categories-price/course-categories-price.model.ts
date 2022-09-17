import { Model, RelationMappings } from 'objection';

import { DbTableName } from '~/common/enums/enums';

import { Abstract } from '../abstract/abstract.model';
import { CourseCategory } from '../models';

class CourseCategoryPrice extends Abstract {
  public 'categoryId': number;

  public 'price': number;

  public static override get relationMappings(): RelationMappings {
    return {
      category: {
        relation: Model.BelongsToOneRelation,
        modelClass: CourseCategory,
        join: {
          from: `${DbTableName.COURSE_CATEGORIES_PRICES}.categoryId`,
          to: `${DbTableName.COURSE_CATEGORIES}.id`,
        },
      },
    };
  }

  public static override get tableName(): string {
    return DbTableName.COURSE_CATEGORIES_PRICES;
  }
}

export { CourseCategoryPrice };
