import { DbTableName } from '~/common/enums/enums';

import { Abstract } from '../abstract/abstract.model';

class Course extends Abstract {
  public 'title': string;

  public 'description': string;

  public 'url': string;

  public 'vendorId': number;

  public 'courseCategoryId': number;

  public static override get tableName(): string {
    return DbTableName.COURSES;
  }
}

export { Course };
