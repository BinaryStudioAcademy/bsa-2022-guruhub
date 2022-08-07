import { DbTableName } from '~/common/enums/enums';
import { Abstract } from '../abstract/abstract.model';

class CourseCategory extends Abstract {
  'name': string;
  'key': string;

  static override get tableName(): string {
    return DbTableName.COURSE_CATEGORIES;
  }
}

export { CourseCategory };
