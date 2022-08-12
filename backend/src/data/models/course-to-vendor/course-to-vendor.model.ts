import { DbTableName } from '~/common/enums/enums';

import { Abstract } from '../abstract/abstract.model';

class CourseToVendor extends Abstract {
  'courseId': number;

  'vendorId': number;

  static override get tableName(): string {
    return DbTableName.COURSE_TO_VENDOR;
  }
}

export { CourseToVendor };
