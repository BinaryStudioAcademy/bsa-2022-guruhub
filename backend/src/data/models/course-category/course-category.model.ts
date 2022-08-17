import { DbTableName } from '~/common/enums/enums';

import { Abstract } from '../abstract/abstract.model';

class CourseCategory extends Abstract {
  public 'name': string;

  public 'key': string;

  public static override get tableName(): string {
    return DbTableName.COURSE_CATEGORIES;
  }
}

export { CourseCategory };
