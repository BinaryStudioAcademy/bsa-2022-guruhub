import { DbTableName } from '~/common/enums/enums';

import { Abstract } from '../abstract/abstract.model';

class Course extends Abstract {
  'title': string;

  'description': string;

  'url': string;

  static override get tableName(): string {
    return DbTableName.COURSES;
  }
}

export { Course };
