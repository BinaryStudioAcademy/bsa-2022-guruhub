import { DbTableName } from '~/common/enums/enums';

import { Abstract } from '../abstract/abstract.model';

class CoursesToVendors extends Abstract {
  'courseId': number;

  'vendorId': number;

  static override get tableName(): string {
    return DbTableName.COURSES_TO_VENDORS;
  }
}

export { CoursesToVendors };
