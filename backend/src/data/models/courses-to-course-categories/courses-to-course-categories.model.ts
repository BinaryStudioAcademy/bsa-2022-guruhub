import { DbTableName } from '~/common/enums/enums';

import { Abstract } from '../abstract/abstract.model';

class CoursesToCourseCategories extends Abstract {
  'courseId': number;

  'courseCategoryId': number;

  static override get tableName(): string {
    return DbTableName.COURSES_TO_COURSE_CATEGORIES;
  }
}

export { CoursesToCourseCategories };
