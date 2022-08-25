import { Model, RelationMappings } from 'objection';

import { DbTableName } from '~/common/enums/enums';

import { Abstract } from '../abstract/abstract.model';
import { CourseCategory, Vendor } from '../models';

class Course extends Abstract {
  public 'title': string;

  public 'description': string;

  public 'url': string;

  public 'imageUrl': string;

  public 'vendorId': number;

  public 'courseCategoryId': number;

  public 'originalId': string;

  public static override get relationMappings(): RelationMappings {
    return {
      vendor: {
        relation: Model.HasOneRelation,
        modelClass: Vendor,
        join: {
          from: `${DbTableName.COURSES}.vendor_id`,
          to: `${DbTableName.VENDORS}.id`,
        },
      },
      category: {
        relation: Model.HasOneRelation,
        modelClass: CourseCategory,
        join: {
          from: `${DbTableName.COURSES}.course_category_id`,
          to: `${DbTableName.COURSE_CATEGORIES}.id`,
        },
      },
    };
  }

  public static override get tableName(): string {
    return DbTableName.COURSES;
  }
}

export { Course };
