import { DbTableName } from '~/common/enums/enums';

import { Abstract } from '../abstract/abstract.model';

class MentorsToCourseCategories extends Abstract {
  public 'userId': number;

  public 'courseCategoryId': number;

  public static override get tableName(): string {
    return DbTableName.MENTORS_TO_COURSE_CATEGORIES;
  }
}

export { MentorsToCourseCategories };
