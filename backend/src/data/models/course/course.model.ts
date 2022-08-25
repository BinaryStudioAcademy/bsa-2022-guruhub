import { Model, RelationMappings } from 'objection';

import { DbTableName } from '~/common/enums/enums';

import { Abstract } from '../abstract/abstract.model';
import { User, Vendor } from '../models';

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
      mentors: {
        relation: Model.ManyToManyRelation,
        modelClass: User,
        join: {
          from: `${DbTableName.COURSES}.id`,
          through: {
            from: `${DbTableName.COURSES_TO_MENTORS}.course_id`,
            to: `${DbTableName.COURSES_TO_MENTORS}.user_id`,
          },
          to: `${DbTableName.USERS}.id`,
        },
      },
    };
  }

  public static override get tableName(): string {
    return DbTableName.COURSES;
  }
}

export { Course };
