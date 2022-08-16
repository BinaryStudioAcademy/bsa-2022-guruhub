import { Model, RelationMappings } from 'objection';

import { DbTableName } from '~/common/enums/enums';

import { Abstract } from '../abstract/abstract.model';
import { Vendor } from '../models';

class Course extends Abstract {
  'title': string;

  'description': string;

  'url': string;

  'vendorId': number;

  'courseCategoryId': number;

  static override get relationMappings(): RelationMappings {
    return {
      vendor: {
        relation: Model.HasManyRelation,
        modelClass: Vendor,
        join: {
          from: `${DbTableName.COURSES}.vendor_id`,
          to: `${DbTableName.VENDORS}.id`,
        },
      },
    };
  }

  static override get tableName(): string {
    return DbTableName.COURSES;
  }
}

export { Course };
